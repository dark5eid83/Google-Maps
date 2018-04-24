const chalk = require('chalk');
const _ = require('lodash');

/**
 * API Which allows the server to emit events to the client
 *
 * Note: There should only every be 1 instance of Emit otherwise
 * client lists could be confused
 */

class Emit {

    constructor() {
        this.clients = [];
    }

    emit(socket, channel, message) {
        socket.emit(channel, message);
    }

    addClient(socket) {
        this.clients.push(socket);
    }

    removeClient(index) {
        this.clients.splice(index, 1);
    }

    getClients() {
        return this.clients;
    }

    emitByIndex(index, channel, message) {
        clients[index].emit(channel, message)
    }

    emitById(id, channel, message) {
        clients[_.findIndex(this.clients, o => o.id === id)].emit(channel, message);
    }

}

module.exports = Emit;