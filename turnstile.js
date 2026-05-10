// ==UserScript==
// @name         TurnstileCapture | By @iamtubasya
// @Twitter/X    https://x.com/fifteennv2k
// @Telegram     https://t.me/iamtubasya
// @version      0.1
// @description  Garap teruss
// @author       @iamtubasya
// @run-at       document-end
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let style = `
        #turnstileOutput {
            position: fixed;
            top: 5px;
            right: 5px;
            width: 200px;
            height: 60px;
            z-index: 9999;
            background: linear-gradient(120deg, #ffecd2, #fcb69f);
            color: #333;
            font-size: 12px;
            padding: 5px;
            border-radius: 8px;
            border: 1px solid #ff7e5f;
            resize: none;
        }
        #btnCopy, #btnDownload {
            position: fixed;
            right: 5px;
            z-index: 9999;
            padding: 4px 6px;
            font-size: 11px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 2px;
            color: #fff;
        }
        #btnCopy { background-color: #4CAF50; top: 70px; }
        #btnDownload { background-color: #2196F3; top: 95px; }
    `;

    let styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    document.head.appendChild(styleTag);

    let output = document.createElement('textarea');
    output.id = 'turnstileOutput';
    output.placeholder = 'Token Turnstile';
    document.body.appendChild(output);

    let btnCopy = document.createElement('button');
    btnCopy.id = 'btnCopy';
    btnCopy.innerText = 'Copy';
    document.body.appendChild(btnCopy);
    btnCopy.onclick = function() {
        output.select();
        document.execCommand('copy');
        alert('Token berhasil dicopy ✅');
    };

    let btnDownload = document.createElement('button');
    btnDownload.id = 'btnDownload';
    btnDownload.innerText = 'Download';
    document.body.appendChild(btnDownload);

    btnDownload.onclick = function() {
        let blob = new Blob([output.value], {type: 'text/plain'});
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'tokencf.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    function grabTokens() {
        let tokens = [];

        document.querySelectorAll('input[name="cf-turnstile-response"]').forEach(i => {
            if(i.value) tokens.push(i.value);
        });

        if(window.turnstile && window.turnstile._widgetIds) {
            window.turnstile._widgetIds.forEach(id => {
                let widget = window.turnstile.getResponse(id);
                if(widget) tokens.push(widget);
            });
        }

        if(tokens.length > 0) {
            output.value = tokens.filter((v,i,a) => a.indexOf(v)===i).join('\n');
        } else {
            output.value = '';
        }
    }

    setInterval(grabTokens, 1000);

    console.log('Turnstile Capture siap ✅');
})();
