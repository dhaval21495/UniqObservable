io.on("connection", function (client) {
    console.log("Socket connection >>" + client.id);
    client.on('req', function (data) {
        console.log("Enter req");
        if (typeof data.en == 'undefined' && typeof data.data == 'undefined') {
            sendData('ERROR', { msg: "Something went wrong, please try again.", code: 0 }, client);
            return false;
        }
        console.log("client >> client.id >>", client.id);
        console.log("client >> data >>", data);

        var en = data.en;
        var data = data.data;
        switch (en) {
            case 'USER_JOIN':
                userJoin(data, client);
                break;
            case 'USER_LIST':
                getUser(data, client);
                break;
            case 'SEND_MESSAGE':
                sendMessage(data, client);
                break;
            case 'CHAT_OPEN':
                chatOpen(data, client);
                break;
        }
    });
});

// User Login / Join
function userJoin(data, client) {
    Users.findByIdAndUpdate(data.uid, { socket_id: client.id })
        .then((res) => {
            console.log("userJoin >> res >>", res);
            client.uid = data.uid;
            // sendData('USER_JOINR',{user : data.uid, adminId : adminId},client);
        })
        .catch(function (err) {
            console.log("userJoin >> err >>", err);
            sendData('ERROR', { msg: "Something went wrong, please try again.", code: 0 }, client);
        });
}

// User List
function getUser(data, client) {
    let uid = data.uid;
    Matches.find({
        $and: [{
            $or: [{
                user_id: uid
            }, {
                partner_id: uid
            }],
        }, {
            $and: [{
                user_like: { "$ne": "" }
            }, {
                partner_like: { "$ne": "" }
            }]
        }],
    })
        .populate('user_id')
        .populate('partner_id')
        .sort({ "chat_date": -1 })
        .exec(function (error, matches) {
            sendData('USER_LISTS', { array: matches }, client);
        })
}

// Chat Open
function chatOpen(data, client) {
    if (checkClientData("chatOpen", data, client)) {
        let uid = data.uid;
        let ouid = data.ouid;
        Chat.find({
            $or: [{
                $and: [{
                    from_id: uid
                }, {
                    to_id: ouid
                }],
            }, {
                $and: [{
                    to_id: uid
                }, {
                    from_id: ouid
                }]
            }],
        })
            .populate('from_id')
            .populate('to_id')
            .exec(function (error, chat) {
                sendData('CHAT_OPENR', { array: chat }, client);
            });
    }
}

// Send Message
function sendMessage(data, client) {
    if (checkClientData("sendMessage", data, client)) {
        console.log("sendMessage >> data >>", data)
        let chatObj = {
            from_id: data.uid,
            to_id: data.ouid,
            msg: data.msg,
            date: new Date()
        };
        Users.where({ _id: data.ouid }).select('socket_id').limit(1)
            .then((user) => {
                console.log("User Message");
                console.log(user);
                var chat = new Chat(chatObj);
                chat.save(chatObj)
                    .then((res) => {
                        Matches.findOneAndUpdate({
                            $or: [{
                                $and: [{
                                    user_id: data.uid
                                }, {
                                    partner_id: data.ouid
                                }],
                            }, {
                                $and: [{
                                    user_id: data.ouid
                                }, {
                                    partner_id: data.uid
                                }]
                            }],
                        }, { chat_date: new Date() }, function (err, results) {
                            if (results) {
                                sendData('USER_JOINR', { userId: data.uid, oId: data.ouid }, client);
                            }
                        });
                        console.log("==== Enter Message Success ====");
                        console.log("sendMessage >> res >>", res);
                        sendData('SEND_MESSAGER', chatObj, client);
                    }).catch(function (err) {
                        console.log("==== Enter Message Error ====");
                        console.log("sendMessage11111 >> err >>", err);
                        sendData('ERROR', { msg: "Something went wrong, please try again.", code: 0 }, client);
                    });
                if (user.length > 0 && user[0].socket_id != "" && user[0].socket_id != null) {
                    console.log("sendMessage >> user[0].socket_id >>");
                    client.to(user[0].socket_id).emit('res', { en: 'SEND_MESSAGER', data: chatObj });
                } else if (user.length > 0) {
                    console.log("sendMessage >> user.length>0 >>" + data.ouid + " >> " + adminId + ">> user[0].chat_open_id >>" + user[0].chat_open_id + " >> data.uid >>" + data.uid);
                }
            })
            .catch(function (err) {
                console.log(err);
                console.log("==== err ====");
                sendData('ERROR', { msg: "Something went wrong, please try again.", code: 0 }, client);
            });
    }
}

//
function sendData(en, data, client) {
    console.log("sendData >> en >>", en);
    console.log("sendData >> data >>", data);
    if (typeof en == 'undefined' || typeof data == 'undefined' || typeof client == 'undefined' || typeof client.emit == 'undefined') {
        console.log("ERROR >> sendData >>")
        return false
    }
    client.emit('res', { en: en, data: data })
}

function checkClientData(type, data, client) {
    console.log("checkClientData >> type >>", type);
    console.log("checkClientData >> data >>", data);
    let flag = true;

    switch (type) {
        case 'userJoin':
        case 'userList':
        case 'notificationList':
        case 'chatClose':
        case 'chatCount':
        case 'notificationCount':
            if (typeof data.uid == 'undefined' || data.uid == "")
                flag = false;
            break;

        case 'sendMessage':
            if (typeof data.uid == 'undefined' || data.uid == "" || typeof data.ouid == 'undefined' || data.ouid == "" || typeof data.msg == 'undefined' || data.msg == "")
                flag = false;
            break;

        case 'chatOpen':
            if (typeof data.uid == 'undefined' || data.uid == "" || typeof data.ouid == 'undefined' || data.ouid == "")
                flag = false;
            break;
    }
    console.log("checkClientData >> flag >>" + flag);
    if (!flag) {
        sendData('ERROR', { msg: "Something went wrong, please try again.", type: type, code: 0 }, client);
    }
    return flag;
}