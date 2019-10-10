const Node = require('./node');


class LinkedList {
    constructor() {
       this.length = 0;
       this._head = null;
       this._tail = null;
    }

    append(data) {
        let node = new Node(data);
        if (this.length) {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        } else {
            this._head = node;
            this._tail = node;
        }
        this.length++;
        return this;
    }

    head() {
        return !this._head ? this._head : this._head.data;
    }

    tail() {
        return !this._tail ? this._tail : this._tail.data ;
    }

    at(index) {
        function nodeSearch(index, iNode, count){
            return (count++ < index) 
                ? nodeSearch(index, iNode.next, count) : iNode;
        }
        return nodeSearch(index, this._head, 0).data;
    }

    insertAt(index, data) {
        function nodeSearch(index, iNode, count){
            return (count++ <= index) 
                ? nodeSearch(index, iNode.next, count) : iNode;
        }
        let currentNode = nodeSearch(index, this._head, 1);

        if (!index) {
            this.append(data);
            return this;
        }
        let newNode = new Node(data, currentNode.prev , currentNode.prev.next );
        currentNode.prev.next = newNode;
        currentNode.prev = newNode;
        this.length++;
        return this;
    }

    isEmpty() {
        return !this.length;
    }

    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;
        return this;
    }

    deleteAt(index) {
        function nodeSearch(index, iNode, count){
            return (count++ < index) 
                ? nodeSearch(index, iNode.next, count) : iNode;
        }
        let deletedNode = nodeSearch(index, this._head, 0);
        if(deletedNode.prev){
            deletedNode.prev.next = deletedNode.next
        };
        if(deletedNode.next){
            deletedNode.next.prev = deletedNode.prev
        };
        return this;
    }

    reverse() {
        function changeNodes(iNode){
            let nextNode = iNode.next;
            iNode.next = iNode.prev;
            iNode.prev = nextNode;
            return (nextNode) ? changeNodes(nextNode) : iNode;
        }
        this._tail = this._head;
        this._head = changeNodes(this._head);
        return this;
    }

    indexOf(data) {
        function dataSearch(data, iNode, count, length){
            return ((++count) <= length) 
                ? (iNode.data === data) 
                    ? --count 
                    : dataSearch(data, iNode.next, count, length)
                : -1;
        }
        return dataSearch(data, this._head, 0, this.length);
        }
      
    }

module.exports = LinkedList;
