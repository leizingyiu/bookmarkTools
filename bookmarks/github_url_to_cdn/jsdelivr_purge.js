javascript:
if (window.location.href.match(/cdn\.jsdelivr\.net/)) {
    _from = 'cdn', _to = 'purge';
} else { 
    _from = 'purge', _to = 'cdn';
}
window.location.href = window.location.href.replace(new RegExp(_from+'\.jsdelivr\.net'), _to+'.jsdelivr.net');