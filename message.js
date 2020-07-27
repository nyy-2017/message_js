class Message {

    /**
     * 构造函数会在实例化的时候自动执行
     */
    constructor() {
        const containerId = 'message-container';
        // 检测下html中是否已经有这个message-container元素
        this.containerEl = document.getElementById(containerId);

        if (!this.containerEl) {
            // 创建一个Element对象，也就是创建一个id为message-container的dom节点
            this.containerEl = document.createElement('div');
            this.containerEl.id = containerId;
            // 把message-container元素放在html的body末尾
            document.body.appendChild(this.containerEl);
        }
    }


    show({ type = 'info', text = '' }) {
        // 创建一个Element对象
        let messageEl = document.createElement('div');
        // 设置消息class，这里加上move-in可以直接看到弹出效果
        messageEl.className = 'message move-in';
        // 消息内部html字符串
        messageEl.innerHTML = `
            <span class="icon icon-${type}"></span>
            <div class="text">${text}</div>
            <div class="close icon icon-close"></div>
        `;
        // 追加到message-container末尾
        // this.containerEl属性是我们在构造函数中创建的message-container容器
        this.containerEl.appendChild(messageEl);

        // 用setTimeout来做一个定时器
        setTimeout(() => {
            // 首先把move-in这个弹出动画类给移除掉，要不然会有问题，可以自己测试下
            messageEl.className = messageEl.className.replace('move-in', '');
            // 增加一个move-out类
            messageEl.className += 'move-out';

            // 这个地方是监听动画结束事件，在动画结束后把消息从dom树中移除。
            // 如果你是在增加move-out后直接调用messageEl.remove，那么你不会看到任何动画效果
            messageEl.addEventListener('animationend', () => {
                // Element对象内部有一个remove方法，调用之后可以将该元素从dom树种移除！
                messageEl.remove();
            });
        }, 2000);
    }
}