function sendNotification(title:string, msg: string): Notification | null {
    const Notification = window.Notification || window.webkitNotifications;
    if (Notification.permission === 'granted') {
        return new Notification(title, {
            body: msg,
        });
    } else {
        Notification.requestPermission((permission) => {
            if (permission === 'granted') {
                return new Notification(title, {
                    body: msg,
                });
            }
        });
    }
    return null;
}

export {
    sendNotification,
}