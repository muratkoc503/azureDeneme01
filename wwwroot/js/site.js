window.downloadFile = (fileName, base64) => {
    const link = document.createElement("a");
    link.download = fileName;
    link.href =
        "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
        base64;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

window.downloadWord = (fileName, base64) => {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64," + base64;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

window.downloadPdf = (fileName, base64) => {
    const link = document.createElement('a');
    link.href = "data:application/pdf;base64," + base64;
    link.download = fileName;
    link.click();
};



window.initializeViewer = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
        new Viewer(element, {
            navbar: false, // Alt barı kapatır (isteğe bağlı)
            title: false,  // Dosya adını gizler
            toolbar: {
                zoomIn: 1,
                zoomOut: 1,
                oneToOne: 1,
                reset: 1,
                rotateLeft: 1,
                rotateRight: 1,
                flipHorizontal: 1,
                flipVertical: 1,
            },
        });
    }
};


window.downloadFileFromString = (fileName, contentType, content) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
};

window.googleAuthInterop = {
    // Popup'ı açmak için kullanılır
    openPopup: function (url) {
        var width = 500;
        var height = 600;
        var left = (screen.width - width) / 2;
        var top = (screen.height - height) / 2;

        // Popup'ı açıyoruz
        window.open(url, "GoogleLogin", `width=${width},height=${height},top=${top},left=${left}`);
    },

    // Callback sayfasından (popup içinden) çağrılır
    closePopupAndRedirect: function (redirectUrl) {
        // 1. Ana pencereyi (opener) yönlendir
        if (window.opener) {
            window.opener.location.href = redirectUrl;
        } else {
            // Eğer opener yoksa (örneğin kullanıcı popup'ı elle açtıysa) kendini yönlendir
            window.location.href = redirectUrl;
        }

        // 2. Popup penceresini kapat
        window.close();
    }
};

window.onerror = function (message, source, lineno, colno, error) {
    const logData = {
        message: message,
        level: "Critical", // Global çökmeler kritiktir
        category: "JavaScript",
        stackTrace: error ? error.stack : `At ${source}:${lineno}:${colno}`
    };

    fetch("/api/logs/wasm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    }).catch(err => console.error("Log gönderilemedi:", err));
};