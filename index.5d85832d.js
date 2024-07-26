let t,e,r,i,s,n,a;var o=globalThis;function h(t,e,r,i){Object.defineProperty(t,e,{get:r,set:i,enumerable:!0,configurable:!0})}function l(t){return t&&t.__esModule?t.default:t}function u(t,e){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||Object.prototype.hasOwnProperty.call(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t}var d={},c={},p=o.parcelRequire1af1;null==p&&((p=function(t){if(t in d)return d[t].exports;if(t in c){var e=c[t];delete c[t];var r={id:t,exports:{}};return d[t]=r,e.call(r.exports,r,r.exports),r.exports}var i=Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(t,e){c[t]=e},o.parcelRequire1af1=p);var f=p.register;f("biuEp",function(t,e){var r=p("dBHwk");function i(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}// Reference: RFC 3986, RFC 1808, RFC 2396
/*
 * define these here so at least they only have to be
 * compiled once on the first module load.
 */var s=/^([a-z0-9.+-]+:)/i,n=/:[0-9]*$/,a=/^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/,o=["'"].concat(["{","}","|","\\","^","`"].concat(["<",">",'"',"`"," ","\r","\n","	"])),/*
   * Characters that are never ever allowed in a hostname.
   * Note that any invalid chars are also handled, but these
   * are the ones that are *expected* to be seen, so we fast-path
   * them.
   */h=["%","/","?",";","#"].concat(o),l=["/","?","#"],u=/^[+a-z0-9A-Z_-]{0,63}$/,d=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,c={javascript:!0,"javascript:":!0},f={javascript:!0,"javascript:":!0},m={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},g=p("2rasJ");function _(t,e,r){if(t&&"object"==typeof t&&t instanceof i)return t;var s=new i;return s.parse(t,e,r),s}i.prototype.parse=function(t,e,i){if("string"!=typeof t)throw TypeError("Parameter 'url' must be a string, not "+typeof t);/*
   * Copy chrome, IE, opera backslash-handling behavior.
   * Back slashes before the query string get converted to forward slashes
   * See: https://code.google.com/p/chromium/issues/detail?id=25916
   */var n=t.indexOf("?"),p=-1!==n&&n<t.indexOf("#")?"?":"#",_=t.split(p);_[0]=_[0].replace(/\\/g,"/");var y=t=_.join(p);if(/*
   * trim before proceeding.
   * This is to support parse stuff like "  http://foo.com  \n"
   */y=y.trim(),!i&&1===t.split("#").length){// Try fast path regexp
var v=a.exec(y);if(v)return this.path=y,this.href=y,this.pathname=v[1],v[2]?(this.search=v[2],e?this.query=g.parse(this.search.substr(1)):this.query=this.search.substr(1)):e&&(this.search="",this.query={}),this}var x=s.exec(y);if(x){var b=(x=x[0]).toLowerCase();this.protocol=b,y=y.substr(x.length)}/*
   * figure out if it's got a host
   * user@server is *always* interpreted as a hostname, and url
   * resolution will treat //foo/bar as host=foo,path=bar because that's
   * how the browser resolves relative URLs.
   */if(i||x||y.match(/^\/\/[^@/]+@[^@/]+/)){var T="//"===y.substr(0,2);T&&!(x&&f[x])&&(y=y.substr(2),this.slashes=!0)}if(!f[x]&&(T||x&&!m[x])){for(var E,A,w=-1,S=0;S<l.length;S++){var R=y.indexOf(l[S]);-1!==R&&(-1===w||R<w)&&(w=R)}-1!==(A=-1===w?y.lastIndexOf("@"):y.lastIndexOf("@",w))&&(E=y.slice(0,A),y=y.slice(A+1),this.auth=decodeURIComponent(E)),// the host is the remaining to the left of the first non-host char
w=-1;for(var S=0;S<h.length;S++){var R=y.indexOf(h[S]);-1!==R&&(-1===w||R<w)&&(w=R)}-1===w&&(w=y.length),this.host=y.slice(0,w),y=y.slice(w),// pull out port.
this.parseHost(),/*
     * we've indicated that there is a hostname,
     * so even if it's empty, it has to be present.
     */this.hostname=this.hostname||"";/*
     * if hostname begins with [ and ends with ]
     * assume that it's an IPv6 address.
     */var I="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];// validate a little.
if(!I)for(var C=this.hostname.split(/\./),S=0,M=C.length;S<M;S++){var P=C[S];if(P&&!P.match(u)){for(var D="",O=0,B=P.length;O<B;O++)P.charCodeAt(O)>127?/*
               * we replace non-ASCII char with a temporary placeholder
               * we need this to make sure size of hostname is not
               * broken by replacing non-ASCII by nothing
               */D+="x":D+=P[O];// we test again with ASCII char only
if(!D.match(u)){var F=C.slice(0,S),N=C.slice(S+1),L=P.match(d);L&&(F.push(L[1]),N.unshift(L[2])),N.length&&(y="/"+N.join(".")+y),this.hostname=F.join(".");break}}}this.hostname.length>255?this.hostname="":this.hostname=this.hostname.toLowerCase(),I||/*
       * IDNA Support: Returns a punycoded representation of "domain".
       * It only converts parts of the domain name that
       * have non-ASCII characters, i.e. it doesn't matter if
       * you call it with a domain that already is ASCII-only.
       */(this.hostname=r.toASCII(this.hostname));var k=this.port?":"+this.port:"",U=this.hostname||"";this.host=U+k,this.href+=this.host,I&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==y[0]&&(y="/"+y))}/*
   * now rest is set to the post-host stuff.
   * chop off any delim chars.
   */if(!c[b])/*
     * First, make 100% sure that any "autoEscape" chars get
     * escaped, even if encodeURIComponent doesn't think they
     * need to be.
     */for(var S=0,M=o.length;S<M;S++){var G=o[S];if(-1!==y.indexOf(G)){var H=encodeURIComponent(G);H===G&&(H=escape(G)),y=y.split(G).join(H)}}// chop off from the tail first.
var j=y.indexOf("#");-1!==j&&(// got a fragment string.
this.hash=y.substr(j),y=y.slice(0,j));var z=y.indexOf("?");// to support http.request
if(-1!==z?(this.search=y.substr(z),this.query=y.substr(z+1),e&&(this.query=g.parse(this.query)),y=y.slice(0,z)):e&&(// no query string, but parseQueryString still requested
this.search="",this.query={}),y&&(this.pathname=y),m[b]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var k=this.pathname||"",V=this.search||"";this.path=k+V}return(// finally, reconstruct the href based on what has been validated.
this.href=this.format(),this)},i.prototype.format=function(){var t=this.auth||"";t&&(t=(t=encodeURIComponent(t)).replace(/%3A/i,":")+"@");var e=this.protocol||"",r=this.pathname||"",i=this.hash||"",s=!1,n="";this.host?s=t+this.host:this.hostname&&(s=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(s+=":"+this.port)),this.query&&"object"==typeof this.query&&Object.keys(this.query).length&&(n=g.stringify(this.query,{arrayFormat:"repeat",addQueryPrefix:!1}));var a=this.search||n&&"?"+n||"";return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||m[e])&&!1!==s?(s="//"+(s||""),r&&"/"!==r.charAt(0)&&(r="/"+r)):s||(s=""),i&&"#"!==i.charAt(0)&&(i="#"+i),a&&"?"!==a.charAt(0)&&(a="?"+a),e+s+(r=r.replace(/[?#]/g,function(t){return encodeURIComponent(t)}))+(a=a.replace("#","%23"))+i},i.prototype.resolve=function(t){return this.resolveObject(_(t,!1,!0)).format()},i.prototype.resolveObject=function(t){if("string"==typeof t){var e=new i;e.parse(t,!1,!0),t=e}for(var r=new i,s=Object.keys(this),n=0;n<s.length;n++){var a=s[n];r[a]=this[a]}// if the relative url is empty, then there's nothing left to do here.
if(/*
   * hash is always overridden, no matter what.
   * even href="" will remove it.
   */r.hash=t.hash,""===t.href)return r.href=r.format(),r;// hrefs like //foo/bar always cut to the protocol.
if(t.slashes&&!t.protocol){for(var o=Object.keys(t),h=0;h<o.length;h++){var l=o[h];"protocol"!==l&&(r[l]=t[l])}return m[r.protocol]&&r.hostname&&!r.pathname&&(r.pathname="/",r.path=r.pathname),r.href=r.format(),r}if(t.protocol&&t.protocol!==r.protocol){/*
     * if it's a known url protocol, then changing
     * the protocol does weird things
     * first, if it's not file:, then we MUST have a host,
     * and if there was a path
     * to begin with, then we MUST have a path.
     * if it is file:, then the host is dropped,
     * because that's known to be hostless.
     * anything else is assumed to be absolute.
     */if(!m[t.protocol]){for(var u=Object.keys(t),d=0;d<u.length;d++){var c=u[d];r[c]=t[c]}return r.href=r.format(),r}if(r.protocol=t.protocol,t.host||f[t.protocol])r.pathname=t.pathname;else{for(var p=(t.pathname||"").split("/");p.length&&!(t.host=p.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==p[0]&&p.unshift(""),p.length<2&&p.unshift(""),r.pathname=p.join("/")}// to support http.request
if(r.search=t.search,r.query=t.query,r.host=t.host||"",r.auth=t.auth,r.hostname=t.hostname||t.host,r.port=t.port,r.pathname||r.search){var g=r.pathname||"",_=r.search||"";r.path=g+_}return r.slashes=r.slashes||t.slashes,r.href=r.format(),r}var y=r.pathname&&"/"===r.pathname.charAt(0),v=t.host||t.pathname&&"/"===t.pathname.charAt(0),x=v||y||r.host&&t.pathname,b=x,T=r.pathname&&r.pathname.split("/")||[],p=t.pathname&&t.pathname.split("/")||[],E=r.protocol&&!m[r.protocol];if(E&&(r.hostname="",r.port=null,r.host&&(""===T[0]?T[0]=r.host:T.unshift(r.host)),r.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===p[0]?p[0]=t.host:p.unshift(t.host)),t.host=null),x=x&&(""===p[0]||""===T[0])),v)// it's absolute.
r.host=t.host||""===t.host?t.host:r.host,r.hostname=t.hostname||""===t.hostname?t.hostname:r.hostname,r.search=t.search,r.query=t.query,T=p;else if(p.length)T||(T=[]),T.pop(),T=T.concat(p),r.search=t.search,r.query=t.query;else if(null!=t.search){/*
     * just pull out the search.
     * like href='?foo'.
     * Put this after the other two cases because it simplifies the booleans
     */if(E){r.host=T.shift(),r.hostname=r.host;/*
       * occationaly the auth can get stuck only in host
       * this especially happens in cases like
       * url.resolveObject('mailto:local1@domain1', 'local2@domain2')
       */var A=!!(r.host&&r.host.indexOf("@")>0)&&r.host.split("@");A&&(r.auth=A.shift(),r.hostname=A.shift(),r.host=r.hostname)}return r.search=t.search,r.query=t.query,(null!==r.pathname||null!==r.search)&&(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.href=r.format(),r}if(!T.length)return(/*
     * no path at all.  easy.
     * we've already handled the other stuff above.
     */r.pathname=null,r.search?r.path="/"+r.search:r.path=null,r.href=r.format(),r);for(var w=T.slice(-1)[0],S=(r.host||t.host||T.length>1)&&("."===w||".."===w)||""===w,R=0,I=T.length;I>=0;I--)"."===(w=T[I])?T.splice(I,1):".."===w?(T.splice(I,1),R++):R&&(T.splice(I,1),R--);// if the path is allowed to go above the root, restore leading ..s
if(!x&&!b)for(;R--;R)T.unshift("..");x&&""!==T[0]&&(!T[0]||"/"!==T[0].charAt(0))&&T.unshift(""),S&&"/"!==T.join("/").substr(-1)&&T.push("");var C=""===T[0]||T[0]&&"/"===T[0].charAt(0);// put the host back
if(E){r.hostname=C?"":T.length?T.shift():"",r.host=r.hostname;/*
     * occationaly the auth can get stuck only in host
     * this especially happens in cases like
     * url.resolveObject('mailto:local1@domain1', 'local2@domain2')
     */var A=!!(r.host&&r.host.indexOf("@")>0)&&r.host.split("@");A&&(r.auth=A.shift(),r.hostname=A.shift(),r.host=r.hostname)}return(x=x||r.host&&T.length)&&!C&&T.unshift(""),T.length>0?r.pathname=T.join("/"):(r.pathname=null,r.path=null),(null!==r.pathname||null!==r.search)&&(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.auth=t.auth||r.auth,r.slashes=r.slashes||t.slashes,r.href=r.format(),r},i.prototype.parseHost=function(){var t=this.host,e=n.exec(t);e&&(":"!==(e=e[0])&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)},e.parse=_,e.resolve=function(t,e){return _(t,!1,!0).resolve(e)},e.resolveObject=function(t,e){return t?_(t,!1,!0).resolveObject(e):e},e.format=// format a parsed object into a url string
function(t){return("string"==typeof t&&(t=_(t)),t instanceof i)?t.format():i.prototype.format.call(t)},e.Url=i}),f("dBHwk",function(t,e){!function(r){/** Detect free variables */var i=e&&!e.nodeType&&e,s=t&&!t.nodeType&&t,n="object"==typeof o&&o;(n.global===n||n.window===n||n.self===n)&&(r=n);/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */var a,/** Temporary variable */h,/** Regular expressions */l=/^xn--/,u=/[^\x20-\x7E]/,d=/[\x2E\u3002\uFF0E\uFF61]/g,/** Error messages */c={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},p=Math.floor,f=String.fromCharCode;/*--------------------------------------------------------------------------*//**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */function m(t){throw RangeError(c[t])}/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */function g(t,e){for(var r=t.length,i=[];r--;)i[r]=e(t[r]);return i}/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */function _(t,e){var r=t.split("@"),i="";return r.length>1&&(// In email addresses, only the domain name should be punycoded. Leave
// the local part (i.e. everything up to `@`) intact.
i=r[0]+"@",t=r[1]),i+g(// Avoid `split(regex)` for IE8 compatibility. See #17.
(t=t.replace(d,".")).split("."),e).join(".")}/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */function y(t){for(var e,r,i=[],s=0,n=t.length;s<n;)(e=t.charCodeAt(s++))>=55296&&e<=56319&&s<n?(64512&// high surrogate, and there is a next character
(r=t.charCodeAt(s++)))==56320?i.push(((1023&e)<<10)+(1023&r)+65536):(// unmatched surrogate; only append this code unit, in case the next
// code unit is the high surrogate of a surrogate pair
i.push(e),s--):i.push(e);return i}/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */function v(t){return g(t,function(t){var e="";return t>65535&&(t-=65536,e+=f(t>>>10&1023|55296),t=56320|1023&t),e+=f(t)}).join("")}/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */function x(t,e){//  0..25 map to ASCII a..z or A..Z
// 26..35 map to ASCII 0..9
return t+22+75*(t<26)-((0!=e)<<5)}/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */function b(t,e,r){var i=0;for(t=r?p(t/700):t>>1,t+=p(t/e);t>455;i+=36)t=p(t/35);return p(i+36*t/(t+38))}/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */function T(t){// Don't use UCS-2
var e,r,i,s,n,a,o,h,l,u,/** Cached calculation results */d,c=[],f=t.length,g=0,_=128,y=72;for(// Handle the basic code points: let `basic` be the number of input code
// points before the last delimiter, or `0` if there is none, then copy
// the first basic code points to the output.
(i=t.lastIndexOf("-"))<0&&(i=0),s=0;s<i;++s)t.charCodeAt(s)>=128&&m("not-basic"),c.push(t.charCodeAt(s));// Main decoding loop: start just after the last delimiter if any basic code
// points were copied; start at the beginning otherwise.
for(n=i>0?i+1:0;n<f;){// `index` is the index of the next character to be consumed.
// Decode a generalized variable-length integer into `delta`,
// which gets added to `i`. The overflow checking is easier
// if we increase `i` as we go, then subtract off its starting
// value at the end to obtain `delta`.
for(a=g,o=1,h=36;n>=f&&m("invalid-input"),((l=(e=t.charCodeAt(n++))-48<10?e-22:e-65<26?e-65:e-97<26?e-97:36)>=36||l>p((2147483647-g)/o))&&m("overflow"),g+=l*o,!(l<(u=h<=y?1:h>=y+26?26:h-y));h+=36)o>p(2147483647/(d=36-u))&&m("overflow"),o*=d;y=b(g-a,r=c.length+1,0==a),p(g/r)>2147483647-_&&m("overflow"),_+=p(g/r),g%=r,// Insert `n` at position `i` of the output
c.splice(g++,0,_)}return v(c)}/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */function E(t){var e,r,i,s,n,a,o,h,l,u,d,/** `inputLength` will hold the number of code points in `input`. */c,/** Cached calculation results */g,_,v,T=[];// Handle the basic code points
for(a=0,// Cache the length
c=// Convert the input in UCS-2 to Unicode
(t=y(t)).length,// Initialize the state
e=128,r=0,n=72;a<c;++a)(d=t[a])<128&&T.push(f(d));// Main encoding loop:
for(i=s=T.length,s&&T.push("-");i<c;){// All non-basic code points < n have been handled already. Find the next
// larger one:
for(o=2147483647,a=0;a<c;++a)(d=t[a])>=e&&d<o&&(o=d);for(o-e>p((2147483647-r)/// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
// but guard against overflow
(g=i+1))&&m("overflow"),r+=(o-e)*g,e=o,a=0;a<c;++a)if((d=t[a])<e&&++r>2147483647&&m("overflow"),d==e){// Represent delta as a generalized variable-length integer
for(h=r,l=36;!(h<(u=l<=n?1:l>=n+26?26:l-n));l+=36)v=h-u,_=36-u,T.push(f(x(u+v%_,0))),h=p(v/_);T.push(f(x(h,0))),n=b(r,g,i==s),r=0,++i}++r,++e}return T.join("")}/** Expose `punycode` */// Some AMD build optimizers, like r.js, check for specific condition patterns
// like the following:
if(/*--------------------------------------------------------------------------*//** Define the public API */a={/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */version:"1.4.1",/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */ucs2:{decode:y,encode:v},decode:T,encode:E,toASCII:/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */function(t){return _(t,function(t){return u.test(t)?"xn--"+E(t):t})},toUnicode:/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */function(t){return _(t,function(t){return l.test(t)?T(t.slice(4).toLowerCase()):t})}},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return a});else if(i&&s){if(t.exports==i)s.exports=a;else for(h in a)a.hasOwnProperty(h)&&(i[h]=a[h])}else r.punycode=a}(this)}),f("2rasJ",function(t,e){var r=p("jJyEy"),i=p("cfYIz"),s=p("i1Gbt");t.exports={formats:s,parse:i,stringify:r}}),f("jJyEy",function(t,e){var r=p("LlIML"),i=p("iBfJ5"),s=p("i1Gbt"),n=Object.prototype.hasOwnProperty,a={brackets:function(t){return t+"[]"},comma:"comma",indices:function(t,e){return t+"["+e+"]"},repeat:function(t){return t}},o=Array.isArray,h=Array.prototype.push,l=function(t,e){h.apply(t,o(e)?e:[e])},u=Date.prototype.toISOString,d=s.default,c={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:i.encode,encodeValuesOnly:!1,format:d,formatter:s.formatters[d],// deprecated
indices:!1,serializeDate:function(t){return u.call(t)},skipNulls:!1,strictNullHandling:!1},f={},m=function t(e,s,n,a,h,u,d,p,m,g,_,y,v,x,b,T){for(var E,A,w=e,S=T,R=0,I=!1;void 0!==(S=S.get(f))&&!I;){// Where object last appeared in the ref tree
var C=S.get(e);if(R+=1,void 0!==C){if(C===R)throw RangeError("Cyclic object value");// Break while
I=!0}void 0===S.get(f)&&(R=0)}if("function"==typeof p?w=p(s,w):w instanceof Date?w=_(w):"comma"===n&&o(w)&&(w=i.maybeMap(w,function(t){return t instanceof Date?_(t):t})),null===w){if(h)return d&&!x?d(s,c.encoder,b,"key",y):s;w=""}if("string"==typeof(E=w)||"number"==typeof E||"boolean"==typeof E||"symbol"==typeof E||"bigint"==typeof E||i.isBuffer(w))return d?[v(x?s:d(s,c.encoder,b,"key",y))+"="+v(d(w,c.encoder,b,"value",y))]:[v(s)+"="+v(String(w))];var M=[];if(void 0===w)return M;if("comma"===n&&o(w))x&&d&&(w=i.maybeMap(w,d)),A=[{value:w.length>0?w.join(",")||null:void 0}];else if(o(p))A=p;else{var P=Object.keys(w);A=m?P.sort(m):P}for(var D=a&&o(w)&&1===w.length?s+"[]":s,O=0;O<A.length;++O){var B=A[O],F="object"==typeof B&&void 0!==B.value?B.value:w[B];if(!u||null!==F){var N=o(w)?"function"==typeof n?n(D,B):D:D+(g?"."+B:"["+B+"]");T.set(e,R);var L=r();L.set(f,T),l(M,t(F,N,n,a,h,u,"comma"===n&&x&&o(w)?null:d,p,m,g,_,y,v,x,b,L))}}return M},g=function(t){if(!t)return c;if(null!==t.encoder&&void 0!==t.encoder&&"function"!=typeof t.encoder)throw TypeError("Encoder has to be a function.");var e=t.charset||c.charset;if(void 0!==t.charset&&"utf-8"!==t.charset&&"iso-8859-1"!==t.charset)throw TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=s.default;if(void 0!==t.format){if(!n.call(s.formatters,t.format))throw TypeError("Unknown format option provided.");r=t.format}var i=s.formatters[r],a=c.filter;return("function"==typeof t.filter||o(t.filter))&&(a=t.filter),{addQueryPrefix:"boolean"==typeof t.addQueryPrefix?t.addQueryPrefix:c.addQueryPrefix,allowDots:void 0===t.allowDots?c.allowDots:!!t.allowDots,charset:e,charsetSentinel:"boolean"==typeof t.charsetSentinel?t.charsetSentinel:c.charsetSentinel,delimiter:void 0===t.delimiter?c.delimiter:t.delimiter,encode:"boolean"==typeof t.encode?t.encode:c.encode,encoder:"function"==typeof t.encoder?t.encoder:c.encoder,encodeValuesOnly:"boolean"==typeof t.encodeValuesOnly?t.encodeValuesOnly:c.encodeValuesOnly,filter:a,format:r,formatter:i,serializeDate:"function"==typeof t.serializeDate?t.serializeDate:c.serializeDate,skipNulls:"boolean"==typeof t.skipNulls?t.skipNulls:c.skipNulls,sort:"function"==typeof t.sort?t.sort:null,strictNullHandling:"boolean"==typeof t.strictNullHandling?t.strictNullHandling:c.strictNullHandling}};t.exports=function(t,e){var i,s,n=t,h=g(e);"function"==typeof h.filter?n=(0,h.filter)("",n):o(h.filter)&&(i=h.filter);var u=[];if("object"!=typeof n||null===n)return"";s=e&&e.arrayFormat in a?e.arrayFormat:e&&"indices"in e?e.indices?"indices":"repeat":"indices";var d=a[s];if(e&&"commaRoundTrip"in e&&"boolean"!=typeof e.commaRoundTrip)throw TypeError("`commaRoundTrip` must be a boolean, or absent");var c="comma"===d&&e&&e.commaRoundTrip;i||(i=Object.keys(n)),h.sort&&i.sort(h.sort);for(var p=r(),f=0;f<i.length;++f){var _=i[f];h.skipNulls&&null===n[_]||l(u,m(n[_],_,d,c,h.strictNullHandling,h.skipNulls,h.encode?h.encoder:null,h.filter,h.sort,h.allowDots,h.serializeDate,h.format,h.formatter,h.encodeValuesOnly,h.charset,p))}var y=u.join(h.delimiter),v=!0===h.addQueryPrefix?"?":"";return h.charsetSentinel&&("iso-8859-1"===h.charset?v+="utf8=%26%2310003%3B&":v+="utf8=%E2%9C%93&"),y.length>0?v+y:""}}),f("LlIML",function(t,e){var r=p("1zENl"),i=p("hXu6F"),s=p("e7DLx"),n=r("%TypeError%"),a=r("%WeakMap%",!0),o=r("%Map%",!0),h=i("WeakMap.prototype.get",!0),l=i("WeakMap.prototype.set",!0),u=i("WeakMap.prototype.has",!0),d=i("Map.prototype.get",!0),c=i("Map.prototype.set",!0),f=i("Map.prototype.has",!0),m=function(t,e){for(var r,i=t;null!==(r=i.next);i=r)if(r.key===e)return i.next=r.next,r.next=t.next,t.next=r,r},g=function(t,e){var r=m(t,e);return r&&r.value},_=function(t,e,r){var i=m(t,e);i?i.value=r:t.next={key:e,next:t.next,value:r}};t.exports=function(){var t,e,r,i={assert:function(t){if(!i.has(t))throw new n("Side channel does not contain "+s(t))},get:function(i){if(a&&i&&("object"==typeof i||"function"==typeof i)){if(t)return h(t,i)}else if(o){if(e)return d(e,i)}else if(r)return g(r,i)},has:function(i){if(a&&i&&("object"==typeof i||"function"==typeof i)){if(t)return u(t,i)}else if(o){if(e)return f(e,i)}else if(r)return!!m(r,i);return!1},set:function(i,s){a&&i&&("object"==typeof i||"function"==typeof i)?(t||(t=new a),l(t,i,s)):o?(e||(e=new o),c(e,i,s)):(r||/*
					 * Initialize the linked list as an empty node, so that we don't have
					 * to special-case handling of the first node: we can always refer to
					 * it as (previous node).next, instead of something like (list).head
					 */(r={key:{},next:null}),_(r,i,s))}};return i}}),f("1zENl",function(t,e){var r=SyntaxError,i=Function,s=TypeError,n=function(t){try{return i('"use strict"; return ('+t+").constructor;")()}catch(t){}},a=Object.getOwnPropertyDescriptor;if(a)try{a({},"")}catch(t){a=null;// this is IE 8, which has a broken gOPD
}var o=function(){throw new s},h=a?function(){try{return(// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
arguments.callee,o)}catch(t){try{// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
return a(arguments,"callee").get}catch(t){return o}}}():o,l=p("24qIq")(),u=Object.getPrototypeOf||function(t){return t.__proto__},d={},c="undefined"==typeof Uint8Array?void 0:u(Uint8Array),f={"%AggregateError%":"undefined"==typeof AggregateError?void 0:AggregateError,"%Array%":Array,"%ArrayBuffer%":"undefined"==typeof ArrayBuffer?void 0:ArrayBuffer,"%ArrayIteratorPrototype%":l?u([][Symbol.iterator]()):void 0,"%AsyncFromSyncIteratorPrototype%":void 0,"%AsyncFunction%":d,"%AsyncGenerator%":d,"%AsyncGeneratorFunction%":d,"%AsyncIteratorPrototype%":d,"%Atomics%":"undefined"==typeof Atomics?void 0:Atomics,"%BigInt%":"undefined"==typeof BigInt?void 0:BigInt,"%Boolean%":Boolean,"%DataView%":"undefined"==typeof DataView?void 0:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":"undefined"==typeof Float32Array?void 0:Float32Array,"%Float64Array%":"undefined"==typeof Float64Array?void 0:Float64Array,"%FinalizationRegistry%":"undefined"==typeof FinalizationRegistry?void 0:FinalizationRegistry,"%Function%":i,"%GeneratorFunction%":d,"%Int8Array%":"undefined"==typeof Int8Array?void 0:Int8Array,"%Int16Array%":"undefined"==typeof Int16Array?void 0:Int16Array,"%Int32Array%":"undefined"==typeof Int32Array?void 0:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":l?u(u([][Symbol.iterator]())):void 0,"%JSON%":"object"==typeof JSON?JSON:void 0,"%Map%":"undefined"==typeof Map?void 0:Map,"%MapIteratorPrototype%":"undefined"!=typeof Map&&l?u(new Map()[Symbol.iterator]()):void 0,"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":"undefined"==typeof Promise?void 0:Promise,"%Proxy%":"undefined"==typeof Proxy?void 0:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":"undefined"==typeof Reflect?void 0:Reflect,"%RegExp%":RegExp,"%Set%":"undefined"==typeof Set?void 0:Set,"%SetIteratorPrototype%":"undefined"!=typeof Set&&l?u(new Set()[Symbol.iterator]()):void 0,"%SharedArrayBuffer%":"undefined"==typeof SharedArrayBuffer?void 0:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":l?u(""[Symbol.iterator]()):void 0,"%Symbol%":l?Symbol:void 0,"%SyntaxError%":r,"%ThrowTypeError%":h,"%TypedArray%":c,"%TypeError%":s,"%Uint8Array%":"undefined"==typeof Uint8Array?void 0:Uint8Array,"%Uint8ClampedArray%":"undefined"==typeof Uint8ClampedArray?void 0:Uint8ClampedArray,"%Uint16Array%":"undefined"==typeof Uint16Array?void 0:Uint16Array,"%Uint32Array%":"undefined"==typeof Uint32Array?void 0:Uint32Array,"%URIError%":URIError,"%WeakMap%":"undefined"==typeof WeakMap?void 0:WeakMap,"%WeakRef%":"undefined"==typeof WeakRef?void 0:WeakRef,"%WeakSet%":"undefined"==typeof WeakSet?void 0:WeakSet},m=function t(e){var r;if("%AsyncFunction%"===e)r=n("async function () {}");else if("%GeneratorFunction%"===e)r=n("function* () {}");else if("%AsyncGeneratorFunction%"===e)r=n("async function* () {}");else if("%AsyncGenerator%"===e){var i=t("%AsyncGeneratorFunction%");i&&(r=i.prototype)}else if("%AsyncIteratorPrototype%"===e){var s=t("%AsyncGenerator%");s&&(r=u(s.prototype))}return f[e]=r,r},g={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},_=p("gvair"),y=p("8aKn2"),v=_.call(Function.call,Array.prototype.concat),x=_.call(Function.apply,Array.prototype.splice),b=_.call(Function.call,String.prototype.replace),T=_.call(Function.call,String.prototype.slice),E=_.call(Function.call,RegExp.prototype.exec),A=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,w=/\\(\\)?/g,S=function(t){var e=T(t,0,1),i=T(t,-1);if("%"===e&&"%"!==i)throw new r("invalid intrinsic syntax, expected closing `%`");if("%"===i&&"%"!==e)throw new r("invalid intrinsic syntax, expected opening `%`");var s=[];return b(t,A,function(t,e,r,i){s[s.length]=r?b(i,w,"$1"):e||t}),s},R=function(t,e){var i,n=t;if(y(g,n)&&(n="%"+(i=g[n])[0]+"%"),y(f,n)){var a=f[n];if(a===d&&(a=m(n)),void 0===a&&!e)throw new s("intrinsic "+t+" exists, but is not available. Please file an issue!");return{alias:i,name:n,value:a}}throw new r("intrinsic "+t+" does not exist!")};t.exports=function(t,e){if("string"!=typeof t||0===t.length)throw new s("intrinsic name must be a non-empty string");if(arguments.length>1&&"boolean"!=typeof e)throw new s('"allowMissing" argument must be a boolean');if(null===E(/^%?[^%]*%?$/g,t))throw new r("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var i=S(t),n=i.length>0?i[0]:"",o=R("%"+n+"%",e),h=o.name,l=o.value,u=!1,d=o.alias;d&&(n=d[0],x(i,v([0,1],d)));for(var c=1,p=!0;c<i.length;c+=1){var m=i[c],g=T(m,0,1),_=T(m,-1);if(('"'===g||"'"===g||"`"===g||'"'===_||"'"===_||"`"===_)&&g!==_)throw new r("property names with quotes must have matching quotes");if("constructor"!==m&&p||(u=!0),n+="."+m,y(f,h="%"+n+"%"))l=f[h];else if(null!=l){if(!(m in l)){if(!e)throw new s("base intrinsic for "+t+" exists, but the property is not available.");return}if(a&&c+1>=i.length){var b=a(l,m);// By convention, when a data property is converted to an accessor
// property to emulate a data property that does not suffer from
// the override mistake, that accessor's getter is marked with
// an `originalValue` property. Here, when we detect this, we
// uphold the illusion by pretending to see that original data
// property, i.e., returning the value rather than the getter
// itself.
l=(p=!!b)&&"get"in b&&!("originalValue"in b.get)?b.get:l[m]}else p=y(l,m),l=l[m];p&&!u&&(f[h]=l)}}return l}}),f("24qIq",function(t,e){var r="undefined"!=typeof Symbol&&Symbol,i=p("7YWkK");t.exports=function(){return"function"==typeof r&&"function"==typeof Symbol&&"symbol"==typeof r("foo")&&"symbol"==typeof Symbol("bar")&&i()}}),f("7YWkK",function(t,e){/* eslint complexity: [2, 18], max-statements: [2, 33] */t.exports=function(){if("function"!=typeof Symbol||"function"!=typeof Object.getOwnPropertySymbols)return!1;if("symbol"==typeof Symbol.iterator)return!0;var t={},e=Symbol("test"),r=Object(e);if("string"==typeof e||"[object Symbol]"!==Object.prototype.toString.call(e)||"[object Symbol]"!==Object.prototype.toString.call(r))return!1;for(e in t[e]=42,t)return!1;// eslint-disable-line no-restricted-syntax, no-unreachable-loop
if("function"==typeof Object.keys&&0!==Object.keys(t).length||"function"==typeof Object.getOwnPropertyNames&&0!==Object.getOwnPropertyNames(t).length)return!1;var i=Object.getOwnPropertySymbols(t);if(1!==i.length||i[0]!==e||!Object.prototype.propertyIsEnumerable.call(t,e))return!1;if("function"==typeof Object.getOwnPropertyDescriptor){var s=Object.getOwnPropertyDescriptor(t,e);if(42!==s.value||!0!==s.enumerable)return!1}return!0}}),f("gvair",function(t,e){var r=p("kAGnA");t.exports=Function.prototype.bind||r}),f("kAGnA",function(t,e){var r=Object.prototype.toString,i=Math.max,s=function(t,e){for(var r=[],i=0;i<t.length;i+=1)r[i]=t[i];for(var s=0;s<e.length;s+=1)r[s+t.length]=e[s];return r},n=function(t,e){for(var r=[],i=e||0,s=0;i<t.length;i+=1,s+=1)r[s]=t[i];return r},a=function(t,e){for(var r="",i=0;i<t.length;i+=1)r+=t[i],i+1<t.length&&(r+=e);return r};t.exports=function(t){var e,o=this;if("function"!=typeof o||"[object Function]"!==r.apply(o))throw TypeError("Function.prototype.bind called on incompatible "+o);for(var h=n(arguments,1),l=i(0,o.length-h.length),u=[],d=0;d<l;d++)u[d]="$"+d;if(e=Function("binder","return function ("+a(u,",")+"){ return binder.apply(this,arguments); }")(function(){if(this instanceof e){var r=o.apply(this,s(h,arguments));return Object(r)===r?r:this}return o.apply(t,s(h,arguments))}),o.prototype){var c=function(){};c.prototype=o.prototype,e.prototype=new c,c.prototype=null}return e}}),f("8aKn2",function(t,e){var r=p("gvair");t.exports=r.call(Function.call,Object.prototype.hasOwnProperty)}),f("hXu6F",function(t,e){var r=p("1zENl"),i=p("cOB0F"),s=i(r("String.prototype.indexOf"));t.exports=function(t,e){var n=r(t,!!e);return"function"==typeof n&&s(t,".prototype.")>-1?i(n):n}}),f("cOB0F",function(t,e){var r=p("gvair"),i=p("1zENl"),s=i("%Function.prototype.apply%"),n=i("%Function.prototype.call%"),a=i("%Reflect.apply%",!0)||r.call(n,s),o=i("%Object.getOwnPropertyDescriptor%",!0),h=i("%Object.defineProperty%",!0),l=i("%Math.max%");if(h)try{h({},"a",{value:1})}catch(t){// IE 8 has a broken defineProperty
h=null}t.exports=function(t){var e=a(r,n,arguments);return o&&h&&o(e,"length").configurable&&h(e,"length",{value:1+l(0,t.length-(arguments.length-1))}),e};var u=function(){return a(r,s,arguments)};h?h(t.exports,"apply",{value:u}):t.exports.apply=u}),f("e7DLx",function(t,e){var r="function"==typeof Map&&Map.prototype,i=Object.getOwnPropertyDescriptor&&r?Object.getOwnPropertyDescriptor(Map.prototype,"size"):null,s=r&&i&&"function"==typeof i.get?i.get:null,n=r&&Map.prototype.forEach,a="function"==typeof Set&&Set.prototype,o=Object.getOwnPropertyDescriptor&&a?Object.getOwnPropertyDescriptor(Set.prototype,"size"):null,h=a&&o&&"function"==typeof o.get?o.get:null,l=a&&Set.prototype.forEach,u="function"==typeof WeakMap&&WeakMap.prototype?WeakMap.prototype.has:null,d="function"==typeof WeakSet&&WeakSet.prototype?WeakSet.prototype.has:null,c="function"==typeof WeakRef&&WeakRef.prototype?WeakRef.prototype.deref:null,f=Boolean.prototype.valueOf,m=Object.prototype.toString,g=Function.prototype.toString,_=String.prototype.match,y=String.prototype.slice,v=String.prototype.replace,x=String.prototype.toUpperCase,b=String.prototype.toLowerCase,T=RegExp.prototype.test,E=Array.prototype.concat,A=Array.prototype.join,w=Array.prototype.slice,S=Math.floor,R="function"==typeof BigInt?BigInt.prototype.valueOf:null,I=Object.getOwnPropertySymbols,C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?Symbol.prototype.toString:null,M="function"==typeof Symbol&&"object"==typeof Symbol.iterator,P="function"==typeof Symbol&&Symbol.toStringTag&&(typeof Symbol.toStringTag===M?"object":"symbol")?Symbol.toStringTag:null,D=Object.prototype.propertyIsEnumerable,O=("function"==typeof Reflect?Reflect.getPrototypeOf:Object.getPrototypeOf)||([].__proto__===Array.prototype// eslint-disable-line no-proto
?function(t){return t.__proto__;// eslint-disable-line no-proto
}:null);function B(t,e){if(t===1/0||t===-1/0||t!=t||t&&t>-1e3&&t<1e3||T.call(/e/,e))return e;var r=/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;if("number"==typeof t){var i=t<0?-S(-t):S(t);// trunc(num)
if(i!==t){var s=String(i),n=y.call(e,s.length+1);return v.call(s,r,"$&_")+"."+v.call(v.call(n,/([0-9]{3})/g,"$&_"),/_$/,"")}}return v.call(e,r,"$&_")}var F=p("kjyEk"),N=F.custom,L=H(N)?N:null;function k(t,e,r){var i="double"===(r.quoteStyle||e)?'"':"'";return i+t+i}function U(t){return"[object Array]"===V(t)&&(!P||!("object"==typeof t&&P in t))}function G(t){return"[object RegExp]"===V(t)&&(!P||!("object"==typeof t&&P in t))}// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
function H(t){if(M)return t&&"object"==typeof t&&t instanceof Symbol;if("symbol"==typeof t)return!0;if(!t||"object"!=typeof t||!C)return!1;try{return C.call(t),!0}catch(t){}return!1}t.exports=function t(e,r,i,a){var o=r||{};if(z(o,"quoteStyle")&&"single"!==o.quoteStyle&&"double"!==o.quoteStyle)throw TypeError('option "quoteStyle" must be "single" or "double"');if(z(o,"maxStringLength")&&("number"==typeof o.maxStringLength?o.maxStringLength<0&&o.maxStringLength!==1/0:null!==o.maxStringLength))throw TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');var p=!z(o,"customInspect")||o.customInspect;if("boolean"!=typeof p&&"symbol"!==p)throw TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");if(z(o,"indent")&&null!==o.indent&&"	"!==o.indent&&!(parseInt(o.indent,10)===o.indent&&o.indent>0))throw TypeError('option "indent" must be "\\t", an integer > 0, or `null`');if(z(o,"numericSeparator")&&"boolean"!=typeof o.numericSeparator)throw TypeError('option "numericSeparator", if provided, must be `true` or `false`');var m=o.numericSeparator;if(void 0===e)return"undefined";if(null===e)return"null";if("boolean"==typeof e)return e?"true":"false";if("string"==typeof e)return function t(e,r){if(e.length>r.maxStringLength){var i=e.length-r.maxStringLength;return t(y.call(e,0,r.maxStringLength),r)+"... "+i+" more character"+(i>1?"s":"")}return k(v.call(v.call(e,/(['\\])/g,"\\$1"),/[\x00-\x1f]/g,X),"single",r)}(e,o);if("number"==typeof e){if(0===e)return 1/0/e>0?"0":"-0";var x=String(e);return m?B(e,x):x}if("bigint"==typeof e){var T=String(e)+"n";return m?B(e,T):T}var S=void 0===o.depth?5:o.depth;if(void 0===i&&(i=0),i>=S&&S>0&&"object"==typeof e)return U(e)?"[Array]":"[Object]";var I=function(t,e){var r;if("	"===t.indent)r="	";else{if("number"!=typeof t.indent||!(t.indent>0))return null;r=A.call(Array(t.indent+1)," ")}return{base:r,prev:A.call(Array(e+1),r)}}(o,i);if(void 0===a)a=[];else if(W(a,e)>=0)return"[Circular]";function N(e,r,s){if(r&&(a=w.call(a)).push(r),s){var n={depth:o.depth};return z(o,"quoteStyle")&&(n.quoteStyle=o.quoteStyle),t(e,n,i+1,a)}return t(e,o,i+1,a)}if("function"==typeof e&&!G(e)){var j=function(t){if(t.name)return t.name;var e=_.call(g.call(t),/^function\s*([\w$]+)/);return e?e[1]:null}(e),Q=Z(e,N);return"[Function"+(j?": "+j:" (anonymous)")+"]"+(Q.length>0?" { "+A.call(Q,", ")+" }":"")}if(H(e)){var J=M?v.call(String(e),/^(Symbol\(.*\))_[^)]*$/,"$1"):C.call(e);return"object"!=typeof e||M?J:$(J)}if(e&&"object"==typeof e&&("undefined"!=typeof HTMLElement&&e instanceof HTMLElement||"string"==typeof e.nodeName&&"function"==typeof e.getAttribute)){for(var tt,te="<"+b.call(String(e.nodeName)),tr=e.attributes||[],ti=0;ti<tr.length;ti++)te+=" "+tr[ti].name+"="+k((tt=tr[ti].value,v.call(String(tt),/"/g,"&quot;")),"double",o);return te+=">",e.childNodes&&e.childNodes.length&&(te+="..."),te+="</"+b.call(String(e.nodeName))+">"}if(U(e)){if(0===e.length)return"[]";var ts=Z(e,N);return I&&!function(t){for(var e=0;e<t.length;e++)if(W(t[e],"\n")>=0)return!1;return!0}(ts)?"["+K(ts,I)+"]":"[ "+A.call(ts,", ")+" ]"}if("[object Error]"===V(e)&&(!P||!("object"==typeof e&&P in e))){var tn=Z(e,N);return"cause"in Error.prototype||!("cause"in e)||D.call(e,"cause")?0===tn.length?"["+String(e)+"]":"{ ["+String(e)+"] "+A.call(tn,", ")+" }":"{ ["+String(e)+"] "+A.call(E.call("[cause]: "+N(e.cause),tn),", ")+" }"}if("object"==typeof e&&p){if(L&&"function"==typeof e[L]&&F)return F(e,{depth:S-i});if("symbol"!==p&&"function"==typeof e.inspect)return e.inspect()}if(function(t){if(!s||!t||"object"!=typeof t)return!1;try{s.call(t);try{h.call(t)}catch(t){return!0}return t instanceof Map;// core-js workaround, pre-v2.5.0
}catch(t){}return!1}(e)){var ta=[];return n.call(e,function(t,r){ta.push(N(r,e,!0)+" => "+N(t,e))}),q("Map",s.call(e),ta,I)}if(function(t){if(!h||!t||"object"!=typeof t)return!1;try{h.call(t);try{s.call(t)}catch(t){return!0}return t instanceof Set;// core-js workaround, pre-v2.5.0
}catch(t){}return!1}(e)){var to=[];return l.call(e,function(t){to.push(N(t,e))}),q("Set",h.call(e),to,I)}if(function(t){if(!u||!t||"object"!=typeof t)return!1;try{u.call(t,u);try{d.call(t,d)}catch(t){return!0}return t instanceof WeakMap;// core-js workaround, pre-v2.5.0
}catch(t){}return!1}(e))return Y("WeakMap");if(function(t){if(!d||!t||"object"!=typeof t)return!1;try{d.call(t,d);try{u.call(t,u)}catch(t){return!0}return t instanceof WeakSet;// core-js workaround, pre-v2.5.0
}catch(t){}return!1}(e))return Y("WeakSet");if(function(t){if(!c||!t||"object"!=typeof t)return!1;try{return c.call(t),!0}catch(t){}return!1}(e))return Y("WeakRef");if("[object Number]"===V(e)&&(!P||!("object"==typeof e&&P in e)))return $(N(Number(e)));if(function(t){if(!t||"object"!=typeof t||!R)return!1;try{return R.call(t),!0}catch(t){}return!1}(e))return $(N(R.call(e)));if("[object Boolean]"===V(e)&&(!P||!("object"==typeof e&&P in e)))return $(f.call(e));if("[object String]"===V(e)&&(!P||!("object"==typeof e&&P in e)))return $(N(String(e)));if(!("[object Date]"===V(e)&&(!P||!("object"==typeof e&&P in e)))&&!G(e)){var th=Z(e,N),tl=O?O(e)===Object.prototype:e instanceof Object||e.constructor===Object,tu=e instanceof Object?"":"null prototype",td=!tl&&P&&Object(e)===e&&P in e?y.call(V(e),8,-1):tu?"Object":"",tc=(tl||"function"!=typeof e.constructor?"":e.constructor.name?e.constructor.name+" ":"")+(td||tu?"["+A.call(E.call([],td||[],tu||[]),": ")+"] ":"");return 0===th.length?tc+"{}":I?tc+"{"+K(th,I)+"}":tc+"{ "+A.call(th,", ")+" }"}return String(e)};var j=Object.prototype.hasOwnProperty||function(t){return t in this};function z(t,e){return j.call(t,e)}function V(t){return m.call(t)}function W(t,e){if(t.indexOf)return t.indexOf(e);for(var r=0,i=t.length;r<i;r++)if(t[r]===e)return r;return -1}function X(t){var e=t.charCodeAt(0),r={8:"b",9:"t",10:"n",12:"f",13:"r"}[e];return r?"\\"+r:"\\x"+(e<16?"0":"")+x.call(e.toString(16))}function $(t){return"Object("+t+")"}function Y(t){return t+" { ? }"}function q(t,e,r,i){return t+" ("+e+") {"+(i?K(r,i):A.call(r,", "))+"}"}function K(t,e){if(0===t.length)return"";var r="\n"+e.prev+e.base;return r+A.call(t,","+r)+"\n"+e.prev}function Z(t,e){var r,i=U(t),s=[];if(i){s.length=t.length;for(var n=0;n<t.length;n++)s[n]=z(t,n)?e(t[n],t):""}var a="function"==typeof I?I(t):[];if(M){r={};for(var o=0;o<a.length;o++)r["$"+a[o]]=a[o]}for(var h in t)if(z(t,h)&&(!i||String(Number(h))!==h||!(h<t.length))){// eslint-disable-line no-restricted-syntax, no-continue
if(M&&r["$"+h]instanceof Symbol)continue;// eslint-disable-line no-restricted-syntax, no-continue
T.call(/[^\w$]/,h)?s.push(e(h,t)+": "+e(t[h],t)):s.push(h+": "+e(t[h],t))}if("function"==typeof I)for(var l=0;l<a.length;l++)D.call(t,a[l])&&s.push("["+e(a[l])+"]: "+e(t[a[l]],t));return s}}),f("kjyEk",function(t,e){}),f("iBfJ5",function(t,e){var r=p("i1Gbt"),i=Object.prototype.hasOwnProperty,s=Array.isArray,n=function(){for(var t=[],e=0;e<256;++e)t.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return t}(),a=function(t){for(;t.length>1;){var e=t.pop(),r=e.obj[e.prop];if(s(r)){for(var i=[],n=0;n<r.length;++n)void 0!==r[n]&&i.push(r[n]);e.obj[e.prop]=i}}},o=function(t,e){for(var r=e&&e.plainObjects?Object.create(null):{},i=0;i<t.length;++i)void 0!==t[i]&&(r[i]=t[i]);return r};t.exports={arrayToObject:o,assign:function(t,e){return Object.keys(e).reduce(function(t,r){return t[r]=e[r],t},t)},combine:function(t,e){return[].concat(t,e)},compact:function(t){for(var e=[{obj:{o:t},prop:"o"}],r=[],i=0;i<e.length;++i)for(var s=e[i],n=s.obj[s.prop],o=Object.keys(n),h=0;h<o.length;++h){var l=o[h],u=n[l];"object"==typeof u&&null!==u&&-1===r.indexOf(u)&&(e.push({obj:n,prop:l}),r.push(u))}return a(e),t},decode:function(t,e,r){var i=t.replace(/\+/g," ");if("iso-8859-1"===r)return i.replace(/%[0-9a-f]{2}/gi,unescape);// utf-8
try{return decodeURIComponent(i)}catch(t){return i}},encode:function(t,e,i,s,a){// This code was originally written by Brian White (mscdex) for the io.js core querystring library.
// It has been adapted here for stricter adherence to RFC 3986
if(0===t.length)return t;var o=t;if("symbol"==typeof t?o=Symbol.prototype.toString.call(t):"string"!=typeof t&&(o=String(t)),"iso-8859-1"===i)return escape(o).replace(/%u[0-9a-f]{4}/gi,function(t){return"%26%23"+parseInt(t.slice(2),16)+"%3B"});for(var h="",l=0;l<o.length;++l){var u=o.charCodeAt(l);if(45// -
===u||46// .
===u||95// _
===u||126// ~
===u||u>=48&&u<=57// 0-9
||u>=65&&u<=90// a-z
||u>=97&&u<=122// A-Z
||a===r.RFC1738&&(40===u||41// ( )
===u)){h+=o.charAt(l);continue}if(u<128){h+=n[u];continue}if(u<2048){h+=n[192|u>>6]+n[128|63&u];continue}if(u<55296||u>=57344){h+=n[224|u>>12]+n[128|u>>6&63]+n[128|63&u];continue}l+=1,/* eslint operator-linebreak: [2, "before"] */h+=n[240|(u=65536+((1023&u)<<10|1023&o.charCodeAt(l)))>>18]+n[128|u>>12&63]+n[128|u>>6&63]+n[128|63&u]}return h},isBuffer:function(t){return!!t&&"object"==typeof t&&!!(t.constructor&&t.constructor.isBuffer&&t.constructor.isBuffer(t))},isRegExp:function(t){return"[object RegExp]"===Object.prototype.toString.call(t)},maybeMap:function(t,e){if(s(t)){for(var r=[],i=0;i<t.length;i+=1)r.push(e(t[i]));return r}return e(t)},merge:function t(e,r,n){/* eslint no-param-reassign: 0 */if(!r)return e;if("object"!=typeof r){if(s(e))e.push(r);else{if(!e||"object"!=typeof e)return[e,r];(n&&(n.plainObjects||n.allowPrototypes)||!i.call(Object.prototype,r))&&(e[r]=!0)}return e}if(!e||"object"!=typeof e)return[e].concat(r);var a=e;return(s(e)&&!s(r)&&(a=o(e,n)),s(e)&&s(r))?(r.forEach(function(r,s){if(i.call(e,s)){var a=e[s];a&&"object"==typeof a&&r&&"object"==typeof r?e[s]=t(a,r,n):e.push(r)}else e[s]=r}),e):Object.keys(r).reduce(function(e,s){var a=r[s];return i.call(e,s)?e[s]=t(e[s],a,n):e[s]=a,e},a)}}}),f("i1Gbt",function(t,e){var r=String.prototype.replace,i=/%20/g,s={RFC1738:"RFC1738",RFC3986:"RFC3986"};t.exports={default:s.RFC3986,formatters:{RFC1738:function(t){return r.call(t,i,"+")},RFC3986:function(t){return String(t)}},RFC1738:s.RFC1738,RFC3986:s.RFC3986}}),f("cfYIz",function(t,e){var r=p("iBfJ5"),i=Object.prototype.hasOwnProperty,s=Array.isArray,n={allowDots:!1,allowPrototypes:!1,allowSparse:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:r.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},a=function(t,e){return t&&"string"==typeof t&&e.comma&&t.indexOf(",")>-1?t.split(","):t},o=function(t,e){var o={__proto__:null},h=e.ignoreQueryPrefix?t.replace(/^\?/,""):t,l=e.parameterLimit===1/0?void 0:e.parameterLimit,u=h.split(e.delimiter,l),d=-1,c=e.charset;if(e.charsetSentinel)for(p=0;p<u.length;++p)0===u[p].indexOf("utf8=")&&("utf8=%E2%9C%93"===u[p]?c="utf-8":"utf8=%26%2310003%3B"===u[p]&&(c="iso-8859-1"),d=p,p=u.length);for(p=0;p<u.length;++p)if(p!==d){var p,f,m,g=u[p],_=g.indexOf("]="),y=-1===_?g.indexOf("="):_+1;-1===y?(f=e.decoder(g,n.decoder,c,"key"),m=e.strictNullHandling?null:""):(f=e.decoder(g.slice(0,y),n.decoder,c,"key"),m=r.maybeMap(a(g.slice(y+1),e),function(t){return e.decoder(t,n.decoder,c,"value")})),m&&e.interpretNumericEntities&&"iso-8859-1"===c&&(m=m.replace(/&#(\d+);/g,function(t,e){return String.fromCharCode(parseInt(e,10))})),g.indexOf("[]=")>-1&&(m=s(m)?[m]:m),i.call(o,f)?o[f]=r.combine(o[f],m):o[f]=m}return o},h=function(t,e,r,i){for(var s=i?e:a(e,r),n=t.length-1;n>=0;--n){var o,h=t[n];if("[]"===h&&r.parseArrays)o=[].concat(s);else{o=r.plainObjects?Object.create(null):{};var l="["===h.charAt(0)&&"]"===h.charAt(h.length-1)?h.slice(1,-1):h,u=parseInt(l,10);r.parseArrays||""!==l?!isNaN(u)&&h!==l&&String(u)===l&&u>=0&&r.parseArrays&&u<=r.arrayLimit?(o=[])[u]=s:"__proto__"!==l&&(o[l]=s):o={0:s}}s=o}return s},l=function(t,e,r,s){if(t){// Transform dot notation to bracket notation
var n=r.allowDots?t.replace(/\.([^.[]+)/g,"[$1]"):t,a=/(\[[^[\]]*])/g,o=r.depth>0&&/(\[[^[\]]*])/.exec(n),l=o?n.slice(0,o.index):n,u=[];if(l){// If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
if(!r.plainObjects&&i.call(Object.prototype,l)&&!r.allowPrototypes)return;u.push(l)}for(// Loop through children appending to the array until we hit depth
var d=0;r.depth>0&&null!==(o=a.exec(n))&&d<r.depth;){if(d+=1,!r.plainObjects&&i.call(Object.prototype,o[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(o[1])}return o&&u.push("["+n.slice(o.index)+"]"),h(u,e,r,s)}},u=function(t){if(!t)return n;if(null!==t.decoder&&void 0!==t.decoder&&"function"!=typeof t.decoder)throw TypeError("Decoder has to be a function.");if(void 0!==t.charset&&"utf-8"!==t.charset&&"iso-8859-1"!==t.charset)throw TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var e=void 0===t.charset?n.charset:t.charset;return{allowDots:void 0===t.allowDots?n.allowDots:!!t.allowDots,allowPrototypes:"boolean"==typeof t.allowPrototypes?t.allowPrototypes:n.allowPrototypes,allowSparse:"boolean"==typeof t.allowSparse?t.allowSparse:n.allowSparse,arrayLimit:"number"==typeof t.arrayLimit?t.arrayLimit:n.arrayLimit,charset:e,charsetSentinel:"boolean"==typeof t.charsetSentinel?t.charsetSentinel:n.charsetSentinel,comma:"boolean"==typeof t.comma?t.comma:n.comma,decoder:"function"==typeof t.decoder?t.decoder:n.decoder,delimiter:"string"==typeof t.delimiter||r.isRegExp(t.delimiter)?t.delimiter:n.delimiter,// eslint-disable-next-line no-implicit-coercion, no-extra-parens
depth:"number"==typeof t.depth||!1===t.depth?+t.depth:n.depth,ignoreQueryPrefix:!0===t.ignoreQueryPrefix,interpretNumericEntities:"boolean"==typeof t.interpretNumericEntities?t.interpretNumericEntities:n.interpretNumericEntities,parameterLimit:"number"==typeof t.parameterLimit?t.parameterLimit:n.parameterLimit,parseArrays:!1!==t.parseArrays,plainObjects:"boolean"==typeof t.plainObjects?t.plainObjects:n.plainObjects,strictNullHandling:"boolean"==typeof t.strictNullHandling?t.strictNullHandling:n.strictNullHandling}};t.exports=function(t,e){var i=u(e);if(""===t||null==t)return i.plainObjects?Object.create(null):{};for(var s="string"==typeof t?o(t,i):t,n=i.plainObjects?Object.create(null):{},a=Object.keys(s),h=0;h<a.length;++h){var d=a[h],c=l(d,s[d],i,"string"==typeof t);n=r.merge(n,c,i)}return!0===i.allowSparse?n:r.compact(n)}}),f("2Tywo",function(t,e){function r(t){if(void 0===t)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function i(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}h(t.exports,"_config",()=>P),h(t.exports,"_isString",()=>U),h(t.exports,"_isUndefined",()=>j),h(t.exports,"_numExp",()=>K),h(t.exports,"_numWithUnitExp",()=>Z),h(t.exports,"_relExp",()=>J),h(t.exports,"gsap",()=>rA),h(t.exports,"_missingPlugin",()=>tn),h(t.exports,"_plugins",()=>tm),h(t.exports,"GSCache",()=>eH),h(t.exports,"_getCache",()=>tb),h(t.exports,"_getProperty",()=>tT),h(t.exports,"_forEachName",()=>tE),h(t.exports,"_round",()=>tA),h(t.exports,"_parseRelative",()=>tS),h(t.exports,"_ticker",()=>eS),h(t.exports,"getUnit",()=>et),h(t.exports,"_replaceRandom",()=>ed),h(t.exports,"_getSetter",()=>re),h(t.exports,"PropTween",()=>ru),h(t.exports,"_colorExp",()=>eE),h(t.exports,"_colorStringFilter",()=>ew),h(t.exports,"_renderComplexString",()=>rs),h(t.exports,"_checkPlugin",()=>eQ),h(t.exports,"_sortPropTweensByPriority",()=>rl);/*!
 * GSAP 3.12.2
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*//* eslint-disable */var s,n,a,o,l,u,d,c,p,f,m,g,_,y,v,x,b,T,E,A,w,S,R,I,C,/*
 * --------------------------------------------------------------------------------------
 * TICKER
 * --------------------------------------------------------------------------------------
 */M,P={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},D={duration:.5,overwrite:!1,delay:0},O=2*Math.PI,B=O/4,F=0,N=Math.sqrt,L=Math.cos,k=Math.sin,U=function(t){return"string"==typeof t},G=function(t){return"function"==typeof t},H=function(t){return"number"==typeof t},j=function(t){return void 0===t},z=function(t){return"object"==typeof t},V=function(t){return!1!==t},W=function(){return"undefined"!=typeof window},X=function(t){return G(t)||U(t)},$="function"==typeof ArrayBuffer&&ArrayBuffer.isView||function(){},Y=Array.isArray,q=/(?:-?\.?\d|\.)+/gi,K=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Z=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Q=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,J=/[+-]=-?[.\d]+/,tt=/[^,'"\[\]\s]+/gi,te=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,tr={},ti={},ts=function(t){return(ti=tO(t,tr))&&rA},tn=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},ta=function(t,e){return!e&&console.warn(t)},to=function(t,e){return t&&(tr[t]=e)&&ti&&(ti[t]=e)||tr},th=function(){return 0},tl={suppressEvents:!0,isStart:!0,kill:!1},tu={suppressEvents:!0,kill:!1},td={suppressEvents:!0},tc={},tp=[],tf={},tm={},tg={},t_=30,ty=[],tv="",tx=function(t){var e,r,i=t[0];if(z(i)||G(i)||(t=[t]),!(e=(i._gsap||{}).harness)){for(// find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
r=ty.length;r--&&!ty[r].targetTest(i););e=ty[r]}for(r=t.length;r--;)t[r]&&(t[r]._gsap||(t[r]._gsap=new eH(t[r],e)))||t.splice(r,1);return t},tb=function(t){return t._gsap||tx(ei(t))[0]._gsap},tT=function(t,e,r){return(r=t[e])&&G(r)?t[e]():j(r)&&t.getAttribute&&t.getAttribute(e)||r},tE=function(t,e){return(t=t.split(",")).forEach(e)||t},tA=function(t){return Math.round(1e5*t)/1e5||0},tw=function(t){return Math.round(1e7*t)/1e7||0},tS=function(t,e){var r=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),"+"===r?t+i:"-"===r?t-i:"*"===r?t*i:t/i},tR=function(t,e){for(//searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
var r=e.length,i=0;0>t.indexOf(e[i])&&++i<r;);return i<r},tI=function(){var t,e,r=tp.length,i=tp.slice(0);for(t=0,tf={},tp.length=0;t<r;t++)(e=i[t])&&e._lazy&&(e.render(e._lazy[0],e._lazy[1],!0)._lazy=0)},tC=function(t,e,r,i){tp.length&&!b&&tI(),t.render(e,r,i||b&&e<0&&(t._initted||t._startAt)),tp.length&&!b&&tI()},tM=function(t){var e=parseFloat(t);return(e||0===e)&&(t+"").match(tt).length<2?e:U(t)?t.trim():t},tP=function(t){return t},tD=function(t,e){for(var r in e)r in t||(t[r]=e[r]);return t},tO=function(t,e){for(var r in e)t[r]=e[r];return t},tB=function t(e,r){for(var i in r)"__proto__"!==i&&"constructor"!==i&&"prototype"!==i&&(e[i]=z(r[i])?t(e[i]||(e[i]={}),r[i]):r[i]);return e},tF=function(t,e){var r,i={};for(r in t)r in e||(i[r]=t[r]);return i},tN=function(t){var e,r=t.parent||E,i=t.keyframes?(e=Y(t.keyframes),function(t,r){for(var i in r)i in t||"duration"===i&&e||"ease"===i||(t[i]=r[i])}):tD;if(V(t.inherit))for(;r;)i(t,r.vars.defaults),r=r.parent||r._dp;return t},tL=function(t,e){for(var r=t.length,i=r===e.length;i&&r--&&t[r]===e[r];);return r<0},tk=function(t,e,r,i,s){void 0===r&&(r="_first"),void 0===i&&(i="_last");var n,a=t[i];if(s)for(n=e[s];a&&a[s]>n;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[r],t[r]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},tU=function(t,e,r,i){void 0===r&&(r="_first"),void 0===i&&(i="_last");var s=e._prev,n=e._next;s?s._next=n:t[r]===e&&(t[r]=n),n?n._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},tG=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},tH=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(// performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
var r=t;r;)r._dirty=1,r=r.parent;return t},tj=function(t){for(var e=t.parent;e&&e.parent;)//sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
e._dirty=1,e.totalDuration(),e=e.parent;return t},tz=function(t,e,r,i){return t._startAt&&(b?t._startAt.revert(tu):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},tV=function(t){return t._repeat?tW(t._tTime,t=t.duration()+t._rDelay)*t:0},tW=function(t,e){var r=Math.floor(t/=e);return t&&r===t?r-1:r},tX=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},t$=function(t){return t._end=tw(t._start+(t._tDur/Math.abs(t._ts||t._rts||1e-8)||0))},tY=function(t,e){// adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
var r=t._dp;return r&&r.smoothChildTiming&&t._ts&&(t._start=tw(r._time-(t._ts>0?e/t._ts:-(((t._dirty?t.totalDuration():t._tDur)-e)/t._ts))),t$(t),r._dirty||tH(r,t)),t},/*
_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
	let cycleDuration = duration + repeatDelay,
		time = _round(clampedTotalTime % cycleDuration);
	if (time > duration) {
		time = duration;
	}
	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
},
*/tq=function(t,e){var r;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(// in case, for example, the _start is moved on a tween that has already rendered, or if it's being inserted into a timeline BEFORE where the playhead is currently. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning. Special case: if it's a timeline (has .add() method) and no duration, we can skip rendering because the user may be populating it AFTER adding it to a parent timeline (unconventional, but possible, and we wouldn't want it to get removed if the parent's autoRemoveChildren is true).
r=tX(t.rawTime(),e),(!e._dur||t9(0,e.totalDuration(),r)-e._tTime>1e-8)&&e.render(r,!0)),tH(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){//in case any of the ancestors had completed but should now be enabled...
if(t._dur<t.duration())for(r=t;r._dp;)r.rawTime()>=0&&r.totalTime(r._tTime),r=r._dp;t._zTime=-.00000001;// helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
}},tK=function(t,e,r,i){return e.parent&&tG(e),e._start=tw((H(r)?r:r||t!==E?t6(t,r,e):t._time)+e._delay),e._end=tw(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),tk(t,e,"_first","_last",t._sort?"_start":0),t0(e)||(t._recent=e),i||tq(t,e),t._ts<0&&tY(t,t._tTime),t},tZ=function(t,e){return(tr.ScrollTrigger||tn("scrollTrigger",e))&&tr.ScrollTrigger.create(e,t)},tQ=function(t,e,r,i,s){return(eJ(t,e,s),t._initted)?!r&&t._pt&&!b&&(t._dur&&!1!==t.vars.lazy||!t._dur&&t.vars.lazy)&&I!==eS.frame?(tp.push(t),t._lazy=[s,i],1):void 0:1},tJ=function t(e){var r=e.parent;return r&&r._ts&&r._initted&&!r._lock&&(0>r.rawTime()||t(r))},t0=function(t){var e=t.data;return"isFromStart"===e||"isStart"===e},t1=function(t,e,r,i){var s,n,a,o=t.ratio,h=e<0||!e&&(!t._start&&tJ(t)&&!(!t._initted&&t0(t))||(t._ts<0||t._dp._ts<0)&&!t0(t))?0:1,l=t._rDelay,u=0;if(l&&t._repeat&&(n=tW(// in case there's a zero-duration tween that has a repeat with a repeatDelay
u=t9(0,t._tDur,e),l),t._yoyo&&1&n&&(h=1-h),n!==tW(t._tTime,l)&&(// if iteration changed
o=1-h,t.vars.repeatRefresh&&t._initted&&t.invalidate())),h!==o||b||i||1e-8===t._zTime||!e&&t._zTime){if(!t._initted&&tQ(t,e,i,r,u))return;for(a=t._zTime,t._zTime=e||(r?1e-8:0),r||(r=e&&!a),t.ratio=h,t._from&&(h=1-h),t._time=0,t._tTime=u,s=t._pt;s;)s.r(h,s.d),s=s._next;e<0&&tz(t,e,r,!0),t._onUpdate&&!r&&ef(t,"onUpdate"),u&&t._repeat&&!r&&t.parent&&ef(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===h&&(h&&tG(t,1),r||b||(ef(t,h?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},t2=function(t,e,r){var i;if(r>e)for(i=t._first;i&&i._start<=r;){if("isPause"===i.data&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=r;){if("isPause"===i.data&&i._start<e)return i;i=i._prev}},t3=function(t,e,r,i){var s=t._repeat,n=tw(e)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=n/t._dur),t._dur=n,t._tDur=s?s<0?1e10:tw(n*(s+1)+t._rDelay*s):n,a>0&&!i&&tY(t,t._tTime=t._tDur*a),t.parent&&t$(t),r||tH(t.parent,t),t},t4=function(t){return t instanceof ej?tH(t):t3(t,t._dur)},t5={_start:0,endTime:th,totalDuration:th},t6=function t(e,r,i){var s,n,a,o=e.labels,h=e._recent||t5,l=e.duration()>=1e8?h.endTime(!1):e._dur;return U(r)&&(isNaN(r)||r in o)?(//if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
n=r.charAt(0),a="%"===r.substr(-1),s=r.indexOf("="),"<"===n||">"===n)?(s>=0&&(r=r.replace(/=/,"")),("<"===n?h._start:h.endTime(h._repeat>=0))+(parseFloat(r.substr(1))||0)*(a?(s<0?h:i).totalDuration()/100:1)):s<0?(r in o||(o[r]=l),o[r]):(n=parseFloat(r.charAt(s-1)+r.substr(s+1)),a&&i&&(n=n/100*(Y(i)?i[0]:i).totalDuration()),s>1?t(e,r.substr(0,s-1),i)+n:l+n):null==r?l:+r},t8=function(t,e,r){var i,s,n=H(e[1]),a=(n?2:1)+(t<2?0:1),o=e[a];if(n&&(o.duration=e[1]),o.parent=r,t){for(i=o,s=r;s&&!("immediateRender"in i);)// inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
i=s.vars.defaults||{},s=V(s.vars.inherit)&&s.parent;o.immediateRender=V(i.immediateRender),t<2?o.runBackwards=1:o.startAt=e[a-1]}return new e6(e[0],o,e[a+1])},t7=function(t,e){return t||0===t?e(t):e},t9=function(t,e,r){return r<t?t:r>e?e:r},et=function(t,e){return U(t)&&(e=te.exec(t))?e[1]:""},ee=[].slice,er=function(t,e){return t&&z(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&z(t[0]))&&!t.nodeType&&t!==A},ei=function(t,e,r){var i;return T&&!e&&T.selector?T.selector(t):U(t)&&!r&&(w||!eR())?ee.call((e||S).querySelectorAll(t),0):Y(t)?(void 0===i&&(i=[]),t.forEach(function(t){var e;return U(t)&&!r||er(t,1)?(e=i).push.apply(e,ei(t)):i.push(t)})||i):er(t)?ee.call(t,0):t?[t]:[]},es=function(t){return t=ei(t)[0]||ta("Invalid scope")||{},function(e){var r=t.current||t.nativeElement||t;return ei(e,r.querySelectorAll?r:r===t?ta("Invalid scope")||S.createElement("div"):t)}},en=function(t){return t.sort(function(){return .5-Math.random()})},//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
ea=function(t){if(G(t))return t;var e=z(t)?t:{each:t},r=eN(e.ease),i=e.from||0,s=parseFloat(e.base)||0,n={},a=i>0&&i<1,o=isNaN(i)||a,h=e.axis,l=i,u=i;return U(i)?l=u=({center:.5,edges:.5,end:1})[i]||0:!a&&o&&(l=i[0],u=i[1]),function(t,a,d){var c,p,f,m,g,_,y,v,x,b=(d||e).length,T=n[b];if(!T){if(!(x="auto"===e.grid?0:(e.grid||[1,1e8])[1])){for(y=-1e8;y<(y=d[x++].getBoundingClientRect().left)&&x<b;);x--}for(_=0,T=n[b]=[],c=o?Math.min(x,b)*l-.5:i%x,p=1e8===x?0:o?b*u/x-.5:i/x|0,y=0,v=1e8;_<b;_++)f=_%x-c,m=p-(_/x|0),T[_]=g=h?Math.abs("y"===h?m:f):N(f*f+m*m),g>y&&(y=g),g<v&&(v=g);"random"===i&&en(T),T.max=y-v,T.min=v,T.v=b=(parseFloat(e.amount)||parseFloat(e.each)*(x>b?b-1:h?"y"===h?b/x:x:Math.max(x,b/x))||0)*("edges"===i?-1:1),T.b=b<0?s-b:s,T.u=et(e.amount||e.each)||0,r=r&&b<0?eB(r):r}return b=(T[t]-T.min)/T.max||0,tw(T.b+(r?r(b):b)*T.v)+T.u;//round in order to work around floating point errors
}},eo=function(t){//pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
var e=Math.pow(10,((t+"").split(".")[1]||"").length);//to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed())
return function(r){var i=tw(Math.round(parseFloat(r)/t)*t*e);return(i-i%1)/e+(H(r)?0:et(r));// n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
}},eh=function(t,e){var r,i,s=Y(t);return!s&&z(t)&&(r=s=t.radius||1e8,t.values?(i=!H((t=ei(t.values))[0]))&&(r*=r):t=eo(t.increment)),t7(e,s?G(t)?function(e){return Math.abs((i=t(e))-e)<=r?i:e}:function(e){for(var s,n,a=parseFloat(i?e.x:e),o=parseFloat(i?e.y:0),h=1e8,l=0,u=t.length;u--;)(s=i?(s=t[u].x-a)*s+(n=t[u].y-o)*n:Math.abs(t[u]-a))<h&&(h=s,l=u);return l=!r||h<=r?t[l]:e,i||l===e||H(e)?l:l+et(e)}:eo(t))},el=function(t,e,r,i){return t7(Y(t)?!e:!0===r?(r=0,!1):!i,function(){return Y(t)?t[~~(Math.random()*t.length)]:(i=(r=r||1e-5)<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((t-r/2+Math.random()*(e-t+.99*r))/r)*r*i)/i})},eu=function(t,e,r){return t7(r,function(r){return t[~~e(r)]})},ed=function(t){for(//replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
var e,r,i,s,n=0,a="";~(e=t.indexOf("random(",n));)i=t.indexOf(")",e),s="["===t.charAt(e+7),r=t.substr(e+7,i-e-7).match(s?tt:q),a+=t.substr(n,e-n)+el(s?r:+r[0],s?0:+r[1],+r[2]||1e-5),n=i+1;return a+t.substr(n,t.length-n)},ec=function(t,e,r,i,s){var n=e-t,a=i-r;return t7(s,function(e){return r+((e-t)/n*a||0)})},ep=function(t,e,r){//used for nextLabel() and previousLabel()
var i,s,n,a=t.labels,o=1e8;for(i in a)(s=a[i]-e)<0==!!r&&s&&o>(s=Math.abs(s))&&(n=i,o=s);return n},ef=function(t,e,r){var i,s,n,a=t.vars,o=a[e],h=T,l=t._ctx;if(o)return i=a[e+"Params"],s=a.callbackScope||t,r&&tp.length&&tI(),l&&(T=l),n=i?o.apply(s,i):o.call(s),T=h,n},em=function(t){return tG(t),t.scrollTrigger&&t.scrollTrigger.kill(!!b),1>t.progress()&&ef(t,"onInterrupt"),t},eg=[],e_=function(t){if(W()&&t){var e=// edge case: some build tools may pass in a null/undefined value
(t=!t.name&&t.default||t).name,r=G(t),Plugin=e&&!r&&t.init?function(){this._props=[]}:t,i={init:th,render:rn,add:eK,kill:ro,modifier:ra,rawVars:0},s={targetTest:0,get:0,getSetter:re,aliases:{},register:0};if(eR(),t!==Plugin){if(tm[e])return;tD(Plugin,tD(tF(t,i),s)),tO(Plugin.prototype,tO(i,tF(t,s))),tm[Plugin.prop=e]=Plugin,t.targetTest&&(ty.push(Plugin),tc[e]=1),e=("css"===e?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}to(e,Plugin),t.register&&t.register(rA,Plugin,ru)}else t&&eg.push(t)},ey={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},// let ctx = _doc.createElement("canvas").getContext("2d");
// _forEachName("aqua,lime,silver,black,maroon,teal,blue,navy,white,olive,yellow,orange,gray,purple,green,red,pink,cyan", color => {ctx.fillStyle = color; _colorLookup[color] = splitColor(ctx.fillStyle)});
ev=function(t,e,r){return(6*(t+=t<0?1:t>1?-1:0)<1?e+(r-e)*t*6:t<.5?r:3*t<2?e+(r-e)*(2/3-t)*6:e)*255+.5|0},ex=function(t,e,r){var i,s,n,a,o,h,l,u,d,c,p=t?H(t)?[t>>16,t>>8&255,255&t]:0:ey.black;if(!p){if(","===t.substr(-1)&&(t=t.substr(0,t.length-1)),ey[t])p=ey[t];else if("#"===t.charAt(0)){if(t.length<6&&(t="#"+//for shorthand like #9F0 or #9F0F (could have alpha)
(i=t.charAt(1))+i+(s=t.charAt(2))+s+(n=t.charAt(3))+n+(5===t.length?t.charAt(4)+t.charAt(4):"")),9===t.length)return[// hex with alpha, like #fd5e53ff
(p=parseInt(t.substr(1,6),16))>>16,p>>8&255,255&p,parseInt(t.substr(7),16)/255];p=[(t=parseInt(t.substr(1),16))>>16,t>>8&255,255&t]}else if("hsl"===t.substr(0,3)){if(p=c=t.match(q),e){if(~t.indexOf("="))return(//if relative values are found, just return the raw strings with the relative prefixes in place.
p=t.match(K),r&&p.length<4&&(p[3]=1),p)}else a=+p[0]%360/360,o=+p[1]/100,s=(h=+p[2]/100)<=.5?h*(o+1):h+o-h*o,i=2*h-s,p.length>3&&(p[3]*=1),p[0]=ev(a+1/3,i,s),p[1]=ev(a,i,s),p[2]=ev(a-1/3,i,s)}else p=t.match(q)||ey.transparent;p=p.map(Number)}return e&&!c&&(h=((l=Math.max(i=p[0]/255,s=p[1]/255,n=p[2]/255))+(u=Math.min(i,s,n)))/2,l===u?a=o=0:(d=l-u,o=h>.5?d/(2-l-u):d/(l+u),a=(l===i?(s-n)/d+(s<n?6:0):l===s?(n-i)/d+2:(i-s)/d+4)*60),p[0]=~~(a+.5),p[1]=~~(100*o+.5),p[2]=~~(100*h+.5)),r&&p.length<4&&(p[3]=1),p},eb=function(t){// strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
var e=[],r=[],i=-1;return t.split(eE).forEach(function(t){var s=t.match(Z)||[];e.push.apply(e,s),r.push(i+=s.length+1)}),e.c=r,e},eT=function(t,e,r){var i,s,n,a,o="",h=(t+o).match(eE),l=e?"hsla(":"rgba(",u=0;if(!h)return t;if(h=h.map(function(t){return(t=ex(t,e,1))&&l+(e?t[0]+","+t[1]+"%,"+t[2]+"%,"+t[3]:t.join(","))+")"}),r&&(n=eb(t),(i=r.c).join(o)!==n.c.join(o)))for(a=(s=t.replace(eE,"1").split(Z)).length-1;u<a;u++)o+=s[u]+(~i.indexOf(u)?h.shift()||l+"0,0,0,0)":(n.length?n:h.length?h:r).shift());if(!s)for(a=(s=t.split(eE)).length-1;u<a;u++)o+=s[u]+h[u];return o+s[a]},eE=function(){var t,e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";for(t in ey)e+="|"+t+"\\b";return RegExp(e+")","gi")}(),eA=/hsl[a]?\(/,ew=function(t){var e,r=t.join(" ");if(eE.lastIndex=0,eE.test(r))return e=eA.test(r),t[1]=eT(t[1],e),t[0]=eT(t[0],e,eb(t[1])),!0},eS=(d=Date.now,c=500,p=33,m=f=d(),g=1e3/240,_=1e3/240,y=[],v=function t(e){var r,i,a,h,v=d()-m,x=!0===e;if(v>c&&(f+=v-p),m+=v,((r=(a=m-f)-_)>0||x)&&(h=++o.frame,l=a-1e3*o.time,o.time=a/=1e3,_+=r+(r>=g?4:g-r),i=1),x||(s=n(t)),i)for(u=0;u<y.length;u++)y[u](a,l,h,e)},o={time:0,frame:0,tick:function(){v(!0)},deltaRatio:function(t){return l/(1e3/(t||60))},wake:function(){R&&(!w&&W()&&(S=(A=w=window).document||{},tr.gsap=rA,(A.gsapVersions||(A.gsapVersions=[])).push(rA.version),ts(ti||A.GreenSockGlobals||!A.gsap&&A||{}),a=A.requestAnimationFrame,eg.forEach(e_)),s&&o.sleep(),n=a||function(t){return setTimeout(t,_-1e3*o.time+1|0)},M=1,v(2))},sleep:function(){(a?A.cancelAnimationFrame:clearTimeout)(s),M=0,n=th},lagSmoothing:function(t,e){p=Math.min(e||33,c=t||1/0)},fps:function(t){g=1e3/(t||240),_=1e3*o.time+g},add:function(t,e,r){var i=e?function(e,r,s,n){t(e,r,s,n),o.remove(i)}:t;return o.remove(t),y[r?"unshift":"push"](i),eR(),i},remove:function(t,e){~(e=y.indexOf(t))&&y.splice(e,1)&&u>=e&&u--},_listeners:y}),eR=function(){return!M&&eS.wake()},/*
* -------------------------------------------------
* EASING
* -------------------------------------------------
*/eI={},eC=/^[\d.\-M][\d.\-,\s]/,eM=/["']/g,eP=function(t){for(//takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
var e,r,i,s={},n=t.substr(1,t.length-3).split(":"),a=n[0],o=1,h=n.length;o<h;o++)r=n[o],e=o!==h-1?r.lastIndexOf(","):r.length,i=r.substr(0,e),s[a]=isNaN(i)?i.replace(eM,"").trim():+i,a=r.substr(e+1).trim();return s},eD=function(t){var e=t.indexOf("(")+1,r=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<r?t.indexOf(")",r+1):r)},eO=function(t){//name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
var e=(t+"").split("("),r=eI[e[0]];return r&&e.length>1&&r.config?r.config.apply(null,~t.indexOf("{")?[eP(e[1])]:eD(t).split(",").map(tM)):eI._CE&&eC.test(t)?eI._CE("",t):r},eB=function(t){return function(e){return 1-t(1-e)}},eF=function t(e,r){for(var i,s=e._first;s;)s instanceof ej?t(s,r):!s.vars.yoyoEase||s._yoyo&&s._repeat||s._yoyo===r||(s.timeline?t(s.timeline,r):(i=s._ease,s._ease=s._yEase,s._yEase=i,s._yoyo=r)),s=s._next},eN=function(t,e){return t&&(G(t)?t:eI[t]||eO(t))||e},eL=function(t,e,r,i){void 0===r&&(r=function(t){return 1-e(1-t)}),void 0===i&&(i=function(t){return t<.5?e(2*t)/2:1-e((1-t)*2)/2});var s,n={easeIn:e,easeOut:r,easeInOut:i};return tE(t,function(t){for(var e in eI[t]=tr[t]=n,eI[s=t.toLowerCase()]=r,n)eI[s+("easeIn"===e?".in":"easeOut"===e?".out":".inOut")]=eI[t+"."+e]=n[e]}),n},ek=function(t){return function(e){return e<.5?(1-t(1-2*e))/2:.5+t((e-.5)*2)/2}},eU=function t(e,r,i){var s=r>=1?r:1,n=(i||(e?.3:.45))/(r<1?r:1),a=n/O*(Math.asin(1/s)||0),o=function(t){return 1===t?1:s*Math.pow(2,-10*t)*k((t-a)*n)+1},h="out"===e?o:"in"===e?function(t){return 1-o(1-t)}:ek(o);return n=O/n,h.config=function(r,i){return t(e,r,i)},h},eG=function t(e,r){void 0===r&&(r=1.70158);var i=function(t){return t?--t*t*((r+1)*t+r)+1:0},s="out"===e?i:"in"===e?function(t){return 1-i(1-t)}:ek(i);return s.config=function(r){return t(e,r)},s};// a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEase = ratio => {
// 	let y = 0.5 + ratio / 2;
// 	return p => (2 * (1 - p) * p * y + p * p);
// },
// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEaseStrong = ratio => {
// 	ratio = .5 + ratio / 2;
// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
// 		b = ratio - o,
// 		c = ratio + o;
// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
// };
tE("Linear,Quad,Cubic,Quart,Quint,Strong",function(t,e){var r=e<5?e+1:e;eL(t+",Power"+(r-1),e?function(t){return Math.pow(t,r)}:function(t){return t},function(t){return 1-Math.pow(1-t,r)},function(t){return t<.5?Math.pow(2*t,r)/2:1-Math.pow((1-t)*2,r)/2})}),eI.Linear.easeNone=eI.none=eI.Linear.easeIn,eL("Elastic",eU("in"),eU("out"),eU()),eV=2*(ez=1/2.75),eW=2.5*ez,eL("Bounce",function(t){return 1-eX(1-t)},eX=function(t){return t<ez?7.5625*t*t:t<eV?7.5625*Math.pow(t-1.5/2.75,2)+.75:t<eW?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*Math.pow(t-2.625/2.75,2)+.984375}),eL("Expo",function(t){return t?Math.pow(2,10*(t-1)):0}),eL("Circ",function(t){return-(N(1-t*t)-1)}),eL("Sine",function(t){return 1===t?1:-L(t*B)+1}),eL("Back",eG("in"),eG("out"),eG()),eI.SteppedEase=eI.steps=tr.SteppedEase={config:function(t,e){void 0===t&&(t=1);var r=1/t,i=t+(e?0:1),s=e?1:0;return function(t){return((i*t9(0,.99999999,t)|0)+s)*r}}},D.ease=eI["quad.out"],tE("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(t){return tv+=t+","+t+"Params,"});var eH=function(t,e){this.id=F++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:tT,this.set=e?e.getSetter:re},Animation=/*#__PURE__*/function(){function Animation(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(// TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,t3(this,+t.duration,1,1),this.data=t.data,T&&(this._ctx=T,T.data.push(this)),M||eS.wake()}var t=Animation.prototype;return t.delay=function(t){return t||0===t?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+t-this._delay),this._delay=t,this):this._delay},t.duration=function(t){return arguments.length?this.totalDuration(this._repeat>0?t+(t+this._rDelay)*this._repeat:t):this.totalDuration()&&this._dur},t.totalDuration=function(t){return arguments.length?(this._dirty=0,t3(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(t,e){if(eR(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){//in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.
for(tY(this,t),!r._dp||r.parent||tq(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:-((r.totalDuration()-r._tTime)/r._ts))&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&t<this._tDur||this._ts<0&&t>0||!this._tDur&&!t)&&tK(this._dp,this,this._start-this._delay)}return this._tTime===t&&(this._dur||e)&&(!this._initted||1e-8!==Math.abs(this._zTime))&&(t||this._initted||!this.add&&!this._ptLookup)||(// check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
this._ts||(this._pTime=t),//if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
//   this._lock = 1;
tC(this,t,e)),this},t.time=function(t,e){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+tV(this))%(this._dur+this._rDelay)||(t?this._dur:0),e):this._time;// note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
},t.totalProgress=function(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.ratio},t.progress=function(t,e){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(1&this.iteration())?1-t:t)+tV(this),e):this.duration()?Math.min(1,this._time/this._dur):this.ratio},t.iteration=function(t,e){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*r,e):this._repeat?tW(this._tTime,r)+1:1}// potential future addition:
,t.timeScale=function(t){if(!arguments.length)return -.00000001===this._rts?0:this._rts;// recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
if(this._rts===t)return this;var e=this.parent&&this._ts?tX(this.parent._time,this):this._tTime;// make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
return(// future addition? Up side: fast and minimal file size. Down side: only works on this animation; if a timeline is reversed, for example, its childrens' onReverse wouldn't get called.
//(+value < 0 && this._rts >= 0) && _callback(this, "onReverse", true);
// prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.
this._rts=+t||0,this._ts=this._ps||-.00000001===t?0:this._rts,this.totalTime(t9(-Math.abs(this._delay),this._tDur,e),!0),t$(this),tj(this))},t.paused=function(t){return arguments.length?(this._ps!==t&&(this._ps=t,t?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(eR(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,1===this.progress()&&1e-8!==Math.abs(this._zTime)&&(this._tTime-=1e-8)))),this):this._ps},t.startTime=function(t){if(arguments.length){this._start=t;var e=this.parent||this._dp;return e&&(e._sort||!this.parent)&&tK(e,this,t-this._delay),this}return this._start},t.endTime=function(t){return this._start+(V(t)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(t){var e=this.parent||this._dp;// _dp = detached parent
return e?t&&(!this._ts||this._repeat&&this._time&&1>this.totalProgress())?this._tTime%(this._dur+this._rDelay):this._ts?tX(e.rawTime(t),this):this._tTime:this._tTime},t.revert=function(t){void 0===t&&(t=td);var e=b;return b=t,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(t),this.totalTime(-.01,t.suppressEvents)),"nested"!==this.data&&!1!==t.kill&&this.kill(),b=e,this},t.globalTime=function(t){for(var e=this,r=arguments.length?t:e.rawTime();e;)r=e._start+r/(e._ts||1),e=e._dp;return!this.parent&&this._sat?this._sat.vars.immediateRender?-1/0:this._sat.globalTime(t):r;// the _startAt tweens for .fromTo() and .from() that have immediateRender should always be FIRST in the timeline (important for context.revert()). "_sat" stands for _startAtTween, referring to the parent tween that created the _startAt. We must discern if that tween had immediateRender so that we can know whether or not to prioritize it in revert().
},t.repeat=function(t){return arguments.length?(this._repeat=t===1/0?-2:t,t4(this)):-2===this._repeat?1/0:this._repeat},t.repeatDelay=function(t){if(arguments.length){var e=this._time;return this._rDelay=t,t4(this),e?this.time(e):this}return this._rDelay},t.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},t.seek=function(t,e){return this.totalTime(t6(this,t),V(e))},t.restart=function(t,e){return this.play().totalTime(t?-this._delay:0,V(e))},t.play=function(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},t.reverse=function(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},t.pause=function(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(t){return arguments.length?(!!t!==this.reversed()&&this.timeScale(-this._rts||(t?-.00000001:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-.00000001,this},t.isActive=function(){var t,e=this.parent||this._dp,r=this._start;return!!(!e||this._ts&&this._initted&&e.isActive()&&(t=e.rawTime(!0))>=r&&t<this.endTime(!0)-1e-8)},t.eventCallback=function(t,e,r){var i=this.vars;return arguments.length>1?(e?(i[t]=e,r&&(i[t+"Params"]=r),"onUpdate"===t&&(this._onUpdate=e)):delete i[t],this):i[t]},t.then=function(t){var e=this;return new Promise(function(r){var i=G(t)?t:tP,s=function(){var t=e.then;e.then=null,G(i)&&(i=i(e))&&(i.then||i===e)&&(e.then=t),r(i),e.then=t};e._initted&&1===e.totalProgress()&&e._ts>=0||!e._tTime&&e._ts<0?s():e._prom=s})},t.kill=function(){em(this)},Animation}();tD(Animation.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-.00000001,_prom:0,_ps:!1,_rts:1});var ej=/*#__PURE__*/function(t){function e(e,i){var s;return void 0===e&&(e={}),(s=t.call(this,e)||this).labels={},s.smoothChildTiming=!!e.smoothChildTiming,s.autoRemoveChildren=!!e.autoRemoveChildren,s._sort=V(e.sortChildren),E&&tK(e.parent||E,r(s),i),e.reversed&&s.reverse(),e.paused&&s.paused(!0),e.scrollTrigger&&tZ(r(s),e.scrollTrigger),s}i(e,t);var s=e.prototype;return s.to=function(t,e,r){return t8(0,arguments,this),this},s.from=function(t,e,r){return t8(1,arguments,this),this},s.fromTo=function(t,e,r,i){return t8(2,arguments,this),this},s.set=function(t,e,r){return e.duration=0,e.parent=this,tN(e).repeatDelay||(e.repeat=0),e.immediateRender=!!e.immediateRender,new e6(t,e,t6(this,r),1),this},s.call=function(t,e,r){return tK(this,e6.delayedCall(0,t,e),r)}//ONLY for backward compatibility! Maybe delete?
,s.staggerTo=function(t,e,r,i,s,n,a){return r.duration=e,r.stagger=r.stagger||i,r.onComplete=n,r.onCompleteParams=a,r.parent=this,new e6(t,r,t6(this,s)),this},s.staggerFrom=function(t,e,r,i,s,n,a){return r.runBackwards=1,tN(r).immediateRender=V(r.immediateRender),this.staggerTo(t,e,r,i,s,n,a)},s.staggerFromTo=function(t,e,r,i,s,n,a,o){return i.startAt=r,tN(i).immediateRender=V(i.immediateRender),this.staggerTo(t,e,i,s,n,a,o)},s.render=function(t,e,r){var i,s,n,a,o,h,l,u,d,c,p,f,m=this._time,g=this._dirty?this.totalDuration():this._tDur,_=this._dur,y=t<=0?0:tw(t),v=this._zTime<0!=t<0&&(this._initted||!_);if(this!==E&&y>g&&t>=0&&(y=g),y!==this._tTime||r||v){if(m!==this._time&&_&&(//if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
y+=this._time-m,t+=this._time-m),i=y,d=this._start,h=!(u=this._ts),v&&(_||(m=this._zTime),(t||!e)&&(this._zTime=t)),this._repeat){if(//adjust the time for repeats and yoyos
p=this._yoyo,o=_+this._rDelay,this._repeat<-1&&t<0)return this.totalTime(100*o+t,e,r);/*
        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
        */if(i=tw(y%o),y===g?(// the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
a=this._repeat,i=_):((a=~~(y/o))&&a===y/o&&(i=_,a--),i>_&&(i=_)),c=tW(this._tTime,o),!m&&this._tTime&&c!==a&&this._tTime-c*o-this._dur<=0&&(c=a),p&&1&a&&(i=_-i,f=1),a!==c&&!this._lock){var x=p&&1&c,T=x===(p&&1&a);if(a<c&&(x=!x),m=x?0:y%_?_:y,this._lock=1,this.render(m||(f?0:tw(a*o)),e,!_)._lock=0,this._tTime=y,!e&&this.parent&&ef(this,"onRepeat"),this.vars.repeatRefresh&&!f&&(this.invalidate()._lock=1),m&&m!==this._time||!this._ts!==h||this.vars.onRepeat&&!this.parent&&!this._act||(_=this._dur,g=this._tDur,T&&(this._lock=2,m=x?_:-.0001,this.render(m,!0),this.vars.repeatRefresh&&!f&&this.invalidate()),this._lock=0,!this._ts&&!h))return this;//in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.
eF(this,f)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(l=t2(this,tw(m),tw(i)))&&(y-=i-(i=l._start)),this._tTime=y,this._time=i,this._act=!u,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=t,m=0),!m&&i&&!e&&!a&&(ef(this,"onStart"),this._tTime!==y))return this;if(i>=m&&t>=0)for(s=this._first;s;){if(n=s._next,(s._act||i>=s._start)&&s._ts&&l!==s){if(s.parent!==this)return this.render(t,e,r);if(s.render(s._ts>0?(i-s._start)*s._ts:(s._dirty?s.totalDuration():s._tDur)+(i-s._start)*s._ts,e,r),i!==this._time||!this._ts&&!h){//in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
l=0,n&&(y+=this._zTime=-.00000001);break}}s=n}else{s=this._last;for(var A=t<0?t:i;s;){if(n=s._prev,(s._act||A<=s._end)&&s._ts&&l!==s){if(s.parent!==this)return this.render(t,e,r);if(s.render(s._ts>0?(A-s._start)*s._ts:(s._dirty?s.totalDuration():s._tDur)+(A-s._start)*s._ts,e,r||b&&(s._initted||s._startAt)),i!==this._time||!this._ts&&!h){//in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
l=0,n&&(y+=this._zTime=A?-.00000001:1e-8);break}}s=n}}if(l&&!e&&(this.pause(),l.render(i>=m?0:-.00000001)._zTime=i>=m?1:-1,this._ts))return(//the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
this._start=d,t$(this),this.render(t,e,r));this._onUpdate&&!e&&ef(this,"onUpdate",!0),(y===g&&this._tTime>=this.totalDuration()||!y&&m)&&(d===this._start||Math.abs(u)!==Math.abs(this._ts))&&!this._lock&&(// remember, a child's callback may alter this timeline's playhead or timeScale which is why we need to add some of these checks.
(t||!_)&&(y===g&&this._ts>0||!y&&this._ts<0)&&tG(this,1),e||t<0&&!m||!y&&!m&&g||(ef(this,y===g&&t>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(y<g&&this.timeScale()>0)&&this._prom()))}return this},s.add=function(t,e){var r=this;if(H(e)||(e=t6(this,e,t)),!(t instanceof Animation)){if(Y(t))return t.forEach(function(t){return r.add(t,e)}),this;if(U(t))return this.addLabel(t,e);if(!G(t))return this;t=e6.delayedCall(0,t)}return this!==t?tK(this,t,e):this;//don't allow a timeline to be added to itself as a child!
},s.getChildren=function(t,e,r,i){void 0===t&&(t=!0),void 0===e&&(e=!0),void 0===r&&(r=!0),void 0===i&&(i=-1e8);for(var s=[],n=this._first;n;)n._start>=i&&(n instanceof e6?e&&s.push(n):(r&&s.push(n),t&&s.push.apply(s,n.getChildren(!0,e,r)))),n=n._next;return s},s.getById=function(t){for(var e=this.getChildren(1,1,1),r=e.length;r--;)if(e[r].vars.id===t)return e[r]},s.remove=function(t){return U(t)?this.removeLabel(t):G(t)?this.killTweensOf(t):(tU(this,t),t===this._recent&&(this._recent=this._last),tH(this))},s.totalTime=function(e,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=tw(eS.time-(this._ts>0?e/this._ts:-((this.totalDuration()-e)/this._ts)))),t.prototype.totalTime.call(this,e,r),this._forcing=0,this):this._tTime},s.addLabel=function(t,e){return this.labels[t]=t6(this,e),this},s.removeLabel=function(t){return delete this.labels[t],this},s.addPause=function(t,e,r){var i=e6.delayedCall(0,e||th,r);return i.data="isPause",this._hasPause=1,tK(this,i,t6(this,t))},s.removePause=function(t){var e=this._first;for(t=t6(this,t);e;)e._start===t&&"isPause"===e.data&&tG(e),e=e._next},s.killTweensOf=function(t,e,r){for(var i=this.getTweensOf(t,r),s=i.length;s--;)e$!==i[s]&&i[s].kill(t,e);return this},s.getTweensOf=function(t,e){for(var r,i=[],s=ei(t),n=this._first,a=H(e);n;)n instanceof e6?tR(n._targets,s)&&(a?(!e$||n._initted&&n._ts)&&n.globalTime(0)<=e&&n.globalTime(n.totalDuration())>e:!e||n.isActive())&&i.push(n):(r=n.getTweensOf(s,e)).length&&i.push.apply(i,r),n=n._next;return i}// potential future feature - targets() on timelines
,s.tweenTo=function(t,e){e=e||{};var r,i=this,s=t6(i,t),n=e,a=n.startAt,o=n.onStart,h=n.onStartParams,l=n.immediateRender,u=e6.to(i,tD({ease:e.ease||"none",lazy:!1,immediateRender:!1,time:s,overwrite:"auto",duration:e.duration||Math.abs((s-(a&&"time"in a?a.time:i._time))/i.timeScale())||1e-8,onStart:function(){if(i.pause(),!r){var t=e.duration||Math.abs((s-(a&&"time"in a?a.time:i._time))/i.timeScale());u._dur!==t&&t3(u,t,0,1).render(u._time,!0,!0),r=1}o&&o.apply(u,h||[])}},e));return l?u.render(0):u},s.tweenFromTo=function(t,e,r){return this.tweenTo(e,tD({startAt:{time:t6(this,t)}},r))},s.recent=function(){return this._recent},s.nextLabel=function(t){return void 0===t&&(t=this._time),ep(this,t6(this,t))},s.previousLabel=function(t){return void 0===t&&(t=this._time),ep(this,t6(this,t),1)},s.currentLabel=function(t){return arguments.length?this.seek(t,!0):this.previousLabel(this._time+1e-8)},s.shiftChildren=function(t,e,r){void 0===r&&(r=0);for(var i,s=this._first,n=this.labels;s;)s._start>=r&&(s._start+=t,s._end+=t),s=s._next;if(e)for(i in n)n[i]>=r&&(n[i]+=t);return tH(this)},s.invalidate=function(e){var r=this._first;for(this._lock=0;r;)r.invalidate(e),r=r._next;return t.prototype.invalidate.call(this,e)},s.clear=function(t){void 0===t&&(t=!0);for(var e,r=this._first;r;)e=r._next,this.remove(r),r=e;return this._dp&&(this._time=this._tTime=this._pTime=0),t&&(this.labels={}),tH(this)},s.totalDuration=function(t){var e,r,i,s=0,n=this._last,a=1e8;if(arguments.length)return this.timeScale((this._repeat<0?this.duration():this.totalDuration())/(this.reversed()?-t:t));if(this._dirty){for(i=this.parent;n;)e=n._prev,n._dirty&&n.totalDuration(),(r=n._start)>a&&this._sort&&n._ts&&!this._lock?(//in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
this._lock=1,tK(this,n,r-n._delay,1)._lock=0):a=r,r<0&&n._ts&&(//children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
s-=r,(!i&&!this._dp||i&&i.smoothChildTiming)&&(this._start+=r/this._ts,this._time-=r,this._tTime-=r),this.shiftChildren(-r,!1,-1/0),a=0),n._end>s&&n._ts&&(s=n._end),n=e;t3(this,this===E&&this._time>s?this._time:s,1,1),this._dirty=0}return this._tDur},e.updateRoot=function(t){if(E._ts&&(tC(E,tX(t,E)),I=eS.frame),eS.frame>=t_){t_+=P.autoSleep||120;var e=E._first;if((!e||!e._ts)&&P.autoSleep&&eS._listeners.length<2){for(;e&&!e._ts;)e=e._next;e||eS.sleep()}}},e}(Animation);tD(ej.prototype,{_lock:0,_hasPause:0,_forcing:0});var ez,eV,eW,eX,e$,eY,eq=function(t,e,r,i,s,n,a){//note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
var o,h,l,u,d,c,p,f,m=new ru(this._pt,t,e,0,1,rs,null,s),g=0,_=0;for(m.b=r,m.e=i,r+="",i+="",(p=~i.indexOf("random("))&&(i=ed(i)),n&&(n(f=[r,i],t,e),r=f[0],i=f[1]),h=r.match(Q)||[];o=Q.exec(i);)u=o[0],d=i.substring(g,o.index),l?l=(l+1)%5:"rgba("===d.substr(-5)&&(l=1),u!==h[_++]&&(c=parseFloat(h[_-1])||0,m._pt={_next:m._pt,p:d||1===_?d:",",//note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
s:c,c:"="===u.charAt(1)?tS(c,u)-c:parseFloat(u)-c,m:l&&l<4?Math.round:0},g=Q.lastIndex);return m.c=g<i.length?i.substring(g,i.length):"",m.fp=a,(J.test(i)||p)&&(m.e=0),this._pt=m,m},eK=function(t,e,r,i,s,n,a,o,h,l){G(i)&&(i=i(s||0,t,n));var u,d=t[e],c="get"!==r?r:G(d)?h?t[e.indexOf("set")||!G(t["get"+e.substr(3)])?e:"get"+e.substr(3)](h):t[e]():d,p=G(d)?h?e9:e7:e8;if(U(i)&&(~i.indexOf("random(")&&(i=ed(i)),"="===i.charAt(1)&&((u=tS(c,i)+(et(c)||0))||0===u)&&(i=u)),!l||c!==i||eY)return isNaN(c*i)||""===i?(d||e in t||tn(e,i),eq.call(this,t,e,c,i,p,o||P.stringFilter,h)):(// fun fact: any number multiplied by "" is evaluated as the number 0!
u=new ru(this._pt,t,e,+c||0,i-(c||0),"boolean"==typeof d?ri:rr,0,p),h&&(u.fp=h),a&&u.modifier(a,this,t),this._pt=u)},eZ=function(t,e,r,i,s){if(G(t)&&(t=e3(t,s,e,r,i)),!z(t)||t.style&&t.nodeType||Y(t)||$(t))return U(t)?e3(t,s,e,r,i):t;var n,a={};for(n in t)a[n]=e3(t[n],s,e,r,i);return a},eQ=function(t,e,r,i,s,n){var a,o,h,l;if(tm[t]&&!1!==(a=new tm[t]).init(s,a.rawVars?e[t]:eZ(e[t],i,s,n,r),r,i,n)&&(r._pt=o=new ru(r._pt,s,t,0,1,a.render,a,0,a.priority),r!==C))for(h=r._ptLookup[r._targets.indexOf(s)],l=a._props.length;l--;)h[a._props[l]]=o;return a},eJ=function t(e,r,i){var s,n,a,o,h,l,u,d,c,p,f,m,g,_=e.vars,y=_.ease,v=_.startAt,T=_.immediateRender,A=_.lazy,w=_.onUpdate,S=_.onUpdateParams,R=_.callbackScope,I=_.runBackwards,C=_.yoyoEase,M=_.keyframes,P=_.autoRevert,O=e._dur,B=e._startAt,F=e._targets,N=e.parent,L=N&&"nested"===N.data?N.vars.targets:F,k="auto"===e._overwrite&&!x,U=e.timeline;if(!U||M&&y||(y="none"),e._ease=eN(y,D.ease),e._yEase=C?eB(eN(!0===C?y:C,D.ease)):0,C&&e._yoyo&&!e._repeat&&(//there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
C=e._yEase,e._yEase=e._ease,e._ease=C),e._from=!U&&!!_.runBackwards,!U||M&&!_.stagger){if(m=//if there's an internal timeline, skip all the parsing because we passed that task down the chain.
(d=F[0]?tb(F[0]).harness:0)&&_[d.prop],s=tF(_,tc),B&&(B._zTime<0&&B.progress(1),r<0&&I&&T&&!P?B.render(-1,!0):B.revert(I&&O?tu:tl),// don't just _removeFromParent(prevStartAt.render(-1, true)) because that'll leave inline styles. We're creating a new _startAt for "startAt" tweens that re-capture things to ensure that if the pre-tween values changed since the tween was created, they're recorded.
B._lazy=0),v){if(tG(e._startAt=e6.set(F,tD({data:"isStart",overwrite:!1,parent:N,immediateRender:!0,lazy:!B&&V(A),startAt:null,delay:0,onUpdate:w,onUpdateParams:S,callbackScope:R,stagger:0},v))),e._startAt._dp=0,e._startAt._sat=e,r<0&&(b||!T&&!P)&&e._startAt.revert(tu),T&&O&&r<=0&&i<=0){// check tTime here because in the case of a yoyo tween whose playhead gets pushed to the end like tween.progress(1), we should allow it through so that the onComplete gets fired properly.
r&&(e._zTime=r);return;//we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
}}else if(I&&O&&!B){if(r&&(T=!1),a=tD({overwrite:!1,data:"isFromStart",//we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
lazy:T&&!B&&V(A),immediateRender:T,//zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
stagger:0,parent:N//ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
},s),m&&(a[d.prop]=m),tG(e._startAt=e6.set(F,a)),e._startAt._dp=0,e._startAt._sat=e,r<0&&(b?e._startAt.revert(tu):e._startAt.render(-1,!0)),e._zTime=r,T){if(!r)return}else t(e._startAt,1e-8,1e-8);//ensures that the initial values are recorded
}for(n=0,e._pt=e._ptCache=0,A=O&&V(A)||A&&!O;n<F.length;n++){if(u=(h=F[n])._gsap||tx(F)[n]._gsap,e._ptLookup[n]=p={},tf[u.id]&&tp.length&&tI(),f=L===F?n:L.indexOf(h),d&&!1!==(c=new d).init(h,m||s,e,f,L)&&(e._pt=o=new ru(e._pt,h,c.name,0,1,c.render,c,0,c.priority),c._props.forEach(function(t){p[t]=o}),c.priority&&(l=1)),!d||m)for(a in s)tm[a]&&(c=eQ(a,s,e,f,h,L))?c.priority&&(l=1):p[a]=o=eK.call(e,h,a,"get",s[a],f,L,0,_.stringFilter);e._op&&e._op[n]&&e.kill(h,e._op[n]),k&&e._pt&&(e$=e,E.killTweensOf(h,p,e.globalTime(r)),g=!e.parent,e$=0),e._pt&&A&&(tf[u.id]=1)}l&&rl(e),e._onInit&&e._onInit(e)}e._onUpdate=w,e._initted=(!e._op||e._pt)&&!g,M&&r<=0&&U.render(1e8,!0,!0)},e0=function(t,e,r,i,s,n,a){var o,h,l,u,d=(t._pt&&t._ptCache||(t._ptCache={}))[e];if(!d)for(d=t._ptCache[e]=[],l=t._ptLookup,u=t._targets.length;u--;){if((o=l[u][e])&&o.d&&o.d._pt)for(// it's a plugin, so find the nested PropTween
o=o.d._pt;o&&o.p!==e&&o.fp!==e;)o=o._next;if(!o)return(// there is no PropTween associated with that property, so we must FORCE one to be created and ditch out of this
// if the tween has other properties that already rendered at new positions, we'd normally have to rewind to put them back like tween.render(0, true) before forcing an _initTween(), but that can create another edge case like tweening a timeline's progress would trigger onUpdates to fire which could move other things around. It's better to just inform users that .resetTo() should ONLY be used for tweens that already have that property. For example, you can't gsap.to(...{ y: 0 }) and then tween.restTo("x", 200) for example.
eY=1,t.vars[e]="+=0",eJ(t,a),eY=0,1);d.push(o)}for(u=d.length;u--;)(o=(h=d[u])._pt||h).s=(i||0===i)&&!s?i:o.s+(i||0)+n*o.c,o.c=r-o.s,h.e&&(h.e=tA(r)+et(h.e)),h.b&&(h.b=o.s+et(h.b))},e1=function(t,e){var r,i,s,n,a=t[0]?tb(t[0]).harness:0,o=a&&a.aliases;if(!o)return e;for(i in r=tO({},e),o)if(i in r)for(s=(n=o[i].split(",")).length;s--;)r[n[s]]=r[i];return r},e2=function(t,e,r,i){var s,n,a=e.ease||i||"power1.inOut";if(Y(e))n=r[t]||(r[t]=[]),e.forEach(function(t,r){return n.push({t:r/(e.length-1)*100,v:t,e:a})});else for(s in e)n=r[s]||(r[s]=[]),"ease"===s||n.push({t:parseFloat(t),v:e[s],e:a})},e3=function(t,e,r,i,s){return G(t)?t.call(e,r,i,s):U(t)&&~t.indexOf("random(")?ed(t):t},e4=tv+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",e5={};tE(e4+",id,stagger,delay,duration,paused,scrollTrigger",function(t){return e5[t]=1});var e6=/*#__PURE__*/function(t){function e(e,i,s,n){"number"==typeof i&&(s.duration=i,i=s,s=null);var a,o,h,l,u,d,c,p,f,m=(a=t.call(this,n?i:tN(i))||this).vars,g=m.duration,_=m.delay,y=m.immediateRender,v=m.stagger,b=m.overwrite,T=m.keyframes,A=m.defaults,w=m.scrollTrigger,S=m.yoyoEase,R=i.parent||E,I=(Y(e)||$(e)?H(e[0]):"length"in i)?[e]:ei(e);if(a._targets=I.length?tx(I):ta("GSAP target "+e+" not found. https://greensock.com",!P.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=b,T||v||X(g)||X(_)){if(i=a.vars,(o=a.timeline=new ej({data:"nested",defaults:A||{},targets:R&&"nested"===R.data?R.vars.targets:I})).kill(),o.parent=o._dp=r(a),o._start=0,v||X(g)||X(_)){if(u=I.length,p=v&&ea(v),z(v))//users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
for(d in v)~e4.indexOf(d)&&(f||(f={}),f[d]=v[d]);for(h=0;h<u;h++)(l=tF(i,e5)).stagger=0,S&&(l.yoyoEase=S),f&&tO(l,f),c=I[h],l.duration=+e3(g,r(a),h,c,I),l.delay=(+e3(_,r(a),h,c,I)||0)-a._delay,!v&&1===u&&l.delay&&(// if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
a._delay=_=l.delay,a._start+=_,l.delay=0),o.to(c,l,p?p(h,c,I):0),o._ease=eI.none;o.duration()?g=_=0:a.timeline=0}else if(T){tN(tD(o.vars.defaults,{ease:"none"})),o._ease=eN(T.ease||i.ease||"none");var C,M,D,O=0;if(Y(T))T.forEach(function(t){return o.to(I,t,">")}),o.duration();else{for(d in l={},T)"ease"===d||"easeEach"===d||e2(d,T[d],l,T.easeEach);for(d in l)for(h=0,C=l[d].sort(function(t,e){return t.t-e.t}),O=0;h<C.length;h++)(D={ease:(M=C[h]).e,duration:(M.t-(h?C[h-1].t:0))/100*g})[d]=M.v,o.to(I,D,O),O+=D.duration;o.duration()<g&&o.to({},{duration:g-o.duration()})}}g||a.duration(g=o.duration())}else a.timeline=0;//speed optimization, faster lookups (no going up the prototype chain)
return!0!==b||x||(e$=r(a),E.killTweensOf(I),e$=0),tK(R,r(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(y||!g&&!T&&a._start===tw(R._time)&&V(y)&&function t(e){return!e||e._ts&&t(e.parent)}(r(a))&&"nested"!==R.data)&&(a._tTime=-.00000001,a.render(Math.max(0,-_)||0)),w&&tZ(r(a),w),a}i(e,t);var s=e.prototype;return s.render=function(t,e,r){var i,s,n,a,o,h,l,u,d,c=this._time,p=this._tDur,f=this._dur,m=t<0,g=t>p-1e-8&&!m?p:t<1e-8?0:t;if(f){if(g!==this._tTime||!t||r||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==m){if(//this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
i=g,u=this.timeline,this._repeat){if(//adjust the time for repeats and yoyos
a=f+this._rDelay,this._repeat<-1&&m)return this.totalTime(100*a+t,e,r);if(i=tw(g%a),g===p?(// the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
n=this._repeat,i=f):((n=~~(g/a))&&n===g/a&&(i=f,n--),i>f&&(i=f)),(h=this._yoyo&&1&n)&&(d=this._yEase,i=f-i),o=tW(this._tTime,a),i===c&&!r&&this._initted)return(//could be during the repeatDelay part. No need to render and fire callbacks.
this._tTime=g,this);n===o||(u&&this._yEase&&eF(u,h),!this.vars.repeatRefresh||h||this._lock||(this._lock=r=1,this.render(tw(a*n),!0).invalidate()._lock=0))}if(!this._initted){if(tQ(this,m?t:i,r,e,g))return this._tTime=0,this;if(c!==this._time)return this;if(f!==this._dur)return this.render(t,e,r)}if(this._tTime=g,this._time=i,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=l=(d||this._ease)(i/f),this._from&&(this.ratio=l=1-l),i&&!c&&!e&&!n&&(ef(this,"onStart"),this._tTime!==g))return this;for(s=this._pt;s;)s.r(l,s.d),s=s._next;u&&u.render(t<0?t:!i&&h?-.00000001:u._dur*u._ease(i/this._dur),e,r)||this._startAt&&(this._zTime=t),this._onUpdate&&!e&&(m&&tz(this,t,e,r),ef(this,"onUpdate")),this._repeat&&n!==o&&this.vars.onRepeat&&!e&&this.parent&&ef(this,"onRepeat"),(g===this._tDur||!g)&&this._tTime===g&&(m&&!this._onUpdate&&tz(this,t,!0,!0),(t||!f)&&(g===this._tDur&&this._ts>0||!g&&this._ts<0)&&tG(this,1),!e&&!(m&&!c)&&(g||c||h)&&(// if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
ef(this,g===p?"onComplete":"onReverseComplete",!0),this._prom&&!(g<p&&this.timeScale()>0)&&this._prom()))}}else t1(this,t,e,r);return this},s.targets=function(){return this._targets},s.invalidate=function(e){return(e&&this.vars.runBackwards||(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(e),t.prototype.invalidate.call(this,e))},s.resetTo=function(t,e,r,i){M||eS.wake(),this._ts||this.play();var s=Math.min(this._dur,(this._dp._time-this._start)*this._ts);return(// possible future addition to allow an object with multiple values to update, like tween.resetTo({x: 100, y: 200}); At this point, it doesn't seem worth the added kb given the fact that most users will likely opt for the convenient gsap.quickTo() way of interacting with this method.
// if (_isObject(property)) { // performance optimization
// 	for (p in property) {
// 		if (_updatePropTweens(this, p, property[p], value ? value[p] : null, start, ratio, time)) {
// 			return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
// 		}
// 	}
// } else {
(this._initted||eJ(this,s),e0(this,t,e,r,i,this._ease(s/this._dur),s))?this.resetTo(t,e,r,i):(//}
tY(this,0),this.parent||tk(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))// if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
)},s.kill=function(t,e){if(void 0===e&&(e="all"),!t&&(!e||"all"===e))return this._lazy=this._pt=0,this.parent?em(this):this;if(this.timeline){var r=this.timeline.totalDuration();return this.timeline.killTweensOf(t,e,e$&&!0!==e$.vars.overwrite)._first||em(this),this.parent&&r!==this.timeline.totalDuration()&&t3(this,this._dur*this.timeline._tDur/r,0,1),this}var i,s,n,a,o,h,l,u=this._targets,d=t?ei(t):u,c=this._ptLookup,p=this._pt;if((!e||"all"===e)&&tL(u,d))return"all"===e&&(this._pt=0),em(this);for(i=this._op=this._op||[],"all"!==e&&(U(e)&&(o={},tE(e,function(t){return o[t]=1}),e=o),e=e1(u,e)),l=u.length;l--;)if(~d.indexOf(u[l]))for(o in s=c[l],"all"===e?(i[l]=e,a=s,n={}):(n=i[l]=i[l]||{},a=e),a)(h=s&&s[o])&&("kill"in h.d&&!0!==h.d.kill(o)||tU(this,h,"_pt"),delete s[o]),"all"!==n&&(n[o]=1);return this._initted&&!this._pt&&p&&em(this),this},e.to=function(t,r){return new e(t,r,arguments[2])},e.from=function(t,e){return t8(1,arguments)},e.delayedCall=function(t,r,i,s){return new e(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:t,onComplete:r,onReverseComplete:r,onCompleteParams:i,onReverseCompleteParams:i,callbackScope:s});// we must use onReverseComplete too for things like timeline.add(() => {...}) which should be triggered in BOTH directions (forward and reverse)
},e.fromTo=function(t,e,r){return t8(2,arguments)},e.set=function(t,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new e(t,r)},e.killTweensOf=function(t,e,r){return E.killTweensOf(t,e,r)},e}(Animation);tD(e6.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
// 	Tween.prototype[name] = function() {
// 		let tl = new Timeline();
// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
// 	}
// });
//for backward compatibility. Leverage the timeline calls.
tE("staggerTo,staggerFrom,staggerFromTo",function(t){e6[t]=function(){var e=new ej,r=ee.call(arguments,0);return r.splice("staggerFromTo"===t?5:4,0,0),e[t].apply(e,r)}});/*
 * --------------------------------------------------------------------------------------
 * PROPTWEEN
 * --------------------------------------------------------------------------------------
 */var e8=function(t,e,r){return t[e]=r},e7=function(t,e,r){return t[e](r)},e9=function(t,e,r,i){return t[e](i.fp,r)},rt=function(t,e,r){return t.setAttribute(e,r)},re=function(t,e){return G(t[e])?e7:j(t[e])&&t.setAttribute?rt:e8},rr=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},ri=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},rs=function(t,e){var r=e._pt,i="";if(!t&&e.b)i=e.b;else if(1===t&&e.e)i=e.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*t):Math.round((r.s+r.c*t)*1e4)/1e4)+i,r=r._next;i+=e.c;//we use the "c" of the PropTween to store the final chunk of non-numeric text.
}e.set(e.t,e.p,i,e)},rn=function(t,e){for(var r=e._pt;r;)r.r(t,r.d),r=r._next},ra=function(t,e,r,i){for(var s,n=this._pt;n;)s=n._next,n.p===i&&n.modifier(t,e,r),n=s},ro=function(t){for(var e,r,i=this._pt;i;)r=i._next,(i.p!==t||i.op)&&i.op!==t?i.dep||(e=1):tU(this,i,"_pt"),i=r;return!e},rh=function(t,e,r,i){i.mSet(t,e,i.m.call(i.tween,r,i.mt),i)},rl=function(t){for(var e,r,i,s,n=t._pt;n;){for(e=n._next,r=i;r&&r.pr>n.pr;)r=r._next;(n._prev=r?r._prev:s)?n._prev._next=n:i=n,(n._next=r)?r._prev=n:s=n,n=e}t._pt=i},ru=/*#__PURE__*/function(){function t(t,e,r,i,s,n,a,o,h){this.t=e,this.s=i,this.c=s,this.p=r,this.r=n||rr,this.d=a||this,this.set=o||e8,this.pr=h||0,this._next=t,t&&(t._prev=this)}return t.prototype.modifier=function(t,e,r){this.mSet=this.mSet||this.set,this.set=rh,this.m=t,this.mt=r,this.tween=e},t}();//PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)
tE(tv+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(t){return tc[t]=1}),tr.TweenMax=tr.TweenLite=e6,tr.TimelineLite=tr.TimelineMax=ej,E=new ej({sortChildren:!1,defaults:D,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),P.stringFilter=ew;var rd=[],rc={},rp=[],rf=0,rm=0,rg=function(t){return(rc[t]||rp).map(function(t){return t()})},r_=function(){var t=Date.now(),e=[];t-rf>2&&(rg("matchMediaInit"),rd.forEach(function(t){var r,i,s,n,a=t.queries,o=t.conditions;for(i in a)(r=A.matchMedia(a[i]).matches)&&(s=1),r!==o[i]&&(o[i]=r,n=1);n&&(t.revert(),s&&e.push(t))}),rg("matchMediaRevert"),e.forEach(function(t){return t.onMatch(t)}),rf=t,rg("matchMedia"))},ry=/*#__PURE__*/function(){function t(t,e){this.selector=e&&es(e),this.data=[],this._r=[],this.isReverted=!1,this.id=rm++,t&&this.add(t)}var e=t.prototype;return e.add=function(t,e,r){G(t)&&(r=e,e=t,t=G);var i=this,s=function(){var t,s=T,n=i.selector;return s&&s!==i&&s.data.push(i),r&&(i.selector=es(r)),T=i,t=e.apply(i,arguments),G(t)&&i._r.push(t),T=s,i.selector=n,i.isReverted=!1,t};return i.last=s,t===G?s(i):t?i[t]=s:s},e.ignore=function(t){var e=T;T=null,t(this),T=e},e.getTweens=function(){var e=[];return this.data.forEach(function(r){return r instanceof t?e.push.apply(e,r.getTweens()):r instanceof e6&&!(r.parent&&"nested"===r.parent.data)&&e.push(r)}),e},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(t,e){var r=this;if(t){var i=this.getTweens();this.data.forEach(function(t){// Flip plugin tweens are very different in that they should actually be pushed to their end. The plugin replaces the timeline's .revert() method to do exactly that. But we also need to remove any of those nested tweens inside the flip timeline so that they don't get individually reverted.
"isFlip"===t.data&&(t.revert(),t.getChildren(!0,!0,!1).forEach(function(t){return i.splice(i.indexOf(t),1)}))}),i.map(function(t){return{g:t.globalTime(0),t:t}}).sort(function(t,e){return e.g-t.g||-1/0}).forEach(function(e){return e.t.revert(t)}),this.data.forEach(function(e){return!(e instanceof e6)&&e.revert&&e.revert(t)}),this._r.forEach(function(e){return e(t,r)}),this.isReverted=!0}else this.data.forEach(function(t){return t.kill&&t.kill()});if(this.clear(),e)for(var s=rd.length;s--;)rd[s].id===this.id&&rd.splice(s,1)},e.revert=function(t){this.kill(t||{})},t}(),rv=/*#__PURE__*/function(){function t(t){this.contexts=[],this.scope=t}var e=t.prototype;return e.add=function(t,e,r){z(t)||(t={matches:t});var i,s,n,a=new ry(0,r||this.scope),o=a.conditions={};for(s in T&&!a.selector&&(a.selector=T.selector),this.contexts.push(a),e=a.add("onMatch",e),a.queries=t,t)"all"===s?n=1:(i=A.matchMedia(t[s]))&&(0>rd.indexOf(a)&&rd.push(a),(o[s]=i.matches)&&(n=1),i.addListener?i.addListener(r_):i.addEventListener("change",r_));return n&&e(a),this}// refresh() {
,e.revert=function(t){this.kill(t||{})},e.kill=function(t){this.contexts.forEach(function(e){return e.kill(t,!0)})},t}(),rx={registerPlugin:function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach(function(t){return e_(t)})},timeline:function(t){return new ej(t)},getTweensOf:function(t,e){return E.getTweensOf(t,e)},getProperty:function(t,e,r,i){U(t)&&(t=ei(t)[0]);var s=tb(t||{}).get,n=r?tP:tM;return"native"===r&&(r=""),t?e?n((tm[e]&&tm[e].get||s)(t,e,r,i)):function(e,r,i){return n((tm[e]&&tm[e].get||s)(t,e,r,i))}:t},quickSetter:function(t,e,r){if((t=ei(t)).length>1){var i=t.map(function(t){return rA.quickSetter(t,e,r)}),s=i.length;return function(t){for(var e=s;e--;)i[e](t)}}t=t[0]||{};var Plugin=tm[e],n=tb(t),a=n.harness&&(n.harness.aliases||{})[e]||e,o=Plugin?function(e){var i=new Plugin;C._pt=0,i.init(t,r?e+r:e,C,0,[t]),i.render(1,i),C._pt&&rn(1,C)}:n.set(t,a);return Plugin?o:function(e){return o(t,a,r?e+r:e,n,1)}},quickTo:function(t,e,r){var i,s=rA.to(t,tO(((i={})[e]="+=0.1",i.paused=!0,i),r||{})),n=function(t,r,i){return s.resetTo(e,t,r,i)};return n.tween=s,n},isTweening:function(t){return E.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=eN(t.ease,D.ease)),tB(D,t||{})},config:function(t){return tB(P,t||{})},registerEffect:function(t){var e=t.name,r=t.effect,i=t.plugins,s=t.defaults,n=t.extendTimeline;(i||"").split(",").forEach(function(t){return t&&!tm[t]&&!tr[t]&&ta(e+" effect requires "+t+" plugin.")}),tg[e]=function(t,e,i){return r(ei(t),tD(e||{},s),i)},n&&(ej.prototype[e]=function(t,r,i){return this.add(tg[e](t,z(r)?r:(i=r)&&{},this),i)})},registerEase:function(t,e){eI[t]=eN(e)},parseEase:function(t,e){return arguments.length?eN(t,e):eI},getById:function(t){return E.getById(t)},exportRoot:function(t,e){void 0===t&&(t={});var r,i,s=new ej(t);for(s.smoothChildTiming=V(t.smoothChildTiming),E.remove(s),s._dp=0,s._time=s._tTime=E._time,r=E._first;r;)i=r._next,(e||!(!r._dur&&r instanceof e6&&r.vars.onComplete===r._targets[0]))&&tK(s,r,r._start-r._delay),r=i;return tK(E,s,0),s},context:function(t,e){return t?new ry(t,e):T},matchMedia:function(t){return new rv(t)},matchMediaRefresh:function(){return rd.forEach(function(t){var e,r,i=t.conditions;for(r in i)i[r]&&(i[r]=!1,e=1);e&&t.revert()})||r_()},addEventListener:function(t,e){var r=rc[t]||(rc[t]=[]);~r.indexOf(e)||r.push(e)},removeEventListener:function(t,e){var r=rc[t],i=r&&r.indexOf(e);i>=0&&r.splice(i,1)},utils:{wrap:function t(e,r,i){// NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
var s=r-e;return Y(e)?eu(e,t(0,e.length),r):t7(i,function(t){return(s+(t-e)%s)%s+e})},wrapYoyo:function t(e,r,i){var s=r-e,n=2*s;return Y(e)?eu(e,t(0,e.length-1),r):t7(i,function(t){return t=(n+(t-e)%n)%n||0,e+(t>s?n-t:t)})},distribute:ea,random:el,snap:eh,normalize:function(t,e,r){return ec(t,e,0,1,r)},getUnit:et,clamp:function(t,e,r){return t7(r,function(r){return t9(t,e,r)})},splitColor:ex,toArray:ei,selector:es,mapRange:ec,pipe:function(){for(var t=arguments.length,e=Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(t){return e.reduce(function(t,e){return e(t)},t)}},unitize:function(t,e){return function(r){return t(parseFloat(r))+(e||et(r))}},interpolate:function t(e,r,i,s){var n=isNaN(e+r)?0:function(t){return(1-t)*e+t*r};if(!n){var a,o,h,l,u,d=U(e),c={};if(!0===i&&(s=1)&&(i=null),d)e={p:e},r={p:r};else if(Y(e)&&!Y(r)){for(o=1,h=[],u=(l=e.length)-2;o<l;o++)h.push(t(e[o-1],e[o]));//build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
l--,n=function(t){var e=Math.min(u,~~(t*=l));return h[e](t-e)},i=r}else s||(e=tO(Y(e)?[]:{},e));if(!h){for(a in r)eK.call(c,e,a,"get",r[a]);n=function(t){return rn(t,c)||(d?e.p:e)}}}return t7(i,n)},shuffle:en},install:ts,effects:tg,ticker:eS,updateRoot:ej.updateRoot,plugins:tm,globalTimeline:E,core:{PropTween:ru,globals:to,Tween:e6,Timeline:ej,Animation:Animation,getCache:tb,_removeLinkedListItem:tU,reverting:function(){return b},context:function(t){return t&&T&&(T.data.push(t),t._ctx=T),T},suppressOverwrites:function(t){return x=t}}};tE("to,from,fromTo,delayedCall,set,killTweensOf",function(t){return rx[t]=e6[t]}),eS.add(ej.updateRoot),C=rx.to({},{duration:0});var rb=function(t,e){for(var r=t._pt;r&&r.p!==e&&r.op!==e&&r.fp!==e;)r=r._next;return r},rT=function(t,e){var r,i,s,n=t._targets;for(r in e)for(i=n.length;i--;)(s=t._ptLookup[i][r])&&(s=s.d)&&(s._pt&&(s=rb(s,r)),s&&s.modifier&&s.modifier(e[r],t,n[i],r))},rE=function(t,e){return{name:t,rawVars:1,//don't pre-process function-based values or "random()" strings.
init:function(t,r,i){i._onInit=function(t){var i,s;if(U(r)&&(i={},tE(r,function(t){return i[t]=1}),r=i),e){for(s in i={},r)i[s]=e(r[s]);r=i}rT(t,r)}}}},rA=rx.registerPlugin({name:"attr",init:function(t,e,r,i,s){var n,a,o;for(n in this.tween=r,e)o=t.getAttribute(n)||"",(a=this.add(t,"setAttribute",(o||0)+"",e[n],i,s,0,0,n)).op=n,a.b=o,this._props.push(n)},render:function(t,e){for(var r=e._pt;r;)b?r.set(r.t,r.p,r.b,r):r.r(t,r.d),r=r._next}},{name:"endArray",init:function(t,e){for(var r=e.length;r--;)this.add(t,r,t[r]||0,e[r],0,0,0,0,0,1)}},rE("roundProps",eo),rE("modifiers"),rE("snap",eh))||rx;//register core plugins
e6.version=ej.version=rA.version="3.12.2",R=1,W()&&eR(),eI.Power0,eI.Power1,eI.Power2,eI.Power3,eI.Power4,eI.Linear,eI.Quad,eI.Cubic,eI.Quart,eI.Quint,eI.Strong,eI.Elastic,eI.Back,eI.SteppedEase,eI.Bounce,eI.Sine,eI.Expo,eI.Circ});var m={};h(m,"filters",()=>nm);var g={};h(g,"VERSION",()=>sH),h(g,"AbstractMultiResource",()=>sM),h(g,"ArrayResource",()=>sP),h(g,"Attribute",()=>ri),h(g,"BackgroundSystem",()=>io),h(g,"BaseImageResource",()=>ip),h(g,"BaseRenderTexture",()=>ic),h(g,"BaseTexture",()=>e9),h(g,"BatchDrawCall",()=>rt),h(g,"BatchGeometry",()=>rl),h(g,"BatchRenderer",()=>ie),h(g,"BatchShaderGenerator",()=>r5),h(g,"BatchSystem",()=>ih),h(g,"BatchTextureArray",()=>r6),h(g,"Buffer",()=>rr),h(g,"BufferResource",()=>e6),h(g,"BufferSystem",()=>sS),h(g,"CanvasResource",()=>sD),h(g,"ContextSystem",()=>iu),h(g,"CubeResource",()=>sB),h(g,"Filter",()=>ia),h(g,"FilterState",()=>iA),h(g,"FilterSystem",()=>iR),h(g,"Framebuffer",()=>id),h(g,"FramebufferSystem",()=>iM),h(g,"GLFramebuffer",()=>iI),h(g,"GLProgram",()=>i1),h(g,"GLTexture",()=>sh),h(g,"GenerateTextureSystem",()=>iK),h(g,"Geometry",()=>rh),h(g,"GeometrySystem",()=>iD),h(g,"IGLUniformData",()=>i0),h(g,"INSTALLED",()=>e1),h(g,"ImageBitmapResource",()=>sF),h(g,"ImageResource",()=>im),h(g,"MaskData",()=>ik),h(g,"MaskSystem",()=>iU),h(g,"MultisampleSystem",()=>sA),h(g,"ObjectRenderer",()=>r8),h(g,"ObjectRendererSystem",()=>sR),h(g,"PluginSystem",()=>iX),h(g,"Program",()=>r1),h(g,"ProjectionSystem",()=>i$),h(g,"Quad",()=>iT),h(g,"QuadUv",()=>iE),h(g,"RenderTexture",()=>ix),h(g,"RenderTexturePool",()=>ib),h(g,"RenderTextureSystem",()=>iJ),h(g,"Renderer",()=>sC),h(g,"Resource",()=>e5),h(g,"SVGResource",()=>sL),h(g,"ScissorSystem",()=>iV),h(g,"Shader",()=>r4),h(g,"ShaderSystem",()=>se),h(g,"SpriteMaskFilter",()=>iL),h(g,"StartupSystem",()=>sr),h(g,"State",()=>e0),h(g,"StateSystem",()=>ss),h(g,"StencilSystem",()=>iW),h(g,"SystemManager",()=>sn),h(g,"Texture",()=>iv),h(g,"TextureGCSystem",()=>so),h(g,"TextureMatrix",()=>iB),h(g,"TextureSystem",()=>sl),h(g,"TextureUvs",()=>ig),h(g,"TransformFeedback",()=>sG),h(g,"TransformFeedbackSystem",()=>su),h(g,"UniformGroup",()=>r3),h(g,"VideoResource",()=>sU),h(g,"ViewSystem",()=>sd),h(g,"ViewableBuffer",()=>eZ),h(g,"autoDetectRenderer",()=>sv),h(g,"autoDetectResource",()=>e2),h(g,"checkMaxIfStatementsInShader",()=>eJ),h(g,"createUBOElements",()=>i6),h(g,"defaultFilterVertex",()=>sE),h(g,"defaultVertex",()=>sT),h(g,"generateProgram",()=>i2),h(g,"generateUniformBufferSync",()=>i7),h(g,"getTestContext",()=>rV),h(g,"getUBOData",()=>i8),h(g,"uniformParsers",()=>rU),h(g,"unsafeEvalSupported",()=>rZ),h(g,"utils",()=>ta);var _={};h(_,"ENV",()=>y),h(_,"RENDERER_TYPE",()=>v),h(_,"BUFFER_BITS",()=>x),h(_,"BLEND_MODES",()=>b),h(_,"DRAW_MODES",()=>T),h(_,"FORMATS",()=>E),h(_,"TARGETS",()=>A),h(_,"TYPES",()=>w),h(_,"SAMPLER_TYPES",()=>S),h(_,"SCALE_MODES",()=>R),h(_,"WRAP_MODES",()=>I),h(_,"MIPMAP_MODES",()=>C),h(_,"ALPHA_MODES",()=>M),h(_,"CLEAR_MODES",()=>P),h(_,"GC_MODES",()=>D),h(_,"PRECISION",()=>O),h(_,"MASK_TYPES",()=>B),h(_,"COLOR_MASK_BITS",()=>F),h(_,"MSAA_QUALITY",()=>N),h(_,"BUFFER_TYPE",()=>L);var y=((hW=y||{})[hW.WEBGL_LEGACY=0]="WEBGL_LEGACY",hW[hW.WEBGL=1]="WEBGL",hW[hW.WEBGL2=2]="WEBGL2",hW),v=((hX=v||{})[hX.UNKNOWN=0]="UNKNOWN",hX[hX.WEBGL=1]="WEBGL",hX[hX.CANVAS=2]="CANVAS",hX),x=((h$=x||{})[h$.COLOR=16384]="COLOR",h$[h$.DEPTH=256]="DEPTH",h$[h$.STENCIL=1024]="STENCIL",h$),b=((hY=b||{})[hY.NORMAL=0]="NORMAL",hY[hY.ADD=1]="ADD",hY[hY.MULTIPLY=2]="MULTIPLY",hY[hY.SCREEN=3]="SCREEN",hY[hY.OVERLAY=4]="OVERLAY",hY[hY.DARKEN=5]="DARKEN",hY[hY.LIGHTEN=6]="LIGHTEN",hY[hY.COLOR_DODGE=7]="COLOR_DODGE",hY[hY.COLOR_BURN=8]="COLOR_BURN",hY[hY.HARD_LIGHT=9]="HARD_LIGHT",hY[hY.SOFT_LIGHT=10]="SOFT_LIGHT",hY[hY.DIFFERENCE=11]="DIFFERENCE",hY[hY.EXCLUSION=12]="EXCLUSION",hY[hY.HUE=13]="HUE",hY[hY.SATURATION=14]="SATURATION",hY[hY.COLOR=15]="COLOR",hY[hY.LUMINOSITY=16]="LUMINOSITY",hY[hY.NORMAL_NPM=17]="NORMAL_NPM",hY[hY.ADD_NPM=18]="ADD_NPM",hY[hY.SCREEN_NPM=19]="SCREEN_NPM",hY[hY.NONE=20]="NONE",hY[hY.SRC_OVER=0]="SRC_OVER",hY[hY.SRC_IN=21]="SRC_IN",hY[hY.SRC_OUT=22]="SRC_OUT",hY[hY.SRC_ATOP=23]="SRC_ATOP",hY[hY.DST_OVER=24]="DST_OVER",hY[hY.DST_IN=25]="DST_IN",hY[hY.DST_OUT=26]="DST_OUT",hY[hY.DST_ATOP=27]="DST_ATOP",hY[hY.ERASE=26]="ERASE",hY[hY.SUBTRACT=28]="SUBTRACT",hY[hY.XOR=29]="XOR",hY),T=((hq=T||{})[hq.POINTS=0]="POINTS",hq[hq.LINES=1]="LINES",hq[hq.LINE_LOOP=2]="LINE_LOOP",hq[hq.LINE_STRIP=3]="LINE_STRIP",hq[hq.TRIANGLES=4]="TRIANGLES",hq[hq.TRIANGLE_STRIP=5]="TRIANGLE_STRIP",hq[hq.TRIANGLE_FAN=6]="TRIANGLE_FAN",hq),E=((hK=E||{})[hK.RGBA=6408]="RGBA",hK[hK.RGB=6407]="RGB",hK[hK.RG=33319]="RG",hK[hK.RED=6403]="RED",hK[hK.RGBA_INTEGER=36249]="RGBA_INTEGER",hK[hK.RGB_INTEGER=36248]="RGB_INTEGER",hK[hK.RG_INTEGER=33320]="RG_INTEGER",hK[hK.RED_INTEGER=36244]="RED_INTEGER",hK[hK.ALPHA=6406]="ALPHA",hK[hK.LUMINANCE=6409]="LUMINANCE",hK[hK.LUMINANCE_ALPHA=6410]="LUMINANCE_ALPHA",hK[hK.DEPTH_COMPONENT=6402]="DEPTH_COMPONENT",hK[hK.DEPTH_STENCIL=34041]="DEPTH_STENCIL",hK),A=((hZ=A||{})[hZ.TEXTURE_2D=3553]="TEXTURE_2D",hZ[hZ.TEXTURE_CUBE_MAP=34067]="TEXTURE_CUBE_MAP",hZ[hZ.TEXTURE_2D_ARRAY=35866]="TEXTURE_2D_ARRAY",hZ[hZ.TEXTURE_CUBE_MAP_POSITIVE_X=34069]="TEXTURE_CUBE_MAP_POSITIVE_X",hZ[hZ.TEXTURE_CUBE_MAP_NEGATIVE_X=34070]="TEXTURE_CUBE_MAP_NEGATIVE_X",hZ[hZ.TEXTURE_CUBE_MAP_POSITIVE_Y=34071]="TEXTURE_CUBE_MAP_POSITIVE_Y",hZ[hZ.TEXTURE_CUBE_MAP_NEGATIVE_Y=34072]="TEXTURE_CUBE_MAP_NEGATIVE_Y",hZ[hZ.TEXTURE_CUBE_MAP_POSITIVE_Z=34073]="TEXTURE_CUBE_MAP_POSITIVE_Z",hZ[hZ.TEXTURE_CUBE_MAP_NEGATIVE_Z=34074]="TEXTURE_CUBE_MAP_NEGATIVE_Z",hZ),w=((hQ=w||{})[hQ.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",hQ[hQ.UNSIGNED_SHORT=5123]="UNSIGNED_SHORT",hQ[hQ.UNSIGNED_SHORT_5_6_5=33635]="UNSIGNED_SHORT_5_6_5",hQ[hQ.UNSIGNED_SHORT_4_4_4_4=32819]="UNSIGNED_SHORT_4_4_4_4",hQ[hQ.UNSIGNED_SHORT_5_5_5_1=32820]="UNSIGNED_SHORT_5_5_5_1",hQ[hQ.UNSIGNED_INT=5125]="UNSIGNED_INT",hQ[hQ.UNSIGNED_INT_10F_11F_11F_REV=35899]="UNSIGNED_INT_10F_11F_11F_REV",hQ[hQ.UNSIGNED_INT_2_10_10_10_REV=33640]="UNSIGNED_INT_2_10_10_10_REV",hQ[hQ.UNSIGNED_INT_24_8=34042]="UNSIGNED_INT_24_8",hQ[hQ.UNSIGNED_INT_5_9_9_9_REV=35902]="UNSIGNED_INT_5_9_9_9_REV",hQ[hQ.BYTE=5120]="BYTE",hQ[hQ.SHORT=5122]="SHORT",hQ[hQ.INT=5124]="INT",hQ[hQ.FLOAT=5126]="FLOAT",hQ[hQ.FLOAT_32_UNSIGNED_INT_24_8_REV=36269]="FLOAT_32_UNSIGNED_INT_24_8_REV",hQ[hQ.HALF_FLOAT=36193]="HALF_FLOAT",hQ),S=((hJ=S||{})[hJ.FLOAT=0]="FLOAT",hJ[hJ.INT=1]="INT",hJ[hJ.UINT=2]="UINT",hJ),R=((h0=R||{})[h0.NEAREST=0]="NEAREST",h0[h0.LINEAR=1]="LINEAR",h0),I=((h1=I||{})[h1.CLAMP=33071]="CLAMP",h1[h1.REPEAT=10497]="REPEAT",h1[h1.MIRRORED_REPEAT=33648]="MIRRORED_REPEAT",h1),C=((h2=C||{})[h2.OFF=0]="OFF",h2[h2.POW2=1]="POW2",h2[h2.ON=2]="ON",h2[h2.ON_MANUAL=3]="ON_MANUAL",h2),M=((h3=M||{})[h3.NPM=0]="NPM",h3[h3.UNPACK=1]="UNPACK",h3[h3.PMA=2]="PMA",h3[h3.NO_PREMULTIPLIED_ALPHA=0]="NO_PREMULTIPLIED_ALPHA",h3[h3.PREMULTIPLY_ON_UPLOAD=1]="PREMULTIPLY_ON_UPLOAD",h3[h3.PREMULTIPLIED_ALPHA=2]="PREMULTIPLIED_ALPHA",h3),P=((h4=P||{})[h4.NO=0]="NO",h4[h4.YES=1]="YES",h4[h4.AUTO=2]="AUTO",h4[h4.BLEND=0]="BLEND",h4[h4.CLEAR=1]="CLEAR",h4[h4.BLIT=2]="BLIT",h4),D=((h5=D||{})[h5.AUTO=0]="AUTO",h5[h5.MANUAL=1]="MANUAL",h5),O=((h6=O||{}).LOW="lowp",h6.MEDIUM="mediump",h6.HIGH="highp",h6),B=((h8=B||{})[h8.NONE=0]="NONE",h8[h8.SCISSOR=1]="SCISSOR",h8[h8.STENCIL=2]="STENCIL",h8[h8.SPRITE=3]="SPRITE",h8[h8.COLOR=4]="COLOR",h8),F=((h7=F||{})[h7.RED=1]="RED",h7[h7.GREEN=2]="GREEN",h7[h7.BLUE=4]="BLUE",h7[h7.ALPHA=8]="ALPHA",h7),N=((h9=N||{})[h9.NONE=0]="NONE",h9[h9.LOW=2]="LOW",h9[h9.MEDIUM=4]="MEDIUM",h9[h9.HIGH=8]="HIGH",h9),L=((lt=L||{})[lt.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER",lt[lt.ARRAY_BUFFER=34962]="ARRAY_BUFFER",lt[lt.UNIFORM_BUFFER=35345]="UNIFORM_BUFFER",lt),k={};h(k,"BrowserAdapter",()=>U),h(k,"isMobile",()=>tn),h(k,"settings",()=>G);const U={/**
   * Creates a canvas element of the given size.
   * This canvas is created using the browser's native canvas element.
   * @param width - width of the canvas
   * @param height - height of the canvas
   */createCanvas:(t,e)=>{let r=document.createElement("canvas");return r.width=t,r.height=e,r},getCanvasRenderingContext2D:()=>CanvasRenderingContext2D,getWebGLRenderingContext:()=>WebGLRenderingContext,getNavigator:()=>navigator,getBaseUrl:()=>document.baseURI??window.location.href,getFontFaceSet:()=>document.fonts,fetch:(t,e)=>fetch(t,e),parseXML:t=>new DOMParser().parseFromString(t,"text/xml")},G={/**
   * This adapter is used to call methods that are platform dependent.
   * For example `document.createElement` only runs on the web but fails in node environments.
   * This allows us to support more platforms by abstracting away specific implementations per platform.
   *
   * By default the adapter is set to work in the browser. However you can create your own
   * by implementing the `IAdapter` interface. See `IAdapter` for more information.
   * @name ADAPTER
   * @memberof PIXI.settings
   * @type {PIXI.IAdapter}
   * @default PIXI.BrowserAdapter
   */ADAPTER:U,/**
   * Default resolution / device pixel ratio of the renderer.
   * @static
   * @name RESOLUTION
   * @memberof PIXI.settings
   * @type {number}
   * @default 1
   */RESOLUTION:1,/**
   * Enables bitmap creation before image load. This feature is experimental.
   * @static
   * @name CREATE_IMAGE_BITMAP
   * @memberof PIXI.settings
   * @type {boolean}
   * @default false
   */CREATE_IMAGE_BITMAP:!1,/**
   * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
   * Advantages can include sharper image quality (like text) and faster rendering on canvas.
   * The main disadvantage is movement of objects may appear less smooth.
   * @static
   * @memberof PIXI.settings
   * @type {boolean}
   * @default false
   */ROUND_PIXELS:!1};var H=/iPhone/i,j=/iPod/i,z=/iPad/i,V=/\biOS-universal(?:.+)Mac\b/i,W=/\bAndroid(?:.+)Mobile\b/i,X=/Android/i,$=/(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,Y=/Silk/i,q=/Windows Phone/i,K=/\bWindows(?:.+)ARM\b/i,Z=/BlackBerry/i,Q=/BB10/i,J=/Opera Mini/i,tt=/\b(CriOS|Chrome)(?:.+)Mobile/i,te=/Mobile(?:.+)Firefox\b/i,tr=function(t){return void 0!==t&&"MacIntel"===t.platform&&"number"==typeof t.maxTouchPoints&&t.maxTouchPoints>1&&"undefined"==typeof MSStream};function ti(t){var e,r={userAgent:"",platform:"",maxTouchPoints:0};t||"undefined"==typeof navigator?"string"==typeof t?r.userAgent=t:t&&t.userAgent&&(r={userAgent:t.userAgent,platform:t.platform,maxTouchPoints:t.maxTouchPoints||0}):r={userAgent:navigator.userAgent,platform:navigator.platform,maxTouchPoints:navigator.maxTouchPoints||0};var i=r.userAgent,s=i.split("[FBAN");void 0!==s[1]&&(i=s[0]),void 0!==(s=i.split("Twitter"))[1]&&(i=s[0]);var n=(e=i,function(t){return t.test(e)}),a={apple:{phone:n(H)&&!n(q),ipod:n(j),tablet:!n(H)&&(n(z)||tr(r))&&!n(q),universal:n(V),device:(n(H)||n(j)||n(z)||n(V)||tr(r))&&!n(q)},amazon:{phone:n($),tablet:!n($)&&n(Y),device:n($)||n(Y)},android:{phone:!n(q)&&n($)||!n(q)&&n(W),tablet:!n(q)&&!n($)&&!n(W)&&(n(Y)||n(X)),device:!n(q)&&(n($)||n(Y)||n(W)||n(X))||n(/\bokhttp\b/i)},windows:{phone:n(q),tablet:n(K),device:n(q)||n(K)},other:{blackberry:n(Z),blackberry10:n(Q),opera:n(J),firefox:n(te),chrome:n(tt),device:n(Z)||n(Q)||n(J)||n(te)||n(tt)},any:!1,phone:!1,tablet:!1};return a.any=a.apple.device||a.android.device||a.windows.device||a.other.device,a.phone=a.apple.phone||a.android.phone||a.windows.phone,a.tablet=a.apple.tablet||a.android.tablet||a.windows.tablet,a}const ts=ti.default??ti,tn=ts(globalThis.navigator);var ta={};h(ta,"BaseTextureCache",()=>eF),h(ta,"BoundingBox",()=>eD),h(ta,"CanvasRenderTarget",()=>ek),h(ta,"DATA_URI",()=>ev),h(ta,"EventEmitter",()=>/*@__PURE__*/l(to)),h(ta,"ProgramCache",()=>eO),h(ta,"TextureCache",()=>eB),h(ta,"clearTextureCache",()=>eL),h(ta,"correctBlendMode",()=>em),h(ta,"createIndicesForQuads",()=>ex),h(ta,"decomposeDataUri",()=>ez),h(ta,"deprecation",()=>tF),h(ta,"destroyTextureCache",()=>eN),h(ta,"detectVideoAlphaMode",()=>tG),h(ta,"determineCrossOrigin",()=>eV),h(ta,"earcut",()=>/*@__PURE__*/l(tm)),h(ta,"getBufferType",()=>eb),h(ta,"getCanvasBoundingBox",()=>eH),h(ta,"getResolutionOfUrl",()=>eW),h(ta,"hex2rgb",()=>eu),h(ta,"hex2string",()=>ed),h(ta,"interleaveTypedArrays",()=>eE),h(ta,"isMobile",()=>tn),h(ta,"isPow2",()=>ew),h(ta,"isWebGLSupported",()=>tz),h(ta,"log2",()=>eS),h(ta,"nextPow2",()=>eA),h(ta,"path",()=>tU),h(ta,"premultiplyBlendMode",()=>ef),h(ta,"premultiplyRgba",()=>eg),h(ta,"premultiplyTint",()=>e_),h(ta,"premultiplyTintToRgba",()=>ey),h(ta,"removeItems",()=>eR),h(ta,"rgb2hex",()=>ep),h(ta,"sayHello",()=>tj),h(ta,"sign",()=>eI),h(ta,"skipHello",()=>tH),h(ta,"string2hex",()=>ec),h(ta,"trimCanvas",()=>ej),h(ta,"uid",()=>eM),h(ta,"url",()=>tN),G.RETINA_PREFIX=/@([0-9\.]+)x/,G.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT=!1;var to={},th=Object.prototype.hasOwnProperty,tl="~";/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */function tu(){}/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */function td(t,e,r){this.fn=t,this.context=e,this.once=r||!1}/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */function tc(t,e,r,i,s){if("function"!=typeof r)throw TypeError("The listener must be a function");var n=new td(r,i||t,s),a=tl?tl+e:e;return t._events[a]?t._events[a].fn?t._events[a]=[t._events[a],n]:t._events[a].push(n):(t._events[a]=n,t._eventsCount++),t}/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */function tp(t,e){0==--t._eventsCount?t._events=new tu:delete t._events[e]}/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */function tf(){this._events=new tu,this._eventsCount=0}Object.create&&(tu.prototype=Object.create(null),new tu().__proto__||(tl=!1)),/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */tf.prototype.eventNames=function(){var t,e,r=[];if(0===this._eventsCount)return r;for(e in t=this._events)th.call(t,e)&&r.push(tl?e.slice(1):e);return Object.getOwnPropertySymbols?r.concat(Object.getOwnPropertySymbols(t)):r},/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */tf.prototype.listeners=function(t){var e=tl?tl+t:t,r=this._events[e];if(!r)return[];if(r.fn)return[r.fn];for(var i=0,s=r.length,n=Array(s);i<s;i++)n[i]=r[i].fn;return n},/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */tf.prototype.listenerCount=function(t){var e=tl?tl+t:t,r=this._events[e];return r?r.fn?1:r.length:0},/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */tf.prototype.emit=function(t,e,r,i,s,n){var a=tl?tl+t:t;if(!this._events[a])return!1;var o,h,l=this._events[a],u=arguments.length;if(l.fn){switch(l.once&&this.removeListener(t,l.fn,void 0,!0),u){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,e),!0;case 3:return l.fn.call(l.context,e,r),!0;case 4:return l.fn.call(l.context,e,r,i),!0;case 5:return l.fn.call(l.context,e,r,i,s),!0;case 6:return l.fn.call(l.context,e,r,i,s,n),!0}for(h=1,o=Array(u-1);h<u;h++)o[h-1]=arguments[h];l.fn.apply(l.context,o)}else{var d,c=l.length;for(h=0;h<c;h++)switch(l[h].once&&this.removeListener(t,l[h].fn,void 0,!0),u){case 1:l[h].fn.call(l[h].context);break;case 2:l[h].fn.call(l[h].context,e);break;case 3:l[h].fn.call(l[h].context,e,r);break;case 4:l[h].fn.call(l[h].context,e,r,i);break;default:if(!o)for(d=1,o=Array(u-1);d<u;d++)o[d-1]=arguments[d];l[h].fn.apply(l[h].context,o)}}return!0},/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */tf.prototype.on=function(t,e,r){return tc(this,t,e,r,!1)},/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */tf.prototype.once=function(t,e,r){return tc(this,t,e,r,!0)},/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */tf.prototype.removeListener=function(t,e,r,i){var s=tl?tl+t:t;if(!this._events[s])return this;if(!e)return tp(this,s),this;var n=this._events[s];if(n.fn)n.fn!==e||i&&!n.once||r&&n.context!==r||tp(this,s);else{for(var a=0,o=[],h=n.length;a<h;a++)(n[a].fn!==e||i&&!n[a].once||r&&n[a].context!==r)&&o.push(n[a]);//
// Reset the array, or remove it completely if we have no more listeners.
//
o.length?this._events[s]=1===o.length?o[0]:o:tp(this,s)}return this},/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */tf.prototype.removeAllListeners=function(t){var e;return t?(e=tl?tl+t:t,this._events[e]&&tp(this,e)):(this._events=new tu,this._eventsCount=0),this},//
// Alias methods names because people roll like that.
//
tf.prototype.off=tf.prototype.removeListener,tf.prototype.addListener=tf.prototype.on,//
// Expose the prefix.
//
tf.prefixed=tl,//
// Allow `EventEmitter` to be imported as module namespace.
//
tf.EventEmitter=tf,to=tf;var tm={};function tg(t,e,r){r=r||2;var i,s,n,a,o,h,l,u=e&&e.length,d=u?e[0]*r:t.length,c=t_(t,0,d,r,!0),p=[];if(!c||c.next===c.prev)return p;// if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
if(u&&(c=// link every hole into the outer loop, producing a single-ring polygon without holes
function(t,e,r,i){var s,n,a,o,h,l=[];for(s=0,n=e.length;s<n;s++)a=e[s]*i,o=s<n-1?e[s+1]*i:t.length,(h=t_(t,a,o,i,!1))===h.next&&(h.steiner=!0),l.push(// find the leftmost node of a polygon ring
function(t){var e=t,r=t;do(e.x<r.x||e.x===r.x&&e.y<r.y)&&(r=e),e=e.next;while(e!==t)return r}(h));// process holes from left to right
for(l.sort(tv),s=0;s<l.length;s++)r=// find a bridge between vertices that connects hole with an outer ring and and link it
function(t,e){var r=// David Eberly's algorithm for finding a bridge between hole and outer polygon
function(t,e){var r,i,s,n=e,a=t.x,o=t.y,h=-1/0;// find a segment intersected by a ray from the hole's leftmost point to the left;
// segment's endpoint with lesser x will be potential connection point
do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){var l=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(l<=a&&l>h&&(h=l,s=n.x<n.next.x?n:n.next,l===a))return s;// hole touches outer segment; pick leftmost endpoint
}n=n.next}while(n!==e)if(!s)return null;// look for points inside the triangle of hole point, segment intersection and endpoint;
// if there are no points found, we have a valid connection;
// otherwise choose the point of the minimum angle with the ray as connection point
var u,d=s,c=s.x,p=s.y,f=1/0;n=s;do a>=n.x&&n.x>=c&&a!==n.x&&tb(o<p?a:h,o,c,p,o<p?h:a,o,n.x,n.y)&&(u=Math.abs(o-n.y)/(a-n.x),tR(n,t)&&(u<f||u===f&&(n.x>s.x||n.x===s.x&&(r=s,i=n,0>tT(r.prev,r,i.prev)&&0>tT(i.next,r,r.next))))&&(s=n,f=u)),n=n.next;while(n!==d)return s}(t,e);if(!r)return e;var i=tI(r,t);return(// filter collinear points around the cuts
ty(i,i.next),ty(r,r.next))}(l[s],r);return r}(t,e,c,r)),t.length>80*r){i=n=t[0],s=a=t[1];for(var f=r;f<d;f+=r)o=t[f],h=t[f+1],o<i&&(i=o),h<s&&(s=h),o>n&&(n=o),h>a&&(a=h);l=0!==// minX, minY and invSize are later used to transform coords into integers for z-order calculation
(l=Math.max(n-i,a-s))?32767/l:0}return(// main ear slicing loop which triangulates a polygon (given as a linked list)
function t(e,r,i,s,n,a,o){if(e){// interlink polygon nodes in z-order
!o&&a&&// interlink polygon nodes in z-order
function(t,e,r,i){var s=t;do 0===s.z&&(s.z=tx(s.x,s.y,e,r,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==t)s.prevZ.nextZ=null,s.prevZ=null,// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function(t){var e,r,i,s,n,a,o,h,l=1;do{for(r=t,t=null,n=null,a=0;r;){for(a++,i=r,o=0,e=0;e<l&&(o++,i=i.nextZ);e++);for(h=l;o>0||h>0&&i;)0!==o&&(0===h||!i||r.z<=i.z)?(s=r,r=r.nextZ,o--):(s=i,i=i.nextZ,h--),n?n.nextZ=s:t=s,s.prevZ=n,n=s;r=i}n.nextZ=null,l*=2}while(a>1)}(s)}(e,s,n,a);// iterate through ears, slicing them one by one
for(var h,l,u=e;e.prev!==e.next;){if(h=e.prev,l=e.next,a?function(t,e,r,i){var s=t.prev,n=t.next;if(tT(s,t,n)>=0)return!1;// reflex, can't be an ear
// look for points inside the triangle in both directions
for(var a=s.x,o=t.x,h=n.x,l=s.y,u=t.y,d=n.y,c=a<o?a<h?a:h:o<h?o:h,p=l<u?l<d?l:d:u<d?u:d,f=a>o?a>h?a:h:o>h?o:h,m=l>u?l>d?l:d:u>d?u:d,g=tx(c,p,e,r,i),_=tx(f,m,e,r,i),y=t.prevZ,v=t.nextZ;y&&y.z>=g&&v&&v.z<=_;){if(y.x>=c&&y.x<=f&&y.y>=p&&y.y<=m&&y!==s&&y!==n&&tb(a,l,o,u,h,d,y.x,y.y)&&tT(y.prev,y,y.next)>=0||(y=y.prevZ,v.x>=c&&v.x<=f&&v.y>=p&&v.y<=m&&v!==s&&v!==n&&tb(a,l,o,u,h,d,v.x,v.y)&&tT(v.prev,v,v.next)>=0))return!1;v=v.nextZ}// look for remaining points in decreasing z-order
for(;y&&y.z>=g;){if(y.x>=c&&y.x<=f&&y.y>=p&&y.y<=m&&y!==s&&y!==n&&tb(a,l,o,u,h,d,y.x,y.y)&&tT(y.prev,y,y.next)>=0)return!1;y=y.prevZ}// look for remaining points in increasing z-order
for(;v&&v.z<=_;){if(v.x>=c&&v.x<=f&&v.y>=p&&v.y<=m&&v!==s&&v!==n&&tb(a,l,o,u,h,d,v.x,v.y)&&tT(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}(e,s,n,a):// check whether a polygon node forms a valid ear with adjacent nodes
function(t){var e=t.prev,r=t.next;if(tT(e,t,r)>=0)return!1;// reflex, can't be an ear
for(// now make sure we don't have other points inside the potential ear
var i=e.x,s=t.x,n=r.x,a=e.y,o=t.y,h=r.y,l=i<s?i<n?i:n:s<n?s:n,u=a<o?a<h?a:h:o<h?o:h,d=i>s?i>n?i:n:s>n?s:n,c=a>o?a>h?a:h:o>h?o:h,p=r.next;p!==e;){if(p.x>=l&&p.x<=d&&p.y>=u&&p.y<=c&&tb(i,a,s,o,n,h,p.x,p.y)&&tT(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}(e)){// cut off the triangle
r.push(h.i/i|0),r.push(e.i/i|0),r.push(l.i/i|0),tM(e),// skipping the next vertex leads to less sliver triangles
e=l.next,u=l.next;continue}// if we looped through the whole remaining polygon and can't find any more ears
if((e=l)===u){// try filtering points and slicing again
o?1===o?t(e=// go through all polygon nodes and cure small local self-intersections
function(t,e,r){var i=t;do{var s=i.prev,n=i.next.next;!tE(s,n)&&tA(s,i,i.next,n)&&tR(s,n)&&tR(n,s)&&(e.push(s.i/r|0),e.push(i.i/r|0),e.push(n.i/r|0),// remove two nodes involved
tM(i),tM(i.next),i=t=n),i=i.next}while(i!==t)return ty(i)}(ty(e),r,i),r,i,s,n,a,2):2===o&&// try splitting polygon into two and triangulate them independently
function(e,r,i,s,n,a){// look for a valid diagonal that divides the polygon into two
var o=e;do{for(var h,l,u=o.next.next;u!==o.prev;){if(o.i!==u.i&&(h=o,l=u,h.next.i!==l.i&&h.prev.i!==l.i&&!// check if a polygon diagonal intersects any polygon segments
function(t,e){var r=t;do{if(r.i!==t.i&&r.next.i!==t.i&&r.i!==e.i&&r.next.i!==e.i&&tA(r,r.next,t,e))return!0;r=r.next}while(r!==t)return!1}(h,l)&&// dones't intersect other edges
(tR(h,l)&&tR(l,h)&&// check if the middle point of a polygon diagonal is inside the polygon
function(t,e){var r=t,i=!1,s=(t.x+e.x)/2,n=(t.y+e.y)/2;do r.y>n!=r.next.y>n&&r.next.y!==r.y&&s<(r.next.x-r.x)*(n-r.y)/(r.next.y-r.y)+r.x&&(i=!i),r=r.next;while(r!==t)return i}(h,l)&&// locally visible
(tT(h.prev,h,l.prev)||tT(h,l.prev,l))||// does not create opposite-facing sectors
tE(h,l)&&tT(h.prev,h,h.next)>0&&tT(l.prev,l,l.next)>0))){// split the polygon in two by the diagonal
var d=tI(o,u);// filter colinear points around the cuts
o=ty(o,o.next),d=ty(d,d.next),// run earcut on each half
t(o,r,i,s,n,a,0),t(d,r,i,s,n,a,0);return}u=u.next}o=o.next}while(o!==e)}(e,r,i,s,n,a):t(ty(e),r,i,s,n,a,1);break}}}}(c,p,r,i,s,l,0),p)}// create a circular doubly linked list from polygon points in the specified winding order
function t_(t,e,r,i,s){var n,a;if(s===tD(t,e,r,i)>0)for(n=e;n<r;n+=i)a=tC(n,t[n],t[n+1],a);else for(n=r-i;n>=e;n-=i)a=tC(n,t[n],t[n+1],a);return a&&tE(a,a.next)&&(tM(a),a=a.next),a}// eliminate colinear or duplicate points
function ty(t,e){if(!t)return t;e||(e=t);var r,i=t;do if(r=!1,!i.steiner&&(tE(i,i.next)||0===tT(i.prev,i,i.next))){if(tM(i),(i=e=i.prev)===i.next)break;r=!0}else i=i.next;while(r||i!==e)return e}function tv(t,e){return t.x-e.x}// z-order of a point given coords and inverse of the longer side of data bbox
function tx(t,e,r,i,s){return(t=((t=((t=((t=(// coords are transformed into non-negative 15-bit integer range
(t=(t-r)*s|0)|t<<8)&16711935)|t<<4)&252645135)|t<<2)&858993459)|t<<1)&1431655765)|(e=((e=((e=((e=((e=(e-i)*s|0)|e<<8)&16711935)|e<<4)&252645135)|e<<2)&858993459)|e<<1)&1431655765)<<1}// check if a point lies within a convex triangle
function tb(t,e,r,i,s,n,a,o){return(s-a)*(e-o)>=(t-a)*(n-o)&&(t-a)*(i-o)>=(r-a)*(e-o)&&(r-a)*(n-o)>=(s-a)*(i-o)}// signed area of a triangle
function tT(t,e,r){return(e.y-t.y)*(r.x-e.x)-(e.x-t.x)*(r.y-e.y)}// check if two points are equal
function tE(t,e){return t.x===e.x&&t.y===e.y}// check if two segments intersect
function tA(t,e,r,i){var s=tS(tT(t,e,r)),n=tS(tT(t,e,i)),a=tS(tT(r,i,t)),o=tS(tT(r,i,e));return!!(s!==n&&a!==o||0===s&&tw(t,r,e)||0===n&&tw(t,i,e)||0===a&&tw(r,t,i)||0===o&&tw(r,e,i))}// for collinear points p, q, r, check if point q lies on segment pr
function tw(t,e,r){return e.x<=Math.max(t.x,r.x)&&e.x>=Math.min(t.x,r.x)&&e.y<=Math.max(t.y,r.y)&&e.y>=Math.min(t.y,r.y)}function tS(t){return t>0?1:t<0?-1:0}// check if a polygon diagonal is locally inside the polygon
function tR(t,e){return 0>tT(t.prev,t,t.next)?tT(t,e,t.next)>=0&&tT(t,t.prev,e)>=0:0>tT(t,e,t.prev)||0>tT(t,t.next,e)}// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function tI(t,e){var r=new tP(t.i,t.x,t.y),i=new tP(e.i,e.x,e.y),s=t.next,n=e.prev;return t.next=e,e.prev=t,r.next=s,s.prev=r,i.next=r,r.prev=i,n.next=i,i.prev=n,i}// create a node and optionally link it with previous one (in a circular doubly linked list)
function tC(t,e,r,i){var s=new tP(t,e,r);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function tM(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function tP(t,e,r){// vertex index in coordinates array
this.i=t,// vertex coordinates
this.x=e,this.y=r,// previous and next vertex nodes in a polygon ring
this.prev=null,this.next=null,// z-order curve value
this.z=0,// previous and next nodes in z-order
this.prevZ=null,this.nextZ=null,// indicates whether this is a steiner point
this.steiner=!1}function tD(t,e,r,i){for(var s=0,n=e,a=r-i;n<r;n+=i)s+=(t[a]-t[n])*(t[n+1]+t[a+1]),a=n;return s}(tm=tg).default=tg,// return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation
tg.deviation=function(t,e,r,i){var s=e&&e.length,n=s?e[0]*r:t.length,a=Math.abs(tD(t,0,n,r));if(s)for(var o=0,h=e.length;o<h;o++){var l=e[o]*r,u=o<h-1?e[o+1]*r:t.length;a-=Math.abs(tD(t,l,u,r))}var d=0;for(o=0;o<i.length;o+=3){var c=i[o]*r,p=i[o+1]*r,f=i[o+2]*r;d+=Math.abs((t[c]-t[f])*(t[p+1]-t[c+1])-(t[c]-t[p])*(t[f+1]-t[c+1]))}return 0===a&&0===d?0:Math.abs((d-a)/a)},// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
tg.flatten=function(t){for(var e=t[0][0].length,r={vertices:[],holes:[],dimensions:e},i=0,s=0;s<t.length;s++){for(var n=0;n<t[s].length;n++)for(var a=0;a<e;a++)r.vertices.push(t[s][n][a]);s>0&&(i+=t[s-1].length,r.holes.push(i))}return r};var tO=p("biuEp");const tB={};function tF(t,e,r=3){if(tB[e])return;let i=Error().stack;typeof i>"u"?console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${t}`):(i=i.split(`
`).splice(r).join(`
`),console.groupCollapsed?(console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s","color:#614108;background:#fffbe6","font-weight:normal;color:#614108;background:#fffbe6",`${e}
Deprecated since v${t}`),console.warn(i),console.groupEnd()):(console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${t}`),console.warn(i))),tB[e]=!0}const tN={/**
   * @deprecated since 7.3.0
   */get parse(){return tF("7.3.0","utils.url.parse is deprecated, use native URL API instead."),tO.parse},/**
   * @deprecated since 7.3.0
   */get format(){return tF("7.3.0","utils.url.format is deprecated, use native URL API instead."),tO.format},/**
   * @deprecated since 7.3.0
   */get resolve(){return tF("7.3.0","utils.url.resolve is deprecated, use native URL API instead."),tO.resolve}};function tL(t){if("string"!=typeof t)throw TypeError(`Path must be a string. Received ${JSON.stringify(t)}`)}function tk(t){return t.split("?")[0].split("#")[0]}const tU={/**
   * Converts a path to posix format.
   * @param path - The path to convert to posix
   */toPosix:t=>t.replace(RegExp("\\".replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"g"),"/"),/**
   * Checks if the path is a URL e.g. http://, https://
   * @param path - The path to check
   */isUrl(t){return/^https?:/.test(this.toPosix(t))},/**
   * Checks if the path is a data URL
   * @param path - The path to check
   */isDataUrl:t=>/^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(t),/**
   * Checks if the path is a blob URL
   * @param path - The path to check
   */isBlobUrl:t=>t.startsWith("blob:"),/**
   * Checks if the path has a protocol e.g. http://, https://, file:///, data:, blob:, C:/
   * This will return true for windows file paths
   * @param path - The path to check
   */hasProtocol(t){return/^[^/:]+:/.test(this.toPosix(t))},/**
   * Returns the protocol of the path e.g. http://, https://, file:///, data:, blob:, C:/
   * @param path - The path to get the protocol from
   */getProtocol(t){tL(t),t=this.toPosix(t);let e=/^file:\/\/\//.exec(t);if(e)return e[0];let r=/^[^/:]+:\/{0,2}/.exec(t);return r?r[0]:""},/**
   * Converts URL to an absolute path.
   * When loading from a Web Worker, we must use absolute paths.
   * If the URL is already absolute we return it as is
   * If it's not, we convert it
   * @param url - The URL to test
   * @param customBaseUrl - The base URL to use
   * @param customRootUrl - The root URL to use
   */toAbsolute(t,e,r){if(tL(t),this.isDataUrl(t)||this.isBlobUrl(t))return t;let i=tk(this.toPosix(e??G.ADAPTER.getBaseUrl())),s=tk(this.toPosix(r??this.rootname(i)));return(t=this.toPosix(t)).startsWith("/")?tU.join(s,t.slice(1)):this.isAbsolute(t)?t:this.join(i,t)},/**
   * Normalizes the given path, resolving '..' and '.' segments
   * @param path - The path to normalize
   */normalize(t){if(tL(t),0===t.length)return".";if(this.isDataUrl(t)||this.isBlobUrl(t))return t;t=this.toPosix(t);let e="",r=t.startsWith("/");this.hasProtocol(t)&&(e=this.rootname(t),t=t.slice(e.length));let i=t.endsWith("/");return(t=function(t,e){let r="",i=0,s=-1,n=0,a=-1;for(let o=0;o<=t.length;++o){if(o<t.length)a=t.charCodeAt(o);else{if(47===a)break;a=47}if(47===a){if(!(s===o-1||1===n)){if(s!==o-1&&2===n){if(r.length<2||2!==i||46!==r.charCodeAt(r.length-1)||46!==r.charCodeAt(r.length-2)){if(r.length>2){let t=r.lastIndexOf("/");if(t!==r.length-1){-1===t?(r="",i=0):i=(r=r.slice(0,t)).length-1-r.lastIndexOf("/"),s=o,n=0;continue}}else if(2===r.length||1===r.length){r="",i=0,s=o,n=0;continue}}e&&(r.length>0?r+="/..":r="..",i=2)}else r.length>0?r+=`/${t.slice(s+1,o)}`:r=t.slice(s+1,o),i=o-s-1}s=o,n=0}else 46===a&&-1!==n?++n:n=-1}return r}(t,!1)).length>0&&i&&(t+="/"),r?`/${t}`:e+t},/**
   * Determines if path is an absolute path.
   * Absolute paths can be urls, data urls, or paths on disk
   * @param path - The path to test
   */isAbsolute(t){return tL(t),t=this.toPosix(t),!!this.hasProtocol(t)||t.startsWith("/")},/**
   * Joins all given path segments together using the platform-specific separator as a delimiter,
   * then normalizes the resulting path
   * @param segments - The segments of the path to join
   */join(...t){let e;if(0===t.length)return".";for(let r=0;r<t.length;++r){let i=t[r];if(tL(i),i.length>0){if(void 0===e)e=i;else{let s=t[r-1]??"";this.extname(s)?e+=`/../${i}`:e+=`/${i}`}}}return void 0===e?".":this.normalize(e)},/**
   * Returns the directory name of a path
   * @param path - The path to parse
   */dirname(t){if(tL(t),0===t.length)return".";let e=(t=this.toPosix(t)).charCodeAt(0),r=47===e,i=-1,s=!0,n=this.getProtocol(t),a=t;t=t.slice(n.length);for(let r=t.length-1;r>=1;--r)if(47===(e=t.charCodeAt(r))){if(!s){i=r;break}}else s=!1;return -1===i?r?"/":this.isUrl(a)?n+t:n:r&&1===i?"//":n+t.slice(0,i)},/**
   * Returns the root of the path e.g. /, C:/, file:///, http://domain.com/
   * @param path - The path to parse
   */rootname(t){tL(t);let e="";if(e=(t=this.toPosix(t)).startsWith("/")?"/":this.getProtocol(t),this.isUrl(t)){let r=t.indexOf("/",e.length);(e=-1!==r?t.slice(0,r):t).endsWith("/")||(e+="/")}return e},/**
   * Returns the last portion of a path
   * @param path - The path to test
   * @param ext - Optional extension to remove
   */basename(t,e){tL(t),e&&tL(e),t=tk(this.toPosix(t));let r=0,i=-1,s=!0,n;if(void 0!==e&&e.length>0&&e.length<=t.length){if(e.length===t.length&&e===t)return"";let a=e.length-1,o=-1;for(n=t.length-1;n>=0;--n){let h=t.charCodeAt(n);if(47===h){if(!s){r=n+1;break}}else -1===o&&(s=!1,o=n+1),a>=0&&(h===e.charCodeAt(a)?-1==--a&&(i=n):(a=-1,i=o))}return r===i?i=o:-1===i&&(i=t.length),t.slice(r,i)}for(n=t.length-1;n>=0;--n)if(47===t.charCodeAt(n)){if(!s){r=n+1;break}}else -1===i&&(s=!1,i=n+1);return -1===i?"":t.slice(r,i)},/**
   * Returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last
   * portion of the path. If there is no . in the last portion of the path, or if there are no . characters other than
   * the first character of the basename of path, an empty string is returned.
   * @param path - The path to parse
   */extname(t){tL(t),t=tk(this.toPosix(t));let e=-1,r=0,i=-1,s=!0,n=0;for(let a=t.length-1;a>=0;--a){let o=t.charCodeAt(a);if(47===o){if(!s){r=a+1;break}continue}-1===i&&(s=!1,i=a+1),46===o?-1===e?e=a:1!==n&&(n=1):-1!==e&&(n=-1)}return -1===e||-1===i||0===n||1===n&&e===i-1&&e===r+1?"":t.slice(e,i)},/**
   * Parses a path into an object containing the 'root', `dir`, `base`, `ext`, and `name` properties.
   * @param path - The path to parse
   */parse(t){let e;tL(t);let r={root:"",dir:"",base:"",ext:"",name:""};if(0===t.length)return r;let i=(t=tk(this.toPosix(t))).charCodeAt(0),s=this.isAbsolute(t);r.root=this.rootname(t),e=s||this.hasProtocol(t)?1:0;let n=-1,a=0,o=-1,h=!0,l=t.length-1,u=0;for(;l>=e;--l){if(47===(i=t.charCodeAt(l))){if(!h){a=l+1;break}continue}-1===o&&(h=!1,o=l+1),46===i?-1===n?n=l:1!==u&&(u=1):-1!==n&&(u=-1)}return -1===n||-1===o||0===u||1===u&&n===o-1&&n===a+1?-1!==o&&(0===a&&s?r.base=r.name=t.slice(1,o):r.base=r.name=t.slice(a,o)):(0===a&&s?(r.name=t.slice(1,n),r.base=t.slice(1,o)):(r.name=t.slice(a,n),r.base=t.slice(a,o)),r.ext=t.slice(n,o)),r.dir=this.dirname(t),r},sep:"/",delimiter:":"};async function tG(){return t??(t=(async()=>{let t=document.createElement("canvas").getContext("webgl");if(!t)return M.UNPACK;let e=await new Promise(t=>{let e=document.createElement("video");e.onloadeddata=()=>t(e),e.onerror=()=>t(null),e.autoplay=!1,e.crossOrigin="anonymous",e.preload="auto",e.src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=",e.load()});if(!e)return M.UNPACK;let r=t.createTexture();t.bindTexture(t.TEXTURE_2D,r);let i=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,i),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,r,0),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.NONE),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e);let s=new Uint8Array(4);return t.readPixels(0,0,1,1,t.RGBA,t.UNSIGNED_BYTE,s),t.deleteFramebuffer(i),t.deleteTexture(r),t.getExtension("WEBGL_lose_context")?.loseContext(),s[0]<=s[3]?M.PMA:M.UNPACK})()),t}function tH(){tF("7.0.0","skipHello is deprecated, please use settings.RENDER_OPTIONS.hello")}function tj(){tF("7.0.0",'sayHello is deprecated, please use Renderer\'s "hello" option')}function tz(){return typeof e>"u"&&(e=function(){let t={stencil:!0,failIfMajorPerformanceCaveat:G.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT};try{if(!G.ADAPTER.getWebGLRenderingContext())return!1;let e=G.ADAPTER.createCanvas(),r=e.getContext("webgl",t)||e.getContext("experimental-webgl",t),i=!!r?.getContextAttributes()?.stencil;if(r){let t=r.getExtension("WEBGL_lose_context");t&&t.loseContext()}return r=null,i}catch{return!1}}()),e}var tV={};h(tV,"Color",()=>el);var tW={grad:.9,turn:360,rad:360/(2*Math.PI)},tX=function(t){return"string"==typeof t?t.length>0:"number"==typeof t},t$=function(t,e,r){return void 0===e&&(e=0),void 0===r&&(r=Math.pow(10,e)),Math.round(r*t)/r+0},tY=function(t,e,r){return void 0===e&&(e=0),void 0===r&&(r=1),t>r?r:t>e?t:e},tq=function(t){return(t=isFinite(t)?t%360:0)>0?t:t+360},tK=function(t){return{r:tY(t.r,0,255),g:tY(t.g,0,255),b:tY(t.b,0,255),a:tY(t.a)}},tZ=function(t){return{r:t$(t.r),g:t$(t.g),b:t$(t.b),a:t$(t.a,3)}},tQ=/^#([0-9a-f]{3,8})$/i,tJ=function(t){var e=t.toString(16);return e.length<2?"0"+e:e},t0=function(t){var e=t.r,r=t.g,i=t.b,s=t.a,n=Math.max(e,r,i),a=n-Math.min(e,r,i),o=a?n===e?(r-i)/a:n===r?2+(i-e)/a:4+(e-r)/a:0;return{h:60*(o<0?o+6:o),s:n?a/n*100:0,v:n/255*100,a:s}},t1=function(t){var e=t.h,r=t.s,i=t.v,s=t.a;e=e/360*6,r/=100,i/=100;var n=Math.floor(e),a=i*(1-r),o=i*(1-(e-n)*r),h=i*(1-(1-e+n)*r),l=n%6;return{r:255*[i,o,a,a,h,i][l],g:255*[h,i,i,o,a,a][l],b:255*[a,a,h,i,i,o][l],a:s}},t2=function(t){return{h:tq(t.h),s:tY(t.s,0,100),l:tY(t.l,0,100),a:tY(t.a)}},t3=function(t){return{h:t$(t.h),s:t$(t.s),l:t$(t.l),a:t$(t.a,3)}},t4=function(t){var e,r;return t1((e=t.s,{h:t.h,s:(e*=((r=t.l)<50?r:100-r)/100)>0?2*e/(r+e)*100:0,v:r+e,a:t.a}))},t5=function(t){var e,r,i,s;return{h:(e=t0(t)).h,s:(s=(200-(r=e.s))*(i=e.v)/100)>0&&s<200?r*i/100/(s<=100?s:200-s)*100:0,l:s/2,a:e.a}},t6=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,t8=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,t7=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,t9=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,et={string:[[function(t){var e=tQ.exec(t);return e?(t=e[1]).length<=4?{r:parseInt(t[0]+t[0],16),g:parseInt(t[1]+t[1],16),b:parseInt(t[2]+t[2],16),a:4===t.length?t$(parseInt(t[3]+t[3],16)/255,2):1}:6===t.length||8===t.length?{r:parseInt(t.substr(0,2),16),g:parseInt(t.substr(2,2),16),b:parseInt(t.substr(4,2),16),a:8===t.length?t$(parseInt(t.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(t){var e=t7.exec(t)||t9.exec(t);return e?e[2]!==e[4]||e[4]!==e[6]?null:tK({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:void 0===e[7]?1:Number(e[7])/(e[8]?100:1)}):null},"rgb"],[function(t){var e,r,i=t6.exec(t)||t8.exec(t);return i?t4(t2({h:(e=i[1],void 0===(r=i[2])&&(r="deg"),Number(e)*(tW[r]||1)),s:Number(i[3]),l:Number(i[4]),a:void 0===i[5]?1:Number(i[5])/(i[6]?100:1)})):null},"hsl"]],object:[[function(t){var e=t.r,r=t.g,i=t.b,s=t.a;return tX(e)&&tX(r)&&tX(i)?tK({r:Number(e),g:Number(r),b:Number(i),a:Number(void 0===s?1:s)}):null},"rgb"],[function(t){var e=t.h,r=t.s,i=t.l,s=t.a;return tX(e)&&tX(r)&&tX(i)?t4(t2({h:Number(e),s:Number(r),l:Number(i),a:Number(void 0===s?1:s)})):null},"hsl"],[function(t){var e,r=t.h,i=t.s,s=t.v,n=t.a;return tX(r)&&tX(i)&&tX(s)?t1({h:tq((e={h:Number(r),s:Number(i),v:Number(s),a:Number(void 0===n?1:n)}).h),s:tY(e.s,0,100),v:tY(e.v,0,100),a:tY(e.a)}):null},"hsv"]]},ee=function(t,e){for(var r=0;r<e.length;r++){var i=e[r][0](t);if(i)return[i,e[r][1]]}return[null,void 0]},er=function(t,e){var r=t5(t);return{h:r.h,s:tY(r.s+100*e,0,100),l:r.l,a:r.a}},ei=function(t){return(299*t.r+587*t.g+114*t.b)/1e3/255},es=function(t,e){var r=t5(t);return{h:r.h,s:r.s,l:tY(r.l+100*e,0,100),a:r.a}},en=function(){function t(t){this.parsed=("string"==typeof t?ee(t.trim(),et.string):"object"==typeof t&&null!==t?ee(t,et.object):[null,void 0])[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return t.prototype.isValid=function(){return null!==this.parsed},t.prototype.brightness=function(){return t$(ei(this.rgba),2)},t.prototype.isDark=function(){return .5>ei(this.rgba)},t.prototype.isLight=function(){return ei(this.rgba)>=.5},t.prototype.toHex=function(){var t,e,r,i,s,n;return e=(t=tZ(this.rgba)).r,r=t.g,i=t.b,n=(s=t.a)<1?tJ(t$(255*s)):"","#"+tJ(e)+tJ(r)+tJ(i)+n},t.prototype.toRgb=function(){return tZ(this.rgba)},t.prototype.toRgbString=function(){var t,e,r,i,s;return e=(t=tZ(this.rgba)).r,r=t.g,i=t.b,(s=t.a)<1?"rgba("+e+", "+r+", "+i+", "+s+")":"rgb("+e+", "+r+", "+i+")"},t.prototype.toHsl=function(){return t3(t5(this.rgba))},t.prototype.toHslString=function(){var t,e,r,i,s;return e=(t=t3(t5(this.rgba))).h,r=t.s,i=t.l,(s=t.a)<1?"hsla("+e+", "+r+"%, "+i+"%, "+s+")":"hsl("+e+", "+r+"%, "+i+"%)"},t.prototype.toHsv=function(){var t;return{h:t$((t=t0(this.rgba)).h),s:t$(t.s),v:t$(t.v),a:t$(t.a,3)}},t.prototype.invert=function(){var t;return ea({r:255-(t=this.rgba).r,g:255-t.g,b:255-t.b,a:t.a})},t.prototype.saturate=function(t){return void 0===t&&(t=.1),ea(er(this.rgba,t))},t.prototype.desaturate=function(t){return void 0===t&&(t=.1),ea(er(this.rgba,-t))},t.prototype.grayscale=function(){return ea(er(this.rgba,-1))},t.prototype.lighten=function(t){return void 0===t&&(t=.1),ea(es(this.rgba,t))},t.prototype.darken=function(t){return void 0===t&&(t=.1),ea(es(this.rgba,-t))},t.prototype.rotate=function(t){return void 0===t&&(t=15),this.hue(this.hue()+t)},t.prototype.alpha=function(t){var e;return"number"==typeof t?ea({r:(e=this.rgba).r,g:e.g,b:e.b,a:t}):t$(this.rgba.a,3)},t.prototype.hue=function(t){var e=t5(this.rgba);return"number"==typeof t?ea({h:t,s:e.s,l:e.l,a:e.a}):t$(e.h)},t.prototype.isEqual=function(t){return this.toHex()===ea(t).toHex()},t}(),ea=function(t){return t instanceof en?t:new en(t)},eo=[];!function(t){t.forEach(function(t){0>eo.indexOf(t)&&(t(en,et),eo.push(t))})}([function(t,e){var r={white:"#ffffff",bisque:"#ffe4c4",blue:"#0000ff",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",antiquewhite:"#faebd7",aqua:"#00ffff",azure:"#f0ffff",whitesmoke:"#f5f5f5",papayawhip:"#ffefd5",plum:"#dda0dd",blanchedalmond:"#ffebcd",black:"#000000",gold:"#ffd700",goldenrod:"#daa520",gainsboro:"#dcdcdc",cornsilk:"#fff8dc",cornflowerblue:"#6495ed",burlywood:"#deb887",aquamarine:"#7fffd4",beige:"#f5f5dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkkhaki:"#bdb76b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",peachpuff:"#ffdab9",darkmagenta:"#8b008b",darkred:"#8b0000",darkorchid:"#9932cc",darkorange:"#ff8c00",darkslateblue:"#483d8b",gray:"#808080",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",deeppink:"#ff1493",deepskyblue:"#00bfff",wheat:"#f5deb3",firebrick:"#b22222",floralwhite:"#fffaf0",ghostwhite:"#f8f8ff",darkviolet:"#9400d3",magenta:"#ff00ff",green:"#008000",dodgerblue:"#1e90ff",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",blueviolet:"#8a2be2",forestgreen:"#228b22",lawngreen:"#7cfc00",indianred:"#cd5c5c",indigo:"#4b0082",fuchsia:"#ff00ff",brown:"#a52a2a",maroon:"#800000",mediumblue:"#0000cd",lightcoral:"#f08080",darkturquoise:"#00ced1",lightcyan:"#e0ffff",ivory:"#fffff0",lightyellow:"#ffffe0",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",linen:"#faf0e6",mediumaquamarine:"#66cdaa",lemonchiffon:"#fffacd",lime:"#00ff00",khaki:"#f0e68c",mediumseagreen:"#3cb371",limegreen:"#32cd32",mediumspringgreen:"#00fa9a",lightskyblue:"#87cefa",lightblue:"#add8e6",midnightblue:"#191970",lightpink:"#ffb6c1",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",mintcream:"#f5fffa",lightslategray:"#778899",lightslategrey:"#778899",navajowhite:"#ffdead",navy:"#000080",mediumvioletred:"#c71585",powderblue:"#b0e0e6",palegoldenrod:"#eee8aa",oldlace:"#fdf5e6",paleturquoise:"#afeeee",mediumturquoise:"#48d1cc",mediumorchid:"#ba55d3",rebeccapurple:"#663399",lightsteelblue:"#b0c4de",mediumslateblue:"#7b68ee",thistle:"#d8bfd8",tan:"#d2b48c",orchid:"#da70d6",mediumpurple:"#9370db",purple:"#800080",pink:"#ffc0cb",skyblue:"#87ceeb",springgreen:"#00ff7f",palegreen:"#98fb98",red:"#ff0000",yellow:"#ffff00",slateblue:"#6a5acd",lavenderblush:"#fff0f5",peru:"#cd853f",palevioletred:"#db7093",violet:"#ee82ee",teal:"#008080",slategray:"#708090",slategrey:"#708090",aliceblue:"#f0f8ff",darkseagreen:"#8fbc8f",darkolivegreen:"#556b2f",greenyellow:"#adff2f",seagreen:"#2e8b57",seashell:"#fff5ee",tomato:"#ff6347",silver:"#c0c0c0",sienna:"#a0522d",lavender:"#e6e6fa",lightgreen:"#90ee90",orange:"#ffa500",orangered:"#ff4500",steelblue:"#4682b4",royalblue:"#4169e1",turquoise:"#40e0d0",yellowgreen:"#9acd32",salmon:"#fa8072",saddlebrown:"#8b4513",sandybrown:"#f4a460",rosybrown:"#bc8f8f",darksalmon:"#e9967a",lightgoldenrodyellow:"#fafad2",snow:"#fffafa",lightgrey:"#d3d3d3",lightgray:"#d3d3d3",dimgray:"#696969",dimgrey:"#696969",olivedrab:"#6b8e23",olive:"#808000"},i={};for(var s in r)i[r[s]]=s;var n={};t.prototype.toName=function(e){if(!(this.rgba.a||this.rgba.r||this.rgba.g||this.rgba.b))return"transparent";var s,a=i[this.toHex()];if(a)return a;if(null==e?void 0:e.closest){var o=this.toRgb(),h=1/0,l="black";if(!n.length)for(var u in r)n[u]=new t(r[u]).toRgb();for(var d in r){var c=(s=n[d],Math.pow(o.r-s.r,2)+Math.pow(o.g-s.g,2)+Math.pow(o.b-s.b,2));c<h&&(h=c,l=d)}return l}},e.string.push([function(e){var i=e.toLowerCase(),s="transparent"===i?"#0000":r[i];return s?new t(s).toRgb():null},"name"])}]);const eh=class t{/**
   * @param {PIXI.ColorSource} value - Optional value to use, if not provided, white is used.
   */constructor(t=16777215){this._value=null,this._components=new Float32Array(4),this._components.fill(1),this._int=16777215,this.value=t}/** Get red component (0 - 1) */get red(){return this._components[0]}/** Get green component (0 - 1) */get green(){return this._components[1]}/** Get blue component (0 - 1) */get blue(){return this._components[2]}/** Get alpha component (0 - 1) */get alpha(){return this._components[3]}/**
   * Set the value, suitable for chaining
   * @param value
   * @see PIXI.Color.value
   */setValue(t){return this.value=t,this}/**
   * The current color source.
   *
   * When setting:
   * - Setting to an instance of `Color` will copy its color source and components.
   * - Otherwise, `Color` will try to normalize the color source and set the components.
   *   If the color source is invalid, an `Error` will be thrown and the `Color` will left unchanged.
   *
   * Note: The `null` in the setter's parameter type is added to match the TypeScript rule: return type of getter
   * must be assignable to its setter's parameter type. Setting `value` to `null` will throw an `Error`.
   *
   * When getting:
   * - A return value of `null` means the previous value was overridden (e.g., {@link PIXI.Color.multiply multiply},
   *   {@link PIXI.Color.premultiply premultiply} or {@link PIXI.Color.round round}).
   * - Otherwise, the color source used when setting is returned.
   * @type {PIXI.ColorSource}
   */set value(e){if(e instanceof t)this._value=this.cloneSource(e._value),this._int=e._int,this._components.set(e._components);else{if(null===e)throw Error("Cannot set PIXI.Color#value to null");null!==this._value&&this.isSourceEqual(this._value,e)||(this.normalize(e),this._value=this.cloneSource(e))}}get value(){return this._value}/**
   * Copy a color source internally.
   * @param value - Color source
   */cloneSource(t){return"string"==typeof t||"number"==typeof t||t instanceof Number||null===t?t:Array.isArray(t)||ArrayBuffer.isView(t)?t.slice(0):"object"==typeof t&&null!==t?{...t}:t}/**
   * Equality check for color sources.
   * @param value1 - First color source
   * @param value2 - Second color source
   * @returns `true` if the color sources are equal, `false` otherwise.
   */isSourceEqual(t,e){let r=typeof t;if(r!==typeof e)return!1;if("number"===r||"string"===r||t instanceof Number)return t===e;if(Array.isArray(t)&&Array.isArray(e)||ArrayBuffer.isView(t)&&ArrayBuffer.isView(e))return t.length===e.length&&t.every((t,r)=>t===e[r]);if(null!==t&&null!==e){let r=Object.keys(t),i=Object.keys(e);return r.length===i.length&&r.every(r=>t[r]===e[r])}return t===e}/**
   * Convert to a RGBA color object.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toRgb(); // returns { r: 1, g: 1, b: 1, a: 1 }
   */toRgba(){let[t,e,r,i]=this._components;return{r:t,g:e,b:r,a:i}}/**
   * Convert to a RGB color object.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toRgb(); // returns { r: 1, g: 1, b: 1 }
   */toRgb(){let[t,e,r]=this._components;return{r:t,g:e,b:r}}/** Convert to a CSS-style rgba string: `rgba(255,255,255,1.0)`. */toRgbaString(){let[t,e,r]=this.toUint8RgbArray();return`rgba(${t},${e},${r},${this.alpha})`}toUint8RgbArray(t){let[e,r,i]=this._components;return(t=t??[])[0]=Math.round(255*e),t[1]=Math.round(255*r),t[2]=Math.round(255*i),t}toRgbArray(t){t=t??[];let[e,r,i]=this._components;return t[0]=e,t[1]=r,t[2]=i,t}/**
   * Convert to a hexadecimal number.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toNumber(); // returns 16777215
   */toNumber(){return this._int}/**
   * Convert to a hexadecimal number in little endian format (e.g., BBGGRR).
   * @example
   * import { Color } from 'pixi.js';
   * new Color(0xffcc99).toLittleEndianNumber(); // returns 0x99ccff
   * @returns {number} - The color as a number in little endian format.
   */toLittleEndianNumber(){let t=this._int;return(t>>16)+(65280&t)+((255&t)<<16)}/**
   * Multiply with another color. This action is destructive, and will
   * override the previous `value` property to be `null`.
   * @param {PIXI.ColorSource} value - The color to multiply by.
   */multiply(e){let[r,i,s,n]=t.temp.setValue(e)._components;return this._components[0]*=r,this._components[1]*=i,this._components[2]*=s,this._components[3]*=n,this.refreshInt(),this._value=null,this}/**
   * Converts color to a premultiplied alpha format. This action is destructive, and will
   * override the previous `value` property to be `null`.
   * @param alpha - The alpha to multiply by.
   * @param {boolean} [applyToRGB=true] - Whether to premultiply RGB channels.
   * @returns {PIXI.Color} - Itself.
   */premultiply(t,e=!0){return e&&(this._components[0]*=t,this._components[1]*=t,this._components[2]*=t),this._components[3]=t,this.refreshInt(),this._value=null,this}/**
   * Premultiplies alpha with current color.
   * @param {number} alpha - The alpha to multiply by.
   * @param {boolean} [applyToRGB=true] - Whether to premultiply RGB channels.
   * @returns {number} tint multiplied by alpha
   */toPremultiplied(t,e=!0){if(1===t)return -16777216+this._int;if(0===t)return e?0:this._int;let r=this._int>>16&255,i=this._int>>8&255,s=255&this._int;return e&&(r=r*t+.5|0,i=i*t+.5|0,s=s*t+.5|0),(255*t<<24)+(r<<16)+(i<<8)+s}/**
   * Convert to a hexidecimal string.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toHex(); // returns "#ffffff"
   */toHex(){let t=this._int.toString(16);return`#${"000000".substring(0,6-t.length)+t}`}/**
   * Convert to a hexidecimal string with alpha.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toHexa(); // returns "#ffffffff"
   */toHexa(){let t=Math.round(255*this._components[3]).toString(16);return this.toHex()+"00".substring(0,2-t.length)+t}/**
   * Set alpha, suitable for chaining.
   * @param alpha
   */setAlpha(t){return this._components[3]=this._clamp(t),this}/**
   * Rounds the specified color according to the step. This action is destructive, and will
   * override the previous `value` property to be `null`. The alpha component is not rounded.
   * @param steps - Number of steps which will be used as a cap when rounding colors
   * @deprecated since 7.3.0
   */round(t){let[e,r,i]=this._components;return this._components[0]=Math.round(e*t)/t,this._components[1]=Math.round(r*t)/t,this._components[2]=Math.round(i*t)/t,this.refreshInt(),this._value=null,this}toArray(t){t=t??[];let[e,r,i,s]=this._components;return t[0]=e,t[1]=r,t[2]=i,t[3]=s,t}/**
   * Normalize the input value into rgba
   * @param value - Input value
   */normalize(e){let r,i,s,n;if(("number"==typeof e||e instanceof Number)&&e>=0&&e<=16777215){let t=e;r=(t>>16&255)/255,i=(t>>8&255)/255,s=(255&t)/255,n=1}else if((Array.isArray(e)||e instanceof Float32Array)&&e.length>=3&&e.length<=4)e=this._clamp(e),[r,i,s,n=1]=e;else if((e instanceof Uint8Array||e instanceof Uint8ClampedArray)&&e.length>=3&&e.length<=4)e=this._clamp(e,0,255),[r,i,s,n=255]=e,r/=255,i/=255,s/=255,n/=255;else if("string"==typeof e||"object"==typeof e){if("string"==typeof e){let r=t.HEX_PATTERN.exec(e);r&&(e=`#${r[2]}`)}let a=ea(e);a.isValid()&&({r:r,g:i,b:s,a:n}=a.rgba,r/=255,i/=255,s/=255)}if(void 0!==r)this._components[0]=r,this._components[1]=i,this._components[2]=s,this._components[3]=n,this.refreshInt();else throw Error(`Unable to convert color ${e}`)}/** Refresh the internal color rgb number */refreshInt(){this._clamp(this._components);let[t,e,r]=this._components;this._int=(255*t<<16)+(255*e<<8)+(255*r|0)}/**
   * Clamps values to a range. Will override original values
   * @param value - Value(s) to clamp
   * @param min - Minimum value
   * @param max - Maximum value
   */_clamp(t,e=0,r=1){return"number"==typeof t?Math.min(Math.max(t,e),r):(t.forEach((i,s)=>{t[s]=Math.min(Math.max(i,e),r)}),t)}};eh.shared=new eh,/**
* Temporary Color object for static uses internally.
* As to not conflict with Color.shared.
* @ignore
*/eh.temp=new eh,/** Pattern for hex strings */eh.HEX_PATTERN=/^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;let el=eh;function eu(t,e=[]){return tF("7.2.0","utils.hex2rgb is deprecated, use Color#toRgbArray instead"),el.shared.setValue(t).toRgbArray(e)}function ed(t){return tF("7.2.0","utils.hex2string is deprecated, use Color#toHex instead"),el.shared.setValue(t).toHex()}function ec(t){return tF("7.2.0","utils.string2hex is deprecated, use Color#toNumber instead"),el.shared.setValue(t).toNumber()}function ep(t){return tF("7.2.0","utils.rgb2hex is deprecated, use Color#toNumber instead"),el.shared.setValue(t).toNumber()}const ef=function(){let t=[],e=[];for(let r=0;r<32;r++)t[r]=r,e[r]=r;t[b.NORMAL_NPM]=b.NORMAL,t[b.ADD_NPM]=b.ADD,t[b.SCREEN_NPM]=b.SCREEN,e[b.NORMAL]=b.NORMAL_NPM,e[b.ADD]=b.ADD_NPM,e[b.SCREEN]=b.SCREEN_NPM;let r=[];return r.push(e),r.push(t),r}();function em(t,e){return ef[e?1:0][t]}function eg(t,e,r,i=!0){return tF("7.2.0","utils.premultiplyRgba has moved to Color.premultiply"),el.shared.setValue(t).premultiply(e,i).toArray(r??new Float32Array(4))}function e_(t,e){return tF("7.2.0","utils.premultiplyTint has moved to Color.toPremultiplied"),el.shared.setValue(t).toPremultiplied(e)}function ey(t,e,r,i=!0){return tF("7.2.0","utils.premultiplyTintToRgba has moved to Color.premultiply"),el.shared.setValue(t).premultiply(e,i).toArray(r??new Float32Array(4))}const ev=/^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;function ex(t,e=null){let r=6*t;if((e=e||new Uint16Array(r)).length!==r)throw Error(`Out buffer length is incorrect, got ${e.length} and expected ${r}`);for(let t=0,i=0;t<r;t+=6,i+=4)e[t+0]=i+0,e[t+1]=i+1,e[t+2]=i+2,e[t+3]=i+0,e[t+4]=i+2,e[t+5]=i+3;return e}function eb(t){if(4===t.BYTES_PER_ELEMENT)return t instanceof Float32Array?"Float32Array":t instanceof Uint32Array?"Uint32Array":"Int32Array";if(2===t.BYTES_PER_ELEMENT){if(t instanceof Uint16Array)return"Uint16Array"}else if(1===t.BYTES_PER_ELEMENT&&t instanceof Uint8Array)return"Uint8Array";return null}const eT={Float32Array:Float32Array,Uint32Array:Uint32Array,Int32Array:Int32Array,Uint8Array:Uint8Array};function eE(t,e){let r=0,i=0,s={};for(let s=0;s<t.length;s++)i+=e[s],r+=t[s].length;let n=new ArrayBuffer(4*r),a=null,o=0;for(let r=0;r<t.length;r++){let h=e[r],l=t[r],u=eb(l);s[u]||(s[u]=new eT[u](n)),a=s[u];for(let t=0;t<l.length;t++){let e=(t/h|0)*i+o,r=t%h;a[e+r]=l[t]}o+=h}return new Float32Array(n)}function eA(t){return t+=0===t?1:0,--t,t|=t>>>1,t|=t>>>2,t|=t>>>4,t|=t>>>8,(t|=t>>>16)+1}function ew(t){return!(t&t-1)&&!!t}function eS(t){let e=(t>65535?1:0)<<4,r=((t>>>=e)>255?1:0)<<3;return t>>>=r,e|=r,r=(t>15?1:0)<<2,t>>>=r,e|=r,r=(t>3?1:0)<<1,t>>>=r,(e|=r)|t>>1}function eR(t,e,r){let i;let s=t.length;if(e>=s||0===r)return;r=e+r>s?s-e:r;let n=s-r;for(i=e;i<n;++i)t[i]=t[i+r];t.length=n}function eI(t){return 0===t?0:t<0?-1:1}let eC=0;function eM(){return++eC}const eP=class{/**
   * @param left - The left coordinate value of the bounding box.
   * @param top - The top coordinate value of the bounding box.
   * @param right - The right coordinate value of the bounding box.
   * @param bottom - The bottom coordinate value of the bounding box.
   */constructor(t,e,r,i){this.left=t,this.top=e,this.right=r,this.bottom=i}/** The width of the bounding box. */get width(){return this.right-this.left}/** The height of the bounding box. */get height(){return this.bottom-this.top}/** Determines whether the BoundingBox is empty. */isEmpty(){return this.left===this.right||this.top===this.bottom}};eP.EMPTY=new eP(0,0,0,0);let eD=eP;const eO={},eB=/* @__PURE__ */Object.create(null),eF=/* @__PURE__ */Object.create(null);function eN(){let t;for(t in eB)eB[t].destroy();for(t in eF)eF[t].destroy()}function eL(){let t;for(t in eB)delete eB[t];for(t in eF)delete eF[t]}class ek{/**
   * @param width - the width for the newly created canvas
   * @param height - the height for the newly created canvas
   * @param {number} [resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio of the canvas
   */constructor(t,e,r){this._canvas=G.ADAPTER.createCanvas(),this._context=this._canvas.getContext("2d"),this.resolution=r||G.RESOLUTION,this.resize(t,e)}/**
   * Clears the canvas that was created by the CanvasRenderTarget class.
   * @private
   */clear(){this._checkDestroyed(),this._context.setTransform(1,0,0,1,0,0),this._context.clearRect(0,0,this._canvas.width,this._canvas.height)}/**
   * Resizes the canvas to the specified width and height.
   * @param desiredWidth - the desired width of the canvas
   * @param desiredHeight - the desired height of the canvas
   */resize(t,e){this._checkDestroyed(),this._canvas.width=Math.round(t*this.resolution),this._canvas.height=Math.round(e*this.resolution)}/** Destroys this canvas. */destroy(){this._context=null,this._canvas=null}/**
   * The width of the canvas buffer in pixels.
   * @member {number}
   */get width(){return this._checkDestroyed(),this._canvas.width}set width(t){this._checkDestroyed(),this._canvas.width=Math.round(t)}/**
   * The height of the canvas buffer in pixels.
   * @member {number}
   */get height(){return this._checkDestroyed(),this._canvas.height}set height(t){this._checkDestroyed(),this._canvas.height=Math.round(t)}/** The Canvas object that belongs to this CanvasRenderTarget. */get canvas(){return this._checkDestroyed(),this._canvas}/** A CanvasRenderingContext2D object representing a two-dimensional rendering context. */get context(){return this._checkDestroyed(),this._context}_checkDestroyed(){if(null===this._canvas)throw TypeError("The CanvasRenderTarget has already been destroyed")}}function eU(t,e,r){for(let i=0,s=4*r*e;i<e;++i,s+=4)if(0!==t[s+3])return!1;return!0}function eG(t,e,r,i,s){let n=4*e;for(let e=i,a=i*n+4*r;e<=s;++e,a+=n)if(0!==t[a+3])return!1;return!0}function eH(t){let{width:e,height:r}=t,i=t.getContext("2d",{willReadFrequently:!0});if(null===i)throw TypeError("Failed to get canvas 2D context");let s=i.getImageData(0,0,e,r).data,n=0,a=0,o=e-1,h=r-1;for(;a<r&&eU(s,e,a);)++a;if(a===r)return eD.EMPTY;for(;eU(s,e,h);)--h;for(;eG(s,e,n,a,h);)++n;for(;eG(s,e,o,a,h);)--o;return new eD(n,a,++o,++h)}function ej(t){let e=eH(t),{width:r,height:i}=e,s=null;if(!e.isEmpty()){let n=t.getContext("2d");if(null===n)throw TypeError("Failed to get canvas 2D context");s=n.getImageData(e.left,e.top,r,i)}return{width:r,height:i,data:s}}function ez(t){let e=ev.exec(t);if(e)return{mediaType:e[1]?e[1].toLowerCase():void 0,subType:e[2]?e[2].toLowerCase():void 0,charset:e[3]?e[3].toLowerCase():void 0,encoding:e[4]?e[4].toLowerCase():void 0,data:e[5]}}function eV(t,e=globalThis.location){if(t.startsWith("data:"))return"";e=e||globalThis.location;let r=new URL(t,document.baseURI);return r.hostname!==e.hostname||r.port!==e.port||r.protocol!==e.protocol?"anonymous":""}function eW(t,e=1){let r=G.RETINA_PREFIX?.exec(t);return r?parseFloat(r[1]):e}var eX={};h(eX,"ExtensionType",()=>e$),h(eX,"extensions",()=>eK);var e$=((le=e$||{}).Renderer="renderer",le.Application="application",le.RendererSystem="renderer-webgl-system",le.RendererPlugin="renderer-webgl-plugin",le.CanvasRendererSystem="renderer-canvas-system",le.CanvasRendererPlugin="renderer-canvas-plugin",le.Asset="asset",le.LoadParser="load-parser",le.ResolveParser="resolve-parser",le.CacheParser="cache-parser",le.DetectionParser="detection-parser",le);const eY=t=>{if("function"==typeof t||"object"==typeof t&&t.extension){if(!t.extension)throw Error("Extension class must have an extension object");t={..."object"!=typeof t.extension?{type:t.extension}:t.extension,ref:t}}if("object"==typeof t)t={...t};else throw Error("Invalid extension type");return"string"==typeof t.type&&(t.type=[t.type]),t},eq=(t,e)=>eY(t).priority??e,eK={/** @ignore */_addHandlers:{},/** @ignore */_removeHandlers:{},/** @ignore */_queue:{},/**
   * Remove extensions from PixiJS.
   * @param extensions - Extensions to be removed.
   * @returns {PIXI.extensions} For chaining.
   */remove(...t){return t.map(eY).forEach(t=>{t.type.forEach(e=>this._removeHandlers[e]?.(t))}),this},/**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {PIXI.extensions} For chaining.
   */add(...t){return t.map(eY).forEach(t=>{t.type.forEach(e=>{let r=this._addHandlers,i=this._queue;r[e]?r[e](t):(i[e]=i[e]||[],i[e].push(t))})}),this},/**
   * Internal method to handle extensions by name.
   * @param type - The extension type.
   * @param onAdd  - Function for handling when extensions are added/registered passes {@link PIXI.ExtensionFormat}.
   * @param onRemove  - Function for handling when extensions are removed/unregistered passes {@link PIXI.ExtensionFormat}.
   * @returns {PIXI.extensions} For chaining.
   */handle(t,e,r){let i=this._addHandlers,s=this._removeHandlers;if(i[t]||s[t])throw Error(`Extension type ${t} already has a handler`);i[t]=e,s[t]=r;let n=this._queue;return n[t]&&(n[t].forEach(t=>e(t)),delete n[t]),this},/**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {PIXI.extensions} For chaining.
   */handleByMap(t,e){return this.handle(t,t=>{e[t.name]=t.ref},t=>{delete e[t.name]})},/**
   * Handle a type, but using a list of extensions.
   * @param type - Type of extension to handle.
   * @param list - The list of extensions.
   * @param defaultPriority - The default priority to use if none is specified.
   * @returns {PIXI.extensions} For chaining.
   */handleByList(t,e,r=-1){return this.handle(t,t=>{e.includes(t.ref)||(e.push(t.ref),e.sort((t,e)=>eq(e,r)-eq(t,r)))},t=>{let r=e.indexOf(t.ref);-1!==r&&e.splice(r,1)})}};class eZ{constructor(t){"number"==typeof t?this.rawBinaryData=new ArrayBuffer(t):t instanceof Uint8Array?this.rawBinaryData=t.buffer:this.rawBinaryData=t,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData)}/** View on the raw binary data as a `Int8Array`. */get int8View(){return this._int8View||(this._int8View=new Int8Array(this.rawBinaryData)),this._int8View}/** View on the raw binary data as a `Uint8Array`. */get uint8View(){return this._uint8View||(this._uint8View=new Uint8Array(this.rawBinaryData)),this._uint8View}/**  View on the raw binary data as a `Int16Array`. */get int16View(){return this._int16View||(this._int16View=new Int16Array(this.rawBinaryData)),this._int16View}/** View on the raw binary data as a `Uint16Array`. */get uint16View(){return this._uint16View||(this._uint16View=new Uint16Array(this.rawBinaryData)),this._uint16View}/** View on the raw binary data as a `Int32Array`. */get int32View(){return this._int32View||(this._int32View=new Int32Array(this.rawBinaryData)),this._int32View}/**
   * Returns the view of the given type.
   * @param type - One of `int8`, `uint8`, `int16`,
   *    `uint16`, `int32`, `uint32`, and `float32`.
   * @returns - typed array of given type
   */view(t){return this[`${t}View`]}/** Destroys all buffer references. Do not use after calling this. */destroy(){this.rawBinaryData=null,this._int8View=null,this._uint8View=null,this._int16View=null,this._uint16View=null,this._int32View=null,this.uint32View=null,this.float32View=null}static sizeOf(t){switch(t){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw Error(`${t} isn't a valid view type`)}}}const eQ=["precision mediump float;","void main(void){","float test = 0.1;","%forloop%","gl_FragColor = vec4(0.0);","}"].join(`
`);function eJ(t,e){if(0===t)throw Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");let r=e.createShader(e.FRAGMENT_SHADER);for(;;){let i=eQ.replace(/%forloop%/gi,function(t){let e="";for(let r=0;r<t;++r)r>0&&(e+=`
else `),r<t-1&&(e+=`if(test == ${r}.0){}`);return e}(t));if(e.shaderSource(r,i),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS))break;t=t/2|0}return t}class e0{constructor(){this.data=0,this.blendMode=b.NORMAL,this.polygonOffset=0,this.blend=!0,this.depthMask=!0}/**
   * Activates blending of the computed fragment color values.
   * @default true
   */get blend(){return!!(1&this.data)}set blend(t){!!(1&this.data)!==t&&(this.data^=1)}/**
   * Activates adding an offset to depth values of polygon's fragments
   * @default false
   */get offsets(){return!!(2&this.data)}set offsets(t){!!(2&this.data)!==t&&(this.data^=2)}/**
   * Activates culling of polygons.
   * @default false
   */get culling(){return!!(4&this.data)}set culling(t){!!(4&this.data)!==t&&(this.data^=4)}/**
   * Activates depth comparisons and updates to the depth buffer.
   * @default false
   */get depthTest(){return!!(8&this.data)}set depthTest(t){!!(8&this.data)!==t&&(this.data^=8)}/**
   * Enables or disables writing to the depth buffer.
   * @default true
   */get depthMask(){return!!(32&this.data)}set depthMask(t){!!(32&this.data)!==t&&(this.data^=32)}/**
   * Specifies whether or not front or back-facing polygons can be culled.
   * @default false
   */get clockwiseFrontFace(){return!!(16&this.data)}set clockwiseFrontFace(t){!!(16&this.data)!==t&&(this.data^=16)}/**
   * The blend mode to be applied when this state is set. Apply a value of `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
   * Setting this mode to anything other than NO_BLEND will automatically switch blending on.
   * @default PIXI.BLEND_MODES.NORMAL
   */get blendMode(){return this._blendMode}set blendMode(t){this.blend=t!==b.NONE,this._blendMode=t}/**
   * The polygon offset. Setting this property to anything other than 0 will automatically enable polygon offset fill.
   * @default 0
   */get polygonOffset(){return this._polygonOffset}set polygonOffset(t){this.offsets=!!t,this._polygonOffset=t}static for2d(){let t=new e0;return t.depthTest=!1,t.blend=!0,t}}e0.prototype.toString=function(){return`[@pixi/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`};const e1=[];function e2(t,e){if(!t)return null;let r="";if("string"==typeof t){let e=/\.(\w{3,4})(?:$|\?|#)/i.exec(t);e&&(r=e[1].toLowerCase())}for(let i=e1.length-1;i>=0;--i){let s=e1[i];if(s.test&&s.test(t,r))return new s(t,e)}throw Error("Unrecognized source type to auto-detect Resource")}var e3={};h(e3,"Runner",()=>e4);class e4{/**
   * @param name - The function name that will be executed on the listeners added to this Runner.
   */constructor(t){this.items=[],this._name=t,this._aliasCount=0}/* eslint-disable jsdoc/require-param, jsdoc/check-param-names *//**
   * Dispatch/Broadcast Runner to all listeners added to the queue.
   * @param {...any} params - (optional) parameters to pass to each listener
   *//*  eslint-enable jsdoc/require-param, jsdoc/check-param-names */emit(t,e,r,i,s,n,a,o){if(arguments.length>8)throw Error("max arguments reached");let{name:h,items:l}=this;this._aliasCount++;for(let u=0,d=l.length;u<d;u++)l[u][h](t,e,r,i,s,n,a,o);return l===this.items&&this._aliasCount--,this}ensureNonAliasedItems(){this._aliasCount>0&&this.items.length>1&&(this._aliasCount=0,this.items=this.items.slice(0))}/**
   * Add a listener to the Runner
   *
   * Runners do not need to have scope or functions passed to them.
   * All that is required is to pass the listening object and ensure that it has contains a function that has the same name
   * as the name provided to the Runner when it was created.
   *
   * E.g. A listener passed to this Runner will require a 'complete' function.
   *
   * ```js
   * import { Runner } from '@pixi/runner';
   *
   * const complete = new Runner('complete');
   * ```
   *
   * The scope used will be the object itself.
   * @param {any} item - The object that will be listening.
   */add(t){return t[this._name]&&(this.ensureNonAliasedItems(),this.remove(t),this.items.push(t)),this}/**
   * Remove a single listener from the dispatch queue.
   * @param {any} item - The listener that you would like to remove.
   */remove(t){let e=this.items.indexOf(t);return -1!==e&&(this.ensureNonAliasedItems(),this.items.splice(e,1)),this}/**
   * Check to see if the listener is already in the Runner
   * @param {any} item - The listener that you would like to check.
   */contains(t){return this.items.includes(t)}/** Remove all listeners from the Runner */removeAll(){return this.ensureNonAliasedItems(),this.items.length=0,this}/** Remove all references, don't use after this. */destroy(){this.removeAll(),this.items=null,this._name=null}/**
   * `true` if there are no this Runner contains no listeners
   * @readonly
   */get empty(){return 0===this.items.length}/**
   * The name of the runner.
   * @readonly
   */get name(){return this._name}}Object.defineProperties(e4.prototype,{/**
   * Alias for `emit`
   * @memberof PIXI.Runner#
   * @method dispatch
   * @see PIXI.Runner#emit
   */dispatch:{value:e4.prototype.emit},/**
   * Alias for `emit`
   * @memberof PIXI.Runner#
   * @method run
   * @see PIXI.Runner#emit
   */run:{value:e4.prototype.emit}});class e5{/**
   * @param width - Width of the resource
   * @param height - Height of the resource
   */constructor(t=0,e=0){this._width=t,this._height=e,this.destroyed=!1,this.internal=!1,this.onResize=new e4("setRealSize"),this.onUpdate=new e4("update"),this.onError=new e4("onError")}/**
   * Bind to a parent BaseTexture
   * @param baseTexture - Parent texture
   */bind(t){this.onResize.add(t),this.onUpdate.add(t),this.onError.add(t),(this._width||this._height)&&this.onResize.emit(this._width,this._height)}/**
   * Unbind to a parent BaseTexture
   * @param baseTexture - Parent texture
   */unbind(t){this.onResize.remove(t),this.onUpdate.remove(t),this.onError.remove(t)}/**
   * Trigger a resize event
   * @param width - X dimension
   * @param height - Y dimension
   */resize(t,e){(t!==this._width||e!==this._height)&&(this._width=t,this._height=e,this.onResize.emit(t,e))}/**
   * Has been validated
   * @readonly
   */get valid(){return!!this._width&&!!this._height}/** Has been updated trigger event. */update(){this.destroyed||this.onUpdate.emit()}/**
   * This can be overridden to start preloading a resource
   * or do any other prepare step.
   * @protected
   * @returns Handle the validate event
   */load(){return Promise.resolve(this)}/**
   * The width of the resource.
   * @readonly
   */get width(){return this._width}/**
   * The height of the resource.
   * @readonly
   */get height(){return this._height}/**
   * Set the style, optional to override
   * @param _renderer - yeah, renderer!
   * @param _baseTexture - the texture
   * @param _glTexture - texture instance for this webgl context
   * @returns - `true` is success
   */style(t,e,r){return!1}/** Clean up anything, this happens when destroying is ready. */dispose(){}/**
   * Call when destroying resource, unbind any BaseTexture object
   * before calling this method, as reference counts are maintained
   * internally.
   */destroy(){this.destroyed||(this.destroyed=!0,this.dispose(),this.onError.removeAll(),this.onError=null,this.onResize.removeAll(),this.onResize=null,this.onUpdate.removeAll(),this.onUpdate=null)}/**
   * Abstract, used to auto-detect resource type.
   * @param {*} _source - The source object
   * @param {string} _extension - The extension of source, if set
   */static test(t,e){return!1}}class e6 extends e5{/**
   * @param source - Source buffer
   * @param options - Options
   * @param {number} options.width - Width of the texture
   * @param {number} options.height - Height of the texture
   * @param {1|2|4|8} [options.unpackAlignment=4] - The alignment of the pixel rows.
   */constructor(t,e){let{width:r,height:i}=e||{};if(!r||!i)throw Error("BufferResource width or height invalid");super(r,i),this.data=t,this.unpackAlignment=e.unpackAlignment??4}/**
   * Upload the texture to the GPU.
   * @param renderer - Upload to the renderer
   * @param baseTexture - Reference to parent texture
   * @param glTexture - glTexture
   * @returns - true is success
   */upload(t,e,r){let i=t.gl;i.pixelStorei(i.UNPACK_ALIGNMENT,this.unpackAlignment),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,e.alphaMode===M.UNPACK);let s=e.realWidth,n=e.realHeight;return r.width===s&&r.height===n?i.texSubImage2D(e.target,0,0,0,s,n,e.format,r.type,this.data):(r.width=s,r.height=n,i.texImage2D(e.target,0,r.internalFormat,s,n,0,e.format,r.type,this.data)),!0}/** Destroy and don't use after this. */dispose(){this.data=null}/**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if buffer source
   */static test(t){return null===t||t instanceof Int8Array||t instanceof Uint8Array||t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array}}const e8={scaleMode:R.NEAREST,alphaMode:M.NPM},e7=class t extends /*@__PURE__*/l(to){/**
   * @param {PIXI.Resource|HTMLImageElement|HTMLVideoElement|ImageBitmap|ICanvas|string} [resource=null] -
   *        The current resource to use, for things that aren't Resource objects, will be converted
   *        into a Resource.
   * @param options - Collection of options, default options inherited from {@link PIXI.BaseTexture.defaultOptions}.
   * @param {PIXI.MIPMAP_MODES} [options.mipmap] - If mipmapping is enabled for texture
   * @param {number} [options.anisotropicLevel] - Anisotropic filtering level of texture
   * @param {PIXI.WRAP_MODES} [options.wrapMode] - Wrap mode for textures
   * @param {PIXI.SCALE_MODES} [options.scaleMode] - Default scale mode, linear, nearest
   * @param {PIXI.FORMATS} [options.format] - GL format type
   * @param {PIXI.TYPES} [options.type] - GL data type
   * @param {PIXI.TARGETS} [options.target] - GL texture target
   * @param {PIXI.ALPHA_MODES} [options.alphaMode] - Pre multiply the image alpha
   * @param {number} [options.width=0] - Width of the texture
   * @param {number} [options.height=0] - Height of the texture
   * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - Resolution of the base texture
   * @param {object} [options.resourceOptions] - Optional resource options,
   *        see {@link PIXI.autoDetectResource autoDetectResource}
   */constructor(e=null,r=null){super(),r=Object.assign({},t.defaultOptions,r);let{alphaMode:i,mipmap:s,anisotropicLevel:n,scaleMode:a,width:o,height:h,wrapMode:l,format:u,type:d,target:c,resolution:p,resourceOptions:f}=r;!e||e instanceof e5||((e=e2(e,f)).internal=!0),this.resolution=p||G.RESOLUTION,this.width=Math.round((o||0)*this.resolution)/this.resolution,this.height=Math.round((h||0)*this.resolution)/this.resolution,this._mipmap=s,this.anisotropicLevel=n,this._wrapMode=l,this._scaleMode=a,this.format=u,this.type=d,this.target=c,this.alphaMode=i,this.uid=eM(),this.touched=0,this.isPowerOfTwo=!1,this._refreshPOT(),this._glTextures={},this.dirtyId=0,this.dirtyStyleId=0,this.cacheId=null,this.valid=o>0&&h>0,this.textureCacheIds=[],this.destroyed=!1,this.resource=null,this._batchEnabled=0,this._batchLocation=0,this.parentTextureArray=null,this.setResource(e)}/**
   * Pixel width of the source of this texture
   * @readonly
   */get realWidth(){return Math.round(this.width*this.resolution)}/**
   * Pixel height of the source of this texture
   * @readonly
   */get realHeight(){return Math.round(this.height*this.resolution)}/**
   * Mipmap mode of the texture, affects downscaled images
   * @default PIXI.MIPMAP_MODES.POW2
   */get mipmap(){return this._mipmap}set mipmap(t){this._mipmap!==t&&(this._mipmap=t,this.dirtyStyleId++)}/**
   * The scale mode to apply when scaling this texture
   * @default PIXI.SCALE_MODES.LINEAR
   */get scaleMode(){return this._scaleMode}set scaleMode(t){this._scaleMode!==t&&(this._scaleMode=t,this.dirtyStyleId++)}/**
   * How the texture wraps
   * @default PIXI.WRAP_MODES.CLAMP
   */get wrapMode(){return this._wrapMode}set wrapMode(t){this._wrapMode!==t&&(this._wrapMode=t,this.dirtyStyleId++)}/**
   * Changes style options of BaseTexture
   * @param scaleMode - Pixi scalemode
   * @param mipmap - enable mipmaps
   * @returns - this
   */setStyle(t,e){let r;return void 0!==t&&t!==this.scaleMode&&(this.scaleMode=t,r=!0),void 0!==e&&e!==this.mipmap&&(this.mipmap=e,r=!0),r&&this.dirtyStyleId++,this}/**
   * Changes w/h/resolution. Texture becomes valid if width and height are greater than zero.
   * @param desiredWidth - Desired visual width
   * @param desiredHeight - Desired visual height
   * @param resolution - Optionally set resolution
   * @returns - this
   */setSize(t,e,r){return r=r||this.resolution,this.setRealSize(t*r,e*r,r)}/**
   * Sets real size of baseTexture, preserves current resolution.
   * @param realWidth - Full rendered width
   * @param realHeight - Full rendered height
   * @param resolution - Optionally set resolution
   * @returns - this
   */setRealSize(t,e,r){return this.resolution=r||this.resolution,this.width=Math.round(t)/this.resolution,this.height=Math.round(e)/this.resolution,this._refreshPOT(),this.update(),this}/**
   * Refresh check for isPowerOfTwo texture based on size
   * @private
   */_refreshPOT(){this.isPowerOfTwo=ew(this.realWidth)&&ew(this.realHeight)}/**
   * Changes resolution
   * @param resolution - res
   * @returns - this
   */setResolution(t){let e=this.resolution;return e===t||(this.resolution=t,this.valid&&(this.width=Math.round(this.width*e)/t,this.height=Math.round(this.height*e)/t,this.emit("update",this)),this._refreshPOT()),this}/**
   * Sets the resource if it wasn't set. Throws error if resource already present
   * @param resource - that is managing this BaseTexture
   * @returns - this
   */setResource(t){if(this.resource===t)return this;if(this.resource)throw Error("Resource can be set only once");return t.bind(this),this.resource=t,this}/** Invalidates the object. Texture becomes valid if width and height are greater than zero. */update(){this.valid?(this.dirtyId++,this.dirtyStyleId++,this.emit("update",this)):this.width>0&&this.height>0&&(this.valid=!0,this.emit("loaded",this),this.emit("update",this))}/**
   * Handle errors with resources.
   * @private
   * @param event - Error event emitted.
   */onError(t){this.emit("error",this,t)}/**
   * Destroys this base texture.
   * The method stops if resource doesn't want this texture to be destroyed.
   * Removes texture from all caches.
   * @fires PIXI.BaseTexture#destroyed
   */destroy(){this.resource&&(this.resource.unbind(this),this.resource.internal&&this.resource.destroy(),this.resource=null),this.cacheId&&(delete eF[this.cacheId],delete eB[this.cacheId],this.cacheId=null),this.valid=!1,this.dispose(),t.removeFromCache(this),this.textureCacheIds=null,this.destroyed=!0,this.emit("destroyed",this),this.removeAllListeners()}/**
   * Frees the texture from WebGL memory without destroying this texture object.
   * This means you can still use the texture later which will upload it to GPU
   * memory again.
   * @fires PIXI.BaseTexture#dispose
   */dispose(){this.emit("dispose",this)}/** Utility function for BaseTexture|Texture cast. */castToBaseTexture(){return this}/**
   * Helper function that creates a base texture based on the source you provide.
   * The source can be - image url, image element, canvas element. If the
   * source is an image url or an image element and not in the base texture
   * cache, it will be created and loaded.
   * @static
   * @param {HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas|string|string[]} source - The
   *        source to create base texture from.
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   * @param {string} [options.pixiIdPrefix=pixiid] - If a source has no id, this is the prefix of the generated id
   * @param {boolean} [strict] - Enforce strict-mode, see {@link PIXI.settings.STRICT_TEXTURE_CACHE}.
   * @returns {PIXI.BaseTexture} The new base texture.
   */static from(e,r,i=G.STRICT_TEXTURE_CACHE){let s="string"==typeof e,n=null;if(s)n=e;else{if(!e._pixiId){let t=r?.pixiIdPrefix||"pixiid";e._pixiId=`${t}_${eM()}`}n=e._pixiId}let a=eF[n];if(s&&i&&!a)throw Error(`The cacheId "${n}" does not exist in BaseTextureCache.`);return a||((a=new t(e,r)).cacheId=n,t.addToCache(a,n)),a}/**
   * Create a new Texture with a BufferResource from a typed array.
   * @param buffer - The optional array to use. If no data is provided, a new Float32Array is created.
   * @param width - Width of the resource
   * @param height - Height of the resource
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   *        Default properties are different from the constructor's defaults.
   * @param {PIXI.FORMATS} [options.format] - The format is not given, the type is inferred from the
   *        type of the buffer: `RGBA` if Float32Array, Int8Array, Uint8Array, or Uint8ClampedArray,
   *        otherwise `RGBA_INTEGER`.
   * @param {PIXI.TYPES} [options.type] - The type is not given, the type is inferred from the
   *        type of the buffer. Maps Float32Array to `FLOAT`, Int32Array to `INT`, Uint32Array to
   *        `UNSIGNED_INT`, Int16Array to `SHORT`, Uint16Array to `UNSIGNED_SHORT`, Int8Array to `BYTE`,
   *        Uint8Array/Uint8ClampedArray to `UNSIGNED_BYTE`.
   * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.NPM]
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.SCALE_MODES.NEAREST]
   * @returns - The resulting new BaseTexture
   */static fromBuffer(e,r,i,s){let n,a;e=e||new Float32Array(r*i*4);let o=new e6(e,{width:r,height:i,...s?.resourceOptions});return e instanceof Float32Array?(n=E.RGBA,a=w.FLOAT):e instanceof Int32Array?(n=E.RGBA_INTEGER,a=w.INT):e instanceof Uint32Array?(n=E.RGBA_INTEGER,a=w.UNSIGNED_INT):e instanceof Int16Array?(n=E.RGBA_INTEGER,a=w.SHORT):e instanceof Uint16Array?(n=E.RGBA_INTEGER,a=w.UNSIGNED_SHORT):e instanceof Int8Array?(n=E.RGBA,a=w.BYTE):(n=E.RGBA,a=w.UNSIGNED_BYTE),o.internal=!0,new t(o,Object.assign({},e8,{type:a,format:n},s))}/**
   * Adds a BaseTexture to the global BaseTextureCache. This cache is shared across the whole PIXI object.
   * @param {PIXI.BaseTexture} baseTexture - The BaseTexture to add to the cache.
   * @param {string} id - The id that the BaseTexture will be stored against.
   */static addToCache(t,e){e&&(t.textureCacheIds.includes(e)||t.textureCacheIds.push(e),eF[e]&&eF[e]!==t&&console.warn(`BaseTexture added to the cache with an id [${e}] that already had an entry`),eF[e]=t)}/**
   * Remove a BaseTexture from the global BaseTextureCache.
   * @param {string|PIXI.BaseTexture} baseTexture - id of a BaseTexture to be removed, or a BaseTexture instance itself.
   * @returns {PIXI.BaseTexture|null} The BaseTexture that was removed.
   */static removeFromCache(t){if("string"==typeof t){let e=eF[t];if(e){let r=e.textureCacheIds.indexOf(t);return r>-1&&e.textureCacheIds.splice(r,1),delete eF[t],e}}else if(t?.textureCacheIds){for(let e=0;e<t.textureCacheIds.length;++e)delete eF[t.textureCacheIds[e]];return t.textureCacheIds.length=0,t}return null}};e7.defaultOptions={/**
   * If mipmapping is enabled for texture.
   * @type {PIXI.MIPMAP_MODES}
   * @default PIXI.MIPMAP_MODES.POW2
   */mipmap:C.POW2,/** Anisotropic filtering level of texture */anisotropicLevel:0,/**
   * Default scale mode, linear, nearest.
   * @type {PIXI.SCALE_MODES}
   * @default PIXI.SCALE_MODES.LINEAR
   */scaleMode:R.LINEAR,/**
   * Wrap mode for textures.
   * @type {PIXI.WRAP_MODES}
   * @default PIXI.WRAP_MODES.CLAMP
   */wrapMode:I.CLAMP,/**
   * Pre multiply the image alpha
   * @type {PIXI.ALPHA_MODES}
   * @default PIXI.ALPHA_MODES.UNPACK
   */alphaMode:M.UNPACK,/**
   * GL texture target
   * @type {PIXI.TARGETS}
   * @default PIXI.TARGETS.TEXTURE_2D
   */target:A.TEXTURE_2D,/**
   * GL format type
   * @type {PIXI.FORMATS}
   * @default PIXI.FORMATS.RGBA
   */format:E.RGBA,/**
   * GL data type
   * @type {PIXI.TYPES}
   * @default PIXI.TYPES.UNSIGNED_BYTE
   */type:w.UNSIGNED_BYTE},/** Global number of the texture batch, used by multi-texture renderers. */e7._globalBatch=0;let e9=e7;class rt{constructor(){this.texArray=null,this.blend=0,this.type=T.TRIANGLES,this.start=0,this.size=0,this.data=null}}let re=0;class rr{/**
   * @param {PIXI.IArrayBuffer} data - the data to store in the buffer.
   * @param _static - `true` for static buffer
   * @param index - `true` for index buffer
   */constructor(t,e=!0,r=!1){this.data=t||new Float32Array(1),this._glBuffers={},this._updateID=0,this.index=r,this.static=e,this.id=re++,this.disposeRunner=new e4("disposeBuffer")}// TODO could explore flagging only a partial upload?
/**
   * Flags this buffer as requiring an upload to the GPU.
   * @param {PIXI.IArrayBuffer|number[]} [data] - the data to update in the buffer.
   */update(t){t instanceof Array&&(t=new Float32Array(t)),this.data=t||this.data,this._updateID++}/** Disposes WebGL resources that are connected to this geometry. */dispose(){this.disposeRunner.emit(this,!1)}/** Destroys the buffer. */destroy(){this.dispose(),this.data=null}/**
   * Flags whether this is an index buffer.
   *
   * Index buffers are of type `ELEMENT_ARRAY_BUFFER`. Note that setting this property to false will make
   * the buffer of type `ARRAY_BUFFER`.
   *
   * For backwards compatibility.
   */set index(t){this.type=t?L.ELEMENT_ARRAY_BUFFER:L.ARRAY_BUFFER}get index(){return this.type===L.ELEMENT_ARRAY_BUFFER}/**
   * Helper function that creates a buffer based on an array or TypedArray
   * @param {ArrayBufferView | number[]} data - the TypedArray that the buffer will store. If this is a regular Array it will be converted to a Float32Array.
   * @returns - A new Buffer based on the data provided.
   */static from(t){return t instanceof Array&&(t=new Float32Array(t)),new rr(t)}}class ri{/**
   * @param buffer - the id of the buffer that this attribute will look for
   * @param size - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2.
   * @param normalized - should the data be normalized.
   * @param {PIXI.TYPES} [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
   * @param [stride=0] - How far apart, in bytes, the start of each value is. (used for interleaving data)
   * @param [start=0] - How far into the array to start reading values (used for interleaving data)
   * @param [instance=false] - Whether the geometry is instanced.
   * @param [divisor=1] - Divisor to use when doing instanced rendering
   */constructor(t,e=0,r=!1,i=w.FLOAT,s,n,a,o=1){this.buffer=t,this.size=e,this.normalized=r,this.type=i,this.stride=s,this.start=n,this.instance=a,this.divisor=o}/** Destroys the Attribute. */destroy(){this.buffer=null}/**
   * Helper function that creates an Attribute based on the information provided
   * @param buffer - the id of the buffer that this attribute will look for
   * @param [size=0] - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2
   * @param [normalized=false] - should the data be normalized.
   * @param [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
   * @param [stride=0] - How far apart, in bytes, the start of each value is. (used for interleaving data)
   * @returns - A new {@link PIXI.Attribute} based on the information provided
   */static from(t,e,r,i,s){return new ri(t,e,r,i,s)}}const rs={Float32Array:Float32Array,Uint32Array:Uint32Array,Int32Array:Int32Array,Uint8Array:Uint8Array},rn={5126:4,5123:2,5121:1};let ra=0;const ro={Float32Array:Float32Array,Uint32Array:Uint32Array,Int32Array:Int32Array,Uint8Array:Uint8Array,Uint16Array:Uint16Array};class rh{/**
   * @param buffers - An array of buffers. optional.
   * @param attributes - Of the geometry, optional structure of the attributes layout
   */constructor(t=[],e={}){this.buffers=t,this.indexBuffer=null,this.attributes=e,this.glVertexArrayObjects={},this.id=ra++,this.instanced=!1,this.instanceCount=1,this.disposeRunner=new e4("disposeGeometry"),this.refCount=0}/**
   *
   * Adds an attribute to the geometry
   * Note: `stride` and `start` should be `undefined` if you dont know them, not 0!
   * @param id - the name of the attribute (matching up to a shader)
   * @param {PIXI.Buffer|number[]} buffer - the buffer that holds the data of the attribute . You can also provide an Array and a buffer will be created from it.
   * @param size - the size of the attribute. If you have 2 floats per vertex (eg position x and y) this would be 2
   * @param normalized - should the data be normalized.
   * @param [type=PIXI.TYPES.FLOAT] - what type of number is the attribute. Check {@link PIXI.TYPES} to see the ones available
   * @param [stride=0] - How far apart, in bytes, the start of each value is. (used for interleaving data)
   * @param [start=0] - How far into the array to start reading values (used for interleaving data)
   * @param instance - Instancing flag
   * @returns - Returns self, useful for chaining.
   */addAttribute(t,e,r=0,i=!1,s,n,a,o=!1){if(!e)throw Error("You must pass a buffer when creating an attribute");e instanceof rr||(e instanceof Array&&(e=new Float32Array(e)),e=new rr(e));let h=t.split("|");if(h.length>1){for(let t=0;t<h.length;t++)this.addAttribute(h[t],e,r,i,s);return this}let l=this.buffers.indexOf(e);return -1===l&&(this.buffers.push(e),l=this.buffers.length-1),this.attributes[t]=new ri(l,r,i,s,n,a,o),this.instanced=this.instanced||o,this}/**
   * Returns the requested attribute.
   * @param id - The name of the attribute required
   * @returns - The attribute requested.
   */getAttribute(t){return this.attributes[t]}/**
   * Returns the requested buffer.
   * @param id - The name of the buffer required.
   * @returns - The buffer requested.
   */getBuffer(t){return this.buffers[this.getAttribute(t).buffer]}/**
   *
   * Adds an index buffer to the geometry
   * The index buffer contains integers, three for each triangle in the geometry, which reference the various attribute buffers (position, colour, UV coordinates, other UV coordinates, normal, …). There is only ONE index buffer.
   * @param {PIXI.Buffer|number[]} [buffer] - The buffer that holds the data of the index buffer. You can also provide an Array and a buffer will be created from it.
   * @returns - Returns self, useful for chaining.
   */addIndex(t){return t instanceof rr||(t instanceof Array&&(t=new Uint16Array(t)),t=new rr(t)),t.type=L.ELEMENT_ARRAY_BUFFER,this.indexBuffer=t,this.buffers.includes(t)||this.buffers.push(t),this}/**
   * Returns the index buffer
   * @returns - The index buffer.
   */getIndex(){return this.indexBuffer}/**
   * This function modifies the structure so that all current attributes become interleaved into a single buffer
   * This can be useful if your model remains static as it offers a little performance boost
   * @returns - Returns self, useful for chaining.
   */interleave(){let t;if(1===this.buffers.length||2===this.buffers.length&&this.indexBuffer)return this;let e=[],r=[],i=new rr;for(t in this.attributes){let i=this.attributes[t],s=this.buffers[i.buffer];e.push(s.data),r.push(i.size*rn[i.type]/4),i.buffer=0}for(i.data=function(t,e){let r=0,i=0,s={};for(let s=0;s<t.length;s++)i+=e[s],r+=t[s].length;let n=new ArrayBuffer(4*r),a=null,o=0;for(let r=0;r<t.length;r++){let h=e[r],l=t[r],u=eb(l);s[u]||(s[u]=new rs[u](n)),a=s[u];for(let t=0;t<l.length;t++){let e=(t/h|0)*i+o,r=t%h;a[e+r]=l[t]}o+=h}return new Float32Array(n)}(e,r),t=0;t<this.buffers.length;t++)this.buffers[t]!==this.indexBuffer&&this.buffers[t].destroy();return this.buffers=[i],this.indexBuffer&&this.buffers.push(this.indexBuffer),this}/** Get the size of the geometries, in vertices. */getSize(){for(let t in this.attributes){let e=this.attributes[t];return this.buffers[e.buffer].data.length/(e.stride/4||e.size)}return 0}/** Disposes WebGL resources that are connected to this geometry. */dispose(){this.disposeRunner.emit(this,!1)}/** Destroys the geometry. */destroy(){this.dispose(),this.buffers=null,this.indexBuffer=null,this.attributes=null}/**
   * Returns a clone of the geometry.
   * @returns - A new clone of this geometry.
   */clone(){let t=new rh;for(let e=0;e<this.buffers.length;e++)t.buffers[e]=new rr(this.buffers[e].data.slice(0));for(let e in this.attributes){let r=this.attributes[e];t.attributes[e]=new ri(r.buffer,r.size,r.normalized,r.type,r.stride,r.start,r.instance)}return this.indexBuffer&&(t.indexBuffer=t.buffers[this.buffers.indexOf(this.indexBuffer)],t.indexBuffer.type=L.ELEMENT_ARRAY_BUFFER),t}/**
   * Merges an array of geometries into a new single one.
   *
   * Geometry attribute styles must match for this operation to work.
   * @param geometries - array of geometries to merge
   * @returns - Shiny new geometry!
   */static merge(t){let e;let r=new rh,i=[],s=[],n=[];for(let r=0;r<t.length;r++){e=t[r];for(let t=0;t<e.buffers.length;t++)s[t]=s[t]||0,s[t]+=e.buffers[t].data.length,n[t]=0}for(let t=0;t<e.buffers.length;t++)i[t]=new ro[eb(e.buffers[t].data)](s[t]),r.buffers[t]=new rr(i[t]);for(let r=0;r<t.length;r++){e=t[r];for(let t=0;t<e.buffers.length;t++)i[t].set(e.buffers[t].data,n[t]),n[t]+=e.buffers[t].data.length}if(r.attributes=e.attributes,e.indexBuffer){r.indexBuffer=r.buffers[e.buffers.indexOf(e.indexBuffer)],r.indexBuffer.type=L.ELEMENT_ARRAY_BUFFER;let i=0,s=0,n=0,a=0;for(let t=0;t<e.buffers.length;t++)if(e.buffers[t]!==e.indexBuffer){a=t;break}for(let t in e.attributes){let r=e.attributes[t];(0|r.buffer)===a&&(s+=r.size*rn[r.type]/4)}for(let e=0;e<t.length;e++){let o=t[e].indexBuffer.data;for(let t=0;t<o.length;t++)r.indexBuffer.data[t+n]+=i;i+=t[e].buffers[a].data.length/s,n+=o.length}}return r}}class rl extends rh{/**
   * @param {boolean} [_static=false] - Optimization flag, where `false`
   *        is updated every frame, `true` doesn't change frame-to-frame.
   */constructor(t=!1){super(),this._buffer=new rr(null,t,!1),this._indexBuffer=new rr(null,t,!0),this.addAttribute("aVertexPosition",this._buffer,2,!1,w.FLOAT).addAttribute("aTextureCoord",this._buffer,2,!1,w.FLOAT).addAttribute("aColor",this._buffer,4,!0,w.UNSIGNED_BYTE).addAttribute("aTextureId",this._buffer,1,!0,w.FLOAT).addIndex(this._indexBuffer)}}var ru={};h(ru,"Circle",()=>ry),h(ru,"DEG_TO_RAD",()=>rp),h(ru,"Ellipse",()=>rv),h(ru,"Matrix",()=>rT),h(ru,"ObservablePoint",()=>rP),h(ru,"PI_2",()=>rd),h(ru,"Point",()=>rm),h(ru,"Polygon",()=>rx),h(ru,"RAD_TO_DEG",()=>rc),h(ru,"Rectangle",()=>r_),h(ru,"RoundedRectangle",()=>rb),h(ru,"SHAPES",()=>rf),h(ru,"Transform",()=>rO),h(ru,"groupD8",()=>rM);const rd=2*Math.PI,rc=180/Math.PI,rp=Math.PI/180;var rf=((lr=rf||{})[lr.POLY=0]="POLY",lr[lr.RECT=1]="RECT",lr[lr.CIRC=2]="CIRC",lr[lr.ELIP=3]="ELIP",lr[lr.RREC=4]="RREC",lr);class rm{/**
   * Creates a new `Point`
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */constructor(t=0,e=0){this.x=0,this.y=0,this.x=t,this.y=e}/**
   * Creates a clone of this point
   * @returns A clone of this point
   */clone(){return new rm(this.x,this.y)}/**
   * Copies `x` and `y` from the given point into this point
   * @param p - The point to copy from
   * @returns The point instance itself
   */copyFrom(t){return this.set(t.x,t.y),this}/**
   * Copies this point's x and y into the given point (`p`).
   * @param p - The point to copy to. Can be any of type that is or extends `IPointData`
   * @returns The point (`p`) with values updated
   */copyTo(t){return t.set(this.x,this.y),t}/**
   * Accepts another point (`p`) and returns `true` if the given point is equal to this point
   * @param p - The point to check
   * @returns Returns `true` if both `x` and `y` are equal
   */equals(t){return t.x===this.x&&t.y===this.y}/**
   * Sets the point to a new `x` and `y` position.
   * If `y` is omitted, both `x` and `y` will be set to `x`.
   * @param {number} [x=0] - position of the point on the `x` axis
   * @param {number} [y=x] - position of the point on the `y` axis
   * @returns The point instance itself
   */set(t=0,e=t){return this.x=t,this.y=e,this}}rm.prototype.toString=function(){return`[@pixi/math:Point x=${this.x} y=${this.y}]`};const rg=[new rm,new rm,new rm,new rm];class r_{/**
   * @param x - The X coordinate of the upper-left corner of the rectangle
   * @param y - The Y coordinate of the upper-left corner of the rectangle
   * @param width - The overall width of the rectangle
   * @param height - The overall height of the rectangle
   */constructor(t=0,e=0,r=0,i=0){this.x=Number(t),this.y=Number(e),this.width=Number(r),this.height=Number(i),this.type=rf.RECT}/** Returns the left edge of the rectangle. */get left(){return this.x}/** Returns the right edge of the rectangle. */get right(){return this.x+this.width}/** Returns the top edge of the rectangle. */get top(){return this.y}/** Returns the bottom edge of the rectangle. */get bottom(){return this.y+this.height}/** A constant empty rectangle. */static get EMPTY(){return new r_(0,0,0,0)}/**
   * Creates a clone of this Rectangle
   * @returns a copy of the rectangle
   */clone(){return new r_(this.x,this.y,this.width,this.height)}/**
   * Copies another rectangle to this one.
   * @param rectangle - The rectangle to copy from.
   * @returns Returns itself.
   */copyFrom(t){return this.x=t.x,this.y=t.y,this.width=t.width,this.height=t.height,this}/**
   * Copies this rectangle to another one.
   * @param rectangle - The rectangle to copy to.
   * @returns Returns given parameter.
   */copyTo(t){return t.x=this.x,t.y=this.y,t.width=this.width,t.height=this.height,t}/**
   * Checks whether the x and y coordinates given are contained within this Rectangle
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coordinates are within this Rectangle
   */contains(t,e){return!(this.width<=0)&&!(this.height<=0)&&t>=this.x&&t<this.x+this.width&&e>=this.y&&e<this.y+this.height}/**
   * Determines whether the `other` Rectangle transformed by `transform` intersects with `this` Rectangle object.
   * Returns true only if the area of the intersection is >0, this means that Rectangles
   * sharing a side are not overlapping. Another side effect is that an arealess rectangle
   * (width or height equal to zero) can't intersect any other rectangle.
   * @param {Rectangle} other - The Rectangle to intersect with `this`.
   * @param {Matrix} transform - The transformation matrix of `other`.
   * @returns {boolean} A value of `true` if the transformed `other` Rectangle intersects with `this`; otherwise `false`.
   */intersects(t,e){if(!e){let e=this.x<t.x?t.x:this.x;if((this.right>t.right?t.right:this.right)<=e)return!1;let r=this.y<t.y?t.y:this.y;return(this.bottom>t.bottom?t.bottom:this.bottom)>r}let r=this.left,i=this.right,s=this.top,n=this.bottom;if(i<=r||n<=s)return!1;let a=rg[0].set(t.left,t.top),o=rg[1].set(t.left,t.bottom),h=rg[2].set(t.right,t.top),l=rg[3].set(t.right,t.bottom);if(h.x<=a.x||o.y<=a.y)return!1;let u=Math.sign(e.a*e.d-e.b*e.c);if(0===u||(e.apply(a,a),e.apply(o,o),e.apply(h,h),e.apply(l,l),Math.max(a.x,o.x,h.x,l.x)<=r||Math.min(a.x,o.x,h.x,l.x)>=i||Math.max(a.y,o.y,h.y,l.y)<=s||Math.min(a.y,o.y,h.y,l.y)>=n))return!1;let d=u*(o.y-a.y),c=u*(a.x-o.x),p=d*r+c*s,f=d*i+c*s,m=d*r+c*n,g=d*i+c*n;if(Math.max(p,f,m,g)<=d*a.x+c*a.y||Math.min(p,f,m,g)>=d*l.x+c*l.y)return!1;let _=u*(a.y-h.y),y=u*(h.x-a.x),v=_*r+y*s,x=_*i+y*s,b=_*r+y*n,T=_*i+y*n;return!(Math.max(v,x,b,T)<=_*a.x+y*a.y||Math.min(v,x,b,T)>=_*l.x+y*l.y)}/**
   * Pads the rectangle making it grow in all directions.
   * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
   * @param paddingX - The horizontal padding amount.
   * @param paddingY - The vertical padding amount.
   * @returns Returns itself.
   */pad(t=0,e=t){return this.x-=t,this.y-=e,this.width+=2*t,this.height+=2*e,this}/**
   * Fits this rectangle around the passed one.
   * @param rectangle - The rectangle to fit.
   * @returns Returns itself.
   */fit(t){let e=Math.max(this.x,t.x),r=Math.min(this.x+this.width,t.x+t.width),i=Math.max(this.y,t.y),s=Math.min(this.y+this.height,t.y+t.height);return this.x=e,this.width=Math.max(r-e,0),this.y=i,this.height=Math.max(s-i,0),this}/**
   * Enlarges rectangle that way its corners lie on grid
   * @param resolution - resolution
   * @param eps - precision
   * @returns Returns itself.
   */ceil(t=1,e=.001){let r=Math.ceil((this.x+this.width-e)*t)/t,i=Math.ceil((this.y+this.height-e)*t)/t;return this.x=Math.floor((this.x+e)*t)/t,this.y=Math.floor((this.y+e)*t)/t,this.width=r-this.x,this.height=i-this.y,this}/**
   * Enlarges this rectangle to include the passed rectangle.
   * @param rectangle - The rectangle to include.
   * @returns Returns itself.
   */enlarge(t){let e=Math.min(this.x,t.x),r=Math.max(this.x+this.width,t.x+t.width),i=Math.min(this.y,t.y),s=Math.max(this.y+this.height,t.y+t.height);return this.x=e,this.width=r-e,this.y=i,this.height=s-i,this}}r_.prototype.toString=function(){return`[@pixi/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`};class ry{/**
   * @param x - The X coordinate of the center of this circle
   * @param y - The Y coordinate of the center of this circle
   * @param radius - The radius of the circle
   */constructor(t=0,e=0,r=0){this.x=t,this.y=e,this.radius=r,this.type=rf.CIRC}/**
   * Creates a clone of this Circle instance
   * @returns A copy of the Circle
   */clone(){return new ry(this.x,this.y,this.radius)}/**
   * Checks whether the x and y coordinates given are contained within this circle
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coordinates are within this Circle
   */contains(t,e){if(this.radius<=0)return!1;let r=this.radius*this.radius,i=this.x-t,s=this.y-e;return i*=i,s*=s,i+s<=r}/**
   * Returns the framing rectangle of the circle as a Rectangle object
   * @returns The framing rectangle
   */getBounds(){return new r_(this.x-this.radius,this.y-this.radius,2*this.radius,2*this.radius)}}ry.prototype.toString=function(){return`[@pixi/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`};class rv{/**
   * @param x - The X coordinate of the center of this ellipse
   * @param y - The Y coordinate of the center of this ellipse
   * @param halfWidth - The half width of this ellipse
   * @param halfHeight - The half height of this ellipse
   */constructor(t=0,e=0,r=0,i=0){this.x=t,this.y=e,this.width=r,this.height=i,this.type=rf.ELIP}/**
   * Creates a clone of this Ellipse instance
   * @returns {PIXI.Ellipse} A copy of the ellipse
   */clone(){return new rv(this.x,this.y,this.width,this.height)}/**
   * Checks whether the x and y coordinates given are contained within this ellipse
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coords are within this ellipse
   */contains(t,e){if(this.width<=0||this.height<=0)return!1;let r=(t-this.x)/this.width,i=(e-this.y)/this.height;return r*=r,i*=i,r+i<=1}/**
   * Returns the framing rectangle of the ellipse as a Rectangle object
   * @returns The framing rectangle
   */getBounds(){return new r_(this.x-this.width,this.y-this.height,this.width,this.height)}}rv.prototype.toString=function(){return`[@pixi/math:Ellipse x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`};class rx{/**
   * @param {PIXI.IPointData[]|number[]} points - This can be an array of Points
   *  that form the polygon, a flat array of numbers that will be interpreted as [x,y, x,y, ...], or
   *  the arguments passed can be all the points of the polygon e.g.
   *  `new Polygon(new Point(), new Point(), ...)`, or the arguments passed can be flat
   *  x,y values e.g. `new Polygon(x,y, x,y, x,y, ...)` where `x` and `y` are Numbers.
   */constructor(...t){let e=Array.isArray(t[0])?t[0]:t;if("number"!=typeof e[0]){let t=[];for(let r=0,i=e.length;r<i;r++)t.push(e[r].x,e[r].y);e=t}this.points=e,this.type=rf.POLY,this.closeStroke=!0}/**
   * Creates a clone of this polygon.
   * @returns - A copy of the polygon.
   */clone(){let t=this.points.slice(),e=new rx(t);return e.closeStroke=this.closeStroke,e}/**
   * Checks whether the x and y coordinates passed to this function are contained within this polygon.
   * @param x - The X coordinate of the point to test.
   * @param y - The Y coordinate of the point to test.
   * @returns - Whether the x/y coordinates are within this polygon.
   */contains(t,e){let r=!1,i=this.points.length/2;for(let s=0,n=i-1;s<i;n=s++){let i=this.points[2*s],a=this.points[2*s+1],o=this.points[2*n],h=this.points[2*n+1];a>e!=h>e&&t<(o-i)*((e-a)/(h-a))+i&&(r=!r)}return r}}rx.prototype.toString=function(){return`[@pixi/math:PolygoncloseStroke=${this.closeStroke}points=${this.points.reduce((t,e)=>`${t}, ${e}`,"")}]`};class rb{/**
   * @param x - The X coordinate of the upper-left corner of the rounded rectangle
   * @param y - The Y coordinate of the upper-left corner of the rounded rectangle
   * @param width - The overall width of this rounded rectangle
   * @param height - The overall height of this rounded rectangle
   * @param radius - Controls the radius of the rounded corners
   */constructor(t=0,e=0,r=0,i=0,s=20){this.x=t,this.y=e,this.width=r,this.height=i,this.radius=s,this.type=rf.RREC}/**
   * Creates a clone of this Rounded Rectangle.
   * @returns - A copy of the rounded rectangle.
   */clone(){return new rb(this.x,this.y,this.width,this.height,this.radius)}/**
   * Checks whether the x and y coordinates given are contained within this Rounded Rectangle
   * @param x - The X coordinate of the point to test.
   * @param y - The Y coordinate of the point to test.
   * @returns - Whether the x/y coordinates are within this Rounded Rectangle.
   */contains(t,e){if(this.width<=0||this.height<=0)return!1;if(t>=this.x&&t<=this.x+this.width&&e>=this.y&&e<=this.y+this.height){let r=Math.max(0,Math.min(this.radius,Math.min(this.width,this.height)/2));if(e>=this.y+r&&e<=this.y+this.height-r||t>=this.x+r&&t<=this.x+this.width-r)return!0;let i=t-(this.x+r),s=e-(this.y+r),n=r*r;if(i*i+s*s<=n||(i=t-(this.x+this.width-r))*i+s*s<=n||i*i+(s=e-(this.y+this.height-r))*s<=n||(i=t-(this.x+r))*i+s*s<=n)return!0}return!1}}rb.prototype.toString=function(){return`[@pixi/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`};class rT{/**
   * @param a - x scale
   * @param b - y skew
   * @param c - x skew
   * @param d - y scale
   * @param tx - x translation
   * @param ty - y translation
   */constructor(t=1,e=0,r=0,i=1,s=0,n=0){this.array=null,this.a=t,this.b=e,this.c=r,this.d=i,this.tx=s,this.ty=n}/**
   * Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:
   *
   * a = array[0]
   * b = array[1]
   * c = array[3]
   * d = array[4]
   * tx = array[2]
   * ty = array[5]
   * @param array - The array that the matrix will be populated from.
   */fromArray(t){this.a=t[0],this.b=t[1],this.c=t[3],this.d=t[4],this.tx=t[2],this.ty=t[5]}/**
   * Sets the matrix properties.
   * @param a - Matrix component
   * @param b - Matrix component
   * @param c - Matrix component
   * @param d - Matrix component
   * @param tx - Matrix component
   * @param ty - Matrix component
   * @returns This matrix. Good for chaining method calls.
   */set(t,e,r,i,s,n){return this.a=t,this.b=e,this.c=r,this.d=i,this.tx=s,this.ty=n,this}/**
   * Creates an array from the current Matrix object.
   * @param transpose - Whether we need to transpose the matrix or not
   * @param [out=new Float32Array(9)] - If provided the array will be assigned to out
   * @returns The newly created array which contains the matrix
   */toArray(t,e){this.array||(this.array=new Float32Array(9));let r=e||this.array;return t?(r[0]=this.a,r[1]=this.b,r[2]=0,r[3]=this.c,r[4]=this.d,r[5]=0,r[6]=this.tx,r[7]=this.ty):(r[0]=this.a,r[1]=this.c,r[2]=this.tx,r[3]=this.b,r[4]=this.d,r[5]=this.ty,r[6]=0,r[7]=0),r[8]=1,r}/**
   * Get a new position with the current transformation applied.
   * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
   * @param pos - The origin
   * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {PIXI.Point} The new point, transformed through this matrix
   */apply(t,e){e=e||new rm;let r=t.x,i=t.y;return e.x=this.a*r+this.c*i+this.tx,e.y=this.b*r+this.d*i+this.ty,e}/**
   * Get a new position with the inverse of the current transformation applied.
   * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
   * @param pos - The origin
   * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {PIXI.Point} The new point, inverse-transformed through this matrix
   */applyInverse(t,e){e=e||new rm;let r=1/(this.a*this.d+-(this.c*this.b)),i=t.x,s=t.y;return e.x=this.d*r*i+-this.c*r*s+(this.ty*this.c-this.tx*this.d)*r,e.y=this.a*r*s+-this.b*r*i+(-this.ty*this.a+this.tx*this.b)*r,e}/**
   * Translates the matrix on the x and y.
   * @param x - How much to translate x by
   * @param y - How much to translate y by
   * @returns This matrix. Good for chaining method calls.
   */translate(t,e){return this.tx+=t,this.ty+=e,this}/**
   * Applies a scale transformation to the matrix.
   * @param x - The amount to scale horizontally
   * @param y - The amount to scale vertically
   * @returns This matrix. Good for chaining method calls.
   */scale(t,e){return this.a*=t,this.d*=e,this.c*=t,this.b*=e,this.tx*=t,this.ty*=e,this}/**
   * Applies a rotation transformation to the matrix.
   * @param angle - The angle in radians.
   * @returns This matrix. Good for chaining method calls.
   */rotate(t){let e=Math.cos(t),r=Math.sin(t),i=this.a,s=this.c,n=this.tx;return this.a=i*e-this.b*r,this.b=i*r+this.b*e,this.c=s*e-this.d*r,this.d=s*r+this.d*e,this.tx=n*e-this.ty*r,this.ty=n*r+this.ty*e,this}/**
   * Appends the given Matrix to this Matrix.
   * @param matrix - The matrix to append.
   * @returns This matrix. Good for chaining method calls.
   */append(t){let e=this.a,r=this.b,i=this.c,s=this.d;return this.a=t.a*e+t.b*i,this.b=t.a*r+t.b*s,this.c=t.c*e+t.d*i,this.d=t.c*r+t.d*s,this.tx=t.tx*e+t.ty*i+this.tx,this.ty=t.tx*r+t.ty*s+this.ty,this}/**
   * Sets the matrix based on all the available properties
   * @param x - Position on the x axis
   * @param y - Position on the y axis
   * @param pivotX - Pivot on the x axis
   * @param pivotY - Pivot on the y axis
   * @param scaleX - Scale on the x axis
   * @param scaleY - Scale on the y axis
   * @param rotation - Rotation in radians
   * @param skewX - Skew on the x axis
   * @param skewY - Skew on the y axis
   * @returns This matrix. Good for chaining method calls.
   */setTransform(t,e,r,i,s,n,a,o,h){return this.a=Math.cos(a+h)*s,this.b=Math.sin(a+h)*s,this.c=-Math.sin(a-o)*n,this.d=Math.cos(a-o)*n,this.tx=t-(r*this.a+i*this.c),this.ty=e-(r*this.b+i*this.d),this}/**
   * Prepends the given Matrix to this Matrix.
   * @param matrix - The matrix to prepend
   * @returns This matrix. Good for chaining method calls.
   */prepend(t){let e=this.tx;if(1!==t.a||0!==t.b||0!==t.c||1!==t.d){let e=this.a,r=this.c;this.a=e*t.a+this.b*t.c,this.b=e*t.b+this.b*t.d,this.c=r*t.a+this.d*t.c,this.d=r*t.b+this.d*t.d}return this.tx=e*t.a+this.ty*t.c+t.tx,this.ty=e*t.b+this.ty*t.d+t.ty,this}/**
   * Decomposes the matrix (x, y, scaleX, scaleY, and rotation) and sets the properties on to a transform.
   * @param transform - The transform to apply the properties to.
   * @returns The transform with the newly applied properties
   */decompose(t){let e=this.a,r=this.b,i=this.c,s=this.d,n=t.pivot,a=-Math.atan2(-i,s),o=Math.atan2(r,e),h=Math.abs(a+o);return h<1e-5||1e-5>Math.abs(rd-h)?(t.rotation=o,t.skew.x=t.skew.y=0):(t.rotation=0,t.skew.x=a,t.skew.y=o),t.scale.x=Math.sqrt(e*e+r*r),t.scale.y=Math.sqrt(i*i+s*s),t.position.x=this.tx+(n.x*e+n.y*i),t.position.y=this.ty+(n.x*r+n.y*s),t}/**
   * Inverts this matrix
   * @returns This matrix. Good for chaining method calls.
   */invert(){let t=this.a,e=this.b,r=this.c,i=this.d,s=this.tx,n=t*i-e*r;return this.a=i/n,this.b=-e/n,this.c=-r/n,this.d=t/n,this.tx=(r*this.ty-i*s)/n,this.ty=-(t*this.ty-e*s)/n,this}/**
   * Resets this Matrix to an identity (default) matrix.
   * @returns This matrix. Good for chaining method calls.
   */identity(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this}/**
   * Creates a new Matrix object with the same values as this one.
   * @returns A copy of this matrix. Good for chaining method calls.
   */clone(){let t=new rT;return t.a=this.a,t.b=this.b,t.c=this.c,t.d=this.d,t.tx=this.tx,t.ty=this.ty,t}/**
   * Changes the values of the given matrix to be the same as the ones in this matrix
   * @param matrix - The matrix to copy to.
   * @returns The matrix given in parameter with its values updated.
   */copyTo(t){return t.a=this.a,t.b=this.b,t.c=this.c,t.d=this.d,t.tx=this.tx,t.ty=this.ty,t}/**
   * Changes the values of the matrix to be the same as the ones in given matrix
   * @param {PIXI.Matrix} matrix - The matrix to copy from.
   * @returns {PIXI.Matrix} this
   */copyFrom(t){return this.a=t.a,this.b=t.b,this.c=t.c,this.d=t.d,this.tx=t.tx,this.ty=t.ty,this}/**
   * A default (identity) matrix
   * @readonly
   */static get IDENTITY(){return new rT}/**
   * A temp matrix
   * @readonly
   */static get TEMP_MATRIX(){return new rT}}rT.prototype.toString=function(){return`[@pixi/math:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`};const rE=[1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1,0,1],rA=[0,1,1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1],rw=[0,-1,-1,-1,0,1,1,1,0,1,1,1,0,-1,-1,-1],rS=[1,1,0,-1,-1,-1,0,1,-1,-1,0,1,1,1,0,-1],rR=[],rI=[],rC=Math.sign;!function(){for(let t=0;t<16;t++){let e=[];rR.push(e);for(let r=0;r<16;r++){let i=rC(rE[t]*rE[r]+rw[t]*rA[r]),s=rC(rA[t]*rE[r]+rS[t]*rA[r]),n=rC(rE[t]*rw[r]+rw[t]*rS[r]),a=rC(rA[t]*rw[r]+rS[t]*rS[r]);for(let t=0;t<16;t++)if(rE[t]===i&&rA[t]===s&&rw[t]===n&&rS[t]===a){e.push(t);break}}}for(let t=0;t<16;t++){let e=new rT;e.set(rE[t],rA[t],rw[t],rS[t],0,0),rI.push(e)}}();const rM={/**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 0°       | East      |
   * @readonly
   */E:0,/**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 45°↻     | Southeast |
   * @readonly
   */SE:1,/**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 90°↻     | South     |
   * @readonly
   */S:2,/**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 135°↻    | Southwest |
   * @readonly
   */SW:3,/**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 180°     | West      |
   * @readonly
   */W:4,/**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -135°/225°↻ | Northwest    |
   * @readonly
   */NW:5,/**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -90°/270°↻  | North        |
   * @readonly
   */N:6,/**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -45°/315°↻  | Northeast    |
   * @readonly
   */NE:7,/**
   * Reflection about Y-axis.
   * @readonly
   */MIRROR_VERTICAL:8,/**
   * Reflection about the main diagonal.
   * @readonly
   */MAIN_DIAGONAL:10,/**
   * Reflection about X-axis.
   * @readonly
   */MIRROR_HORIZONTAL:12,/**
   * Reflection about reverse diagonal.
   * @readonly
   */REVERSE_DIAGONAL:14,/**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The X-component of the U-axis
   *    after rotating the axes.
   */uX:t=>rE[t],/**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the U-axis
   *    after rotating the axes.
   */uY:t=>rA[t],/**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The X-component of the V-axis
   *    after rotating the axes.
   */vX:t=>rw[t],/**
   * @param {PIXI.GD8Symmetry} ind - sprite rotation angle.
   * @returns {PIXI.GD8Symmetry} The Y-component of the V-axis
   *    after rotating the axes.
   */vY:t=>rS[t],/**
   * @param {PIXI.GD8Symmetry} rotation - symmetry whose opposite
   *   is needed. Only rotations have opposite symmetries while
   *   reflections don't.
   * @returns {PIXI.GD8Symmetry} The opposite symmetry of `rotation`
   */inv:t=>8&t?15&t:7&-t,/**
   * Composes the two D8 operations.
   *
   * Taking `^` as reflection:
   *
   * |       | E=0 | S=2 | W=4 | N=6 | E^=8 | S^=10 | W^=12 | N^=14 |
   * |-------|-----|-----|-----|-----|------|-------|-------|-------|
   * | E=0   | E   | S   | W   | N   | E^   | S^    | W^    | N^    |
   * | S=2   | S   | W   | N   | E   | S^   | W^    | N^    | E^    |
   * | W=4   | W   | N   | E   | S   | W^   | N^    | E^    | S^    |
   * | N=6   | N   | E   | S   | W   | N^   | E^    | S^    | W^    |
   * | E^=8  | E^  | N^  | W^  | S^  | E    | N     | W     | S     |
   * | S^=10 | S^  | E^  | N^  | W^  | S    | E     | N     | W     |
   * | W^=12 | W^  | S^  | E^  | N^  | W    | S     | E     | N     |
   * | N^=14 | N^  | W^  | S^  | E^  | N    | W     | S     | E     |
   *
   * [This is a Cayley table]{@link https://en.wikipedia.org/wiki/Cayley_table}
   * @param {PIXI.GD8Symmetry} rotationSecond - Second operation, which
   *   is the row in the above cayley table.
   * @param {PIXI.GD8Symmetry} rotationFirst - First operation, which
   *   is the column in the above cayley table.
   * @returns {PIXI.GD8Symmetry} Composed operation
   */add:(t,e)=>rR[t][e],/**
   * Reverse of `add`.
   * @param {PIXI.GD8Symmetry} rotationSecond - Second operation
   * @param {PIXI.GD8Symmetry} rotationFirst - First operation
   * @returns {PIXI.GD8Symmetry} Result
   */sub:(t,e)=>rR[t][rM.inv(e)],/**
   * Adds 180 degrees to rotation, which is a commutative
   * operation.
   * @param {number} rotation - The number to rotate.
   * @returns {number} Rotated number
   */rotate180:t=>4^t,/**
   * Checks if the rotation angle is vertical, i.e. south
   * or north. It doesn't work for reflections.
   * @param {PIXI.GD8Symmetry} rotation - The number to check.
   * @returns {boolean} Whether or not the direction is vertical
   */isVertical:t=>(3&t)==2,// rotation % 4 === 2
/**
   * Approximates the vector `V(dx,dy)` into one of the
   * eight directions provided by `groupD8`.
   * @param {number} dx - X-component of the vector
   * @param {number} dy - Y-component of the vector
   * @returns {PIXI.GD8Symmetry} Approximation of the vector into
   *  one of the eight symmetries.
   */byDirection:(t,e)=>2*Math.abs(t)<=Math.abs(e)?e>=0?rM.S:rM.N:2*Math.abs(e)<=Math.abs(t)?t>0?rM.E:rM.W:e>0?t>0?rM.SE:rM.SW:t>0?rM.NE:rM.NW,/**
   * Helps sprite to compensate texture packer rotation.
   * @param {PIXI.Matrix} matrix - sprite world matrix
   * @param {PIXI.GD8Symmetry} rotation - The rotation factor to use.
   * @param {number} tx - sprite anchoring
   * @param {number} ty - sprite anchoring
   */matrixAppendRotationInv:(t,e,r=0,i=0)=>{let s=rI[rM.inv(e)];s.tx=r,s.ty=i,t.append(s)}};class rP{/**
   * Creates a new `ObservablePoint`
   * @param cb - callback function triggered when `x` and/or `y` are changed
   * @param scope - owner of callback
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */constructor(t,e,r=0,i=0){this._x=r,this._y=i,this.cb=t,this.scope=e}/**
   * Creates a clone of this point.
   * The callback and scope params can be overridden otherwise they will default
   * to the clone object's values.
   * @override
   * @param cb - The callback function triggered when `x` and/or `y` are changed
   * @param scope - The owner of the callback
   * @returns a copy of this observable point
   */clone(t=this.cb,e=this.scope){return new rP(t,e,this._x,this._y)}/**
   * Sets the point to a new `x` and `y` position.
   * If `y` is omitted, both `x` and `y` will be set to `x`.
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=x] - position of the point on the y axis
   * @returns The observable point instance itself
   */set(t=0,e=t){return(this._x!==t||this._y!==e)&&(this._x=t,this._y=e,this.cb.call(this.scope)),this}/**
   * Copies x and y from the given point (`p`)
   * @param p - The point to copy from. Can be any of type that is or extends `IPointData`
   * @returns The observable point instance itself
   */copyFrom(t){return(this._x!==t.x||this._y!==t.y)&&(this._x=t.x,this._y=t.y,this.cb.call(this.scope)),this}/**
   * Copies this point's x and y into that of the given point (`p`)
   * @param p - The point to copy to. Can be any of type that is or extends `IPointData`
   * @returns The point (`p`) with values updated
   */copyTo(t){return t.set(this._x,this._y),t}/**
   * Accepts another point (`p`) and returns `true` if the given point is equal to this point
   * @param p - The point to check
   * @returns Returns `true` if both `x` and `y` are equal
   */equals(t){return t.x===this._x&&t.y===this._y}/** Position of the observable point on the x axis. */get x(){return this._x}set x(t){this._x!==t&&(this._x=t,this.cb.call(this.scope))}/** Position of the observable point on the y axis. */get y(){return this._y}set y(t){this._y!==t&&(this._y=t,this.cb.call(this.scope))}}rP.prototype.toString=function(){return`[@pixi/math:ObservablePoint x=${this.x} y=${this.y} scope=${this.scope}]`};const rD=class{constructor(){this.worldTransform=new rT,this.localTransform=new rT,this.position=new rP(this.onChange,this,0,0),this.scale=new rP(this.onChange,this,1,1),this.pivot=new rP(this.onChange,this,0,0),this.skew=new rP(this.updateSkew,this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1,this._localID=0,this._currentLocalID=0,this._worldID=0,this._parentID=0}/** Called when a value changes. */onChange(){this._localID++}/** Called when the skew or the rotation changes. */updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this._localID++}/** Updates the local transformation matrix. */updateLocalTransform(){let t=this.localTransform;this._localID!==this._currentLocalID&&(t.a=this._cx*this.scale.x,t.b=this._sx*this.scale.x,t.c=this._cy*this.scale.y,t.d=this._sy*this.scale.y,t.tx=this.position.x-(this.pivot.x*t.a+this.pivot.y*t.c),t.ty=this.position.y-(this.pivot.x*t.b+this.pivot.y*t.d),this._currentLocalID=this._localID,this._parentID=-1)}/**
   * Updates the local and the world transformation matrices.
   * @param parentTransform - The parent transform
   */updateTransform(t){let e=this.localTransform;if(this._localID!==this._currentLocalID&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this._currentLocalID=this._localID,this._parentID=-1),this._parentID!==t._worldID){let r=t.worldTransform,i=this.worldTransform;i.a=e.a*r.a+e.b*r.c,i.b=e.a*r.b+e.b*r.d,i.c=e.c*r.a+e.d*r.c,i.d=e.c*r.b+e.d*r.d,i.tx=e.tx*r.a+e.ty*r.c+r.tx,i.ty=e.tx*r.b+e.ty*r.d+r.ty,this._parentID=t._worldID,this._worldID++}}/**
   * Decomposes a matrix and sets the transforms properties based on it.
   * @param matrix - The matrix to decompose
   */setFromMatrix(t){t.decompose(this),this._localID++}/** The rotation of the object in radians. */get rotation(){return this._rotation}set rotation(t){this._rotation!==t&&(this._rotation=t,this.updateSkew())}};rD.IDENTITY=new rD;let rO=rD;rO.prototype.toString=function(){return`[@pixi/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`};var rB=`varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor *= texture2D(uSampler, vTextureCoord);
}`,rF=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void){
   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
   vTextureCoord = aTextureCoord;
}
`;function rN(t,e,r){let i=t.createShader(e);return t.shaderSource(i,r),t.compileShader(i),i}function rL(t){let e=Array(t);for(let t=0;t<e.length;t++)e[t]=!1;return e}function rk(t,e){switch(t){case"float":case"int":case"uint":case"sampler2D":case"sampler2DArray":return 0;case"vec2":return new Float32Array(2*e);case"vec3":return new Float32Array(3*e);case"vec4":return new Float32Array(4*e);case"ivec2":return new Int32Array(2*e);case"ivec3":return new Int32Array(3*e);case"ivec4":return new Int32Array(4*e);case"uvec2":return new Uint32Array(2*e);case"uvec3":return new Uint32Array(3*e);case"uvec4":return new Uint32Array(4*e);case"bool":return!1;case"bvec2":return rL(2*e);case"bvec3":return rL(3*e);case"bvec4":return rL(4*e);case"mat2":return new Float32Array([1,0,0,1]);case"mat3":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const rU=[// a float cache layer
{test:t=>"float"===t.type&&1===t.size&&!t.isArray,code:t=>`
            if(uv["${t}"] !== ud["${t}"].value)
            {
                ud["${t}"].value = uv["${t}"]
                gl.uniform1f(ud["${t}"].location, uv["${t}"])
            }
            `},// handling samplers
{test:(t,e)=>("sampler2D"===t.type||"samplerCube"===t.type||"sampler2DArray"===t.type)&&1===t.size&&!t.isArray&&(null==e||void 0!==e.castToBaseTexture),code:t=>`t = syncData.textureCount++;

            renderer.texture.bind(uv["${t}"], t);

            if(ud["${t}"].value !== t)
            {
                ud["${t}"].value = t;
                gl.uniform1i(ud["${t}"].location, t);
; // eslint-disable-line max-len
            }`},// uploading pixi matrix object to mat3
{test:(t,e)=>"mat3"===t.type&&1===t.size&&!t.isArray&&void 0!==e.a,code:t=>`
            gl.uniformMatrix3fv(ud["${t}"].location, false, uv["${t}"].toArray(true));
            `,codeUbo:t=>`
                var ${t}_matrix = uv.${t}.toArray(true);

                data[offset] = ${t}_matrix[0];
                data[offset+1] = ${t}_matrix[1];
                data[offset+2] = ${t}_matrix[2];
        
                data[offset + 4] = ${t}_matrix[3];
                data[offset + 5] = ${t}_matrix[4];
                data[offset + 6] = ${t}_matrix[5];
        
                data[offset + 8] = ${t}_matrix[6];
                data[offset + 9] = ${t}_matrix[7];
                data[offset + 10] = ${t}_matrix[8];
            `},// uploading a pixi point as a vec2 with caching layer
{test:(t,e)=>"vec2"===t.type&&1===t.size&&!t.isArray&&void 0!==e.x,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["${t}"].location, v.x, v.y);
                }`,codeUbo:t=>`
                v = uv.${t};

                data[offset] = v.x;
                data[offset+1] = v.y;
            `},// caching layer for a vec2
{test:t=>"vec2"===t.type&&1===t.size&&!t.isArray,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["${t}"].location, v[0], v[1]);
                }
            `},// upload a pixi rectangle as a vec4 with caching layer
{test:(t,e)=>"vec4"===t.type&&1===t.size&&!t.isArray&&void 0!==e.width,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["${t}"].location, v.x, v.y, v.width, v.height)
                }`,codeUbo:t=>`
                    v = uv.${t};

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                    data[offset+2] = v.width;
                    data[offset+3] = v.height;
                `},// upload a pixi color as vec4 with caching layer
{test:(t,e)=>"vec4"===t.type&&1===t.size&&!t.isArray&&void 0!==e.red,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
                    cv[3] = v.alpha;
                    gl.uniform4f(ud["${t}"].location, v.red, v.green, v.blue, v.alpha)
                }`,codeUbo:t=>`
                    v = uv.${t};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                    data[offset+3] = v.alpha;
                `},// upload a pixi color as a vec3 with caching layer
{test:(t,e)=>"vec3"===t.type&&1===t.size&&!t.isArray&&void 0!==e.red,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.a)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
    
                    gl.uniform3f(ud["${t}"].location, v.red, v.green, v.blue)
                }`,codeUbo:t=>`
                    v = uv.${t};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                `},// a caching layer for vec4 uploading
{test:t=>"vec4"===t.type&&1===t.size&&!t.isArray,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["${t}"].location, v[0], v[1], v[2], v[3])
                }`}],rG={float:`
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1f(location, v);
    }`,vec2:`
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2f(location, v[0], v[1])
    }`,vec3:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3f(location, v[0], v[1], v[2])
    }`,vec4:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4f(location, v[0], v[1], v[2], v[3]);
    }`,int:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,ivec2:`
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,ivec3:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,ivec4:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,uint:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1ui(location, v);
    }`,uvec2:`
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2ui(location, v[0], v[1]);
    }`,uvec3:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3ui(location, v[0], v[1], v[2]);
    }`,uvec4:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
    }`,bool:`
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1i(location, v);
    }`,bvec2:`
    if (cv[0] != v[0] || cv[1] != v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,bvec3:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,bvec4:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,mat2:"gl.uniformMatrix2fv(location, false, v)",mat3:"gl.uniformMatrix3fv(location, false, v)",mat4:"gl.uniformMatrix4fv(location, false, v)",sampler2D:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,samplerCube:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,sampler2DArray:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`},rH={float:"gl.uniform1fv(location, v)",vec2:"gl.uniform2fv(location, v)",vec3:"gl.uniform3fv(location, v)",vec4:"gl.uniform4fv(location, v)",mat4:"gl.uniformMatrix4fv(location, false, v)",mat3:"gl.uniformMatrix3fv(location, false, v)",mat2:"gl.uniformMatrix2fv(location, false, v)",int:"gl.uniform1iv(location, v)",ivec2:"gl.uniform2iv(location, v)",ivec3:"gl.uniform3iv(location, v)",ivec4:"gl.uniform4iv(location, v)",uint:"gl.uniform1uiv(location, v)",uvec2:"gl.uniform2uiv(location, v)",uvec3:"gl.uniform3uiv(location, v)",uvec4:"gl.uniform4uiv(location, v)",bool:"gl.uniform1iv(location, v)",bvec2:"gl.uniform2iv(location, v)",bvec3:"gl.uniform3iv(location, v)",bvec4:"gl.uniform4iv(location, v)",sampler2D:"gl.uniform1iv(location, v)",samplerCube:"gl.uniform1iv(location, v)",sampler2DArray:"gl.uniform1iv(location, v)"},rj={};let rz=rj;function rV(){if(rz===rj||rz?.isContextLost()){let t;let e=G.ADAPTER.createCanvas();G.PREFER_ENV>=y.WEBGL2&&(t=e.getContext("webgl2",{})),t||((t=e.getContext("webgl",{})||e.getContext("experimental-webgl",{}))?t.getExtension("WEBGL_draw_buffers"):t=null),rz=t}return rz}function rW(t,e){let r=t.getShaderSource(e).split(`
`).map((t,e)=>`${e}: ${t}`),i=t.getShaderInfoLog(e),s=i.split(`
`),n={},a=s.map(t=>parseFloat(t.replace(/^ERROR\: 0\:([\d]+)\:.*$/,"$1"))).filter(t=>!!t&&!n[t]&&(n[t]=!0,!0)),o=[""];a.forEach(t=>{r[t-1]=`%c${r[t-1]}%c`,o.push("background: #FF0000; color:#FFFFFF; font-size: 10px","font-size: 10px")});let h=r.join(`
`);o[0]=h,console.error(i),console.groupCollapsed("click to view full shader code"),console.warn(...o),console.groupEnd()}const rX={float:1,vec2:2,vec3:3,vec4:4,int:1,ivec2:2,ivec3:3,ivec4:4,uint:1,uvec2:2,uvec3:3,uvec4:4,bool:1,bvec2:2,bvec3:3,bvec4:4,mat2:4,mat3:9,mat4:16,sampler2D:1};let r$=null;const rY={FLOAT:"float",FLOAT_VEC2:"vec2",FLOAT_VEC3:"vec3",FLOAT_VEC4:"vec4",INT:"int",INT_VEC2:"ivec2",INT_VEC3:"ivec3",INT_VEC4:"ivec4",UNSIGNED_INT:"uint",UNSIGNED_INT_VEC2:"uvec2",UNSIGNED_INT_VEC3:"uvec3",UNSIGNED_INT_VEC4:"uvec4",BOOL:"bool",BOOL_VEC2:"bvec2",BOOL_VEC3:"bvec3",BOOL_VEC4:"bvec4",FLOAT_MAT2:"mat2",FLOAT_MAT3:"mat3",FLOAT_MAT4:"mat4",SAMPLER_2D:"sampler2D",INT_SAMPLER_2D:"sampler2D",UNSIGNED_INT_SAMPLER_2D:"sampler2D",SAMPLER_CUBE:"samplerCube",INT_SAMPLER_CUBE:"samplerCube",UNSIGNED_INT_SAMPLER_CUBE:"samplerCube",SAMPLER_2D_ARRAY:"sampler2DArray",INT_SAMPLER_2D_ARRAY:"sampler2DArray",UNSIGNED_INT_SAMPLER_2D_ARRAY:"sampler2DArray"};function rq(t,e){if(!r$){let e=Object.keys(rY);r$={};for(let r=0;r<e.length;++r){let i=e[r];r$[t[i]]=rY[i]}}return r$[e]}function rK(t,e,r){if("precision"!==t.substring(0,9)){let i=e;return e===O.HIGH&&r!==O.HIGH&&(i=O.MEDIUM),`precision ${i} float;
${t}`}return r!==O.HIGH&&"precision highp"===t.substring(0,15)?t.replace("precision highp","precision mediump"):t}function rZ(){if("boolean"==typeof i)return i;try{i=!0===Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")}catch{i=!1}return i}let rQ=0;const rJ={},r0=class t{/**
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param name - Name for shader
   * @param extra - Extra data for shader
   */constructor(e,i,s="pixi-shader",n={}){this.extra={},this.id=rQ++,this.vertexSrc=e||t.defaultVertexSrc,this.fragmentSrc=i||t.defaultFragmentSrc,this.vertexSrc=this.vertexSrc.trim(),this.fragmentSrc=this.fragmentSrc.trim(),this.extra=n,"#version"!==this.vertexSrc.substring(0,8)&&(rJ[s=s.replace(/\s+/g,"-")]?(rJ[s]++,s+=`-${rJ[s]}`):rJ[s]=1,this.vertexSrc=`#define SHADER_NAME ${s}
${this.vertexSrc}`,this.fragmentSrc=`#define SHADER_NAME ${s}
${this.fragmentSrc}`,this.vertexSrc=rK(this.vertexSrc,t.defaultVertexPrecision,O.HIGH),this.fragmentSrc=rK(this.fragmentSrc,t.defaultFragmentPrecision,function(){if(!r){r=O.MEDIUM;let t=rV();if(t&&t.getShaderPrecisionFormat){let e=t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT);e&&(r=e.precision?O.HIGH:O.MEDIUM)}}return r}())),this.glPrograms={},this.syncUniforms=null}/**
   * The default vertex shader source.
   * @readonly
   */static get defaultVertexSrc(){return rF}/**
   * The default fragment shader source.
   * @readonly
   */static get defaultFragmentSrc(){return rB}/**
   * A short hand function to create a program based of a vertex and fragment shader.
   *
   * This method will also check to see if there is a cached program.
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param name - Name for shader
   * @returns A shiny new PixiJS shader program!
   */static from(e,r,i){let s=e+r,n=eO[s];return n||(eO[s]=n=new t(e,r,i)),n}};r0.defaultVertexPrecision=O.HIGH,/**
* Default specify float precision in fragment shader.
* iOS is best set at highp due to https://github.com/pixijs/pixijs/issues/3742
* @static
* @type {PIXI.PRECISION}
* @default PIXI.PRECISION.MEDIUM
*/r0.defaultFragmentPrecision=tn.apple.device?O.HIGH:O.MEDIUM;let r1=r0,r2=0;class r3{/**
   * @param {object | Buffer} [uniforms] - Custom uniforms to use to augment the built-in ones. Or a pixi buffer.
   * @param isStatic - Uniforms wont be changed after creation.
   * @param isUbo - If true, will treat this uniform group as a uniform buffer object.
   */constructor(t,e,r){this.group=!0,this.syncUniforms={},this.dirtyId=0,this.id=r2++,this.static=!!e,this.ubo=!!r,t instanceof rr?(this.buffer=t,this.buffer.type=L.UNIFORM_BUFFER,this.autoManage=!1,this.ubo=!0):(this.uniforms=t,this.ubo&&(this.buffer=new rr(new Float32Array(1)),this.buffer.type=L.UNIFORM_BUFFER,this.autoManage=!0))}update(){this.dirtyId++,!this.autoManage&&this.buffer&&this.buffer.update()}add(t,e,r){if(this.ubo)throw Error("[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them");this.uniforms[t]=new r3(e,r)}static from(t,e,r){return new r3(t,e,r)}/**
   * A short hand function for creating a static UBO UniformGroup.
   * @param uniforms - the ubo item
   * @param _static - should this be updated each time it is used? defaults to true here!
   */static uboFrom(t,e){return new r3(t,e??!0,!0)}}class r4{/**
   * @param program - The program the shader will use.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   */constructor(t,e){this.uniformBindCount=0,this.program=t,e?e instanceof r3?this.uniformGroup=e:this.uniformGroup=new r3(e):this.uniformGroup=new r3({}),this.disposeRunner=new e4("disposeShader")}// TODO move to shader system..
checkUniformExists(t,e){if(e.uniforms[t])return!0;for(let r in e.uniforms){let i=e.uniforms[r];if(!0===i.group&&this.checkUniformExists(t,i))return!0}return!1}destroy(){this.uniformGroup=null,this.disposeRunner.emit(this),this.disposeRunner.destroy()}/**
   * Shader uniform values, shortcut for `uniformGroup.uniforms`.
   * @readonly
   */get uniforms(){return this.uniformGroup.uniforms}/**
   * A short hand function to create a shader based of a vertex and fragment shader.
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   * @returns A shiny new PixiJS shader!
   */static from(t,e,r){let i=r1.from(t,e);return new r4(i,r)}}class r5{/**
   * @param vertexSrc - Vertex shader
   * @param fragTemplate - Fragment shader template
   */constructor(t,e){if(this.vertexSrc=t,this.fragTemplate=e,this.programCache={},this.defaultGroupCache={},!e.includes("%count%"))throw Error('Fragment template must contain "%count%".');if(!e.includes("%forloop%"))throw Error('Fragment template must contain "%forloop%".')}generateShader(t){if(!this.programCache[t]){let e=new Int32Array(t);for(let r=0;r<t;r++)e[r]=r;this.defaultGroupCache[t]=r3.from({uSamplers:e},!0);let r=this.fragTemplate;r=(r=r.replace(/%count%/gi,`${t}`)).replace(/%forloop%/gi,this.generateSampleSrc(t)),this.programCache[t]=new r1(this.vertexSrc,r)}let e={tint:new Float32Array([1,1,1,1]),translationMatrix:new rT,default:this.defaultGroupCache[t]};return new r4(this.programCache[t],e)}generateSampleSrc(t){let e="";e+=`

`;for(let r=0;r<t;r++)r>0&&(e+=`
else `),r<t-1&&(e+=`if(vTextureId < ${r}.5)`),e+=`
{
	color = texture2D(uSamplers[${r}], vTextureCoord);
}`;return e+`

`}}class r6{constructor(){this.elements=[],this.ids=[],this.count=0}clear(){for(let t=0;t<this.count;t++)this.elements[t]=null;this.count=0}}class r8{/**
   * @param renderer - The renderer this manager works for.
   */constructor(t){this.renderer=t}/** Stub method that should be used to empty the current batch by rendering objects now. */flush(){}/** Generic destruction method that frees all resources. This should be called by subclasses. */destroy(){this.renderer=null}/**
   * Stub method that initializes any state required before
   * rendering starts. It is different from the `prerender`
   * signal, which occurs every frame, in that it is called
   * whenever an object requests _this_ renderer specifically.
   */start(){}/** Stops the renderer. It should free up any state and become dormant. */stop(){this.flush()}/**
   * Keeps the object to render. It doesn't have to be
   * rendered immediately.
   * @param {PIXI.DisplayObject} _object - The object to render.
   */render(t){}}var r7=`varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;
uniform sampler2D uSamplers[%count%];

void main(void){
    vec4 color;
    %forloop%
    gl_FragColor = color * vColor;
}
`,r9=`precision highp float;
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;
attribute float aTextureId;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform vec4 tint;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;

void main(void){
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vTextureId = aTextureId;
    vColor = aColor * tint;
}
`;const it=class t extends r8{/**
   * This will hook onto the renderer's `contextChange`
   * and `prerender` signals.
   * @param {PIXI.Renderer} renderer - The renderer this works for.
   */constructor(e){super(e),this.setShaderGenerator(),this.geometryClass=rl,this.vertexSize=6,this.state=e0.for2d(),this.size=4*t.defaultBatchSize,this._vertexCount=0,this._indexCount=0,this._bufferedElements=[],this._bufferedTextures=[],this._bufferSize=0,this._shader=null,this._packedGeometries=[],this._packedGeometryPoolSize=2,this._flushId=0,this._aBuffers={},this._iBuffers={},this.maxTextures=1,this.renderer.on("prerender",this.onPrerender,this),e.runners.contextChange.add(this),this._dcIndex=0,this._aIndex=0,this._iIndex=0,this._attributeBuffer=null,this._indexBuffer=null,this._tempBoundTextures=[]}/**
   * The maximum textures that this device supports.
   * @static
   * @default 32
   */static get defaultMaxTextures(){return this._defaultMaxTextures=this._defaultMaxTextures??function(t){let e=!0,r=G.ADAPTER.getNavigator();if(tn.tablet||tn.phone){if(tn.apple.device){let t=r.userAgent.match(/OS (\d+)_(\d+)?/);t&&11>parseInt(t[1],10)&&(e=!1)}if(tn.android.device){let t=r.userAgent.match(/Android\s([0-9.]*)/);t&&7>parseInt(t[1],10)&&(e=!1)}}return e?32:4}(0),this._defaultMaxTextures}static set defaultMaxTextures(t){this._defaultMaxTextures=t}/**
   * Can we upload the same buffer in a single frame?
   * @static
   */static get canUploadSameBuffer(){return this._canUploadSameBuffer=this._canUploadSameBuffer??!tn.apple.device,this._canUploadSameBuffer}static set canUploadSameBuffer(t){this._canUploadSameBuffer=t}/**
   * @see PIXI.BatchRenderer#maxTextures
   * @deprecated since 7.1.0
   * @readonly
   */get MAX_TEXTURES(){return tF("7.1.0","BatchRenderer#MAX_TEXTURES renamed to BatchRenderer#maxTextures"),this.maxTextures}/**
   * The default vertex shader source
   * @readonly
   */static get defaultVertexSrc(){return r9}/**
   * The default fragment shader source
   * @readonly
   */static get defaultFragmentTemplate(){return r7}/**
   * Set the shader generator.
   * @param {object} [options]
   * @param {string} [options.vertex=PIXI.BatchRenderer.defaultVertexSrc] - Vertex shader source
   * @param {string} [options.fragment=PIXI.BatchRenderer.defaultFragmentTemplate] - Fragment shader template
   */setShaderGenerator({vertex:e=t.defaultVertexSrc,fragment:r=t.defaultFragmentTemplate}={}){this.shaderGenerator=new r5(e,r)}/**
   * Handles the `contextChange` signal.
   *
   * It calculates `this.maxTextures` and allocating the packed-geometry object pool.
   */contextChange(){let e=this.renderer.gl;G.PREFER_ENV===y.WEBGL_LEGACY?this.maxTextures=1:(this.maxTextures=Math.min(e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),t.defaultMaxTextures),this.maxTextures=eJ(this.maxTextures,e)),this._shader=this.shaderGenerator.generateShader(this.maxTextures);for(let t=0;t<this._packedGeometryPoolSize;t++)this._packedGeometries[t]=new this.geometryClass;this.initFlushBuffers()}/** Makes sure that static and dynamic flush pooled objects have correct dimensions. */initFlushBuffers(){let{_drawCallPool:e,_textureArrayPool:r}=t,i=this.size/4,s=Math.floor(i/this.maxTextures)+1;for(;e.length<i;)e.push(new rt);for(;r.length<s;)r.push(new r6);for(let t=0;t<this.maxTextures;t++)this._tempBoundTextures[t]=null}/** Handles the `prerender` signal. It ensures that flushes start from the first geometry object again. */onPrerender(){this._flushId=0}/**
   * Buffers the "batchable" object. It need not be rendered immediately.
   * @param {PIXI.DisplayObject} element - the element to render when
   *    using this renderer
   */render(t){t._texture.valid&&(this._vertexCount+t.vertexData.length/2>this.size&&this.flush(),this._vertexCount+=t.vertexData.length/2,this._indexCount+=t.indices.length,this._bufferedTextures[this._bufferSize]=t._texture.baseTexture,this._bufferedElements[this._bufferSize++]=t)}buildTexturesAndDrawCalls(){let{_bufferedTextures:e,maxTextures:r}=this,i=t._textureArrayPool,s=this.renderer.batch,n=this._tempBoundTextures,a=this.renderer.textureGC.count,o=++e9._globalBatch,h=0,l=i[0],u=0;s.copyBoundTextures(n,r);for(let t=0;t<this._bufferSize;++t){let d=e[t];e[t]=null,d._batchEnabled!==o&&(l.count>=r&&(s.boundArray(l,n,o,r),this.buildDrawCalls(l,u,t),u=t,l=i[++h],++o),d._batchEnabled=o,d.touched=a,l.elements[l.count++]=d)}l.count>0&&(s.boundArray(l,n,o,r),this.buildDrawCalls(l,u,this._bufferSize),++h,++o);for(let t=0;t<n.length;t++)n[t]=null;e9._globalBatch=o}/**
   * Populating drawcalls for rendering
   * @param texArray
   * @param start
   * @param finish
   */buildDrawCalls(e,r,i){let{_bufferedElements:s,_attributeBuffer:n,_indexBuffer:a,vertexSize:o}=this,h=t._drawCallPool,l=this._dcIndex,u=this._aIndex,d=this._iIndex,c=h[l];c.start=this._iIndex,c.texArray=e;for(let t=r;t<i;++t){let i=s[t],p=i._texture.baseTexture,f=ef[p.alphaMode?1:0][i.blendMode];s[t]=null,r<t&&c.blend!==f&&(c.size=d-c.start,r=t,(c=h[++l]).texArray=e,c.start=d),this.packInterleavedGeometry(i,n,a,u,d),u+=i.vertexData.length/2*o,d+=i.indices.length,c.blend=f}r<i&&(c.size=d-c.start,++l),this._dcIndex=l,this._aIndex=u,this._iIndex=d}/**
   * Bind textures for current rendering
   * @param texArray
   */bindAndClearTexArray(t){let e=this.renderer.texture;for(let r=0;r<t.count;r++)e.bind(t.elements[r],t.ids[r]),t.elements[r]=null;t.count=0}updateGeometry(){let{_packedGeometries:e,_attributeBuffer:r,_indexBuffer:i}=this;t.canUploadSameBuffer?(e[this._flushId]._buffer.update(r.rawBinaryData),e[this._flushId]._indexBuffer.update(i),this.renderer.geometry.updateBuffers()):(this._packedGeometryPoolSize<=this._flushId&&(this._packedGeometryPoolSize++,e[this._flushId]=new this.geometryClass),e[this._flushId]._buffer.update(r.rawBinaryData),e[this._flushId]._indexBuffer.update(i),this.renderer.geometry.bind(e[this._flushId]),this.renderer.geometry.updateBuffers(),this._flushId++)}drawBatches(){let e=this._dcIndex,{gl:r,state:i}=this.renderer,s=t._drawCallPool,n=null;for(let t=0;t<e;t++){let{texArray:e,type:a,size:o,start:h,blend:l}=s[t];n!==e&&(n=e,this.bindAndClearTexArray(e)),this.state.blendMode=l,i.set(this.state),r.drawElements(a,o,r.UNSIGNED_SHORT,2*h)}}/** Renders the content _now_ and empties the current batch. */flush(){0!==this._vertexCount&&(this._attributeBuffer=this.getAttributeBuffer(this._vertexCount),this._indexBuffer=this.getIndexBuffer(this._indexCount),this._aIndex=0,this._iIndex=0,this._dcIndex=0,this.buildTexturesAndDrawCalls(),this.updateGeometry(),this.drawBatches(),this._bufferSize=0,this._vertexCount=0,this._indexCount=0)}/** Starts a new sprite batch. */start(){this.renderer.state.set(this.state),this.renderer.texture.ensureSamplerType(this.maxTextures),this.renderer.shader.bind(this._shader),t.canUploadSameBuffer&&this.renderer.geometry.bind(this._packedGeometries[this._flushId])}/** Stops and flushes the current batch. */stop(){this.flush()}/** Destroys this `BatchRenderer`. It cannot be used again. */destroy(){for(let t=0;t<this._packedGeometryPoolSize;t++)this._packedGeometries[t]&&this._packedGeometries[t].destroy();this.renderer.off("prerender",this.onPrerender,this),this._aBuffers=null,this._iBuffers=null,this._packedGeometries=null,this._attributeBuffer=null,this._indexBuffer=null,this._shader&&(this._shader.destroy(),this._shader=null),super.destroy()}/**
   * Fetches an attribute buffer from `this._aBuffers` that can hold atleast `size` floats.
   * @param size - minimum capacity required
   * @returns - buffer than can hold atleast `size` floats
   */getAttributeBuffer(t){let e=eA(Math.ceil(t/8)),r=eS(e),i=8*e;this._aBuffers.length<=r&&(this._iBuffers.length=r+1);let s=this._aBuffers[i];return s||(this._aBuffers[i]=s=new eZ(i*this.vertexSize*4)),s}/**
   * Fetches an index buffer from `this._iBuffers` that can
   * have at least `size` capacity.
   * @param size - minimum required capacity
   * @returns - buffer that can fit `size` indices.
   */getIndexBuffer(t){let e=eA(Math.ceil(t/12)),r=eS(e);this._iBuffers.length<=r&&(this._iBuffers.length=r+1);let i=this._iBuffers[r];return i||(this._iBuffers[r]=i=new Uint16Array(12*e)),i}/**
   * Takes the four batching parameters of `element`, interleaves
   * and pushes them into the batching attribute/index buffers given.
   *
   * It uses these properties: `vertexData` `uvs`, `textureId` and
   * `indicies`. It also uses the "tint" of the base-texture, if
   * present.
   * @param {PIXI.DisplayObject} element - element being rendered
   * @param attributeBuffer - attribute buffer.
   * @param indexBuffer - index buffer
   * @param aIndex - number of floats already in the attribute buffer
   * @param iIndex - number of indices already in `indexBuffer`
   */packInterleavedGeometry(t,e,r,i,s){let{uint32View:n,float32View:a}=e,o=i/this.vertexSize,h=t.uvs,l=t.indices,u=t.vertexData,d=t._texture.baseTexture._batchLocation,c=Math.min(t.worldAlpha,1),p=el.shared.setValue(t._tintRGB).toPremultiplied(c,t._texture.baseTexture.alphaMode>0);for(let t=0;t<u.length;t+=2)a[i++]=u[t],a[i++]=u[t+1],a[i++]=h[t],a[i++]=h[t+1],n[i++]=p,a[i++]=d;for(let t=0;t<l.length;t++)r[s++]=o+l[t]}};it.defaultBatchSize=4096,/** @ignore */it.extension={name:"batch",type:e$.RendererPlugin},/**
* Pool of `BatchDrawCall` objects that `flush` used
* to create "batches" of the objects being rendered.
*
* These are never re-allocated again.
* Shared between all batch renderers because it can be only one "flush" working at the moment.
* @member {PIXI.BatchDrawCall[]}
*/it._drawCallPool=[],/**
* Pool of `BatchDrawCall` objects that `flush` used
* to create "batches" of the objects being rendered.
*
* These are never re-allocated again.
* Shared between all batch renderers because it can be only one "flush" working at the moment.
* @member {PIXI.BatchTextureArray[]}
*/it._textureArrayPool=[];let ie=it;eK.add(ie);var ir=`varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`,ii=`attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`;const is=class t extends r4{/**
   * @param vertexSrc - The source of the vertex shader.
   * @param fragmentSrc - The source of the fragment shader.
   * @param uniforms - Custom uniforms to use to augment the built-in ones.
   */constructor(e,r,i){let s=r1.from(e||t.defaultVertexSrc,r||t.defaultFragmentSrc);super(s,i),this.padding=0,this.resolution=t.defaultResolution,this.multisample=t.defaultMultisample,this.enabled=!0,this.autoFit=!0,this.state=new e0}/**
   * Applies the filter
   * @param {PIXI.FilterSystem} filterManager - The renderer to retrieve the filter from
   * @param {PIXI.RenderTexture} input - The input render target.
   * @param {PIXI.RenderTexture} output - The target to output to.
   * @param {PIXI.CLEAR_MODES} [clearMode] - Should the output be cleared before rendering to it.
   * @param {object} [_currentState] - It's current state of filter.
   *        There are some useful properties in the currentState :
   *        target, filters, sourceFrame, destinationFrame, renderTarget, resolution
   */apply(t,e,r,i,s){t.applyFilter(this,e,r,i)}/**
   * Sets the blend mode of the filter.
   * @default PIXI.BLEND_MODES.NORMAL
   */get blendMode(){return this.state.blendMode}set blendMode(t){this.state.blendMode=t}/**
   * The resolution of the filter. Setting this to be lower will lower the quality but
   * increase the performance of the filter.
   * If set to `null` or `0`, the resolution of the current render target is used.
   * @default PIXI.Filter.defaultResolution
   */get resolution(){return this._resolution}set resolution(t){this._resolution=t}/**
   * The default vertex shader source
   * @readonly
   */static get defaultVertexSrc(){return ii}/**
   * The default fragment shader source
   * @readonly
   */static get defaultFragmentSrc(){return ir}};is.defaultResolution=1,/**
* Default filter samples for any filter.
* @static
* @type {PIXI.MSAA_QUALITY|null}
* @default PIXI.MSAA_QUALITY.NONE
*/is.defaultMultisample=N.NONE;let ia=is;class io{constructor(){this.clearBeforeRender=!0,this._backgroundColor=new el(0),this.alpha=1}/**
   * initiates the background system
   * @param {PIXI.IRendererOptions} options - the options for the background colors
   */init(t){this.clearBeforeRender=t.clearBeforeRender;let{backgroundColor:e,background:r,backgroundAlpha:i}=t,s=r??e;void 0!==s&&(this.color=s),this.alpha=i}/**
   * The background color to fill if not transparent.
   * @member {PIXI.ColorSource}
   */get color(){return this._backgroundColor.value}set color(t){this._backgroundColor.setValue(t)}/**
   * The background color alpha. Setting this to 0 will make the canvas transparent.
   * @member {number}
   */get alpha(){return this._backgroundColor.alpha}set alpha(t){this._backgroundColor.setAlpha(t)}/** The background color object. */get backgroundColor(){return this._backgroundColor}destroy(){}}io.defaultOptions={/**
   * {@link PIXI.IRendererOptions.backgroundAlpha}
   * @default 1
   * @memberof PIXI.settings.RENDER_OPTIONS
   */backgroundAlpha:1,/**
   * {@link PIXI.IRendererOptions.backgroundColor}
   * @default 0x000000
   * @memberof PIXI.settings.RENDER_OPTIONS
   */backgroundColor:0,/**
   * {@link PIXI.IRendererOptions.clearBeforeRender}
   * @default true
   * @memberof PIXI.settings.RENDER_OPTIONS
   */clearBeforeRender:!0},/** @ignore */io.extension={type:[e$.RendererSystem,e$.CanvasRendererSystem],name:"background"},eK.add(io);class ih{/**
   * @param renderer - The renderer this System works for.
   */constructor(t){this.renderer=t,this.emptyRenderer=new r8(t),this.currentRenderer=this.emptyRenderer}/**
   * Changes the current renderer to the one given in parameter
   * @param objectRenderer - The object renderer to use.
   */setObjectRenderer(t){this.currentRenderer!==t&&(this.currentRenderer.stop(),this.currentRenderer=t,this.currentRenderer.start())}/**
   * This should be called if you wish to do some custom rendering
   * It will basically render anything that may be batched up such as sprites
   */flush(){this.setObjectRenderer(this.emptyRenderer)}/** Reset the system to an empty renderer */reset(){this.setObjectRenderer(this.emptyRenderer)}/**
   * Handy function for batch renderers: copies bound textures in first maxTextures locations to array
   * sets actual _batchLocation for them
   * @param arr - arr copy destination
   * @param maxTextures - number of copied elements
   */copyBoundTextures(t,e){let{boundTextures:r}=this.renderer.texture;for(let i=e-1;i>=0;--i)t[i]=r[i]||null,t[i]&&(t[i]._batchLocation=i)}/**
   * Assigns batch locations to textures in array based on boundTextures state.
   * All textures in texArray should have `_batchEnabled = _batchId`,
   * and their count should be less than `maxTextures`.
   * @param texArray - textures to bound
   * @param boundTextures - current state of bound textures
   * @param batchId - marker for _batchEnabled param of textures in texArray
   * @param maxTextures - number of texture locations to manipulate
   */boundArray(t,e,r,i){let{elements:s,ids:n,count:a}=t,o=0;for(let t=0;t<a;t++){let a=s[t],h=a._batchLocation;if(h>=0&&h<i&&e[h]===a){n[t]=h;continue}for(;o<i;){let i=e[o];if(i&&i._batchEnabled===r&&i._batchLocation===o){o++;continue}n[t]=o,a._batchLocation=o,e[o]=a;break}}}/**
   * @ignore
   */destroy(){this.renderer=null}}ih.extension={type:e$.RendererSystem,name:"batch"},eK.add(ih);let il=0;class iu{/** @param renderer - The renderer this System works for. */constructor(t){this.renderer=t,this.webGLVersion=1,this.extensions={},this.supports={uint32Indices:!1},this.handleContextLost=this.handleContextLost.bind(this),this.handleContextRestored=this.handleContextRestored.bind(this)}/**
   * `true` if the context is lost
   * @readonly
   */get isLost(){return!this.gl||this.gl.isContextLost()}/**
   * Handles the context change event.
   * @param {WebGLRenderingContext} gl - New WebGL context.
   */contextChange(t){this.gl=t,this.renderer.gl=t,this.renderer.CONTEXT_UID=il++}init(t){if(t.context)this.initFromContext(t.context);else{let e=this.renderer.background.alpha<1,r=t.premultipliedAlpha;this.preserveDrawingBuffer=t.preserveDrawingBuffer,this.useContextAlpha=t.useContextAlpha,this.powerPreference=t.powerPreference,this.initFromOptions({alpha:e,premultipliedAlpha:r,antialias:t.antialias,stencil:!0,preserveDrawingBuffer:t.preserveDrawingBuffer,powerPreference:t.powerPreference})}}/**
   * Initializes the context.
   * @protected
   * @param {WebGLRenderingContext} gl - WebGL context
   */initFromContext(t){this.gl=t,this.validateContext(t),this.renderer.gl=t,this.renderer.CONTEXT_UID=il++,this.renderer.runners.contextChange.emit(t);let e=this.renderer.view;void 0!==e.addEventListener&&(e.addEventListener("webglcontextlost",this.handleContextLost,!1),e.addEventListener("webglcontextrestored",this.handleContextRestored,!1))}/**
   * Initialize from context options
   * @protected
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
   * @param {object} options - context attributes
   */initFromOptions(t){let e=this.createContext(this.renderer.view,t);this.initFromContext(e)}/**
   * Helper class to create a WebGL Context
   * @param canvas - the canvas element that we will get the context from
   * @param options - An options object that gets passed in to the canvas element containing the
   *    context attributes
   * @see https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement/getContext
   * @returns {WebGLRenderingContext} the WebGL context
   */createContext(t,e){let r;if(G.PREFER_ENV>=y.WEBGL2&&(r=t.getContext("webgl2",e)),r)this.webGLVersion=2;else if(this.webGLVersion=1,!(r=t.getContext("webgl",e)||t.getContext("experimental-webgl",e)))throw Error("This browser does not support WebGL. Try using the canvas renderer");return this.gl=r,this.getExtensions(),this.gl}/** Auto-populate the {@link PIXI.ContextSystem.extensions extensions}. */getExtensions(){let{gl:t}=this,e={loseContext:t.getExtension("WEBGL_lose_context"),anisotropicFiltering:t.getExtension("EXT_texture_filter_anisotropic"),floatTextureLinear:t.getExtension("OES_texture_float_linear"),s3tc:t.getExtension("WEBGL_compressed_texture_s3tc"),s3tc_sRGB:t.getExtension("WEBGL_compressed_texture_s3tc_srgb"),// eslint-disable-line camelcase
etc:t.getExtension("WEBGL_compressed_texture_etc"),etc1:t.getExtension("WEBGL_compressed_texture_etc1"),pvrtc:t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),atc:t.getExtension("WEBGL_compressed_texture_atc"),astc:t.getExtension("WEBGL_compressed_texture_astc")};1===this.webGLVersion?Object.assign(this.extensions,e,{drawBuffers:t.getExtension("WEBGL_draw_buffers"),depthTexture:t.getExtension("WEBGL_depth_texture"),vertexArrayObject:t.getExtension("OES_vertex_array_object")||t.getExtension("MOZ_OES_vertex_array_object")||t.getExtension("WEBKIT_OES_vertex_array_object"),uint32ElementIndex:t.getExtension("OES_element_index_uint"),// Floats and half-floats
floatTexture:t.getExtension("OES_texture_float"),floatTextureLinear:t.getExtension("OES_texture_float_linear"),textureHalfFloat:t.getExtension("OES_texture_half_float"),textureHalfFloatLinear:t.getExtension("OES_texture_half_float_linear")}):2===this.webGLVersion&&Object.assign(this.extensions,e,{// Floats and half-floats
colorBufferFloat:t.getExtension("EXT_color_buffer_float")})}/**
   * Handles a lost webgl context
   * @param {WebGLContextEvent} event - The context lost event.
   */handleContextLost(t){t.preventDefault(),setTimeout(()=>{this.gl.isContextLost()&&this.extensions.loseContext&&this.extensions.loseContext.restoreContext()},0)}/** Handles a restored webgl context. */handleContextRestored(){this.renderer.runners.contextChange.emit(this.gl)}destroy(){let t=this.renderer.view;this.renderer=null,void 0!==t.removeEventListener&&(t.removeEventListener("webglcontextlost",this.handleContextLost),t.removeEventListener("webglcontextrestored",this.handleContextRestored)),this.gl.useProgram(null),this.extensions.loseContext&&this.extensions.loseContext.loseContext()}/** Handle the post-render runner event. */postrender(){this.renderer.objectRenderer.renderingToScreen&&this.gl.flush()}/**
   * Validate context.
   * @param {WebGLRenderingContext} gl - Render context.
   */validateContext(t){let e=t.getContextAttributes(),r="WebGL2RenderingContext"in globalThis&&t instanceof globalThis.WebGL2RenderingContext;r&&(this.webGLVersion=2),e&&!e.stencil&&console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");let i=r||!!t.getExtension("OES_element_index_uint");this.supports.uint32Indices=i,i||console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly")}}iu.defaultOptions={/**
   * {@link PIXI.IRendererOptions.context}
   * @default null
   * @memberof PIXI.settings.RENDER_OPTIONS
   */context:null,/**
   * {@link PIXI.IRendererOptions.antialias}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */antialias:!1,/**
   * {@link PIXI.IRendererOptions.premultipliedAlpha}
   * @default true
   * @memberof PIXI.settings.RENDER_OPTIONS
   */premultipliedAlpha:!0,/**
   * {@link PIXI.IRendererOptions.preserveDrawingBuffer}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */preserveDrawingBuffer:!1,/**
   * {@link PIXI.IRendererOptions.powerPreference}
   * @default default
   * @memberof PIXI.settings.RENDER_OPTIONS
   */powerPreference:"default"},/** @ignore */iu.extension={type:e$.RendererSystem,name:"context"},eK.add(iu);class id{/**
   * @param width - Width of the frame buffer
   * @param height - Height of the frame buffer
   */constructor(t,e){if(this.width=Math.round(t),this.height=Math.round(e),!this.width||!this.height)throw Error("Framebuffer width or height is zero");this.stencil=!1,this.depth=!1,this.dirtyId=0,this.dirtyFormat=0,this.dirtySize=0,this.depthTexture=null,this.colorTextures=[],this.glFramebuffers={},this.disposeRunner=new e4("disposeFramebuffer"),this.multisample=N.NONE}/**
   * Reference to the colorTexture.
   * @readonly
   */get colorTexture(){return this.colorTextures[0]}/**
   * Add texture to the colorTexture array.
   * @param index - Index of the array to add the texture to
   * @param texture - Texture to add to the array
   */addColorTexture(t=0,e){return this.colorTextures[t]=e||new e9(null,{scaleMode:R.NEAREST,resolution:1,mipmap:C.OFF,width:this.width,height:this.height}),this.dirtyId++,this.dirtyFormat++,this}/**
   * Add a depth texture to the frame buffer.
   * @param texture - Texture to add.
   */addDepthTexture(t){return this.depthTexture=t||new e9(null,{scaleMode:R.NEAREST,resolution:1,width:this.width,height:this.height,mipmap:C.OFF,format:E.DEPTH_COMPONENT,type:w.UNSIGNED_SHORT}),this.dirtyId++,this.dirtyFormat++,this}/** Enable depth on the frame buffer. */enableDepth(){return this.depth=!0,this.dirtyId++,this.dirtyFormat++,this}/** Enable stencil on the frame buffer. */enableStencil(){return this.stencil=!0,this.dirtyId++,this.dirtyFormat++,this}/**
   * Resize the frame buffer
   * @param width - Width of the frame buffer to resize to
   * @param height - Height of the frame buffer to resize to
   */resize(t,e){if(t=Math.round(t),e=Math.round(e),!t||!e)throw Error("Framebuffer width and height must not be zero");if(!(t===this.width&&e===this.height)){this.width=t,this.height=e,this.dirtyId++,this.dirtySize++;for(let r=0;r<this.colorTextures.length;r++){let i=this.colorTextures[r],s=i.resolution;i.setSize(t/s,e/s)}if(this.depthTexture){let r=this.depthTexture.resolution;this.depthTexture.setSize(t/r,e/r)}}}/** Disposes WebGL resources that are connected to this geometry. */dispose(){this.disposeRunner.emit(this,!1)}/** Destroys and removes the depth texture added to this framebuffer. */destroyDepthTexture(){this.depthTexture&&(this.depthTexture.destroy(),this.depthTexture=null,++this.dirtyId,++this.dirtyFormat)}}class ic extends e9{/**
   * @param options
   * @param {number} [options.width=100] - The width of the base render texture.
   * @param {number} [options.height=100] - The height of the base render texture.
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.BaseTexture.defaultOptions.scaleMode] - See {@link PIXI.SCALE_MODES}
   *   for possible values.
   * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio
   *   of the texture being generated.
   * @param {PIXI.MSAA_QUALITY} [options.multisample=PIXI.MSAA_QUALITY.NONE] - The number of samples of the frame buffer.
   */constructor(t={}){if("number"==typeof t){let e=arguments[0],r=arguments[1],i=arguments[2],s=arguments[3];t={width:e,height:r,scaleMode:i,resolution:s}}t.width=t.width??100,t.height=t.height??100,t.multisample??(t.multisample=N.NONE),super(null,t),this.mipmap=C.OFF,this.valid=!0,this._clear=new el([0,0,0,0]),this.framebuffer=new id(this.realWidth,this.realHeight).addColorTexture(0,this),this.framebuffer.multisample=t.multisample,this.maskStack=[],this.filterStack=[{}]}/** Color when clearning the texture. */set clearColor(t){this._clear.setValue(t)}get clearColor(){return this._clear.value}/**
   * Color object when clearning the texture.
   * @readonly
   * @since 7.2.0
   */get clear(){return this._clear}/**
   * Shortcut to `this.framebuffer.multisample`.
   * @default PIXI.MSAA_QUALITY.NONE
   */get multisample(){return this.framebuffer.multisample}set multisample(t){this.framebuffer.multisample=t}/**
   * Resizes the BaseRenderTexture.
   * @param desiredWidth - The desired width to resize to.
   * @param desiredHeight - The desired height to resize to.
   */resize(t,e){this.framebuffer.resize(t*this.resolution,e*this.resolution),this.setRealSize(this.framebuffer.width,this.framebuffer.height)}/**
   * Frees the texture and framebuffer from WebGL memory without destroying this texture object.
   * This means you can still use the texture later which will upload it to GPU
   * memory again.
   * @fires PIXI.BaseTexture#dispose
   */dispose(){this.framebuffer.dispose(),super.dispose()}/** Destroys this texture. */destroy(){super.destroy(),this.framebuffer.destroyDepthTexture(),this.framebuffer=null}}class ip extends e5{/**
   * @param {HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas} source
   */constructor(t){let e=t.naturalWidth||t.videoWidth||t.width,r=t.naturalHeight||t.videoHeight||t.height;super(e,r),this.source=t,this.noSubImage=!1}/**
   * Set cross origin based detecting the url and the crossorigin
   * @param element - Element to apply crossOrigin
   * @param url - URL to check
   * @param crossorigin - Cross origin value to use
   */static crossOrigin(t,e,r){void 0!==r||e.startsWith("data:")?!1!==r&&(t.crossOrigin="string"==typeof r?r:"anonymous"):t.crossOrigin=eV(e)}/**
   * Upload the texture to the GPU.
   * @param renderer - Upload to the renderer
   * @param baseTexture - Reference to parent texture
   * @param glTexture
   * @param {HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas} [source] - (optional)
   * @returns - true is success
   */upload(t,e,r,i){let s=t.gl,n=e.realWidth,a=e.realHeight;if(i=i||this.source,"u">typeof HTMLImageElement&&i instanceof HTMLImageElement){if(!i.complete||0===i.naturalWidth)return!1}else if("u">typeof HTMLVideoElement&&i instanceof HTMLVideoElement&&i.readyState<=1)return!1;return s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,e.alphaMode===M.UNPACK),this.noSubImage||e.target!==s.TEXTURE_2D||r.width!==n||r.height!==a?(r.width=n,r.height=a,s.texImage2D(e.target,0,r.internalFormat,e.format,r.type,i)):s.texSubImage2D(s.TEXTURE_2D,0,0,0,e.format,r.type,i),!0}/**
   * Checks if source width/height was changed, resize can cause extra baseTexture update.
   * Triggers one update in any case.
   */update(){if(this.destroyed)return;let t=this.source,e=t.naturalWidth||t.videoWidth||t.width,r=t.naturalHeight||t.videoHeight||t.height;this.resize(e,r),super.update()}/** Destroy this {@link PIXI.BaseImageResource} */dispose(){this.source=null}}class im extends ip{/**
   * @param source - image source or URL
   * @param options
   * @param {boolean} [options.autoLoad=true] - start loading process
   * @param {boolean} [options.createBitmap=PIXI.settings.CREATE_IMAGE_BITMAP] - whether its required to create
   *        a bitmap before upload
   * @param {boolean} [options.crossorigin=true] - Load image using cross origin
   * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.UNPACK] - Premultiply image alpha in bitmap
   */constructor(t,e){if(e=e||{},"string"==typeof t){let r=new Image;ip.crossOrigin(r,t,e.crossorigin),r.src=t,t=r}super(t),!t.complete&&this._width&&this._height&&(this._width=0,this._height=0),this.url=t.src,this._process=null,this.preserveBitmap=!1,this.createBitmap=(e.createBitmap??G.CREATE_IMAGE_BITMAP)&&!!globalThis.createImageBitmap,this.alphaMode="number"==typeof e.alphaMode?e.alphaMode:null,this.bitmap=null,this._load=null,!1!==e.autoLoad&&this.load()}/**
   * Returns a promise when image will be loaded and processed.
   * @param createBitmap - whether process image into bitmap
   */load(t){return this._load||(void 0!==t&&(this.createBitmap=t),this._load=new Promise((t,e)=>{let r=this.source;this.url=r.src;let i=()=>{this.destroyed||(r.onload=null,r.onerror=null,this.update(),this._load=null,this.createBitmap?t(this.process()):t(this))};r.complete&&r.src?i():(r.onload=i,r.onerror=t=>{e(t),this.onError.emit(t)})})),this._load}/**
   * Called when we need to convert image into BitmapImage.
   * Can be called multiple times, real promise is cached inside.
   * @returns - Cached promise to fill that bitmap
   */process(){let t=this.source;if(null!==this._process)return this._process;if(null!==this.bitmap||!globalThis.createImageBitmap)return Promise.resolve(this);let e=globalThis.createImageBitmap,r=!t.crossOrigin||"anonymous"===t.crossOrigin;return this._process=fetch(t.src,{mode:r?"cors":"no-cors"}).then(t=>t.blob()).then(r=>e(r,0,0,t.width,t.height,{premultiplyAlpha:null===this.alphaMode||this.alphaMode===M.UNPACK?"premultiply":"none"})).then(t=>this.destroyed?Promise.reject():(this.bitmap=t,this.update(),this._process=null,Promise.resolve(this))),this._process}/**
   * Upload the image resource to GPU.
   * @param renderer - Renderer to upload to
   * @param baseTexture - BaseTexture for this resource
   * @param glTexture - GLTexture to use
   * @returns {boolean} true is success
   */upload(t,e,r){if("number"==typeof this.alphaMode&&(e.alphaMode=this.alphaMode),!this.createBitmap)return super.upload(t,e,r);if(!this.bitmap&&(this.process(),!this.bitmap))return!1;if(super.upload(t,e,r,this.bitmap),!this.preserveBitmap){let t=!0,i=e._glTextures;for(let s in i){let n=i[s];if(n!==r&&n.dirtyId!==e.dirtyId){t=!1;break}}t&&(this.bitmap.close&&this.bitmap.close(),this.bitmap=null)}return!0}/** Destroys this resource. */dispose(){this.source.onload=null,this.source.onerror=null,super.dispose(),this.bitmap&&(this.bitmap.close(),this.bitmap=null),this._process=null,this._load=null}/**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if current environment support HTMLImageElement, and source is string or HTMLImageElement
   */static test(t){return"u">typeof HTMLImageElement&&("string"==typeof t||t instanceof HTMLImageElement)}}class ig{constructor(){this.x0=0,this.y0=0,this.x1=1,this.y1=0,this.x2=1,this.y2=1,this.x3=0,this.y3=1,this.uvsFloat32=new Float32Array(8)}/**
   * Sets the texture Uvs based on the given frame information.
   * @protected
   * @param frame - The frame of the texture
   * @param baseFrame - The base frame of the texture
   * @param rotate - Rotation of frame, see {@link PIXI.groupD8}
   */set(t,e,r){let i=e.width,s=e.height;if(r){let e=t.width/2/i,n=t.height/2/s,a=t.x/i+e,o=t.y/s+n;r=rM.add(r,rM.NW),this.x0=a+e*rM.uX(r),this.y0=o+n*rM.uY(r),r=rM.add(r,2),this.x1=a+e*rM.uX(r),this.y1=o+n*rM.uY(r),r=rM.add(r,2),this.x2=a+e*rM.uX(r),this.y2=o+n*rM.uY(r),r=rM.add(r,2),this.x3=a+e*rM.uX(r),this.y3=o+n*rM.uY(r)}else this.x0=t.x/i,this.y0=t.y/s,this.x1=(t.x+t.width)/i,this.y1=t.y/s,this.x2=(t.x+t.width)/i,this.y2=(t.y+t.height)/s,this.x3=t.x/i,this.y3=(t.y+t.height)/s;this.uvsFloat32[0]=this.x0,this.uvsFloat32[1]=this.y0,this.uvsFloat32[2]=this.x1,this.uvsFloat32[3]=this.y1,this.uvsFloat32[4]=this.x2,this.uvsFloat32[5]=this.y2,this.uvsFloat32[6]=this.x3,this.uvsFloat32[7]=this.y3}}ig.prototype.toString=function(){return`[@pixi/core:TextureUvs x0=${this.x0} y0=${this.y0} x1=${this.x1} y1=${this.y1} x2=${this.x2} y2=${this.y2} x3=${this.x3} y3=${this.y3}]`};const i_=new ig;function iy(t){t.destroy=function(){},t.on=function(){},t.once=function(){},t.emit=function(){}}class iv extends /*@__PURE__*/l(to){/**
   * @param baseTexture - The base texture source to create the texture from
   * @param frame - The rectangle frame of the texture to show
   * @param orig - The area of original texture
   * @param trim - Trimmed rectangle of original texture
   * @param rotate - indicates how the texture was rotated by texture packer. See {@link PIXI.groupD8}
   * @param anchor - Default anchor point used for sprite placement / rotation
   * @param borders - Default borders used for 9-slice scaling. See {@link PIXI.NineSlicePlane}
   */constructor(t,e,r,i,s,n,a){if(super(),this.noFrame=!1,e||(this.noFrame=!0,e=new r_(0,0,1,1)),t instanceof iv&&(t=t.baseTexture),this.baseTexture=t,this._frame=e,this.trim=i,this.valid=!1,this.destroyed=!1,this._uvs=i_,this.uvMatrix=null,this.orig=r||e,this._rotate=Number(s||0),!0===s)this._rotate=2;else if(this._rotate%2!=0)throw Error("attempt to use diamond-shaped UVs. If you are sure, set rotation manually");this.defaultAnchor=n?new rm(n.x,n.y):new rm(0,0),this.defaultBorders=a,this._updateID=0,this.textureCacheIds=[],t.valid?this.noFrame?t.valid&&this.onBaseTextureUpdated(t):this.frame=e:t.once("loaded",this.onBaseTextureUpdated,this),this.noFrame&&t.on("update",this.onBaseTextureUpdated,this)}/**
   * Updates this texture on the gpu.
   *
   * Calls the TextureResource update.
   *
   * If you adjusted `frame` manually, please call `updateUvs()` instead.
   */update(){this.baseTexture.resource&&this.baseTexture.resource.update()}/**
   * Called when the base texture is updated
   * @protected
   * @param baseTexture - The base texture.
   */onBaseTextureUpdated(t){if(this.noFrame){if(!this.baseTexture.valid)return;this._frame.width=t.width,this._frame.height=t.height,this.valid=!0,this.updateUvs()}else this.frame=this._frame;this.emit("update",this)}/**
   * Destroys this texture
   * @param [destroyBase=false] - Whether to destroy the base texture as well
   * @fires PIXI.Texture#destroyed
   */destroy(t){if(this.baseTexture){if(t){let{resource:t}=this.baseTexture;t?.url&&eB[t.url]&&iv.removeFromCache(t.url),this.baseTexture.destroy()}this.baseTexture.off("loaded",this.onBaseTextureUpdated,this),this.baseTexture.off("update",this.onBaseTextureUpdated,this),this.baseTexture=null}this._frame=null,this._uvs=null,this.trim=null,this.orig=null,this.valid=!1,iv.removeFromCache(this),this.textureCacheIds=null,this.destroyed=!0,this.emit("destroyed",this),this.removeAllListeners()}/**
   * Creates a new texture object that acts the same as this one.
   * @returns - The new texture
   */clone(){let t=this._frame.clone(),e=this._frame===this.orig?t:this.orig.clone(),r=new iv(this.baseTexture,!this.noFrame&&t,e,this.trim?.clone(),this.rotate,this.defaultAnchor,this.defaultBorders);return this.noFrame&&(r._frame=t),r}/**
   * Updates the internal WebGL UV cache. Use it after you change `frame` or `trim` of the texture.
   * Call it after changing the frame
   */updateUvs(){this._uvs===i_&&(this._uvs=new ig),this._uvs.set(this._frame,this.baseTexture,this.rotate),this._updateID++}/**
   * Helper function that creates a new Texture based on the source you provide.
   * The source can be - frame id, image url, video url, canvas element, video element, base texture
   * @param {string|PIXI.BaseTexture|HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas} source -
   *        Source or array of sources to create texture from
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   * @param {string} [options.pixiIdPrefix=pixiid] - If a source has no id, this is the prefix of the generated id
   * @param {boolean} [strict] - Enforce strict-mode, see {@link PIXI.settings.STRICT_TEXTURE_CACHE}.
   * @returns {PIXI.Texture} The newly created texture
   */static from(t,e={},r=G.STRICT_TEXTURE_CACHE){let i="string"==typeof t,s=null;if(i)s=t;else if(t instanceof e9){if(!t.cacheId){let r=e?.pixiIdPrefix||"pixiid";t.cacheId=`${r}-${eM()}`,e9.addToCache(t,t.cacheId)}s=t.cacheId}else{if(!t._pixiId){let r=e?.pixiIdPrefix||"pixiid";t._pixiId=`${r}_${eM()}`}s=t._pixiId}let n=eB[s];if(i&&r&&!n)throw Error(`The cacheId "${s}" does not exist in TextureCache.`);return n||t instanceof e9?!n&&t instanceof e9&&(n=new iv(t),iv.addToCache(n,s)):(e.resolution||(e.resolution=eW(t)),(n=new iv(new e9(t,e))).baseTexture.cacheId=s,e9.addToCache(n.baseTexture,s),iv.addToCache(n,s)),n}/**
   * Useful for loading textures via URLs. Use instead of `Texture.from` because
   * it does a better job of handling failed URLs more effectively. This also ignores
   * `PIXI.settings.STRICT_TEXTURE_CACHE`. Works for Videos, SVGs, Images.
   * @param url - The remote URL or array of URLs to load.
   * @param options - Optional options to include
   * @returns - A Promise that resolves to a Texture.
   */static fromURL(t,e){let r=Object.assign({autoLoad:!1},e?.resourceOptions),i=iv.from(t,Object.assign({resourceOptions:r},e),!1),s=i.baseTexture.resource;return i.baseTexture.valid?Promise.resolve(i):s.load().then(()=>Promise.resolve(i))}/**
   * Create a new Texture with a BufferResource from a typed array.
   * @param buffer - The optional array to use. If no data is provided, a new Float32Array is created.
   * @param width - Width of the resource
   * @param height - Height of the resource
   * @param options - See {@link PIXI.BaseTexture}'s constructor for options.
   *        Default properties are different from the constructor's defaults.
   * @param {PIXI.FORMATS} [options.format] - The format is not given, the type is inferred from the
   *        type of the buffer: `RGBA` if Float32Array, Int8Array, Uint8Array, or Uint8ClampedArray,
   *        otherwise `RGBA_INTEGER`.
   * @param {PIXI.TYPES} [options.type] - The type is not given, the type is inferred from the
   *        type of the buffer. Maps Float32Array to `FLOAT`, Int32Array to `INT`, Uint32Array to
   *        `UNSIGNED_INT`, Int16Array to `SHORT`, Uint16Array to `UNSIGNED_SHORT`, Int8Array to `BYTE`,
   *        Uint8Array/Uint8ClampedArray to `UNSIGNED_BYTE`.
   * @param {PIXI.ALPHA_MODES} [options.alphaMode=PIXI.ALPHA_MODES.NPM]
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.SCALE_MODES.NEAREST]
   * @returns - The resulting new BaseTexture
   */static fromBuffer(t,e,r,i){return new iv(e9.fromBuffer(t,e,r,i))}/**
   * Create a texture from a source and add to the cache.
   * @param {HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas|string} source - The input source.
   * @param imageUrl - File name of texture, for cache and resolving resolution.
   * @param name - Human readable name for the texture cache. If no name is
   *        specified, only `imageUrl` will be used as the cache ID.
   * @param options
   * @returns - Output texture
   */static fromLoader(t,e,r,i){let s=new e9(t,Object.assign({scaleMode:e9.defaultOptions.scaleMode,resolution:eW(e)},i)),{resource:n}=s;n instanceof im&&(n.url=e);let a=new iv(s);return r||(r=e),e9.addToCache(a.baseTexture,r),iv.addToCache(a,r),r!==e&&(e9.addToCache(a.baseTexture,e),iv.addToCache(a,e)),a.baseTexture.valid?Promise.resolve(a):new Promise(t=>{a.baseTexture.once("loaded",()=>t(a))})}/**
   * Adds a Texture to the global TextureCache. This cache is shared across the whole PIXI object.
   * @param texture - The Texture to add to the cache.
   * @param id - The id that the Texture will be stored against.
   */static addToCache(t,e){e&&(t.textureCacheIds.includes(e)||t.textureCacheIds.push(e),eB[e]&&eB[e]!==t&&console.warn(`Texture added to the cache with an id [${e}] that already had an entry`),eB[e]=t)}/**
   * Remove a Texture from the global TextureCache.
   * @param texture - id of a Texture to be removed, or a Texture instance itself
   * @returns - The Texture that was removed
   */static removeFromCache(t){if("string"==typeof t){let e=eB[t];if(e){let r=e.textureCacheIds.indexOf(t);return r>-1&&e.textureCacheIds.splice(r,1),delete eB[t],e}}else if(t?.textureCacheIds){for(let e=0;e<t.textureCacheIds.length;++e)eB[t.textureCacheIds[e]]===t&&delete eB[t.textureCacheIds[e]];return t.textureCacheIds.length=0,t}return null}/**
   * Returns resolution of baseTexture
   * @readonly
   */get resolution(){return this.baseTexture.resolution}/**
   * The frame specifies the region of the base texture that this texture uses.
   * Please call `updateUvs()` after you change coordinates of `frame` manually.
   */get frame(){return this._frame}set frame(t){this._frame=t,this.noFrame=!1;let{x:e,y:r,width:i,height:s}=t,n=e+i>this.baseTexture.width,a=r+s>this.baseTexture.height;if(n||a){let t=`X: ${e} + ${i} = ${e+i} > ${this.baseTexture.width}`,o=`Y: ${r} + ${s} = ${r+s} > ${this.baseTexture.height}`;throw Error(`Texture Error: frame does not fit inside the base Texture dimensions: ${t} ${n&&a?"and":"or"} ${o}`)}this.valid=i&&s&&this.baseTexture.valid,this.trim||this.rotate||(this.orig=t),this.valid&&this.updateUvs()}/**
   * Indicates whether the texture is rotated inside the atlas
   * set to 2 to compensate for texture packer rotation
   * set to 6 to compensate for spine packer rotation
   * can be used to rotate or mirror sprites
   * See {@link PIXI.groupD8} for explanation
   */get rotate(){return this._rotate}set rotate(t){this._rotate=t,this.valid&&this.updateUvs()}/** The width of the Texture in pixels. */get width(){return this.orig.width}/** The height of the Texture in pixels. */get height(){return this.orig.height}/** Utility function for BaseTexture|Texture cast. */castToBaseTexture(){return this.baseTexture}/** An empty texture, used often to not have to create multiple empty textures. Can not be destroyed. */static get EMPTY(){return iv._EMPTY||(iv._EMPTY=new iv(new e9),iy(iv._EMPTY),iy(iv._EMPTY.baseTexture)),iv._EMPTY}/** A white texture of 16x16 size, used for graphics and other things Can not be destroyed. */static get WHITE(){if(!iv._WHITE){let t=G.ADAPTER.createCanvas(16,16),e=t.getContext("2d");t.width=16,t.height=16,e.fillStyle="white",e.fillRect(0,0,16,16),iv._WHITE=new iv(e9.from(t)),iy(iv._WHITE),iy(iv._WHITE.baseTexture)}return iv._WHITE}}class ix extends iv{/**
   * @param baseRenderTexture - The base texture object that this texture uses.
   * @param frame - The rectangle frame of the texture to show.
   */constructor(t,e){super(t,e),this.valid=!0,this.filterFrame=null,this.filterPoolKey=null,this.updateUvs()}/**
   * Shortcut to `this.baseTexture.framebuffer`, saves baseTexture cast.
   * @readonly
   */get framebuffer(){return this.baseTexture.framebuffer}/**
   * Shortcut to `this.framebuffer.multisample`.
   * @default PIXI.MSAA_QUALITY.NONE
   */get multisample(){return this.framebuffer.multisample}set multisample(t){this.framebuffer.multisample=t}/**
   * Resizes the RenderTexture.
   * @param desiredWidth - The desired width to resize to.
   * @param desiredHeight - The desired height to resize to.
   * @param resizeBaseTexture - Should the baseTexture.width and height values be resized as well?
   */resize(t,e,r=!0){let i=this.baseTexture.resolution,s=Math.round(t*i)/i,n=Math.round(e*i)/i;this.valid=s>0&&n>0,this._frame.width=this.orig.width=s,this._frame.height=this.orig.height=n,r&&this.baseTexture.resize(s,n),this.updateUvs()}/**
   * Changes the resolution of baseTexture, but does not change framebuffer size.
   * @param resolution - The new resolution to apply to RenderTexture
   */setResolution(t){let{baseTexture:e}=this;e.resolution!==t&&(e.setResolution(t),this.resize(e.width,e.height,!1))}/**
   * A short hand way of creating a render texture.
   * @param options - Options
   * @param {number} [options.width=100] - The width of the render texture
   * @param {number} [options.height=100] - The height of the render texture
   * @param {PIXI.SCALE_MODES} [options.scaleMode=PIXI.BaseTexture.defaultOptions.scaleMode] - See {@link PIXI.SCALE_MODES}
   *    for possible values
   * @param {number} [options.resolution=PIXI.settings.RESOLUTION] - The resolution / device pixel ratio of the texture
   *    being generated
   * @param {PIXI.MSAA_QUALITY} [options.multisample=PIXI.MSAA_QUALITY.NONE] - The number of samples of the frame buffer
   * @returns The new render texture
   */static create(t){return new ix(new ic(t))}}class ib{/**
   * @param textureOptions - options that will be passed to BaseRenderTexture constructor
   * @param {PIXI.SCALE_MODES} [textureOptions.scaleMode] - See {@link PIXI.SCALE_MODES} for possible values.
   */constructor(t){this.texturePool={},this.textureOptions=t||{},this.enableFullScreen=!1,this._pixelsWidth=0,this._pixelsHeight=0}/**
   * Creates texture with params that were specified in pool constructor.
   * @param realWidth - Width of texture in pixels.
   * @param realHeight - Height of texture in pixels.
   * @param multisample - Number of samples of the framebuffer.
   */createTexture(t,e,r=N.NONE){let i=new ic(Object.assign({width:t,height:e,resolution:1,multisample:r},this.textureOptions));return new ix(i)}/**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param minWidth - The minimum width of the render texture.
   * @param minHeight - The minimum height of the render texture.
   * @param resolution - The resolution of the render texture.
   * @param multisample - Number of samples of the render texture.
   * @returns The new render texture.
   */getOptimalTexture(t,e,r=1,i=N.NONE){let s;t=Math.max(Math.ceil(t*r-1e-6),1),e=Math.max(Math.ceil(e*r-1e-6),1),this.enableFullScreen&&t===this._pixelsWidth&&e===this._pixelsHeight?s=i>1?-i:-1:(t=eA(t),e=eA(e),s=((65535&t)<<16|65535&e)>>>0,i>1&&(s+=4294967296*i)),this.texturePool[s]||(this.texturePool[s]=[]);let n=this.texturePool[s].pop();return n||(n=this.createTexture(t,e,i)),n.filterPoolKey=s,n.setResolution(r),n}/**
   * Gets extra texture of the same size as input renderTexture
   *
   * `getFilterTexture(input, 0.5)` or `getFilterTexture(0.5, input)`
   * @param input - renderTexture from which size and resolution will be copied
   * @param resolution - override resolution of the renderTexture
   *  It overrides, it does not multiply
   * @param multisample - number of samples of the renderTexture
   */getFilterTexture(t,e,r){let i=this.getOptimalTexture(t.width,t.height,e||t.resolution,r||N.NONE);return i.filterFrame=t.filterFrame,i}/**
   * Place a render texture back into the pool.
   * @param renderTexture - The renderTexture to free
   */returnTexture(t){let e=t.filterPoolKey;t.filterFrame=null,this.texturePool[e].push(t)}/**
   * Alias for returnTexture, to be compliant with FilterSystem interface.
   * @param renderTexture - The renderTexture to free
   */returnFilterTexture(t){this.returnTexture(t)}/**
   * Clears the pool.
   * @param destroyTextures - Destroy all stored textures.
   */clear(t){if(t=!1!==t)for(let t in this.texturePool){let e=this.texturePool[t];if(e)for(let t=0;t<e.length;t++)e[t].destroy(!0)}this.texturePool={}}/**
   * If screen size was changed, drops all screen-sized textures,
   * sets new screen size, sets `enableFullScreen` to true
   *
   * Size is measured in pixels, `renderer.view` can be passed here, not `renderer.screen`
   * @param size - Initial size of screen.
   */setScreenSize(t){if(!(t.width===this._pixelsWidth&&t.height===this._pixelsHeight)){for(let e in this.enableFullScreen=t.width>0&&t.height>0,this.texturePool){if(!(0>Number(e)))continue;let t=this.texturePool[e];if(t)for(let e=0;e<t.length;e++)t[e].destroy(!0);this.texturePool[e]=[]}this._pixelsWidth=t.width,this._pixelsHeight=t.height}}}ib.SCREEN_KEY=-1;class iT extends rh{constructor(){super(),this.addAttribute("aVertexPosition",new Float32Array([0,0,1,0,1,1,0,1])).addIndex([0,1,3,2])}}class iE extends rh{constructor(){super(),this.vertices=new Float32Array([-1,-1,1,-1,1,1,-1,1]),this.uvs=new Float32Array([0,0,1,0,1,1,0,1]),this.vertexBuffer=new rr(this.vertices),this.uvBuffer=new rr(this.uvs),this.addAttribute("aVertexPosition",this.vertexBuffer).addAttribute("aTextureCoord",this.uvBuffer).addIndex([0,1,2,0,2,3])}/**
   * Maps two Rectangle to the quad.
   * @param targetTextureFrame - The first rectangle
   * @param destinationFrame - The second rectangle
   * @returns - Returns itself.
   */map(t,e){let r=0,i=0;return this.uvs[0]=r,this.uvs[1]=i,this.uvs[2]=r+e.width/t.width,this.uvs[3]=i,this.uvs[4]=r+e.width/t.width,this.uvs[5]=i+e.height/t.height,this.uvs[6]=r,this.uvs[7]=i+e.height/t.height,r=e.x,i=e.y,this.vertices[0]=r,this.vertices[1]=i,this.vertices[2]=r+e.width,this.vertices[3]=i,this.vertices[4]=r+e.width,this.vertices[5]=i+e.height,this.vertices[6]=r,this.vertices[7]=i+e.height,this.invalidate(),this}/**
   * Legacy upload method, just marks buffers dirty.
   * @returns - Returns itself.
   */invalidate(){return this.vertexBuffer._updateID++,this.uvBuffer._updateID++,this}}class iA{constructor(){this.renderTexture=null,this.target=null,this.legacy=!1,this.resolution=1,this.multisample=N.NONE,this.sourceFrame=new r_,this.destinationFrame=new r_,this.bindingSourceFrame=new r_,this.bindingDestinationFrame=new r_,this.filters=[],this.transform=null}/** Clears the state */clear(){this.target=null,this.filters=null,this.renderTexture=null}}const iw=[new rm,new rm,new rm,new rm],iS=new rT;class iR{/**
   * @param renderer - The renderer this System works for.
   */constructor(t){this.renderer=t,this.defaultFilterStack=[{}],this.texturePool=new ib,this.statePool=[],this.quad=new iT,this.quadUv=new iE,this.tempRect=new r_,this.activeState={},this.globalUniforms=new r3({outputFrame:new r_,inputSize:new Float32Array(4),inputPixel:new Float32Array(4),inputClamp:new Float32Array(4),resolution:1,// legacy variables
filterArea:new Float32Array(4),filterClamp:new Float32Array(4)},!0),this.forceClear=!1,this.useMaxPadding=!1}init(){this.texturePool.setScreenSize(this.renderer.view)}/**
   * Pushes a set of filters to be applied later to the system. This will redirect further rendering into an
   * input render-texture for the rest of the filtering pipeline.
   * @param {PIXI.DisplayObject} target - The target of the filter to render.
   * @param filters - The filters to apply.
   */push(t,e){let r,i;let s=this.renderer,n=this.defaultFilterStack,a=this.statePool.pop()||new iA,o=s.renderTexture;if(o.current){let t=o.current;r=t.resolution,i=t.multisample}else r=s.resolution,i=s.multisample;let h=e[0].resolution||r,l=e[0].multisample??i,u=e[0].padding,d=e[0].autoFit,c=e[0].legacy??!0;for(let t=1;t<e.length;t++){let s=e[t];h=Math.min(h,s.resolution||r),l=Math.min(l,s.multisample??i),u=this.useMaxPadding?Math.max(u,s.padding):u+s.padding,d=d&&s.autoFit,c=c||(s.legacy??!0)}1===n.length&&(this.defaultFilterStack[0].renderTexture=o.current),n.push(a),a.resolution=h,a.multisample=l,a.legacy=c,a.target=t,a.sourceFrame.copyFrom(t.filterArea||t.getBounds(!0)),a.sourceFrame.pad(u);let p=this.tempRect.copyFrom(o.sourceFrame);s.projection.transform&&this.transformAABB(iS.copyFrom(s.projection.transform).invert(),p),d?(a.sourceFrame.fit(p),(a.sourceFrame.width<=0||a.sourceFrame.height<=0)&&(a.sourceFrame.width=0,a.sourceFrame.height=0)):a.sourceFrame.intersects(p)||(a.sourceFrame.width=0,a.sourceFrame.height=0),this.roundFrame(a.sourceFrame,o.current?o.current.resolution:s.resolution,o.sourceFrame,o.destinationFrame,s.projection.transform),a.renderTexture=this.getOptimalFilterTexture(a.sourceFrame.width,a.sourceFrame.height,h,l),a.filters=e,a.destinationFrame.width=a.renderTexture.width,a.destinationFrame.height=a.renderTexture.height;let f=this.tempRect;f.x=0,f.y=0,f.width=a.sourceFrame.width,f.height=a.sourceFrame.height,a.renderTexture.filterFrame=a.sourceFrame,a.bindingSourceFrame.copyFrom(o.sourceFrame),a.bindingDestinationFrame.copyFrom(o.destinationFrame),a.transform=s.projection.transform,s.projection.transform=null,o.bind(a.renderTexture,a.sourceFrame,f),s.framebuffer.clear(0,0,0,0)}/** Pops off the filter and applies it. */pop(){let t=this.defaultFilterStack,e=t.pop(),r=e.filters;this.activeState=e;let i=this.globalUniforms.uniforms;i.outputFrame=e.sourceFrame,i.resolution=e.resolution;let s=i.inputSize,n=i.inputPixel,a=i.inputClamp;if(s[0]=e.destinationFrame.width,s[1]=e.destinationFrame.height,s[2]=1/s[0],s[3]=1/s[1],n[0]=Math.round(s[0]*e.resolution),n[1]=Math.round(s[1]*e.resolution),n[2]=1/n[0],n[3]=1/n[1],a[0]=.5*n[2],a[1]=.5*n[3],a[2]=e.sourceFrame.width*s[2]-.5*n[2],a[3]=e.sourceFrame.height*s[3]-.5*n[3],e.legacy){let t=i.filterArea;t[0]=e.destinationFrame.width,t[1]=e.destinationFrame.height,t[2]=e.sourceFrame.x,t[3]=e.sourceFrame.y,i.filterClamp=i.inputClamp}this.globalUniforms.update();let o=t[t.length-1];if(this.renderer.framebuffer.blit(),1===r.length)r[0].apply(this,e.renderTexture,o.renderTexture,P.BLEND,e),this.returnFilterTexture(e.renderTexture);else{let t=e.renderTexture,i=this.getOptimalFilterTexture(t.width,t.height,e.resolution);i.filterFrame=t.filterFrame;let s=0;for(s=0;s<r.length-1;++s){1===s&&e.multisample>1&&((i=this.getOptimalFilterTexture(t.width,t.height,e.resolution)).filterFrame=t.filterFrame),r[s].apply(this,t,i,P.CLEAR,e);let n=t;t=i,i=n}r[s].apply(this,t,o.renderTexture,P.BLEND,e),s>1&&e.multisample>1&&this.returnFilterTexture(e.renderTexture),this.returnFilterTexture(t),this.returnFilterTexture(i)}e.clear(),this.statePool.push(e)}/**
   * Binds a renderTexture with corresponding `filterFrame`, clears it if mode corresponds.
   * @param filterTexture - renderTexture to bind, should belong to filter pool or filter stack
   * @param clearMode - clearMode, by default its CLEAR/YES. See {@link PIXI.CLEAR_MODES}
   */bindAndClear(t,e=P.CLEAR){let{renderTexture:r,state:i}=this.renderer;if(t===this.defaultFilterStack[this.defaultFilterStack.length-1].renderTexture?this.renderer.projection.transform=this.activeState.transform:this.renderer.projection.transform=null,t?.filterFrame){let e=this.tempRect;e.x=0,e.y=0,e.width=t.filterFrame.width,e.height=t.filterFrame.height,r.bind(t,t.filterFrame,e)}else t!==this.defaultFilterStack[this.defaultFilterStack.length-1].renderTexture?r.bind(t):this.renderer.renderTexture.bind(t,this.activeState.bindingSourceFrame,this.activeState.bindingDestinationFrame);let s=1&i.stateId||this.forceClear;(e===P.CLEAR||e===P.BLIT&&s)&&this.renderer.framebuffer.clear(0,0,0,0)}/**
   * Draws a filter using the default rendering process.
   *
   * This should be called only by {@link PIXI.Filter#apply}.
   * @param filter - The filter to draw.
   * @param input - The input render target.
   * @param output - The target to output to.
   * @param clearMode - Should the output be cleared before rendering to it
   */applyFilter(t,e,r,i){let s=this.renderer;s.state.set(t.state),this.bindAndClear(r,i),t.uniforms.uSampler=e,t.uniforms.filterGlobals=this.globalUniforms,s.shader.bind(t),t.legacy=!!t.program.attributeData.aTextureCoord,t.legacy?(this.quadUv.map(e._frame,e.filterFrame),s.geometry.bind(this.quadUv),s.geometry.draw(T.TRIANGLES)):(s.geometry.bind(this.quad),s.geometry.draw(T.TRIANGLE_STRIP))}/**
   * Multiply _input normalized coordinates_ to this matrix to get _sprite texture normalized coordinates_.
   *
   * Use `outputMatrix * vTextureCoord` in the shader.
   * @param outputMatrix - The matrix to output to.
   * @param {PIXI.Sprite} sprite - The sprite to map to.
   * @returns The mapped matrix.
   */calculateSpriteMatrix(t,e){let{sourceFrame:r,destinationFrame:i}=this.activeState,{orig:s}=e._texture,n=t.set(i.width,0,0,i.height,r.x,r.y),a=e.worldTransform.copyTo(rT.TEMP_MATRIX);return a.invert(),n.prepend(a),n.scale(1/s.width,1/s.height),n.translate(e.anchor.x,e.anchor.y),n}/** Destroys this Filter System. */destroy(){this.renderer=null,this.texturePool.clear(!1)}/**
   * Gets a Power-of-Two render texture or fullScreen texture
   * @param minWidth - The minimum width of the render texture in real pixels.
   * @param minHeight - The minimum height of the render texture in real pixels.
   * @param resolution - The resolution of the render texture.
   * @param multisample - Number of samples of the render texture.
   * @returns - The new render texture.
   */getOptimalFilterTexture(t,e,r=1,i=N.NONE){return this.texturePool.getOptimalTexture(t,e,r,i)}/**
   * Gets extra render texture to use inside current filter
   * To be compliant with older filters, you can use params in any order
   * @param input - renderTexture from which size and resolution will be copied
   * @param resolution - override resolution of the renderTexture
   * @param multisample - number of samples of the renderTexture
   */getFilterTexture(t,e,r){if("number"==typeof t){let r=t;t=e,e=r}t=t||this.activeState.renderTexture;let i=this.texturePool.getOptimalTexture(t.width,t.height,e||t.resolution,r||N.NONE);return i.filterFrame=t.filterFrame,i}/**
   * Frees a render texture back into the pool.
   * @param renderTexture - The renderTarget to free
   */returnFilterTexture(t){this.texturePool.returnTexture(t)}/** Empties the texture pool. */emptyPool(){this.texturePool.clear(!0)}/** Calls `texturePool.resize()`, affects fullScreen renderTextures. */resize(){this.texturePool.setScreenSize(this.renderer.view)}/**
   * @param matrix - first param
   * @param rect - second param
   */transformAABB(t,e){let r=iw[0],i=iw[1],s=iw[2],n=iw[3];r.set(e.left,e.top),i.set(e.left,e.bottom),s.set(e.right,e.top),n.set(e.right,e.bottom),t.apply(r,r),t.apply(i,i),t.apply(s,s),t.apply(n,n);let a=Math.min(r.x,i.x,s.x,n.x),o=Math.min(r.y,i.y,s.y,n.y),h=Math.max(r.x,i.x,s.x,n.x),l=Math.max(r.y,i.y,s.y,n.y);e.x=a,e.y=o,e.width=h-a,e.height=l-o}roundFrame(t,e,r,i,s){if(!(t.width<=0||t.height<=0||r.width<=0||r.height<=0)){if(s){let{a:t,b:e,c:r,d:i}=s;if((Math.abs(e)>1e-4||Math.abs(r)>1e-4)&&(Math.abs(t)>1e-4||Math.abs(i)>1e-4))return}(s=s?iS.copyFrom(s):iS.identity()).translate(-r.x,-r.y).scale(i.width/r.width,i.height/r.height).translate(i.x,i.y),this.transformAABB(s,t),t.ceil(e),this.transformAABB(s.invert(),t)}}}iR.extension={type:e$.RendererSystem,name:"filter"},eK.add(iR);class iI{constructor(t){this.framebuffer=t,this.stencil=null,this.dirtyId=-1,this.dirtyFormat=-1,this.dirtySize=-1,this.multisample=N.NONE,this.msaaBuffer=null,this.blitFramebuffer=null,this.mipLevel=0}}const iC=new r_;class iM{/**
   * @param renderer - The renderer this System works for.
   */constructor(t){this.renderer=t,this.managedFramebuffers=[],this.unknownFramebuffer=new id(10,10),this.msaaSamples=null}/** Sets up the renderer context and necessary buffers. */contextChange(){this.disposeAll(!0);let t=this.gl=this.renderer.gl;if(this.CONTEXT_UID=this.renderer.CONTEXT_UID,this.current=this.unknownFramebuffer,this.viewport=new r_,this.hasMRT=!0,this.writeDepthTexture=!0,1===this.renderer.context.webGLVersion){let e=this.renderer.context.extensions.drawBuffers,r=this.renderer.context.extensions.depthTexture;G.PREFER_ENV===y.WEBGL_LEGACY&&(e=null,r=null),e?t.drawBuffers=t=>e.drawBuffersWEBGL(t):(this.hasMRT=!1,t.drawBuffers=()=>{}),r||(this.writeDepthTexture=!1)}else this.msaaSamples=t.getInternalformatParameter(t.RENDERBUFFER,t.RGBA8,t.SAMPLES)}/**
   * Bind a framebuffer.
   * @param framebuffer
   * @param frame - frame, default is framebuffer size
   * @param mipLevel - optional mip level to set on the framebuffer - defaults to 0
   */bind(t,e,r=0){let{gl:i}=this;if(t){let s=t.glFramebuffers[this.CONTEXT_UID]||this.initFramebuffer(t);this.current!==t&&(this.current=t,i.bindFramebuffer(i.FRAMEBUFFER,s.framebuffer)),s.mipLevel!==r&&(t.dirtyId++,t.dirtyFormat++,s.mipLevel=r),s.dirtyId!==t.dirtyId&&(s.dirtyId=t.dirtyId,s.dirtyFormat!==t.dirtyFormat?(s.dirtyFormat=t.dirtyFormat,s.dirtySize=t.dirtySize,this.updateFramebuffer(t,r)):s.dirtySize!==t.dirtySize&&(s.dirtySize=t.dirtySize,this.resizeFramebuffer(t)));for(let e=0;e<t.colorTextures.length;e++){let r=t.colorTextures[e];this.renderer.texture.unbind(r.parentTextureArray||r)}if(t.depthTexture&&this.renderer.texture.unbind(t.depthTexture),e){let t=e.width>>r,i=e.height>>r,s=t/e.width;this.setViewport(e.x*s,e.y*s,t,i)}else{let e=t.width>>r,i=t.height>>r;this.setViewport(0,0,e,i)}}else this.current&&(this.current=null,i.bindFramebuffer(i.FRAMEBUFFER,null)),e?this.setViewport(e.x,e.y,e.width,e.height):this.setViewport(0,0,this.renderer.width,this.renderer.height)}/**
   * Set the WebGLRenderingContext's viewport.
   * @param x - X position of viewport
   * @param y - Y position of viewport
   * @param width - Width of viewport
   * @param height - Height of viewport
   */setViewport(t,e,r,i){let s=this.viewport;t=Math.round(t),e=Math.round(e),r=Math.round(r),i=Math.round(i),(s.width!==r||s.height!==i||s.x!==t||s.y!==e)&&(s.x=t,s.y=e,s.width=r,s.height=i,this.gl.viewport(t,e,r,i))}/**
   * Get the size of the current width and height. Returns object with `width` and `height` values.
   * @readonly
   */get size(){return this.current?{x:0,y:0,width:this.current.width,height:this.current.height}:{x:0,y:0,width:this.renderer.width,height:this.renderer.height}}/**
   * Clear the color of the context
   * @param r - Red value from 0 to 1
   * @param g - Green value from 0 to 1
   * @param b - Blue value from 0 to 1
   * @param a - Alpha value from 0 to 1
   * @param {PIXI.BUFFER_BITS} [mask=BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH] - Bitwise OR of masks
   *  that indicate the buffers to be cleared, by default COLOR and DEPTH buffers.
   */clear(t,e,r,i,s=x.COLOR|x.DEPTH){let{gl:n}=this;n.clearColor(t,e,r,i),n.clear(s)}/**
   * Initialize framebuffer for this context
   * @protected
   * @param framebuffer
   * @returns - created GLFramebuffer
   */initFramebuffer(t){let{gl:e}=this,r=new iI(e.createFramebuffer());return r.multisample=this.detectSamples(t.multisample),t.glFramebuffers[this.CONTEXT_UID]=r,this.managedFramebuffers.push(t),t.disposeRunner.add(this),r}/**
   * Resize the framebuffer
   * @param framebuffer
   * @protected
   */resizeFramebuffer(t){let{gl:e}=this,r=t.glFramebuffers[this.CONTEXT_UID];if(r.stencil){let i;e.bindRenderbuffer(e.RENDERBUFFER,r.stencil),i=1===this.renderer.context.webGLVersion?e.DEPTH_STENCIL:t.depth&&t.stencil?e.DEPTH24_STENCIL8:t.depth?e.DEPTH_COMPONENT24:e.STENCIL_INDEX8,r.msaaBuffer?e.renderbufferStorageMultisample(e.RENDERBUFFER,r.multisample,i,t.width,t.height):e.renderbufferStorage(e.RENDERBUFFER,i,t.width,t.height)}let i=t.colorTextures,s=i.length;e.drawBuffers||(s=Math.min(s,1));for(let n=0;n<s;n++){let s=i[n],a=s.parentTextureArray||s;this.renderer.texture.bind(a,0),0===n&&r.msaaBuffer&&(e.bindRenderbuffer(e.RENDERBUFFER,r.msaaBuffer),e.renderbufferStorageMultisample(e.RENDERBUFFER,r.multisample,a._glTextures[this.CONTEXT_UID].internalFormat,t.width,t.height))}t.depthTexture&&this.writeDepthTexture&&this.renderer.texture.bind(t.depthTexture,0)}/**
   * Update the framebuffer
   * @param framebuffer
   * @param mipLevel
   * @protected
   */updateFramebuffer(t,e){let{gl:r}=this,i=t.glFramebuffers[this.CONTEXT_UID],s=t.colorTextures,n=s.length;r.drawBuffers||(n=Math.min(n,1)),i.multisample>1&&this.canMultisampleFramebuffer(t)?i.msaaBuffer=i.msaaBuffer||r.createRenderbuffer():i.msaaBuffer&&(r.deleteRenderbuffer(i.msaaBuffer),i.msaaBuffer=null,i.blitFramebuffer&&(i.blitFramebuffer.dispose(),i.blitFramebuffer=null));let a=[];for(let o=0;o<n;o++){let n=s[o],h=n.parentTextureArray||n;this.renderer.texture.bind(h,0),0===o&&i.msaaBuffer?(r.bindRenderbuffer(r.RENDERBUFFER,i.msaaBuffer),r.renderbufferStorageMultisample(r.RENDERBUFFER,i.multisample,h._glTextures[this.CONTEXT_UID].internalFormat,t.width,t.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,i.msaaBuffer)):(r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+o,n.target,h._glTextures[this.CONTEXT_UID].texture,e),a.push(r.COLOR_ATTACHMENT0+o))}if(a.length>1&&r.drawBuffers(a),t.depthTexture&&this.writeDepthTexture){let i=t.depthTexture;this.renderer.texture.bind(i,0),r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,i._glTextures[this.CONTEXT_UID].texture,e)}if((t.stencil||t.depth)&&!(t.depthTexture&&this.writeDepthTexture)){let e,s;i.stencil=i.stencil||r.createRenderbuffer(),1===this.renderer.context.webGLVersion?(e=r.DEPTH_STENCIL_ATTACHMENT,s=r.DEPTH_STENCIL):t.depth&&t.stencil?(e=r.DEPTH_STENCIL_ATTACHMENT,s=r.DEPTH24_STENCIL8):t.depth?(e=r.DEPTH_ATTACHMENT,s=r.DEPTH_COMPONENT24):(e=r.STENCIL_ATTACHMENT,s=r.STENCIL_INDEX8),r.bindRenderbuffer(r.RENDERBUFFER,i.stencil),i.msaaBuffer?r.renderbufferStorageMultisample(r.RENDERBUFFER,i.multisample,s,t.width,t.height):r.renderbufferStorage(r.RENDERBUFFER,s,t.width,t.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,e,r.RENDERBUFFER,i.stencil)}else i.stencil&&(r.deleteRenderbuffer(i.stencil),i.stencil=null)}/**
   * Returns true if the frame buffer can be multisampled.
   * @param framebuffer
   */canMultisampleFramebuffer(t){return 1!==this.renderer.context.webGLVersion&&t.colorTextures.length<=1&&!t.depthTexture}/**
   * Detects number of samples that is not more than a param but as close to it as possible
   * @param samples - number of samples
   * @returns - recommended number of samples
   */detectSamples(t){let{msaaSamples:e}=this,r=N.NONE;if(t<=1||null===e)return r;for(let i=0;i<e.length;i++)if(e[i]<=t){r=e[i];break}return 1===r&&(r=N.NONE),r}/**
   * Only works with WebGL2
   *
   * blits framebuffer to another of the same or bigger size
   * after that target framebuffer is bound
   *
   * Fails with WebGL warning if blits multisample framebuffer to different size
   * @param framebuffer - by default it blits "into itself", from renderBuffer to texture.
   * @param sourcePixels - source rectangle in pixels
   * @param destPixels - dest rectangle in pixels, assumed to be the same as sourcePixels
   */blit(t,e,r){let{current:i,renderer:s,gl:n,CONTEXT_UID:a}=this;if(2!==s.context.webGLVersion||!i)return;let o=i.glFramebuffers[a];if(!o)return;if(!t){if(!o.msaaBuffer)return;let e=i.colorTextures[0];if(!e)return;o.blitFramebuffer||(o.blitFramebuffer=new id(i.width,i.height),o.blitFramebuffer.addColorTexture(0,e)),(t=o.blitFramebuffer).colorTextures[0]!==e&&(t.colorTextures[0]=e,t.dirtyId++,t.dirtyFormat++),(t.width!==i.width||t.height!==i.height)&&(t.width=i.width,t.height=i.height,t.dirtyId++,t.dirtySize++)}e||((e=iC).width=i.width,e.height=i.height),r||(r=e);let h=e.width===r.width&&e.height===r.height;this.bind(t),n.bindFramebuffer(n.READ_FRAMEBUFFER,o.framebuffer),n.blitFramebuffer(e.left,e.top,e.right,e.bottom,r.left,r.top,r.right,r.bottom,n.COLOR_BUFFER_BIT,h?n.NEAREST:n.LINEAR),n.bindFramebuffer(n.READ_FRAMEBUFFER,t.glFramebuffers[this.CONTEXT_UID].framebuffer)}/**
   * Disposes framebuffer.
   * @param framebuffer - framebuffer that has to be disposed of
   * @param contextLost - If context was lost, we suppress all delete function calls
   */disposeFramebuffer(t,e){let r=t.glFramebuffers[this.CONTEXT_UID],i=this.gl;if(!r)return;delete t.glFramebuffers[this.CONTEXT_UID];let s=this.managedFramebuffers.indexOf(t);s>=0&&this.managedFramebuffers.splice(s,1),t.disposeRunner.remove(this),e||(i.deleteFramebuffer(r.framebuffer),r.msaaBuffer&&i.deleteRenderbuffer(r.msaaBuffer),r.stencil&&i.deleteRenderbuffer(r.stencil)),r.blitFramebuffer&&this.disposeFramebuffer(r.blitFramebuffer,e)}/**
   * Disposes all framebuffers, but not textures bound to them.
   * @param [contextLost=false] - If context was lost, we suppress all delete function calls
   */disposeAll(t){let e=this.managedFramebuffers;this.managedFramebuffers=[];for(let r=0;r<e.length;r++)this.disposeFramebuffer(e[r],t)}/**
   * Forcing creation of stencil buffer for current framebuffer, if it wasn't done before.
   * Used by MaskSystem, when its time to use stencil mask for Graphics element.
   *
   * Its an alternative for public lazy `framebuffer.enableStencil`, in case we need stencil without rebind.
   * @private
   */forceStencil(){let t,e;let r=this.current;if(!r)return;let i=r.glFramebuffers[this.CONTEXT_UID];if(!i||i.stencil&&r.stencil)return;r.stencil=!0;let s=r.width,n=r.height,a=this.gl,o=i.stencil=a.createRenderbuffer();a.bindRenderbuffer(a.RENDERBUFFER,o),1===this.renderer.context.webGLVersion?(t=a.DEPTH_STENCIL_ATTACHMENT,e=a.DEPTH_STENCIL):r.depth?(t=a.DEPTH_STENCIL_ATTACHMENT,e=a.DEPTH24_STENCIL8):(t=a.STENCIL_ATTACHMENT,e=a.STENCIL_INDEX8),i.msaaBuffer?a.renderbufferStorageMultisample(a.RENDERBUFFER,i.multisample,e,s,n):a.renderbufferStorage(a.RENDERBUFFER,e,s,n),a.framebufferRenderbuffer(a.FRAMEBUFFER,t,a.RENDERBUFFER,o)}/** Resets framebuffer stored state, binds screen framebuffer. Should be called before renderTexture reset(). */reset(){this.current=this.unknownFramebuffer,this.viewport=new r_}destroy(){this.renderer=null}}iM.extension={type:e$.RendererSystem,name:"framebuffer"},eK.add(iM);const iP={5126:4,5123:2,5121:1};class iD{/** @param renderer - The renderer this System works for. */constructor(t){this.renderer=t,this._activeGeometry=null,this._activeVao=null,this.hasVao=!0,this.hasInstance=!0,this.canUseUInt32ElementIndex=!1,this.managedGeometries={}}/** Sets up the renderer context and necessary buffers. */contextChange(){this.disposeAll(!0);let t=this.gl=this.renderer.gl,e=this.renderer.context;if(this.CONTEXT_UID=this.renderer.CONTEXT_UID,2!==e.webGLVersion){let e=this.renderer.context.extensions.vertexArrayObject;G.PREFER_ENV===y.WEBGL_LEGACY&&(e=null),e?(t.createVertexArray=()=>e.createVertexArrayOES(),t.bindVertexArray=t=>e.bindVertexArrayOES(t),t.deleteVertexArray=t=>e.deleteVertexArrayOES(t)):(this.hasVao=!1,t.createVertexArray=()=>null,t.bindVertexArray=()=>null,t.deleteVertexArray=()=>null)}if(2!==e.webGLVersion){let e=t.getExtension("ANGLE_instanced_arrays");e?(t.vertexAttribDivisor=(t,r)=>e.vertexAttribDivisorANGLE(t,r),t.drawElementsInstanced=(t,r,i,s,n)=>e.drawElementsInstancedANGLE(t,r,i,s,n),t.drawArraysInstanced=(t,r,i,s)=>e.drawArraysInstancedANGLE(t,r,i,s)):this.hasInstance=!1}this.canUseUInt32ElementIndex=2===e.webGLVersion||!!e.extensions.uint32ElementIndex}/**
   * Binds geometry so that is can be drawn. Creating a Vao if required
   * @param geometry - Instance of geometry to bind.
   * @param shader - Instance of shader to use vao for.
   */bind(t,e){e=e||this.renderer.shader.shader;let{gl:r}=this,i=t.glVertexArrayObjects[this.CONTEXT_UID],s=!1;i||(this.managedGeometries[t.id]=t,t.disposeRunner.add(this),t.glVertexArrayObjects[this.CONTEXT_UID]=i={},s=!0);let n=i[e.program.id]||this.initGeometryVao(t,e,s);this._activeGeometry=t,this._activeVao!==n&&(this._activeVao=n,this.hasVao?r.bindVertexArray(n):this.activateVao(t,e.program)),this.updateBuffers()}/** Reset and unbind any active VAO and geometry. */reset(){this.unbind()}/** Update buffers of the currently bound geometry. */updateBuffers(){let t=this._activeGeometry,e=this.renderer.buffer;for(let r=0;r<t.buffers.length;r++){let i=t.buffers[r];e.update(i)}}/**
   * Check compatibility between a geometry and a program
   * @param geometry - Geometry instance.
   * @param program - Program instance.
   */checkCompatibility(t,e){let r=t.attributes,i=e.attributeData;for(let t in i)if(!r[t])throw Error(`shader and geometry incompatible, geometry missing the "${t}" attribute`)}/**
   * Takes a geometry and program and generates a unique signature for them.
   * @param geometry - To get signature from.
   * @param program - To test geometry against.
   * @returns - Unique signature of the geometry and program
   */getSignature(t,e){let r=t.attributes,i=e.attributeData,s=["g",t.id];for(let t in r)i[t]&&s.push(t,i[t].location);return s.join("-")}/**
   * Creates or gets Vao with the same structure as the geometry and stores it on the geometry.
   * If vao is created, it is bound automatically. We use a shader to infer what and how to set up the
   * attribute locations.
   * @param geometry - Instance of geometry to to generate Vao for.
   * @param shader - Instance of the shader.
   * @param incRefCount - Increment refCount of all geometry buffers.
   */initGeometryVao(t,e,r=!0){let i=this.gl,s=this.CONTEXT_UID,n=this.renderer.buffer,a=e.program;a.glPrograms[s]||this.renderer.shader.generateProgram(e),this.checkCompatibility(t,a);let o=this.getSignature(t,a),h=t.glVertexArrayObjects[this.CONTEXT_UID],l=h[o];if(l)return h[a.id]=l,l;let u=t.buffers,d=t.attributes,c={},p={};for(let t in u)c[t]=0,p[t]=0;for(let t in d)!d[t].size&&a.attributeData[t]?d[t].size=a.attributeData[t].size:d[t].size||console.warn(`PIXI Geometry attribute '${t}' size cannot be determined (likely the bound shader does not have the attribute)`),c[d[t].buffer]+=d[t].size*iP[d[t].type];for(let t in d){let e=d[t],r=e.size;void 0===e.stride&&(c[e.buffer]===r*iP[e.type]?e.stride=0:e.stride=c[e.buffer]),void 0===e.start&&(e.start=p[e.buffer],p[e.buffer]+=r*iP[e.type])}l=i.createVertexArray(),i.bindVertexArray(l);for(let t=0;t<u.length;t++){let e=u[t];n.bind(e),r&&e._glBuffers[s].refCount++}return this.activateVao(t,a),h[a.id]=l,h[o]=l,i.bindVertexArray(null),n.unbind(L.ARRAY_BUFFER),l}/**
   * Disposes geometry.
   * @param geometry - Geometry with buffers. Only VAO will be disposed
   * @param [contextLost=false] - If context was lost, we suppress deleteVertexArray
   */disposeGeometry(t,e){if(!this.managedGeometries[t.id])return;delete this.managedGeometries[t.id];let r=t.glVertexArrayObjects[this.CONTEXT_UID],i=this.gl,s=t.buffers,n=this.renderer?.buffer;if(t.disposeRunner.remove(this),r){if(n)for(let t=0;t<s.length;t++){let r=s[t]._glBuffers[this.CONTEXT_UID];r&&(r.refCount--,0!==r.refCount||e||n.dispose(s[t],e))}if(!e){for(let t in r)if("g"===t[0]){let e=r[t];this._activeVao===e&&this.unbind(),i.deleteVertexArray(e)}}delete t.glVertexArrayObjects[this.CONTEXT_UID]}}/**
   * Dispose all WebGL resources of all managed geometries.
   * @param [contextLost=false] - If context was lost, we suppress `gl.delete` calls
   */disposeAll(t){let e=Object.keys(this.managedGeometries);for(let r=0;r<e.length;r++)this.disposeGeometry(this.managedGeometries[e[r]],t)}/**
   * Activate vertex array object.
   * @param geometry - Geometry instance.
   * @param program - Shader program instance.
   */activateVao(t,e){let r=this.gl,i=this.CONTEXT_UID,s=this.renderer.buffer,n=t.buffers,a=t.attributes;t.indexBuffer&&s.bind(t.indexBuffer);let o=null;for(let t in a){let h=a[t],l=n[h.buffer],u=l._glBuffers[i];if(e.attributeData[t]){o!==u&&(s.bind(l),o=u);let i=e.attributeData[t].location;if(r.enableVertexAttribArray(i),r.vertexAttribPointer(i,h.size,h.type||r.FLOAT,h.normalized,h.stride,h.start),h.instance){if(this.hasInstance)r.vertexAttribDivisor(i,h.divisor);else throw Error("geometry error, GPU Instancing is not supported on this device")}}}}/**
   * Draws the currently bound geometry.
   * @param type - The type primitive to render.
   * @param size - The number of elements to be rendered. If not specified, all vertices after the
   *  starting vertex will be drawn.
   * @param start - The starting vertex in the geometry to start drawing from. If not specified,
   *  drawing will start from the first vertex.
   * @param instanceCount - The number of instances of the set of elements to execute. If not specified,
   *  all instances will be drawn.
   */draw(t,e,r,i){let{gl:s}=this,n=this._activeGeometry;if(n.indexBuffer){let a=n.indexBuffer.data.BYTES_PER_ELEMENT,o=2===a?s.UNSIGNED_SHORT:s.UNSIGNED_INT;2===a||4===a&&this.canUseUInt32ElementIndex?n.instanced?s.drawElementsInstanced(t,e||n.indexBuffer.data.length,o,(r||0)*a,i||1):s.drawElements(t,e||n.indexBuffer.data.length,o,(r||0)*a):console.warn("unsupported index buffer type: uint32")}else n.instanced?s.drawArraysInstanced(t,r,e||n.getSize(),i||1):s.drawArrays(t,r,e||n.getSize());return this}/** Unbind/reset everything. */unbind(){this.gl.bindVertexArray(null),this._activeVao=null,this._activeGeometry=null}destroy(){this.renderer=null}}iD.extension={type:e$.RendererSystem,name:"geometry"},eK.add(iD);const iO=new rT;class iB{/**
   * @param texture - observed texture
   * @param clampMargin - Changes frame clamping, 0.5 by default. Use -0.5 for extra border.
   */constructor(t,e){this._texture=t,this.mapCoord=new rT,this.uClampFrame=new Float32Array(4),this.uClampOffset=new Float32Array(2),this._textureID=-1,this._updateID=0,this.clampOffset=0,this.clampMargin=typeof e>"u"?.5:e,this.isSimple=!1}/** Texture property. */get texture(){return this._texture}set texture(t){this._texture=t,this._textureID=-1}/**
   * Multiplies uvs array to transform
   * @param uvs - mesh uvs
   * @param [out=uvs] - output
   * @returns - output
   */multiplyUvs(t,e){void 0===e&&(e=t);let r=this.mapCoord;for(let i=0;i<t.length;i+=2){let s=t[i],n=t[i+1];e[i]=s*r.a+n*r.c+r.tx,e[i+1]=s*r.b+n*r.d+r.ty}return e}/**
   * Updates matrices if texture was changed.
   * @param [forceUpdate=false] - if true, matrices will be updated any case
   * @returns - Whether or not it was updated
   */update(t){let e=this._texture;if(!e||!e.valid||!t&&this._textureID===e._updateID)return!1;this._textureID=e._updateID,this._updateID++;let r=e._uvs;this.mapCoord.set(r.x1-r.x0,r.y1-r.y0,r.x3-r.x0,r.y3-r.y0,r.x0,r.y0);let i=e.orig,s=e.trim;s&&(iO.set(i.width/s.width,0,0,i.height/s.height,-s.x/s.width,-s.y/s.height),this.mapCoord.append(iO));let n=e.baseTexture,a=this.uClampFrame,o=this.clampMargin/n.resolution,h=this.clampOffset;return a[0]=(e._frame.x+o+h)/n.width,a[1]=(e._frame.y+o+h)/n.height,a[2]=(e._frame.x+e._frame.width-o+h)/n.width,a[3]=(e._frame.y+e._frame.height-o+h)/n.height,this.uClampOffset[0]=h/n.realWidth,this.uClampOffset[1]=h/n.realHeight,this.isSimple=e._frame.width===n.width&&e._frame.height===n.height&&0===e.rotate,!0}}var iF=`varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D mask;
uniform float alpha;
uniform float npmAlpha;
uniform vec4 maskClamp;

void main(void)
{
    float clip = step(3.5,
        step(maskClamp.x, vMaskCoord.x) +
        step(maskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, maskClamp.z) +
        step(vMaskCoord.y, maskClamp.w));

    vec4 original = texture2D(uSampler, vTextureCoord);
    vec4 masky = texture2D(mask, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    original *= (alphaMul * masky.r * alpha * clip);

    gl_FragColor = original;
}
`,iN=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 otherMatrix;

varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;
}
`;class iL extends ia{/** @ignore */constructor(t,e,r){let i=null;"string"!=typeof t&&void 0===e&&void 0===r&&(i=t,t=void 0,e=void 0,r=void 0),super(t||iN,e||iF,r),this.maskSprite=i,this.maskMatrix=new rT}/**
   * Sprite mask
   * @type {PIXI.DisplayObject}
   */get maskSprite(){return this._maskSprite}set maskSprite(t){this._maskSprite=t,this._maskSprite&&(this._maskSprite.renderable=!1)}/**
   * Applies the filter
   * @param filterManager - The renderer to retrieve the filter from
   * @param input - The input render target.
   * @param output - The target to output to.
   * @param clearMode - Should the output be cleared before rendering to it.
   */apply(t,e,r,i){let s=this._maskSprite,n=s._texture;n.valid&&(n.uvMatrix||(n.uvMatrix=new iB(n,0)),n.uvMatrix.update(),this.uniforms.npmAlpha=n.baseTexture.alphaMode?0:1,this.uniforms.mask=n,this.uniforms.otherMatrix=t.calculateSpriteMatrix(this.maskMatrix,s).prepend(n.uvMatrix.mapCoord),this.uniforms.alpha=s.worldAlpha,this.uniforms.maskClamp=n.uvMatrix.uClampFrame,t.applyFilter(this,e,r,i))}}class ik{/**
   * Create MaskData
   * @param {PIXI.DisplayObject} [maskObject=null] - object that describes the mask
   */constructor(t=null){this.type=B.NONE,this.autoDetect=!0,this.maskObject=t||null,this.pooled=!1,this.isMaskData=!0,this.resolution=null,this.multisample=ia.defaultMultisample,this.enabled=!0,this.colorMask=15,this._filters=null,this._stencilCounter=0,this._scissorCounter=0,this._scissorRect=null,this._scissorRectLocal=null,this._colorMask=15,this._target=null}/**
   * The sprite mask filter.
   * If set to `null`, the default sprite mask filter is used.
   * @default null
   */get filter(){return this._filters?this._filters[0]:null}set filter(t){t?this._filters?this._filters[0]=t:this._filters=[t]:this._filters=null}/** Resets the mask data after popMask(). */reset(){this.pooled&&(this.maskObject=null,this.type=B.NONE,this.autoDetect=!0),this._target=null,this._scissorRectLocal=null}/**
   * Copies counters from maskData above, called from pushMask().
   * @param maskAbove
   */copyCountersOrReset(t){t?(this._stencilCounter=t._stencilCounter,this._scissorCounter=t._scissorCounter,this._scissorRect=t._scissorRect):(this._stencilCounter=0,this._scissorCounter=0,this._scissorRect=null)}}class iU{/**
   * @param renderer - The renderer this System works for.
   */constructor(t){this.renderer=t,this.enableScissor=!0,this.alphaMaskPool=[],this.maskDataPool=[],this.maskStack=[],this.alphaMaskIndex=0}/**
   * Changes the mask stack that is used by this System.
   * @param maskStack - The mask stack
   */setMaskStack(t){this.maskStack=t,this.renderer.scissor.setMaskStack(t),this.renderer.stencil.setMaskStack(t)}/**
   * Enables the mask and appends it to the current mask stack.
   *
   * NOTE: The batch renderer should be flushed beforehand to prevent pending renders from being masked.
   * @param {PIXI.DisplayObject} target - Display Object to push the mask to
   * @param {PIXI.MaskData|PIXI.Sprite|PIXI.Graphics|PIXI.DisplayObject} maskDataOrTarget - The masking data.
   */push(t,e){let r=e;if(!r.isMaskData){let t=this.maskDataPool.pop()||new ik;t.pooled=!0,t.maskObject=e,r=t}let i=0!==this.maskStack.length?this.maskStack[this.maskStack.length-1]:null;if(r.copyCountersOrReset(i),r._colorMask=i?i._colorMask:15,r.autoDetect&&this.detect(r),r._target=t,r.type!==B.SPRITE&&this.maskStack.push(r),r.enabled)switch(r.type){case B.SCISSOR:this.renderer.scissor.push(r);break;case B.STENCIL:this.renderer.stencil.push(r);break;case B.SPRITE:r.copyCountersOrReset(null),this.pushSpriteMask(r);break;case B.COLOR:this.pushColorMask(r)}r.type===B.SPRITE&&this.maskStack.push(r)}/**
   * Removes the last mask from the mask stack and doesn't return it.
   *
   * NOTE: The batch renderer should be flushed beforehand to render the masked contents before the mask is removed.
   * @param {PIXI.IMaskTarget} target - Display Object to pop the mask from
   */pop(t){let e=this.maskStack.pop();if(!(!e||e._target!==t)){if(e.enabled)switch(e.type){case B.SCISSOR:this.renderer.scissor.pop(e);break;case B.STENCIL:this.renderer.stencil.pop(e.maskObject);break;case B.SPRITE:this.popSpriteMask(e);break;case B.COLOR:this.popColorMask(e)}if(e.reset(),e.pooled&&this.maskDataPool.push(e),0!==this.maskStack.length){let t=this.maskStack[this.maskStack.length-1];t.type===B.SPRITE&&t._filters&&(t._filters[0].maskSprite=t.maskObject)}}}/**
   * Sets type of MaskData based on its maskObject.
   * @param maskData
   */detect(t){let e=t.maskObject;e?e.isSprite?t.type=B.SPRITE:this.enableScissor&&this.renderer.scissor.testScissor(t)?t.type=B.SCISSOR:t.type=B.STENCIL:t.type=B.COLOR}/**
   * Applies the Mask and adds it to the current filter stack.
   * @param maskData - Sprite to be used as the mask.
   */pushSpriteMask(t){let{maskObject:e}=t,r=t._target,i=t._filters;i||(i=this.alphaMaskPool[this.alphaMaskIndex])||(i=this.alphaMaskPool[this.alphaMaskIndex]=[new iL]),i[0].resolution=t.resolution,i[0].multisample=t.multisample,i[0].maskSprite=e;let s=r.filterArea;r.filterArea=e.getBounds(!0),this.renderer.filter.push(r,i),r.filterArea=s,t._filters||this.alphaMaskIndex++}/**
   * Removes the last filter from the filter stack and doesn't return it.
   * @param maskData - Sprite to be used as the mask.
   */popSpriteMask(t){this.renderer.filter.pop(),t._filters?t._filters[0].maskSprite=null:(this.alphaMaskIndex--,this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite=null)}/**
   * Pushes the color mask.
   * @param maskData - The mask data
   */pushColorMask(t){let e=t._colorMask,r=t._colorMask=e&t.colorMask;r!==e&&this.renderer.gl.colorMask((1&r)!=0,(2&r)!=0,(4&r)!=0,(8&r)!=0)}/**
   * Pops the color mask.
   * @param maskData - The mask data
   */popColorMask(t){let e=t._colorMask,r=this.maskStack.length>0?this.maskStack[this.maskStack.length-1]._colorMask:15;r!==e&&this.renderer.gl.colorMask((1&r)!=0,(2&r)!=0,(4&r)!=0,(8&r)!=0)}destroy(){this.renderer=null}}iU.extension={type:e$.RendererSystem,name:"mask"},eK.add(iU);class iG{/**
   * @param renderer - The renderer this System works for.
   */constructor(t){this.renderer=t,this.maskStack=[],this.glConst=0}/** Gets count of masks of certain type. */getStackLength(){return this.maskStack.length}/**
   * Changes the mask stack that is used by this System.
   * @param {PIXI.MaskData[]} maskStack - The mask stack
   */setMaskStack(t){let{gl:e}=this.renderer,r=this.getStackLength();this.maskStack=t;let i=this.getStackLength();i!==r&&(0===i?e.disable(this.glConst):(e.enable(this.glConst),this._useCurrent()))}/**
   * Setup renderer to use the current mask data.
   * @private
   */_useCurrent(){}/** Destroys the mask stack. */destroy(){this.renderer=null,this.maskStack=null}}const iH=new rT,ij=[],iz=class t extends iG{/**
   * @param {PIXI.Renderer} renderer - The renderer this System works for.
   */constructor(t){super(t),this.glConst=G.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST}getStackLength(){let t=this.maskStack[this.maskStack.length-1];return t?t._scissorCounter:0}/**
   * evaluates _boundsTransformed, _scissorRect for MaskData
   * @param maskData
   */calcScissorRect(t){if(t._scissorRectLocal)return;let e=t._scissorRect,{maskObject:r}=t,{renderer:i}=this,s=i.renderTexture,n=r.getBounds(!0,ij.pop()??new r_);this.roundFrameToPixels(n,s.current?s.current.resolution:i.resolution,s.sourceFrame,s.destinationFrame,i.projection.transform),e&&n.fit(e),t._scissorRectLocal=n}static isMatrixRotated(t){if(!t)return!1;let{a:e,b:r,c:i,d:s}=t;return(Math.abs(r)>1e-4||Math.abs(i)>1e-4)&&(Math.abs(e)>1e-4||Math.abs(s)>1e-4)}/**
   * Test, whether the object can be scissor mask with current renderer projection.
   * Calls "calcScissorRect()" if its true.
   * @param maskData - mask data
   * @returns whether Whether the object can be scissor mask
   */testScissor(e){let{maskObject:r}=e;if(!r.isFastRect||!r.isFastRect()||t.isMatrixRotated(r.worldTransform)||t.isMatrixRotated(this.renderer.projection.transform))return!1;this.calcScissorRect(e);let i=e._scissorRectLocal;return i.width>0&&i.height>0}roundFrameToPixels(e,r,i,s,n){t.isMatrixRotated(n)||((n=n?iH.copyFrom(n):iH.identity()).translate(-i.x,-i.y).scale(s.width/i.width,s.height/i.height).translate(s.x,s.y),this.renderer.filter.transformAABB(n,e),e.fit(s),e.x=Math.round(e.x*r),e.y=Math.round(e.y*r),e.width=Math.round(e.width*r),e.height=Math.round(e.height*r))}/**
   * Applies the Mask and adds it to the current stencil stack.
   * @author alvin
   * @param maskData - The mask data.
   */push(t){t._scissorRectLocal||this.calcScissorRect(t);let{gl:e}=this.renderer;t._scissorRect||e.enable(e.SCISSOR_TEST),t._scissorCounter++,t._scissorRect=t._scissorRectLocal,this._useCurrent()}/**
   * This should be called after a mask is popped off the mask stack. It will rebind the scissor box to be latest with the
   * last mask in the stack.
   *
   * This can also be called when you directly modify the scissor box and want to restore PixiJS state.
   * @param maskData - The mask data.
   */pop(t){let{gl:e}=this.renderer;t&&ij.push(t._scissorRectLocal),this.getStackLength()>0?this._useCurrent():e.disable(e.SCISSOR_TEST)}/**
   * Setup renderer to use the current scissor data.
   * @private
   */_useCurrent(){let t;let e=this.maskStack[this.maskStack.length-1]._scissorRect;t=this.renderer.renderTexture.current?e.y:this.renderer.height-e.height-e.y,this.renderer.gl.scissor(e.x,t,e.width,e.height)}};iz.extension={type:e$.RendererSystem,name:"scissor"};let iV=iz;eK.add(iV);class iW extends iG{/**
   * @param renderer - The renderer this System works for.
   */constructor(t){super(t),this.glConst=G.ADAPTER.getWebGLRenderingContext().STENCIL_TEST}getStackLength(){let t=this.maskStack[this.maskStack.length-1];return t?t._stencilCounter:0}/**
   * Applies the Mask and adds it to the current stencil stack.
   * @param maskData - The mask data
   */push(t){let e=t.maskObject,{gl:r}=this.renderer,i=t._stencilCounter;0===i&&(this.renderer.framebuffer.forceStencil(),r.clearStencil(0),r.clear(r.STENCIL_BUFFER_BIT),r.enable(r.STENCIL_TEST)),t._stencilCounter++;let s=t._colorMask;0!==s&&(t._colorMask=0,r.colorMask(!1,!1,!1,!1)),r.stencilFunc(r.EQUAL,i,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.INCR),e.renderable=!0,e.render(this.renderer),this.renderer.batch.flush(),e.renderable=!1,0!==s&&(t._colorMask=s,r.colorMask((1&s)!=0,(2&s)!=0,(4&s)!=0,(8&s)!=0)),this._useCurrent()}/**
   * Pops stencil mask. MaskData is already removed from stack
   * @param {PIXI.DisplayObject} maskObject - object of popped mask data
   */pop(t){let e=this.renderer.gl;if(0===this.getStackLength())e.disable(e.STENCIL_TEST);else{let r=0!==this.maskStack.length?this.maskStack[this.maskStack.length-1]:null,i=r?r._colorMask:15;0!==i&&(r._colorMask=0,e.colorMask(!1,!1,!1,!1)),e.stencilOp(e.KEEP,e.KEEP,e.DECR),t.renderable=!0,t.render(this.renderer),this.renderer.batch.flush(),t.renderable=!1,0!==i&&(r._colorMask=i,e.colorMask((1&i)!=0,(2&i)!=0,(4&i)!=0,(8&i)!=0)),this._useCurrent()}}/**
   * Setup renderer to use the current stencil data.
   * @private
   */_useCurrent(){let t=this.renderer.gl;t.stencilFunc(t.EQUAL,this.getStackLength(),4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP)}}iW.extension={type:e$.RendererSystem,name:"stencil"},eK.add(iW);class iX{constructor(t){this.renderer=t,this.plugins={},Object.defineProperties(this.plugins,{extract:{enumerable:!1,get:()=>(tF("7.0.0","renderer.plugins.extract has moved to renderer.extract"),t.extract)},prepare:{enumerable:!1,get:()=>(tF("7.0.0","renderer.plugins.prepare has moved to renderer.prepare"),t.prepare)},interaction:{enumerable:!1,get:()=>(tF("7.0.0","renderer.plugins.interaction has been deprecated, use renderer.events"),t.events)}})}/**
   * Initialize the plugins.
   * @protected
   */init(){let t=this.rendererPlugins;for(let e in t)this.plugins[e]=new t[e](this.renderer)}destroy(){for(let t in this.plugins)this.plugins[t].destroy(),this.plugins[t]=null}}iX.extension={type:[e$.RendererSystem,e$.CanvasRendererSystem],name:"_plugin"},eK.add(iX);class i${/** @param renderer - The renderer this System works for. */constructor(t){this.renderer=t,this.destinationFrame=null,this.sourceFrame=null,this.defaultFrame=null,this.projectionMatrix=new rT,this.transform=null}/**
   * Updates the projection-matrix based on the sourceFrame → destinationFrame mapping provided.
   *
   * NOTE: It is expected you call `renderer.framebuffer.setViewport(destinationFrame)` after this. This is because
   * the framebuffer viewport converts shader vertex output in normalized device coordinates to window coordinates.
   *
   * NOTE-2: {@link PIXI.RenderTextureSystem#bind} updates the projection-matrix when you bind a render-texture.
   * It is expected
   * that you dirty the current bindings when calling this manually.
   * @param destinationFrame - The rectangle in the render-target to render the contents into. If rendering to the canvas,
   *  the origin is on the top-left; if rendering to a render-texture, the origin is on the bottom-left.
   * @param sourceFrame - The rectangle in world space that contains the contents being rendered.
   * @param resolution - The resolution of the render-target, which is the ratio of
   *  world-space (or CSS) pixels to physical pixels.
   * @param root - Whether the render-target is the screen. This is required because rendering to textures
   *  is y-flipped (i.e. upside down relative to the screen).
   */update(t,e,r,i){this.destinationFrame=t||this.destinationFrame||this.defaultFrame,this.sourceFrame=e||this.sourceFrame||t,this.calculateProjection(this.destinationFrame,this.sourceFrame,r,i),this.transform&&this.projectionMatrix.append(this.transform);let s=this.renderer;s.globalUniforms.uniforms.projectionMatrix=this.projectionMatrix,s.globalUniforms.update(),s.shader.shader&&s.shader.syncUniformGroup(s.shader.shader.uniforms.globals)}/**
   * Calculates the `projectionMatrix` to map points inside `sourceFrame` to inside `destinationFrame`.
   * @param _destinationFrame - The destination frame in the render-target.
   * @param sourceFrame - The source frame in world space.
   * @param _resolution - The render-target's resolution, i.e. ratio of CSS to physical pixels.
   * @param root - Whether rendering into the screen. Otherwise, if rendering to a framebuffer, the projection
   *  is y-flipped.
   */calculateProjection(t,e,r,i){let s=this.projectionMatrix,n=i?-1:1;s.identity(),s.a=1/e.width*2,s.d=n*(1/e.height*2),s.tx=-1-e.x*s.a,s.ty=-n-e.y*s.d}/**
   * Sets the transform of the active render target to the given matrix.
   * @param _matrix - The transformation matrix
   */setTransform(t){}destroy(){this.renderer=null}}i$.extension={type:e$.RendererSystem,name:"projection"},eK.add(i$);const iY=new rO,iq=new r_;class iK{constructor(t){this.renderer=t,this._tempMatrix=new rT}/**
   * A Useful function that returns a texture of the display object that can then be used to create sprites
   * This can be quite useful if your displayObject is complicated and needs to be reused multiple times.
   * @param displayObject - The displayObject the object will be generated from.
   * @param {IGenerateTextureOptions} options - Generate texture options.
   * @param {PIXI.Rectangle} options.region - The region of the displayObject, that shall be rendered,
   *        if no region is specified, defaults to the local bounds of the displayObject.
   * @param {number} [options.resolution] - If not given, the renderer's resolution is used.
   * @param {PIXI.MSAA_QUALITY} [options.multisample] - If not given, the renderer's multisample is used.
   * @returns a shiny new texture of the display object passed in
   */generateTexture(t,e){let{region:r,...i}=e||{},s=r?.copyTo(iq)||t.getLocalBounds(iq,!0),n=i.resolution||this.renderer.resolution;s.width=Math.max(s.width,1/n),s.height=Math.max(s.height,1/n),i.width=s.width,i.height=s.height,i.resolution=n,i.multisample??(i.multisample=this.renderer.multisample);let a=ix.create(i);this._tempMatrix.tx=-s.x,this._tempMatrix.ty=-s.y;let o=t.transform;return t.transform=iY,this.renderer.render(t,{renderTexture:a,transform:this._tempMatrix,skipUpdateTransform:!!t.parent,blit:!0}),t.transform=o,a}destroy(){}}iK.extension={type:[e$.RendererSystem,e$.CanvasRendererSystem],name:"textureGenerator"},eK.add(iK);const iZ=new r_,iQ=new r_;class iJ{/**
   * @param renderer - The renderer this System works for.
   */constructor(t){this.renderer=t,this.defaultMaskStack=[],this.current=null,this.sourceFrame=new r_,this.destinationFrame=new r_,this.viewportFrame=new r_}contextChange(){let t=this.renderer?.gl.getContextAttributes();this._rendererPremultipliedAlpha=!!(t&&t.alpha&&t.premultipliedAlpha)}/**
   * Bind the current render texture.
   * @param renderTexture - RenderTexture to bind, by default its `null` - the screen.
   * @param sourceFrame - Part of world that is mapped to the renderTexture.
   * @param destinationFrame - Part of renderTexture, by default it has the same size as sourceFrame.
   */bind(t=null,e,r){let i,s,n;let a=this.renderer;this.current=t,t?(n=(i=t.baseTexture).resolution,e||(iZ.width=t.frame.width,iZ.height=t.frame.height,e=iZ),r||(iQ.x=t.frame.x,iQ.y=t.frame.y,iQ.width=e.width,iQ.height=e.height,r=iQ),s=i.framebuffer):(n=a.resolution,e||(iZ.width=a._view.screen.width,iZ.height=a._view.screen.height,e=iZ),r||((r=iZ).width=e.width,r.height=e.height));let o=this.viewportFrame;o.x=r.x*n,o.y=r.y*n,o.width=r.width*n,o.height=r.height*n,t||(o.y=a.view.height-(o.y+o.height)),o.ceil(),this.renderer.framebuffer.bind(s,o),this.renderer.projection.update(r,e,n,!s),t?this.renderer.mask.setMaskStack(i.maskStack):this.renderer.mask.setMaskStack(this.defaultMaskStack),this.sourceFrame.copyFrom(e),this.destinationFrame.copyFrom(r)}/**
   * Erases the render texture and fills the drawing area with a colour.
   * @param clearColor - The color as rgba, default to use the renderer backgroundColor
   * @param [mask=BUFFER_BITS.COLOR | BUFFER_BITS.DEPTH] - Bitwise OR of masks
   *  that indicate the buffers to be cleared, by default COLOR and DEPTH buffers.
   */clear(t,e){let r=this.current?this.current.baseTexture.clear:this.renderer.background.backgroundColor,i=el.shared.setValue(t||r);(this.current&&this.current.baseTexture.alphaMode>0||!this.current&&this._rendererPremultipliedAlpha)&&i.premultiply(i.alpha);let s=this.destinationFrame,n=this.current?this.current.baseTexture:this.renderer._view.screen,a=s.width!==n.width||s.height!==n.height;if(a){let{x:t,y:e,width:r,height:i}=this.viewportFrame;t=Math.round(t),e=Math.round(e),r=Math.round(r),i=Math.round(i),this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST),this.renderer.gl.scissor(t,e,r,i)}this.renderer.framebuffer.clear(i.red,i.green,i.blue,i.alpha,e),a&&this.renderer.scissor.pop()}resize(){this.bind(null)}/** Resets render-texture state. */reset(){this.bind(null)}destroy(){this.renderer=null}}iJ.extension={type:e$.RendererSystem,name:"renderTexture"},eK.add(iJ);class i0{}class i1{/**
   * Makes a new Pixi program.
   * @param program - webgl program
   * @param uniformData - uniforms
   */constructor(t,e){this.program=t,this.uniformData=e,this.uniformGroups={},this.uniformDirtyGroups={},this.uniformBufferBindings={}}/** Destroys this program. */destroy(){this.uniformData=null,this.uniformGroups=null,this.uniformDirtyGroups=null,this.uniformBufferBindings=null,this.program=null}}function i2(t,e){let r=rN(t,t.VERTEX_SHADER,e.vertexSrc),i=rN(t,t.FRAGMENT_SHADER,e.fragmentSrc),s=t.createProgram();t.attachShader(s,r),t.attachShader(s,i);let n=e.extra?.transformFeedbackVaryings;if(n&&("function"!=typeof t.transformFeedbackVaryings?console.warn("TransformFeedback is not supported but TransformFeedbackVaryings are given."):t.transformFeedbackVaryings(s,n.names,"separate"===n.bufferMode?t.SEPARATE_ATTRIBS:t.INTERLEAVED_ATTRIBS)),t.linkProgram(s),t.getProgramParameter(s,t.LINK_STATUS)||t.getProgramParameter(s,t.LINK_STATUS)||(t.getShaderParameter(r,t.COMPILE_STATUS)||rW(t,r),t.getShaderParameter(i,t.COMPILE_STATUS)||rW(t,i),console.error("PixiJS Error: Could not initialize shader."),""!==t.getProgramInfoLog(s)&&console.warn("PixiJS Warning: gl.getProgramInfoLog()",t.getProgramInfoLog(s))),e.attributeData=function(t,e){let r={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let i=e.getActiveAttrib(t,s);if(i.name.startsWith("gl_"))continue;let n=rq(e,i.type),a={type:n,name:i.name,size:rX[n],location:e.getAttribLocation(t,i.name)};r[i.name]=a}return r}(s,t),e.uniformData=function(t,e){let r={},i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;s++){let i=e.getActiveUniform(t,s),n=i.name.replace(/\[.*?\]$/,""),a=!!i.name.match(/\[.*?\]$/),o=rq(e,i.type);r[n]={name:n,index:s,type:o,size:i.size,isArray:a,value:rk(o,i.size)}}return r}(s,t),!/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(e.vertexSrc)){let r=Object.keys(e.attributeData);r.sort((t,e)=>t>e?1:-1);for(let i=0;i<r.length;i++)e.attributeData[r[i]].location=i,t.bindAttribLocation(s,i,r[i]);t.linkProgram(s)}t.deleteShader(r),t.deleteShader(i);let a={};for(let r in e.uniformData){let i=e.uniformData[r];a[r]={location:t.getUniformLocation(s,r),value:rk(i.type,i.size)}}return new i1(s,a)}function i3(t,e,r,i,s){r.buffer.update(s)}const i4={float:`
        data[offset] = v;
    `,vec2:`
        data[offset] = v[0];
        data[offset+1] = v[1];
    `,vec3:`
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

    `,vec4:`
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];
        data[offset+3] = v[3];
    `,mat2:`
        data[offset] = v[0];
        data[offset+1] = v[1];

        data[offset+4] = v[2];
        data[offset+5] = v[3];
    `,mat3:`
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];

        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
    `,mat4:`
        for(var i = 0; i < 16; i++)
        {
            data[offset + i] = v[i];
        }
    `},i5={float:4,vec2:8,vec3:12,vec4:16,int:4,ivec2:8,ivec3:12,ivec4:16,uint:4,uvec2:8,uvec3:12,uvec4:16,bool:4,bvec2:8,bvec3:12,bvec4:16,mat2:32,mat3:48,mat4:64};function i6(t){let e=t.map(t=>({data:t,offset:0,dataLen:0,dirty:0})),r=0,i=0,s=0;for(let t=0;t<e.length;t++){let n=e[t];if(r=i5[n.data.type],n.data.size>1&&(r=Math.max(r,16)*n.data.size),n.dataLen=r,i%r!=0&&i<16){let t=i%r%16;i+=t,s+=t}i+r>16?(s=16*Math.ceil(s/16),n.offset=s,s+=r,i=r):(n.offset=s,i+=r,s+=r)}return{uboElements:e,size:s=16*Math.ceil(s/16)}}function i8(t,e){let r=[];for(let i in t)e[i]&&r.push(e[i]);return r.sort((t,e)=>t.index-e.index),r}function i7(t,e){if(!t.autoManage)return{size:0,syncFunc:i3};let r=i8(t.uniforms,e),{uboElements:i,size:s}=i6(r),n=[`
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `];for(let e=0;e<i.length;e++){let r=i[e],s=t.uniforms[r.data.name],a=r.data.name,o=!1;for(let t=0;t<rU.length;t++){let e=rU[t];if(e.codeUbo&&e.test(r.data,s)){n.push(`offset = ${r.offset/4};`,rU[t].codeUbo(r.data.name,s)),o=!0;break}}if(!o){if(r.data.size>1){let t=rX[r.data.type],e=Math.max(i5[r.data.type]/16,1),i=t/e,s=(4-i%4)%4;n.push(`
                cv = ud.${a}.value;
                v = uv.${a};
                offset = ${r.offset/4};

                t = 0;

                for(var i=0; i < ${r.data.size*e}; i++)
                {
                    for(var j = 0; j < ${i}; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ${s};
                }

                `)}else{let t=i4[r.data.type];n.push(`
                cv = ud.${a}.value;
                v = uv.${a};
                offset = ${r.offset/4};
                ${t};
                `)}}}return n.push(`
       renderer.buffer.update(buffer);
    `),{size:s,// eslint-disable-next-line no-new-func
syncFunc:Function("ud","uv","renderer","syncData","buffer",n.join(`
`))}}let i9=0;const st={textureCount:0,uboCount:0};class se{/** @param renderer - The renderer this System works for. */constructor(t){this.destroyed=!1,this.renderer=t,this.systemCheck(),this.gl=null,this.shader=null,this.program=null,this.cache={},this._uboCache={},this.id=i9++}/**
   * Overrideable function by `@pixi/unsafe-eval` to silence
   * throwing an error if platform doesn't support unsafe-evals.
   * @private
   */systemCheck(){if(!rZ())throw Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.")}contextChange(t){this.gl=t,this.reset()}/**
   * Changes the current shader to the one given in parameter.
   * @param shader - the new shader
   * @param dontSync - false if the shader should automatically sync its uniforms.
   * @returns the glProgram that belongs to the shader.
   */bind(t,e){t.disposeRunner.add(this),t.uniforms.globals=this.renderer.globalUniforms;let r=t.program,i=r.glPrograms[this.renderer.CONTEXT_UID]||this.generateProgram(t);return this.shader=t,this.program!==r&&(this.program=r,this.gl.useProgram(i.program)),e||(st.textureCount=0,st.uboCount=0,this.syncUniformGroup(t.uniformGroup,st)),i}/**
   * Uploads the uniforms values to the currently bound shader.
   * @param uniforms - the uniforms values that be applied to the current shader
   */setUniforms(t){let e=this.shader.program,r=e.glPrograms[this.renderer.CONTEXT_UID];e.syncUniforms(r.uniformData,t,this.renderer)}/* eslint-disable @typescript-eslint/explicit-module-boundary-types *//**
   * Syncs uniforms on the group
   * @param group - the uniform group to sync
   * @param syncData - this is data that is passed to the sync function and any nested sync functions
   */syncUniformGroup(t,e){let r=this.getGlProgram();t.static&&t.dirtyId===r.uniformDirtyGroups[t.id]||(r.uniformDirtyGroups[t.id]=t.dirtyId,this.syncUniforms(t,r,e))}/**
   * Overrideable by the @pixi/unsafe-eval package to use static syncUniforms instead.
   * @param group
   * @param glProgram
   * @param syncData
   */syncUniforms(t,e,r){(t.syncUniforms[this.shader.program.id]||this.createSyncGroups(t))(e.uniformData,t.uniforms,this.renderer,r)}createSyncGroups(t){let e=this.getSignature(t,this.shader.program.uniformData,"u");return this.cache[e]||(this.cache[e]=function(t,e){let r=[`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];for(let i in t.uniforms){let s=e[i];if(!s){t.uniforms[i]?.group===!0&&(t.uniforms[i].ubo?r.push(`
                        renderer.shader.syncUniformBufferGroup(uv.${i}, '${i}');
                    `):r.push(`
                        renderer.shader.syncUniformGroup(uv.${i}, syncData);
                    `));continue}let n=t.uniforms[i],a=!1;for(let t=0;t<rU.length;t++)if(rU[t].test(s,n)){r.push(rU[t].code(i,n)),a=!0;break}if(!a){let t=(1!==s.size||s.isArray?rH:rG)[s.type].replace("location",`ud["${i}"].location`);r.push(`
            cu = ud["${i}"];
            cv = cu.value;
            v = uv["${i}"];
            ${t};`)}}return Function("ud","uv","renderer","syncData",r.join(`
`))}(t,this.shader.program.uniformData)),t.syncUniforms[this.shader.program.id]=this.cache[e],t.syncUniforms[this.shader.program.id]}/**
   * Syncs uniform buffers
   * @param group - the uniform buffer group to sync
   * @param name - the name of the uniform buffer
   */syncUniformBufferGroup(t,e){let r=this.getGlProgram();if(!t.static||0!==t.dirtyId||!r.uniformGroups[t.id]){t.dirtyId=0;let i=r.uniformGroups[t.id]||this.createSyncBufferGroup(t,r,e);t.buffer.update(),i(r.uniformData,t.uniforms,this.renderer,st,t.buffer)}this.renderer.buffer.bindBufferBase(t.buffer,r.uniformBufferBindings[e])}/**
   * Will create a function that uploads a uniform buffer using the STD140 standard.
   * The upload function will then be cached for future calls
   * If a group is manually managed, then a simple upload function is generated
   * @param group - the uniform buffer group to sync
   * @param glProgram - the gl program to attach the uniform bindings to
   * @param name - the name of the uniform buffer (must exist on the shader)
   */createSyncBufferGroup(t,e,r){let{gl:i}=this.renderer;this.renderer.buffer.bind(t.buffer);let s=this.gl.getUniformBlockIndex(e.program,r);e.uniformBufferBindings[r]=this.shader.uniformBindCount,i.uniformBlockBinding(e.program,s,this.shader.uniformBindCount),this.shader.uniformBindCount++;let n=this.getSignature(t,this.shader.program.uniformData,"ubo"),a=this._uboCache[n];if(a||(a=this._uboCache[n]=i7(t,this.shader.program.uniformData)),t.autoManage){let e=new Float32Array(a.size/4);t.buffer.update(e)}return e.uniformGroups[t.id]=a.syncFunc,e.uniformGroups[t.id]}/**
   * Takes a uniform group and data and generates a unique signature for them.
   * @param group - The uniform group to get signature of
   * @param group.uniforms
   * @param uniformData - Uniform information generated by the shader
   * @param preFix
   * @returns Unique signature of the uniform group
   */getSignature(t,e,r){let i=t.uniforms,s=[`${r}-`];for(let t in i)s.push(t),e[t]&&s.push(e[t].type);return s.join("-")}/**
   * Returns the underlying GLShade rof the currently bound shader.
   *
   * This can be handy for when you to have a little more control over the setting of your uniforms.
   * @returns The glProgram for the currently bound Shader for this context
   */getGlProgram(){return this.shader?this.shader.program.glPrograms[this.renderer.CONTEXT_UID]:null}/**
   * Generates a glProgram version of the Shader provided.
   * @param shader - The shader that the glProgram will be based on.
   * @returns A shiny new glProgram!
   */generateProgram(t){let e=this.gl,r=t.program,i=i2(e,r);return r.glPrograms[this.renderer.CONTEXT_UID]=i,i}/** Resets ShaderSystem state, does not affect WebGL state. */reset(){this.program=null,this.shader=null}/**
   * Disposes shader.
   * If disposing one equals with current shader, set current as null.
   * @param shader - Shader object
   */disposeShader(t){this.shader===t&&(this.shader=null)}/** Destroys this System and removes all its textures. */destroy(){this.renderer=null,this.destroyed=!0}}se.extension={type:e$.RendererSystem,name:"shader"},eK.add(se);class sr{constructor(t){this.renderer=t}/**
   * It all starts here! This initiates every system, passing in the options for any system by name.
   * @param options - the config for the renderer and all its systems
   */run(t){let{renderer:e}=this;e.runners.init.emit(e.options),t.hello&&console.log(`PixiJS 7.3.2 - ${e.rendererLogId} - https://pixijs.com`),e.resize(e.screen.width,e.screen.height)}destroy(){}}sr.defaultOptions={/**
   * {@link PIXI.IRendererOptions.hello}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */hello:!1},/** @ignore */sr.extension={type:[e$.RendererSystem,e$.CanvasRendererSystem],name:"startup"},eK.add(sr);const si=class t{constructor(){this.gl=null,this.stateId=0,this.polygonOffset=0,this.blendMode=b.NONE,this._blendEq=!1,this.map=[],this.map[0]=this.setBlend,this.map[1]=this.setOffset,this.map[2]=this.setCullFace,this.map[3]=this.setDepthTest,this.map[4]=this.setFrontFace,this.map[5]=this.setDepthMask,this.checks=[],this.defaultState=new e0,this.defaultState.blend=!0}contextChange(t){this.gl=t,this.blendModes=function(t,e=[]){return e[b.NORMAL]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.ADD]=[t.ONE,t.ONE],e[b.MULTIPLY]=[t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.SCREEN]=[t.ONE,t.ONE_MINUS_SRC_COLOR,t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.OVERLAY]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.DARKEN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.LIGHTEN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.COLOR_DODGE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.COLOR_BURN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.HARD_LIGHT]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.SOFT_LIGHT]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.DIFFERENCE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.EXCLUSION]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.HUE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.SATURATION]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.COLOR]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.LUMINOSITY]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.NONE]=[0,0],e[b.NORMAL_NPM]=[t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.ADD_NPM]=[t.SRC_ALPHA,t.ONE,t.ONE,t.ONE],e[b.SCREEN_NPM]=[t.SRC_ALPHA,t.ONE_MINUS_SRC_COLOR,t.ONE,t.ONE_MINUS_SRC_ALPHA],e[b.SRC_IN]=[t.DST_ALPHA,t.ZERO],e[b.SRC_OUT]=[t.ONE_MINUS_DST_ALPHA,t.ZERO],e[b.SRC_ATOP]=[t.DST_ALPHA,t.ONE_MINUS_SRC_ALPHA],e[b.DST_OVER]=[t.ONE_MINUS_DST_ALPHA,t.ONE],e[b.DST_IN]=[t.ZERO,t.SRC_ALPHA],e[b.DST_OUT]=[t.ZERO,t.ONE_MINUS_SRC_ALPHA],e[b.DST_ATOP]=[t.ONE_MINUS_DST_ALPHA,t.SRC_ALPHA],e[b.XOR]=[t.ONE_MINUS_DST_ALPHA,t.ONE_MINUS_SRC_ALPHA],e[b.SUBTRACT]=[t.ONE,t.ONE,t.ONE,t.ONE,t.FUNC_REVERSE_SUBTRACT,t.FUNC_ADD],e}(t),this.set(this.defaultState),this.reset()}/**
   * Sets the current state
   * @param {*} state - The state to set.
   */set(t){if(t=t||this.defaultState,this.stateId!==t.data){let e=this.stateId^t.data,r=0;for(;e;)1&e&&this.map[r].call(this,!!(t.data&1<<r)),e>>=1,r++;this.stateId=t.data}for(let e=0;e<this.checks.length;e++)this.checks[e](this,t)}/**
   * Sets the state, when previous state is unknown.
   * @param {*} state - The state to set
   */forceState(t){t=t||this.defaultState;for(let e=0;e<this.map.length;e++)this.map[e].call(this,!!(t.data&1<<e));for(let e=0;e<this.checks.length;e++)this.checks[e](this,t);this.stateId=t.data}/**
   * Sets whether to enable or disable blending.
   * @param value - Turn on or off WebGl blending.
   */setBlend(e){this.updateCheck(t.checkBlendMode,e),this.gl[e?"enable":"disable"](this.gl.BLEND)}/**
   * Sets whether to enable or disable polygon offset fill.
   * @param value - Turn on or off webgl polygon offset testing.
   */setOffset(e){this.updateCheck(t.checkPolygonOffset,e),this.gl[e?"enable":"disable"](this.gl.POLYGON_OFFSET_FILL)}/**
   * Sets whether to enable or disable depth test.
   * @param value - Turn on or off webgl depth testing.
   */setDepthTest(t){this.gl[t?"enable":"disable"](this.gl.DEPTH_TEST)}/**
   * Sets whether to enable or disable depth mask.
   * @param value - Turn on or off webgl depth mask.
   */setDepthMask(t){this.gl.depthMask(t)}/**
   * Sets whether to enable or disable cull face.
   * @param {boolean} value - Turn on or off webgl cull face.
   */setCullFace(t){this.gl[t?"enable":"disable"](this.gl.CULL_FACE)}/**
   * Sets the gl front face.
   * @param {boolean} value - true is clockwise and false is counter-clockwise
   */setFrontFace(t){this.gl.frontFace(this.gl[t?"CW":"CCW"])}/**
   * Sets the blend mode.
   * @param {number} value - The blend mode to set to.
   */setBlendMode(t){if(t===this.blendMode)return;this.blendMode=t;let e=this.blendModes[t],r=this.gl;2===e.length?r.blendFunc(e[0],e[1]):r.blendFuncSeparate(e[0],e[1],e[2],e[3]),6===e.length?(this._blendEq=!0,r.blendEquationSeparate(e[4],e[5])):this._blendEq&&(this._blendEq=!1,r.blendEquationSeparate(r.FUNC_ADD,r.FUNC_ADD))}/**
   * Sets the polygon offset.
   * @param {number} value - the polygon offset
   * @param {number} scale - the polygon offset scale
   */setPolygonOffset(t,e){this.gl.polygonOffset(t,e)}// used
/** Resets all the logic and disables the VAOs. */reset(){this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.forceState(this.defaultState),this._blendEq=!0,this.blendMode=-1,this.setBlendMode(0)}/**
   * Checks to see which updates should be checked based on which settings have been activated.
   *
   * For example, if blend is enabled then we should check the blend modes each time the state is changed
   * or if polygon fill is activated then we need to check if the polygon offset changes.
   * The idea is that we only check what we have too.
   * @param func - the checking function to add or remove
   * @param value - should the check function be added or removed.
   */updateCheck(t,e){let r=this.checks.indexOf(t);e&&-1===r?this.checks.push(t):e||-1===r||this.checks.splice(r,1)}/**
   * A private little wrapper function that we call to check the blend mode.
   * @param system - the System to perform the state check on
   * @param state - the state that the blendMode will pulled from
   */static checkBlendMode(t,e){t.setBlendMode(e.blendMode)}/**
   * A private little wrapper function that we call to check the polygon offset.
   * @param system - the System to perform the state check on
   * @param state - the state that the blendMode will pulled from
   */static checkPolygonOffset(t,e){t.setPolygonOffset(1,e.polygonOffset)}/**
   * @ignore
   */destroy(){this.gl=null}};si.extension={type:e$.RendererSystem,name:"state"};let ss=si;eK.add(ss);class sn extends /*@__PURE__*/l(to){constructor(){super(...arguments),this.runners={},this._systemsHash={}}/**
   * Set up a system with a collection of SystemClasses and runners.
   * Systems are attached dynamically to this class when added.
   * @param config - the config for the system manager
   */setup(t){this.addRunners(...t.runners);let e=(t.priority??[]).filter(e=>t.systems[e]),r=[...e,...Object.keys(t.systems).filter(t=>!e.includes(t))];for(let e of r)this.addSystem(t.systems[e],e)}/**
   * Create a bunch of runners based of a collection of ids
   * @param runnerIds - the runner ids to add
   */addRunners(...t){t.forEach(t=>{this.runners[t]=new e4(t)})}/**
   * Add a new system to the renderer.
   * @param ClassRef - Class reference
   * @param name - Property name for system, if not specified
   *        will use a static `name` property on the class itself. This
   *        name will be assigned as s property on the Renderer so make
   *        sure it doesn't collide with properties on Renderer.
   * @returns Return instance of renderer
   */addSystem(t,e){let r=new t(this);if(this[e])throw Error(`Whoops! The name "${e}" is already in use`);for(let t in this[e]=r,this._systemsHash[e]=r,this.runners)this.runners[t].add(r);return this}/**
   * A function that will run a runner and call the runners function but pass in different options
   * to each system based on there name.
   *
   * E.g. If you have two systems added called `systemA` and `systemB` you could call do the following:
   *
   * ```js
   * system.emitWithCustomOptions(init, {
   *     systemA: {...optionsForA},
   *     systemB: {...optionsForB},
   * });
   * ```
   *
   * `init` would be called on system A passing `optionsForA` and on system B passing `optionsForB`.
   * @param runner - the runner to target
   * @param options - key value options for each system
   */emitWithCustomOptions(t,e){let r=Object.keys(this._systemsHash);t.items.forEach(i=>{let s=r.find(t=>this._systemsHash[t]===i);i[t.name](e[s])})}/** destroy the all runners and systems. Its apps job to */destroy(){Object.values(this.runners).forEach(t=>{t.destroy()}),this._systemsHash={}}}const sa=class t{/** @param renderer - The renderer this System works for. */constructor(e){this.renderer=e,this.count=0,this.checkCount=0,this.maxIdle=t.defaultMaxIdle,this.checkCountMax=t.defaultCheckCountMax,this.mode=t.defaultMode}/**
   * Checks to see when the last time a texture was used.
   * If the texture has not been used for a specified amount of time, it will be removed from the GPU.
   */postrender(){this.renderer.objectRenderer.renderingToScreen&&(this.count++,this.mode!==D.MANUAL&&(this.checkCount++,this.checkCount>this.checkCountMax&&(this.checkCount=0,this.run())))}/**
   * Checks to see when the last time a texture was used.
   * If the texture has not been used for a specified amount of time, it will be removed from the GPU.
   */run(){let t=this.renderer.texture,e=t.managedTextures,r=!1;for(let i=0;i<e.length;i++){let s=e[i];s.resource&&this.count-s.touched>this.maxIdle&&(t.destroyTexture(s,!0),e[i]=null,r=!0)}if(r){let t=0;for(let r=0;r<e.length;r++)null!==e[r]&&(e[t++]=e[r]);e.length=t}}/**
   * Removes all the textures within the specified displayObject and its children from the GPU.
   * @param {PIXI.DisplayObject} displayObject - the displayObject to remove the textures from.
   */unload(t){let e=this.renderer.texture,r=t._texture;r&&!r.framebuffer&&e.destroyTexture(r);for(let e=t.children.length-1;e>=0;e--)this.unload(t.children[e])}destroy(){this.renderer=null}};sa.defaultMode=D.AUTO,/**
* Default maximum idle frames before a texture is destroyed by garbage collection.
* @static
* @default 3600
* @see PIXI.TextureGCSystem#maxIdle
*/sa.defaultMaxIdle=3600,/**
* Default frames between two garbage collections.
* @static
* @default 600
* @see PIXI.TextureGCSystem#checkCountMax
*/sa.defaultCheckCountMax=600,/** @ignore */sa.extension={type:e$.RendererSystem,name:"textureGC"};let so=sa;eK.add(so);class sh{constructor(t){this.texture=t,this.width=-1,this.height=-1,this.dirtyId=-1,this.dirtyStyleId=-1,this.mipmap=!1,this.wrapMode=33071,this.type=w.UNSIGNED_BYTE,this.internalFormat=E.RGBA,this.samplerType=0}}class sl{/**
   * @param renderer - The renderer this system works for.
   */constructor(t){this.renderer=t,this.boundTextures=[],this.currentLocation=-1,this.managedTextures=[],this._unknownBoundTextures=!1,this.unknownTexture=new e9,this.hasIntegerTextures=!1}/** Sets up the renderer context and necessary buffers. */contextChange(){let t=this.gl=this.renderer.gl;this.CONTEXT_UID=this.renderer.CONTEXT_UID,this.webGLVersion=this.renderer.context.webGLVersion,this.internalFormats="WebGL2RenderingContext"in globalThis&&t instanceof globalThis.WebGL2RenderingContext?{[w.UNSIGNED_BYTE]:{[E.RGBA]:t.RGBA8,[E.RGB]:t.RGB8,[E.RG]:t.RG8,[E.RED]:t.R8,[E.RGBA_INTEGER]:t.RGBA8UI,[E.RGB_INTEGER]:t.RGB8UI,[E.RG_INTEGER]:t.RG8UI,[E.RED_INTEGER]:t.R8UI,[E.ALPHA]:t.ALPHA,[E.LUMINANCE]:t.LUMINANCE,[E.LUMINANCE_ALPHA]:t.LUMINANCE_ALPHA},[w.BYTE]:{[E.RGBA]:t.RGBA8_SNORM,[E.RGB]:t.RGB8_SNORM,[E.RG]:t.RG8_SNORM,[E.RED]:t.R8_SNORM,[E.RGBA_INTEGER]:t.RGBA8I,[E.RGB_INTEGER]:t.RGB8I,[E.RG_INTEGER]:t.RG8I,[E.RED_INTEGER]:t.R8I},[w.UNSIGNED_SHORT]:{[E.RGBA_INTEGER]:t.RGBA16UI,[E.RGB_INTEGER]:t.RGB16UI,[E.RG_INTEGER]:t.RG16UI,[E.RED_INTEGER]:t.R16UI,[E.DEPTH_COMPONENT]:t.DEPTH_COMPONENT16},[w.SHORT]:{[E.RGBA_INTEGER]:t.RGBA16I,[E.RGB_INTEGER]:t.RGB16I,[E.RG_INTEGER]:t.RG16I,[E.RED_INTEGER]:t.R16I},[w.UNSIGNED_INT]:{[E.RGBA_INTEGER]:t.RGBA32UI,[E.RGB_INTEGER]:t.RGB32UI,[E.RG_INTEGER]:t.RG32UI,[E.RED_INTEGER]:t.R32UI,[E.DEPTH_COMPONENT]:t.DEPTH_COMPONENT24},[w.INT]:{[E.RGBA_INTEGER]:t.RGBA32I,[E.RGB_INTEGER]:t.RGB32I,[E.RG_INTEGER]:t.RG32I,[E.RED_INTEGER]:t.R32I},[w.FLOAT]:{[E.RGBA]:t.RGBA32F,[E.RGB]:t.RGB32F,[E.RG]:t.RG32F,[E.RED]:t.R32F,[E.DEPTH_COMPONENT]:t.DEPTH_COMPONENT32F},[w.HALF_FLOAT]:{[E.RGBA]:t.RGBA16F,[E.RGB]:t.RGB16F,[E.RG]:t.RG16F,[E.RED]:t.R16F},[w.UNSIGNED_SHORT_5_6_5]:{[E.RGB]:t.RGB565},[w.UNSIGNED_SHORT_4_4_4_4]:{[E.RGBA]:t.RGBA4},[w.UNSIGNED_SHORT_5_5_5_1]:{[E.RGBA]:t.RGB5_A1},[w.UNSIGNED_INT_2_10_10_10_REV]:{[E.RGBA]:t.RGB10_A2,[E.RGBA_INTEGER]:t.RGB10_A2UI},[w.UNSIGNED_INT_10F_11F_11F_REV]:{[E.RGB]:t.R11F_G11F_B10F},[w.UNSIGNED_INT_5_9_9_9_REV]:{[E.RGB]:t.RGB9_E5},[w.UNSIGNED_INT_24_8]:{[E.DEPTH_STENCIL]:t.DEPTH24_STENCIL8},[w.FLOAT_32_UNSIGNED_INT_24_8_REV]:{[E.DEPTH_STENCIL]:t.DEPTH32F_STENCIL8}}:{[w.UNSIGNED_BYTE]:{[E.RGBA]:t.RGBA,[E.RGB]:t.RGB,[E.ALPHA]:t.ALPHA,[E.LUMINANCE]:t.LUMINANCE,[E.LUMINANCE_ALPHA]:t.LUMINANCE_ALPHA},[w.UNSIGNED_SHORT_5_6_5]:{[E.RGB]:t.RGB},[w.UNSIGNED_SHORT_4_4_4_4]:{[E.RGBA]:t.RGBA},[w.UNSIGNED_SHORT_5_5_5_1]:{[E.RGBA]:t.RGBA}},this.samplerTypes="WebGL2RenderingContext"in globalThis&&t instanceof globalThis.WebGL2RenderingContext?{[t.RGB]:S.FLOAT,[t.RGBA]:S.FLOAT,[t.ALPHA]:S.FLOAT,[t.LUMINANCE]:S.FLOAT,[t.LUMINANCE_ALPHA]:S.FLOAT,[t.R8]:S.FLOAT,[t.R8_SNORM]:S.FLOAT,[t.RG8]:S.FLOAT,[t.RG8_SNORM]:S.FLOAT,[t.RGB8]:S.FLOAT,[t.RGB8_SNORM]:S.FLOAT,[t.RGB565]:S.FLOAT,[t.RGBA4]:S.FLOAT,[t.RGB5_A1]:S.FLOAT,[t.RGBA8]:S.FLOAT,[t.RGBA8_SNORM]:S.FLOAT,[t.RGB10_A2]:S.FLOAT,[t.RGB10_A2UI]:S.FLOAT,[t.SRGB8]:S.FLOAT,[t.SRGB8_ALPHA8]:S.FLOAT,[t.R16F]:S.FLOAT,[t.RG16F]:S.FLOAT,[t.RGB16F]:S.FLOAT,[t.RGBA16F]:S.FLOAT,[t.R32F]:S.FLOAT,[t.RG32F]:S.FLOAT,[t.RGB32F]:S.FLOAT,[t.RGBA32F]:S.FLOAT,[t.R11F_G11F_B10F]:S.FLOAT,[t.RGB9_E5]:S.FLOAT,[t.R8I]:S.INT,[t.R8UI]:S.UINT,[t.R16I]:S.INT,[t.R16UI]:S.UINT,[t.R32I]:S.INT,[t.R32UI]:S.UINT,[t.RG8I]:S.INT,[t.RG8UI]:S.UINT,[t.RG16I]:S.INT,[t.RG16UI]:S.UINT,[t.RG32I]:S.INT,[t.RG32UI]:S.UINT,[t.RGB8I]:S.INT,[t.RGB8UI]:S.UINT,[t.RGB16I]:S.INT,[t.RGB16UI]:S.UINT,[t.RGB32I]:S.INT,[t.RGB32UI]:S.UINT,[t.RGBA8I]:S.INT,[t.RGBA8UI]:S.UINT,[t.RGBA16I]:S.INT,[t.RGBA16UI]:S.UINT,[t.RGBA32I]:S.INT,[t.RGBA32UI]:S.UINT,[t.DEPTH_COMPONENT16]:S.FLOAT,[t.DEPTH_COMPONENT24]:S.FLOAT,[t.DEPTH_COMPONENT32F]:S.FLOAT,[t.DEPTH_STENCIL]:S.FLOAT,[t.DEPTH24_STENCIL8]:S.FLOAT,[t.DEPTH32F_STENCIL8]:S.FLOAT}:{[t.RGB]:S.FLOAT,[t.RGBA]:S.FLOAT,[t.ALPHA]:S.FLOAT,[t.LUMINANCE]:S.FLOAT,[t.LUMINANCE_ALPHA]:S.FLOAT,[t.DEPTH_STENCIL]:S.FLOAT};let e=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);this.boundTextures.length=e;for(let t=0;t<e;t++)this.boundTextures[t]=null;this.emptyTextures={};let r=new sh(t.createTexture());t.bindTexture(t.TEXTURE_2D,r.texture),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array(4)),this.emptyTextures[t.TEXTURE_2D]=r,this.emptyTextures[t.TEXTURE_CUBE_MAP]=new sh(t.createTexture()),t.bindTexture(t.TEXTURE_CUBE_MAP,this.emptyTextures[t.TEXTURE_CUBE_MAP].texture);for(let e=0;e<6;e++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,null);t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_MIN_FILTER,t.LINEAR);for(let t=0;t<this.boundTextures.length;t++)this.bind(null,t)}/**
   * Bind a texture to a specific location
   *
   * If you want to unbind something, please use `unbind(texture)` instead of `bind(null, textureLocation)`
   * @param texture - Texture to bind
   * @param [location=0] - Location to bind at
   */bind(t,e=0){let{gl:r}=this;if(t=t?.castToBaseTexture(),t?.valid&&!t.parentTextureArray){t.touched=this.renderer.textureGC.count;let i=t._glTextures[this.CONTEXT_UID]||this.initTexture(t);this.boundTextures[e]!==t&&(this.currentLocation!==e&&(this.currentLocation=e,r.activeTexture(r.TEXTURE0+e)),r.bindTexture(t.target,i.texture)),i.dirtyId!==t.dirtyId?(this.currentLocation!==e&&(this.currentLocation=e,r.activeTexture(r.TEXTURE0+e)),this.updateTexture(t)):i.dirtyStyleId!==t.dirtyStyleId&&this.updateTextureStyle(t),this.boundTextures[e]=t}else this.currentLocation!==e&&(this.currentLocation=e,r.activeTexture(r.TEXTURE0+e)),r.bindTexture(r.TEXTURE_2D,this.emptyTextures[r.TEXTURE_2D].texture),this.boundTextures[e]=null}/** Resets texture location and bound textures Actual `bind(null, i)` calls will be performed at next `unbind()` call */reset(){this._unknownBoundTextures=!0,this.hasIntegerTextures=!1,this.currentLocation=-1;for(let t=0;t<this.boundTextures.length;t++)this.boundTextures[t]=this.unknownTexture}/**
   * Unbind a texture.
   * @param texture - Texture to bind
   */unbind(t){let{gl:e,boundTextures:r}=this;if(this._unknownBoundTextures){this._unknownBoundTextures=!1;for(let t=0;t<r.length;t++)r[t]===this.unknownTexture&&this.bind(null,t)}for(let i=0;i<r.length;i++)r[i]===t&&(this.currentLocation!==i&&(e.activeTexture(e.TEXTURE0+i),this.currentLocation=i),e.bindTexture(t.target,this.emptyTextures[t.target].texture),r[i]=null)}/**
   * Ensures that current boundTextures all have FLOAT sampler type,
   * see {@link PIXI.SAMPLER_TYPES} for explanation.
   * @param maxTextures - number of locations to check
   */ensureSamplerType(t){let{boundTextures:e,hasIntegerTextures:r,CONTEXT_UID:i}=this;if(r)for(let r=t-1;r>=0;--r){let t=e[r];t&&t._glTextures[i].samplerType!==S.FLOAT&&this.renderer.texture.unbind(t)}}/**
   * Initialize a texture
   * @private
   * @param texture - Texture to initialize
   */initTexture(t){let e=new sh(this.gl.createTexture());return e.dirtyId=-1,t._glTextures[this.CONTEXT_UID]=e,this.managedTextures.push(t),t.on("dispose",this.destroyTexture,this),e}initTextureType(t,e){e.internalFormat=this.internalFormats[t.type]?.[t.format]??t.format,e.samplerType=this.samplerTypes[e.internalFormat]??S.FLOAT,2===this.webGLVersion&&t.type===w.HALF_FLOAT?e.type=this.gl.HALF_FLOAT:e.type=t.type}/**
   * Update a texture
   * @private
   * @param {PIXI.BaseTexture} texture - Texture to initialize
   */updateTexture(t){let e=t._glTextures[this.CONTEXT_UID];if(!e)return;let r=this.renderer;if(this.initTextureType(t,e),t.resource?.upload(r,t,e))e.samplerType!==S.FLOAT&&(this.hasIntegerTextures=!0);else{let i=t.realWidth,s=t.realHeight,n=r.gl;(e.width!==i||e.height!==s||e.dirtyId<0)&&(e.width=i,e.height=s,n.texImage2D(t.target,0,e.internalFormat,i,s,0,t.format,e.type,null))}t.dirtyStyleId!==e.dirtyStyleId&&this.updateTextureStyle(t),e.dirtyId=t.dirtyId}/**
   * Deletes the texture from WebGL
   * @private
   * @param texture - the texture to destroy
   * @param [skipRemove=false] - Whether to skip removing the texture from the TextureManager.
   */destroyTexture(t,e){let{gl:r}=this;if((t=t.castToBaseTexture())._glTextures[this.CONTEXT_UID]&&(this.unbind(t),r.deleteTexture(t._glTextures[this.CONTEXT_UID].texture),t.off("dispose",this.destroyTexture,this),delete t._glTextures[this.CONTEXT_UID],!e)){let e=this.managedTextures.indexOf(t);-1!==e&&eR(this.managedTextures,e,1)}}/**
   * Update texture style such as mipmap flag
   * @private
   * @param {PIXI.BaseTexture} texture - Texture to update
   */updateTextureStyle(t){let e=t._glTextures[this.CONTEXT_UID];e&&(t.mipmap!==C.POW2&&2===this.webGLVersion||t.isPowerOfTwo?e.mipmap=t.mipmap>=1:e.mipmap=!1,2===this.webGLVersion||t.isPowerOfTwo?e.wrapMode=t.wrapMode:e.wrapMode=I.CLAMP,t.resource?.style(this.renderer,t,e)||this.setStyle(t,e),e.dirtyStyleId=t.dirtyStyleId)}/**
   * Set style for texture
   * @private
   * @param texture - Texture to update
   * @param glTexture
   */setStyle(t,e){let r=this.gl;if(e.mipmap&&t.mipmap!==C.ON_MANUAL&&r.generateMipmap(t.target),r.texParameteri(t.target,r.TEXTURE_WRAP_S,e.wrapMode),r.texParameteri(t.target,r.TEXTURE_WRAP_T,e.wrapMode),e.mipmap){r.texParameteri(t.target,r.TEXTURE_MIN_FILTER,t.scaleMode===R.LINEAR?r.LINEAR_MIPMAP_LINEAR:r.NEAREST_MIPMAP_NEAREST);let e=this.renderer.context.extensions.anisotropicFiltering;if(e&&t.anisotropicLevel>0&&t.scaleMode===R.LINEAR){let i=Math.min(t.anisotropicLevel,r.getParameter(e.MAX_TEXTURE_MAX_ANISOTROPY_EXT));r.texParameterf(t.target,e.TEXTURE_MAX_ANISOTROPY_EXT,i)}}else r.texParameteri(t.target,r.TEXTURE_MIN_FILTER,t.scaleMode===R.LINEAR?r.LINEAR:r.NEAREST);r.texParameteri(t.target,r.TEXTURE_MAG_FILTER,t.scaleMode===R.LINEAR?r.LINEAR:r.NEAREST)}destroy(){this.renderer=null}}sl.extension={type:e$.RendererSystem,name:"texture"},eK.add(sl);class su{/**
   * @param renderer - The renderer this System works for.
   */constructor(t){this.renderer=t}/** Sets up the renderer context and necessary buffers. */contextChange(){this.gl=this.renderer.gl,this.CONTEXT_UID=this.renderer.CONTEXT_UID}/**
   * Bind TransformFeedback and buffers
   * @param transformFeedback - TransformFeedback to bind
   */bind(t){let{gl:e,CONTEXT_UID:r}=this,i=t._glTransformFeedbacks[r]||this.createGLTransformFeedback(t);e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,i)}/** Unbind TransformFeedback */unbind(){let{gl:t}=this;t.bindTransformFeedback(t.TRANSFORM_FEEDBACK,null)}/**
   * Begin TransformFeedback
   * @param drawMode - DrawMode for TransformFeedback
   * @param shader - A Shader used by TransformFeedback. Current bound shader will be used if not provided.
   */beginTransformFeedback(t,e){let{gl:r,renderer:i}=this;e&&i.shader.bind(e),r.beginTransformFeedback(t)}/** End TransformFeedback */endTransformFeedback(){let{gl:t}=this;t.endTransformFeedback()}/**
   * Create TransformFeedback and bind buffers
   * @param tf - TransformFeedback
   * @returns WebGLTransformFeedback
   */createGLTransformFeedback(t){let{gl:e,renderer:r,CONTEXT_UID:i}=this,s=e.createTransformFeedback();t._glTransformFeedbacks[i]=s,e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,s);for(let s=0;s<t.buffers.length;s++){let n=t.buffers[s];n&&(r.buffer.update(n),n._glBuffers[i].refCount++,e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER,s,n._glBuffers[i].buffer||null))}return e.bindTransformFeedback(e.TRANSFORM_FEEDBACK,null),t.disposeRunner.add(this),s}/**
   * Disposes TransfromFeedback
   * @param {PIXI.TransformFeedback} tf - TransformFeedback
   * @param {boolean} [contextLost=false] - If context was lost, we suppress delete TransformFeedback
   */disposeTransformFeedback(t,e){let r=t._glTransformFeedbacks[this.CONTEXT_UID],i=this.gl;t.disposeRunner.remove(this);let s=this.renderer.buffer;if(s)for(let r=0;r<t.buffers.length;r++){let i=t.buffers[r];if(!i)continue;let n=i._glBuffers[this.CONTEXT_UID];n&&(n.refCount--,0!==n.refCount||e||s.dispose(i,e))}r&&(e||i.deleteTransformFeedback(r),delete t._glTransformFeedbacks[this.CONTEXT_UID])}destroy(){this.renderer=null}}su.extension={type:e$.RendererSystem,name:"transformFeedback"},eK.add(su);class sd{constructor(t){this.renderer=t}/**
   * initiates the view system
   * @param {PIXI.ViewOptions} options - the options for the view
   */init(t){this.screen=new r_(0,0,t.width,t.height),this.element=t.view||G.ADAPTER.createCanvas(),this.resolution=t.resolution||G.RESOLUTION,this.autoDensity=!!t.autoDensity}/**
   * Resizes the screen and canvas to the specified dimensions.
   * @param desiredScreenWidth - The new width of the screen.
   * @param desiredScreenHeight - The new height of the screen.
   */resizeView(t,e){this.element.width=Math.round(t*this.resolution),this.element.height=Math.round(e*this.resolution);let r=this.element.width/this.resolution,i=this.element.height/this.resolution;this.screen.width=r,this.screen.height=i,this.autoDensity&&(this.element.style.width=`${r}px`,this.element.style.height=`${i}px`),this.renderer.emit("resize",r,i),this.renderer.runners.resize.emit(this.screen.width,this.screen.height)}/**
   * Destroys this System and optionally removes the canvas from the dom.
   * @param {boolean} [removeView=false] - Whether to remove the canvas from the DOM.
   */destroy(t){t&&this.element.parentNode?.removeChild(this.element),this.renderer=null,this.element=null,this.screen=null}}sd.defaultOptions={/**
   * {@link PIXI.IRendererOptions.width}
   * @default 800
   * @memberof PIXI.settings.RENDER_OPTIONS
   */width:800,/**
   * {@link PIXI.IRendererOptions.height}
   * @default 600
   * @memberof PIXI.settings.RENDER_OPTIONS
   */height:600,/**
   * {@link PIXI.IRendererOptions.resolution}
   * @type {number}
   * @default PIXI.settings.RESOLUTION
   * @memberof PIXI.settings.RENDER_OPTIONS
   */resolution:void 0,/**
   * {@link PIXI.IRendererOptions.autoDensity}
   * @default false
   * @memberof PIXI.settings.RENDER_OPTIONS
   */autoDensity:!1},/** @ignore */sd.extension={type:[e$.RendererSystem,e$.CanvasRendererSystem],name:"_view"},eK.add(sd),G.PREFER_ENV=y.WEBGL2,G.STRICT_TEXTURE_CACHE=!1,G.RENDER_OPTIONS={...iu.defaultOptions,...io.defaultOptions,...sd.defaultOptions,...sr.defaultOptions},Object.defineProperties(G,{/**
   * @static
   * @name WRAP_MODE
   * @memberof PIXI.settings
   * @type {PIXI.WRAP_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.wrapMode
   */WRAP_MODE:{get:()=>e9.defaultOptions.wrapMode,set(t){tF("7.1.0","settings.WRAP_MODE is deprecated, use BaseTexture.defaultOptions.wrapMode"),e9.defaultOptions.wrapMode=t}},/**
   * @static
   * @name SCALE_MODE
   * @memberof PIXI.settings
   * @type {PIXI.SCALE_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.scaleMode
   */SCALE_MODE:{get:()=>e9.defaultOptions.scaleMode,set(t){tF("7.1.0","settings.SCALE_MODE is deprecated, use BaseTexture.defaultOptions.scaleMode"),e9.defaultOptions.scaleMode=t}},/**
   * @static
   * @name MIPMAP_TEXTURES
   * @memberof PIXI.settings
   * @type {PIXI.MIPMAP_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.mipmap
   */MIPMAP_TEXTURES:{get:()=>e9.defaultOptions.mipmap,set(t){tF("7.1.0","settings.MIPMAP_TEXTURES is deprecated, use BaseTexture.defaultOptions.mipmap"),e9.defaultOptions.mipmap=t}},/**
   * @static
   * @name ANISOTROPIC_LEVEL
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.BaseTexture.defaultOptions.anisotropicLevel
   */ANISOTROPIC_LEVEL:{get:()=>e9.defaultOptions.anisotropicLevel,set(t){tF("7.1.0","settings.ANISOTROPIC_LEVEL is deprecated, use BaseTexture.defaultOptions.anisotropicLevel"),e9.defaultOptions.anisotropicLevel=t}},/**
   * Default filter resolution.
   * @static
   * @name FILTER_RESOLUTION
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @type {number|null}
   * @see PIXI.Filter.defaultResolution
   */FILTER_RESOLUTION:{get:()=>(tF("7.1.0","settings.FILTER_RESOLUTION is deprecated, use Filter.defaultResolution"),ia.defaultResolution),set(t){ia.defaultResolution=t}},/**
   * Default filter samples.
   * @static
   * @name FILTER_MULTISAMPLE
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @type {PIXI.MSAA_QUALITY}
   * @see PIXI.Filter.defaultMultisample
   */FILTER_MULTISAMPLE:{get:()=>(tF("7.1.0","settings.FILTER_MULTISAMPLE is deprecated, use Filter.defaultMultisample"),ia.defaultMultisample),set(t){ia.defaultMultisample=t}},/**
   * The maximum textures that this device supports.
   * @static
   * @name SPRITE_MAX_TEXTURES
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @see PIXI.BatchRenderer.defaultMaxTextures
   * @type {number}
   */SPRITE_MAX_TEXTURES:{get:()=>ie.defaultMaxTextures,set(t){tF("7.1.0","settings.SPRITE_MAX_TEXTURES is deprecated, use BatchRenderer.defaultMaxTextures"),ie.defaultMaxTextures=t}},/**
   * The default sprite batch size.
   *
   * The default aims to balance desktop and mobile devices.
   * @static
   * @name SPRITE_BATCH_SIZE
   * @memberof PIXI.settings
   * @see PIXI.BatchRenderer.defaultBatchSize
   * @deprecated since 7.1.0
   * @type {number}
   */SPRITE_BATCH_SIZE:{get:()=>ie.defaultBatchSize,set(t){tF("7.1.0","settings.SPRITE_BATCH_SIZE is deprecated, use BatchRenderer.defaultBatchSize"),ie.defaultBatchSize=t}},/**
   * Can we upload the same buffer in a single frame?
   * @static
   * @name CAN_UPLOAD_SAME_BUFFER
   * @memberof PIXI.settings
   * @see PIXI.BatchRenderer.canUploadSameBuffer
   * @deprecated since 7.1.0
   * @type {boolean}
   */CAN_UPLOAD_SAME_BUFFER:{get:()=>ie.canUploadSameBuffer,set(t){tF("7.1.0","settings.CAN_UPLOAD_SAME_BUFFER is deprecated, use BatchRenderer.canUploadSameBuffer"),ie.canUploadSameBuffer=t}},/**
   * Default Garbage Collection mode.
   * @static
   * @name GC_MODE
   * @memberof PIXI.settings
   * @type {PIXI.GC_MODES}
   * @deprecated since 7.1.0
   * @see PIXI.TextureGCSystem.defaultMode
   */GC_MODE:{get:()=>so.defaultMode,set(t){tF("7.1.0","settings.GC_MODE is deprecated, use TextureGCSystem.defaultMode"),so.defaultMode=t}},/**
   * Default Garbage Collection max idle.
   * @static
   * @name GC_MAX_IDLE
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.TextureGCSystem.defaultMaxIdle
   */GC_MAX_IDLE:{get:()=>so.defaultMaxIdle,set(t){tF("7.1.0","settings.GC_MAX_IDLE is deprecated, use TextureGCSystem.defaultMaxIdle"),so.defaultMaxIdle=t}},/**
   * Default Garbage Collection maximum check count.
   * @static
   * @name GC_MAX_CHECK_COUNT
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.TextureGCSystem.defaultCheckCountMax
   */GC_MAX_CHECK_COUNT:{get:()=>so.defaultCheckCountMax,set(t){tF("7.1.0","settings.GC_MAX_CHECK_COUNT is deprecated, use TextureGCSystem.defaultCheckCountMax"),so.defaultCheckCountMax=t}},/**
   * Default specify float precision in vertex shader.
   * @static
   * @name PRECISION_VERTEX
   * @memberof PIXI.settings
   * @type {PIXI.PRECISION}
   * @deprecated since 7.1.0
   * @see PIXI.Program.defaultVertexPrecision
   */PRECISION_VERTEX:{get:()=>r1.defaultVertexPrecision,set(t){tF("7.1.0","settings.PRECISION_VERTEX is deprecated, use Program.defaultVertexPrecision"),r1.defaultVertexPrecision=t}},/**
   * Default specify float precision in fragment shader.
   * @static
   * @name PRECISION_FRAGMENT
   * @memberof PIXI.settings
   * @type {PIXI.PRECISION}
   * @deprecated since 7.1.0
   * @see PIXI.Program.defaultFragmentPrecision
   */PRECISION_FRAGMENT:{get:()=>r1.defaultFragmentPrecision,set(t){tF("7.1.0","settings.PRECISION_FRAGMENT is deprecated, use Program.defaultFragmentPrecision"),r1.defaultFragmentPrecision=t}}});var sc={};h(sc,"Ticker",()=>sg),h(sc,"TickerPlugin",()=>s_),h(sc,"UPDATE_PRIORITY",()=>sp);var sp=((li=sp||{})[li.INTERACTION=50]="INTERACTION",li[li.HIGH=25]="HIGH",li[li.NORMAL=0]="NORMAL",li[li.LOW=-25]="LOW",li[li.UTILITY=-50]="UTILITY",li);class sf{/**
   * Constructor
   * @private
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @param priority - The priority for emitting
   * @param once - If the handler should fire once
   */constructor(t,e=null,r=0,i=!1){this.next=null,this.previous=null,this._destroyed=!1,this.fn=t,this.context=e,this.priority=r,this.once=i}/**
   * Simple compare function to figure out if a function and context match.
   * @private
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @returns `true` if the listener match the arguments
   */match(t,e=null){return this.fn===t&&this.context===e}/**
   * Emit by calling the current function.
   * @private
   * @param deltaTime - time since the last emit.
   * @returns Next ticker
   */emit(t){this.fn&&(this.context?this.fn.call(this.context,t):this.fn(t));let e=this.next;return this.once&&this.destroy(!0),this._destroyed&&(this.next=null),e}/**
   * Connect to the list.
   * @private
   * @param previous - Input node, previous listener
   */connect(t){this.previous=t,t.next&&(t.next.previous=this),this.next=t.next,t.next=this}/**
   * Destroy and don't use after this.
   * @private
   * @param hard - `true` to remove the `next` reference, this
   *        is considered a hard destroy. Soft destroy maintains the next reference.
   * @returns The listener to redirect while emitting or removing.
   */destroy(t=!1){this._destroyed=!0,this.fn=null,this.context=null,this.previous&&(this.previous.next=this.next),this.next&&(this.next.previous=this.previous);let e=this.next;return this.next=t?null:e,this.previous=null,e}}const sm=class t{constructor(){this.autoStart=!1,this.deltaTime=1,this.lastTime=-1,this.speed=1,this.started=!1,this._requestId=null,this._maxElapsedMS=100,this._minElapsedMS=0,this._protected=!1,this._lastFrame=-1,this._head=new sf(null,null,1/0),this.deltaMS=1/t.targetFPMS,this.elapsedMS=1/t.targetFPMS,this._tick=t=>{this._requestId=null,this.started&&(this.update(t),this.started&&null===this._requestId&&this._head.next&&(this._requestId=requestAnimationFrame(this._tick)))}}/**
   * Conditionally requests a new animation frame.
   * If a frame has not already been requested, and if the internal
   * emitter has listeners, a new frame is requested.
   * @private
   */_requestIfNeeded(){null===this._requestId&&this._head.next&&(this.lastTime=performance.now(),this._lastFrame=this.lastTime,this._requestId=requestAnimationFrame(this._tick))}/**
   * Conditionally cancels a pending animation frame.
   * @private
   */_cancelIfNeeded(){null!==this._requestId&&(cancelAnimationFrame(this._requestId),this._requestId=null)}/**
   * Conditionally requests a new animation frame.
   * If the ticker has been started it checks if a frame has not already
   * been requested, and if the internal emitter has listeners. If these
   * conditions are met, a new frame is requested. If the ticker has not
   * been started, but autoStart is `true`, then the ticker starts now,
   * and continues with the previous conditions to request a new frame.
   * @private
   */_startIfPossible(){this.started?this._requestIfNeeded():this.autoStart&&this.start()}/**
   * Register a handler for tick events. Calls continuously unless
   * it is removed or the ticker is stopped.
   * @param fn - The listener function to be added for updates
   * @param context - The listener context
   * @param {number} [priority=PIXI.UPDATE_PRIORITY.NORMAL] - The priority for emitting
   * @returns This instance of a ticker
   */add(t,e,r=sp.NORMAL){return this._addListener(new sf(t,e,r))}/**
   * Add a handler for the tick event which is only execute once.
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @param {number} [priority=PIXI.UPDATE_PRIORITY.NORMAL] - The priority for emitting
   * @returns This instance of a ticker
   */addOnce(t,e,r=sp.NORMAL){return this._addListener(new sf(t,e,r,!0))}/**
   * Internally adds the event handler so that it can be sorted by priority.
   * Priority allows certain handler (user, AnimatedSprite, Interaction) to be run
   * before the rendering.
   * @private
   * @param listener - Current listener being added.
   * @returns This instance of a ticker
   */_addListener(t){let e=this._head.next,r=this._head;if(e){for(;e;){if(t.priority>e.priority){t.connect(r);break}r=e,e=e.next}t.previous||t.connect(r)}else t.connect(r);return this._startIfPossible(),this}/**
   * Removes any handlers matching the function and context parameters.
   * If no handlers are left after removing, then it cancels the animation frame.
   * @param fn - The listener function to be removed
   * @param context - The listener context to be removed
   * @returns This instance of a ticker
   */remove(t,e){let r=this._head.next;for(;r;)r=r.match(t,e)?r.destroy():r.next;return this._head.next||this._cancelIfNeeded(),this}/**
   * The number of listeners on this ticker, calculated by walking through linked list
   * @readonly
   * @member {number}
   */get count(){if(!this._head)return 0;let t=0,e=this._head;for(;e=e.next;)t++;return t}/** Starts the ticker. If the ticker has listeners a new animation frame is requested at this point. */start(){this.started||(this.started=!0,this._requestIfNeeded())}/** Stops the ticker. If the ticker has requested an animation frame it is canceled at this point. */stop(){this.started&&(this.started=!1,this._cancelIfNeeded())}/** Destroy the ticker and don't use after this. Calling this method removes all references to internal events. */destroy(){if(!this._protected){this.stop();let t=this._head.next;for(;t;)t=t.destroy(!0);this._head.destroy(),this._head=null}}/**
   * Triggers an update. An update entails setting the
   * current {@link PIXI.Ticker#elapsedMS},
   * the current {@link PIXI.Ticker#deltaTime},
   * invoking all listeners with current deltaTime,
   * and then finally setting {@link PIXI.Ticker#lastTime}
   * with the value of currentTime that was provided.
   * This method will be called automatically by animation
   * frame callbacks if the ticker instance has been started
   * and listeners are added.
   * @param {number} [currentTime=performance.now()] - the current time of execution
   */update(e=performance.now()){let r;if(e>this.lastTime){if((r=this.elapsedMS=e-this.lastTime)>this._maxElapsedMS&&(r=this._maxElapsedMS),r*=this.speed,this._minElapsedMS){let t=e-this._lastFrame|0;if(t<this._minElapsedMS)return;this._lastFrame=e-t%this._minElapsedMS}this.deltaMS=r,this.deltaTime=this.deltaMS*t.targetFPMS;let i=this._head,s=i.next;for(;s;)s=s.emit(this.deltaTime);i.next||this._cancelIfNeeded()}else this.deltaTime=this.deltaMS=this.elapsedMS=0;this.lastTime=e}/**
   * The frames per second at which this ticker is running.
   * The default is approximately 60 in most modern browsers.
   * **Note:** This does not factor in the value of
   * {@link PIXI.Ticker#speed}, which is specific
   * to scaling {@link PIXI.Ticker#deltaTime}.
   * @member {number}
   * @readonly
   */get FPS(){return 1e3/this.elapsedMS}/**
   * Manages the maximum amount of milliseconds allowed to
   * elapse between invoking {@link PIXI.Ticker#update}.
   * This value is used to cap {@link PIXI.Ticker#deltaTime},
   * but does not effect the measured value of {@link PIXI.Ticker#FPS}.
   * When setting this property it is clamped to a value between
   * `0` and `Ticker.targetFPMS * 1000`.
   * @member {number}
   * @default 10
   */get minFPS(){return 1e3/this._maxElapsedMS}set minFPS(e){let r=Math.min(this.maxFPS,e),i=Math.min(Math.max(0,r)/1e3,t.targetFPMS);this._maxElapsedMS=1/i}/**
   * Manages the minimum amount of milliseconds required to
   * elapse between invoking {@link PIXI.Ticker#update}.
   * This will effect the measured value of {@link PIXI.Ticker#FPS}.
   * If it is set to `0`, then there is no limit; PixiJS will render as many frames as it can.
   * Otherwise it will be at least `minFPS`
   * @member {number}
   * @default 0
   */get maxFPS(){return this._minElapsedMS?Math.round(1e3/this._minElapsedMS):0}set maxFPS(t){if(0===t)this._minElapsedMS=0;else{let e=Math.max(this.minFPS,t);this._minElapsedMS=1/(e/1e3)}}/**
   * The shared ticker instance used by {@link PIXI.AnimatedSprite} and by
   * {@link PIXI.VideoResource} to update animation frames / video textures.
   *
   * It may also be used by {@link PIXI.Application} if created with the `sharedTicker` option property set to true.
   *
   * The property {@link PIXI.Ticker#autoStart} is set to `true` for this instance.
   * Please follow the examples for usage, including how to opt-out of auto-starting the shared ticker.
   * @example
   * import { Ticker } from 'pixi.js';
   *
   * const ticker = Ticker.shared;
   * // Set this to prevent starting this ticker when listeners are added.
   * // By default this is true only for the PIXI.Ticker.shared instance.
   * ticker.autoStart = false;
   *
   * // FYI, call this to ensure the ticker is stopped. It should be stopped
   * // if you have not attempted to render anything yet.
   * ticker.stop();
   *
   * // Call this when you are ready for a running shared ticker.
   * ticker.start();
   * @example
   * import { autoDetectRenderer, Container } from 'pixi.js';
   *
   * // You may use the shared ticker to render...
   * const renderer = autoDetectRenderer();
   * const stage = new Container();
   * document.body.appendChild(renderer.view);
   * ticker.add((time) => renderer.render(stage));
   *
   * // Or you can just update it manually.
   * ticker.autoStart = false;
   * ticker.stop();
   * const animate = (time) => {
   *     ticker.update(time);
   *     renderer.render(stage);
   *     requestAnimationFrame(animate);
   * };
   * animate(performance.now());
   * @member {PIXI.Ticker}
   * @static
   */static get shared(){if(!t._shared){let e=t._shared=new t;e.autoStart=!0,e._protected=!0}return t._shared}/**
   * The system ticker instance used by {@link PIXI.BasePrepare} for core timing
   * functionality that shouldn't usually need to be paused, unlike the `shared`
   * ticker which drives visual animations and rendering which may want to be paused.
   *
   * The property {@link PIXI.Ticker#autoStart} is set to `true` for this instance.
   * @member {PIXI.Ticker}
   * @static
   */static get system(){if(!t._system){let e=t._system=new t;e.autoStart=!0,e._protected=!0}return t._system}};sm.targetFPMS=.06;let sg=sm;Object.defineProperties(G,{/**
   * Target frames per millisecond.
   * @static
   * @name TARGET_FPMS
   * @memberof PIXI.settings
   * @type {number}
   * @deprecated since 7.1.0
   * @see PIXI.Ticker.targetFPMS
   */TARGET_FPMS:{get:()=>sg.targetFPMS,set(t){tF("7.1.0","settings.TARGET_FPMS is deprecated, use Ticker.targetFPMS"),sg.targetFPMS=t}}});class s_{/**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */static init(t){t=Object.assign({autoStart:!0,sharedTicker:!1},t),Object.defineProperty(this,"ticker",{set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,sp.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=t.sharedTicker?sg.shared:new sg,t.autoStart&&this.start()}/**
   * Clean up the ticker, scoped to application.
   * @static
   * @private
   */static destroy(){if(this._ticker){let t=this._ticker;this.ticker=null,t.destroy()}}}s_.extension=e$.Application,eK.add(s_);const sy=[];function sv(t){for(let e of sy)if(e.test(t))return new e(t);throw Error("Unable to auto-detect a suitable renderer.")}eK.handleByList(e$.Renderer,sy);var sx=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,sb=`attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`;const sT=sx,sE=sb;class sA{constructor(t){this.renderer=t}contextChange(t){let e;if(1===this.renderer.context.webGLVersion){let r=t.getParameter(t.FRAMEBUFFER_BINDING);t.bindFramebuffer(t.FRAMEBUFFER,null),e=t.getParameter(t.SAMPLES),t.bindFramebuffer(t.FRAMEBUFFER,r)}else{let r=t.getParameter(t.DRAW_FRAMEBUFFER_BINDING);t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),e=t.getParameter(t.SAMPLES),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,r)}e>=N.HIGH?this.multisample=N.HIGH:e>=N.MEDIUM?this.multisample=N.MEDIUM:e>=N.LOW?this.multisample=N.LOW:this.multisample=N.NONE}destroy(){}}sA.extension={type:e$.RendererSystem,name:"_multisample"},eK.add(sA);class sw{constructor(t){this.buffer=t||null,this.updateID=-1,this.byteLength=-1,this.refCount=0}}class sS{/**
   * @param {PIXI.Renderer} renderer - The renderer this System works for.
   */constructor(t){this.renderer=t,this.managedBuffers={},this.boundBufferBases={}}/**
   * @ignore
   */destroy(){this.renderer=null}/** Sets up the renderer context and necessary buffers. */contextChange(){this.disposeAll(!0),this.gl=this.renderer.gl,this.CONTEXT_UID=this.renderer.CONTEXT_UID}/**
   * This binds specified buffer. On first run, it will create the webGL buffers for the context too
   * @param buffer - the buffer to bind to the renderer
   */bind(t){let{gl:e,CONTEXT_UID:r}=this,i=t._glBuffers[r]||this.createGLBuffer(t);e.bindBuffer(t.type,i.buffer)}unbind(t){let{gl:e}=this;e.bindBuffer(t,null)}/**
   * Binds an uniform buffer to at the given index.
   *
   * A cache is used so a buffer will not be bound again if already bound.
   * @param buffer - the buffer to bind
   * @param index - the base index to bind it to.
   */bindBufferBase(t,e){let{gl:r,CONTEXT_UID:i}=this;if(this.boundBufferBases[e]!==t){let s=t._glBuffers[i]||this.createGLBuffer(t);this.boundBufferBases[e]=t,r.bindBufferBase(r.UNIFORM_BUFFER,e,s.buffer)}}/**
   * Binds a buffer whilst also binding its range.
   * This will make the buffer start from the offset supplied rather than 0 when it is read.
   * @param buffer - the buffer to bind
   * @param index - the base index to bind at, defaults to 0
   * @param offset - the offset to bind at (this is blocks of 256). 0 = 0, 1 = 256, 2 = 512 etc
   */bindBufferRange(t,e,r){let{gl:i,CONTEXT_UID:s}=this;r=r||0;let n=t._glBuffers[s]||this.createGLBuffer(t);i.bindBufferRange(i.UNIFORM_BUFFER,e||0,n.buffer,256*r,256)}/**
   * Will ensure the data in the buffer is uploaded to the GPU.
   * @param {PIXI.Buffer} buffer - the buffer to update
   */update(t){let{gl:e,CONTEXT_UID:r}=this,i=t._glBuffers[r]||this.createGLBuffer(t);if(t._updateID!==i.updateID){if(i.updateID=t._updateID,e.bindBuffer(t.type,i.buffer),i.byteLength>=t.data.byteLength)e.bufferSubData(t.type,0,t.data);else{let r=t.static?e.STATIC_DRAW:e.DYNAMIC_DRAW;i.byteLength=t.data.byteLength,e.bufferData(t.type,t.data,r)}}}/**
   * Disposes buffer
   * @param {PIXI.Buffer} buffer - buffer with data
   * @param {boolean} [contextLost=false] - If context was lost, we suppress deleteVertexArray
   */dispose(t,e){if(!this.managedBuffers[t.id])return;delete this.managedBuffers[t.id];let r=t._glBuffers[this.CONTEXT_UID],i=this.gl;t.disposeRunner.remove(this),r&&(e||i.deleteBuffer(r.buffer),delete t._glBuffers[this.CONTEXT_UID])}/**
   * dispose all WebGL resources of all managed buffers
   * @param {boolean} [contextLost=false] - If context was lost, we suppress `gl.delete` calls
   */disposeAll(t){let e=Object.keys(this.managedBuffers);for(let r=0;r<e.length;r++)this.dispose(this.managedBuffers[e[r]],t)}/**
   * creates and attaches a GLBuffer object tied to the current context.
   * @param buffer
   * @protected
   */createGLBuffer(t){let{CONTEXT_UID:e,gl:r}=this;return t._glBuffers[e]=new sw(r.createBuffer()),this.managedBuffers[t.id]=t,t.disposeRunner.add(this),t._glBuffers[e]}}sS.extension={type:e$.RendererSystem,name:"buffer"},eK.add(sS);class sR{// renderers scene graph!
constructor(t){this.renderer=t}/**
   * Renders the object to its WebGL view.
   * @param displayObject - The object to be rendered.
   * @param options - the options to be passed to the renderer
   */render(t,e){let r,i,s,n;let a=this.renderer;if(e&&(r=e.renderTexture,i=e.clear,s=e.transform,n=e.skipUpdateTransform),this.renderingToScreen=!r,a.runners.prerender.emit(),a.emit("prerender"),a.projection.transform=s,!a.context.isLost){if(r||(this.lastObjectRendered=t),!n){let e=t.enableTempParent();t.updateTransform(),t.disableTempParent(e)}a.renderTexture.bind(r),a.batch.currentRenderer.start(),(i??a.background.clearBeforeRender)&&a.renderTexture.clear(),t.render(a),a.batch.currentRenderer.flush(),r&&(e.blit&&a.framebuffer.blit(),r.baseTexture.update()),a.runners.postrender.emit(),a.projection.transform=null,a.emit("postrender")}}destroy(){this.renderer=null,this.lastObjectRendered=null}}sR.extension={type:e$.RendererSystem,name:"objectRenderer"},eK.add(sR);const sI=class t extends sn{/**
   * @param {PIXI.IRendererOptions} [options] - See {@link PIXI.settings.RENDER_OPTIONS} for defaults.
   */constructor(e){super(),this.type=v.WEBGL,e=Object.assign({},G.RENDER_OPTIONS,e),this.gl=null,this.CONTEXT_UID=0,this.globalUniforms=new r3({projectionMatrix:new rT},!0);let r={runners:["init","destroy","contextChange","resolutionChange","reset","update","postrender","prerender","resize"],systems:t.__systems,priority:["_view","textureGenerator","background","_plugin","startup",// low level WebGL systems
"context","state","texture","buffer","geometry","framebuffer","transformFeedback",// high level pixi specific rendering
"mask","scissor","stencil","projection","textureGC","filter","renderTexture","batch","objectRenderer","_multisample"]};this.setup(r),"useContextAlpha"in e&&(tF("7.0.0","options.useContextAlpha is deprecated, use options.premultipliedAlpha and options.backgroundAlpha instead"),e.premultipliedAlpha=e.useContextAlpha&&"notMultiplied"!==e.useContextAlpha,e.backgroundAlpha=!1===e.useContextAlpha?1:e.backgroundAlpha),this._plugin.rendererPlugins=t.__plugins,this.options=e,this.startup.run(this.options)}/**
   * Create renderer if WebGL is available. Overrideable
   * by the **@pixi/canvas-renderer** package to allow fallback.
   * throws error if WebGL is not available.
   * @param options
   * @private
   */static test(t){return!t?.forceCanvas&&tz()}/**
   * Renders the object to its WebGL view.
   * @param displayObject - The object to be rendered.
   * @param {object} [options] - Object to use for render options.
   * @param {PIXI.RenderTexture} [options.renderTexture] - The render texture to render to.
   * @param {boolean} [options.clear=true] - Should the canvas be cleared before the new render.
   * @param {PIXI.Matrix} [options.transform] - A transform to apply to the render texture before rendering.
   * @param {boolean} [options.skipUpdateTransform=false] - Should we skip the update transform pass?
   */render(t,e){this.objectRenderer.render(t,e)}/**
   * Resizes the WebGL view to the specified width and height.
   * @param desiredScreenWidth - The desired width of the screen.
   * @param desiredScreenHeight - The desired height of the screen.
   */resize(t,e){this._view.resizeView(t,e)}/**
   * Resets the WebGL state so you can render things however you fancy!
   * @returns Returns itself.
   */reset(){return this.runners.reset.emit(),this}/** Clear the frame buffer. */clear(){this.renderTexture.bind(),this.renderTexture.clear()}/**
   * Removes everything from the renderer (event listeners, spritebatch, etc...)
   * @param [removeView=false] - Removes the Canvas element from the DOM.
   *  See: https://github.com/pixijs/pixijs/issues/2233
   */destroy(t=!1){this.runners.destroy.items.reverse(),this.emitWithCustomOptions(this.runners.destroy,{_view:t}),super.destroy()}/** Collection of plugins */get plugins(){return this._plugin.plugins}/** The number of msaa samples of the canvas. */get multisample(){return this._multisample.multisample}/**
   * Same as view.width, actual number of pixels in the canvas by horizontal.
   * @member {number}
   * @readonly
   * @default 800
   */get width(){return this._view.element.width}/**
   * Same as view.height, actual number of pixels in the canvas by vertical.
   * @default 600
   */get height(){return this._view.element.height}/** The resolution / device pixel ratio of the renderer. */get resolution(){return this._view.resolution}set resolution(t){this._view.resolution=t,this.runners.resolutionChange.emit(t)}/** Whether CSS dimensions of canvas view should be resized to screen dimensions automatically. */get autoDensity(){return this._view.autoDensity}/** The canvas element that everything is drawn to.*/get view(){return this._view.element}/**
   * Measurements of the screen. (0, 0, screenWidth, screenHeight).
   *
   * Its safe to use as filterArea or hitArea for the whole stage.
   * @member {PIXI.Rectangle}
   */get screen(){return this._view.screen}/** the last object rendered by the renderer. Useful for other plugins like interaction managers */get lastObjectRendered(){return this.objectRenderer.lastObjectRendered}/** Flag if we are rendering to the screen vs renderTexture */get renderingToScreen(){return this.objectRenderer.renderingToScreen}/** When logging Pixi to the console, this is the name we will show */get rendererLogId(){return`WebGL ${this.context.webGLVersion}`}/**
   * This sets weather the screen is totally cleared between each frame withthe background color and alpha
   * @deprecated since 7.0.0
   */get clearBeforeRender(){return tF("7.0.0","renderer.clearBeforeRender has been deprecated, please use renderer.background.clearBeforeRender instead."),this.background.clearBeforeRender}/**
   * Pass-thru setting for the canvas' context `alpha` property. This is typically
   * not something you need to fiddle with. If you want transparency, use `backgroundAlpha`.
   * @deprecated since 7.0.0
   * @member {boolean}
   */get useContextAlpha(){return tF("7.0.0","renderer.useContextAlpha has been deprecated, please use renderer.context.premultipliedAlpha instead."),this.context.useContextAlpha}/**
   * readonly drawing buffer preservation
   * we can only know this if Pixi created the context
   * @deprecated since 7.0.0
   */get preserveDrawingBuffer(){return tF("7.0.0","renderer.preserveDrawingBuffer has been deprecated, we cannot truly know this unless pixi created the context"),this.context.preserveDrawingBuffer}/**
   * The background color to fill if not transparent
   * @member {number}
   * @deprecated since 7.0.0
   */get backgroundColor(){return tF("7.0.0","renderer.backgroundColor has been deprecated, use renderer.background.color instead."),this.background.color}set backgroundColor(t){tF("7.0.0","renderer.backgroundColor has been deprecated, use renderer.background.color instead."),this.background.color=t}/**
   * The background color alpha. Setting this to 0 will make the canvas transparent.
   * @member {number}
   * @deprecated since 7.0.0
   */get backgroundAlpha(){return tF("7.0.0","renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead."),this.background.alpha}/**
   * @deprecated since 7.0.0
   */set backgroundAlpha(t){tF("7.0.0","renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead."),this.background.alpha=t}/**
   * @deprecated since 7.0.0
   */get powerPreference(){return tF("7.0.0","renderer.powerPreference has been deprecated, we can only know this if pixi creates the context"),this.context.powerPreference}/**
   * Useful function that returns a texture of the display object that can then be used to create sprites
   * This can be quite useful if your displayObject is complicated and needs to be reused multiple times.
   * @param displayObject - The displayObject the object will be generated from.
   * @param {IGenerateTextureOptions} options - Generate texture options.
   * @param {PIXI.Rectangle} options.region - The region of the displayObject, that shall be rendered,
   *        if no region is specified, defaults to the local bounds of the displayObject.
   * @param {number} [options.resolution] - If not given, the renderer's resolution is used.
   * @param {PIXI.MSAA_QUALITY} [options.multisample] - If not given, the renderer's multisample is used.
   * @returns A texture of the graphics object.
   */generateTexture(t,e){return this.textureGenerator.generateTexture(t,e)}};sI.extension={type:e$.Renderer,priority:1},/**
* Collection of installed plugins. These are included by default in PIXI, but can be excluded
* by creating a custom build. Consult the README for more information about creating custom
* builds and excluding plugins.
* @private
*/sI.__plugins={},/**
* The collection of installed systems.
* @private
*/sI.__systems={};let sC=sI;eK.handleByMap(e$.RendererPlugin,sC.__plugins),eK.handleByMap(e$.RendererSystem,sC.__systems),eK.add(sC);class sM extends e5{/**
   * @param length
   * @param options - Options to for Resource constructor
   * @param {number} [options.width] - Width of the resource
   * @param {number} [options.height] - Height of the resource
   */constructor(t,e){let{width:r,height:i}=e||{};super(r,i),this.items=[],this.itemDirtyIds=[];for(let e=0;e<t;e++){let t=new e9;this.items.push(t),this.itemDirtyIds.push(-2)}this.length=t,this._load=null,this.baseTexture=null}/**
   * Used from ArrayResource and CubeResource constructors.
   * @param resources - Can be resources, image elements, canvas, etc. ,
   *  length should be same as constructor length
   * @param options - Detect options for resources
   */initFromArray(t,e){for(let r=0;r<this.length;r++)t[r]&&(t[r].castToBaseTexture?this.addBaseTextureAt(t[r].castToBaseTexture(),r):t[r]instanceof e5?this.addResourceAt(t[r],r):this.addResourceAt(e2(t[r],e),r))}/** Destroy this BaseImageResource. */dispose(){for(let t=0,e=this.length;t<e;t++)this.items[t].destroy();this.items=null,this.itemDirtyIds=null,this._load=null}/**
   * Set a resource by ID
   * @param resource
   * @param index - Zero-based index of resource to set
   * @returns - Instance for chaining
   */addResourceAt(t,e){if(!this.items[e])throw Error(`Index ${e} is out of bounds`);return t.valid&&!this.valid&&this.resize(t.width,t.height),this.items[e].setResource(t),this}/**
   * Set the parent base texture.
   * @param baseTexture
   */bind(t){if(null!==this.baseTexture)throw Error("Only one base texture per TextureArray is allowed");super.bind(t);for(let e=0;e<this.length;e++)this.items[e].parentTextureArray=t,this.items[e].on("update",t.update,t)}/**
   * Unset the parent base texture.
   * @param baseTexture
   */unbind(t){super.unbind(t);for(let e=0;e<this.length;e++)this.items[e].parentTextureArray=null,this.items[e].off("update",t.update,t)}/**
   * Load all the resources simultaneously
   * @returns - When load is resolved
   */load(){if(this._load)return this._load;let t=this.items.map(t=>t.resource).filter(t=>t).map(t=>t.load());return this._load=Promise.all(t).then(()=>{let{realWidth:t,realHeight:e}=this.items[0];return this.resize(t,e),this.update(),Promise.resolve(this)}),this._load}}class sP extends sM{/**
   * @param source - Number of items in array or the collection
   *        of image URLs to use. Can also be resources, image elements, canvas, etc.
   * @param options - Options to apply to {@link PIXI.autoDetectResource}
   * @param {number} [options.width] - Width of the resource
   * @param {number} [options.height] - Height of the resource
   */constructor(t,e){let r,i;let{width:s,height:n}=e||{};Array.isArray(t)?(r=t,i=t.length):i=t,super(i,{width:s,height:n}),r&&this.initFromArray(r,e)}/**
   * Set a baseTexture by ID,
   * ArrayResource just takes resource from it, nothing more
   * @param baseTexture
   * @param index - Zero-based index of resource to set
   * @returns - Instance for chaining
   */addBaseTextureAt(t,e){if(t.resource)this.addResourceAt(t.resource,e);else throw Error("ArrayResource does not support RenderTexture");return this}/**
   * Add binding
   * @param baseTexture
   */bind(t){super.bind(t),t.target=A.TEXTURE_2D_ARRAY}/**
   * Upload the resources to the GPU.
   * @param renderer
   * @param texture
   * @param glTexture
   * @returns - whether texture was uploaded
   */upload(t,e,r){let{length:i,itemDirtyIds:s,items:n}=this,{gl:a}=t;r.dirtyId<0&&a.texImage3D(a.TEXTURE_2D_ARRAY,0,r.internalFormat,this._width,this._height,i,0,e.format,r.type,null);for(let t=0;t<i;t++){let i=n[t];s[t]<i.dirtyId&&(s[t]=i.dirtyId,i.valid&&a.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,t,i.resource.width,i.resource.height,1,e.format,r.type,i.resource.source))}return!0}}class sD extends ip{/**
   * @param source - Canvas element to use
   */// eslint-disable-next-line @typescript-eslint/no-useless-constructor
constructor(t){super(t)}/**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if source is HTMLCanvasElement or OffscreenCanvas
   */static test(t){let{OffscreenCanvas:e}=globalThis;return!!e&&t instanceof e||globalThis.HTMLCanvasElement&&t instanceof HTMLCanvasElement}}const sO=class t extends sM{/**
   * @param {Array<string|PIXI.Resource>} [source] - Collection of URLs or resources
   *        to use as the sides of the cube.
   * @param options - ImageResource options
   * @param {number} [options.width] - Width of resource
   * @param {number} [options.height] - Height of resource
   * @param {number} [options.autoLoad=true] - Whether to auto-load resources
   * @param {number} [options.linkBaseTexture=true] - In case BaseTextures are supplied,
   *   whether to copy them or use
   */constructor(e,r){let{width:i,height:s,autoLoad:n,linkBaseTexture:a}=r||{};if(e&&e.length!==t.SIDES)throw Error(`Invalid length. Got ${e.length}, expected 6`);super(6,{width:i,height:s});for(let e=0;e<t.SIDES;e++)this.items[e].target=A.TEXTURE_CUBE_MAP_POSITIVE_X+e;this.linkBaseTexture=!1!==a,e&&this.initFromArray(e,r),!1!==n&&this.load()}/**
   * Add binding.
   * @param baseTexture - parent base texture
   */bind(t){super.bind(t),t.target=A.TEXTURE_CUBE_MAP}addBaseTextureAt(t,e,r){if(void 0===r&&(r=this.linkBaseTexture),!this.items[e])throw Error(`Index ${e} is out of bounds`);if(!this.linkBaseTexture||t.parentTextureArray||Object.keys(t._glTextures).length>0){if(t.resource)this.addResourceAt(t.resource,e);else throw Error("CubeResource does not support copying of renderTexture.")}else t.target=A.TEXTURE_CUBE_MAP_POSITIVE_X+e,t.parentTextureArray=this.baseTexture,this.items[e]=t;return t.valid&&!this.valid&&this.resize(t.realWidth,t.realHeight),this.items[e]=t,this}/**
   * Upload the resource
   * @param renderer
   * @param _baseTexture
   * @param glTexture
   * @returns {boolean} true is success
   */upload(e,r,i){let s=this.itemDirtyIds;for(let n=0;n<t.SIDES;n++){let t=this.items[n];(s[n]<t.dirtyId||i.dirtyId<r.dirtyId)&&(t.valid&&t.resource?(t.resource.upload(e,t,i),s[n]=t.dirtyId):s[n]<-1&&(e.gl.texImage2D(t.target,0,i.internalFormat,r.realWidth,r.realHeight,0,r.format,i.type,null),s[n]=-1))}return!0}/**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if source is an array of 6 elements
   */static test(e){return Array.isArray(e)&&e.length===t.SIDES}};sO.SIDES=6;let sB=sO;class sF extends ip{/**
   * @param source - ImageBitmap or URL to use.
   * @param options - Options to use.
   */constructor(t,e){let r,i,s;e=e||{},"string"==typeof t?(r=sF.EMPTY,i=t,s=!0):(r=t,i=null,s=!1),super(r),this.url=i,this.crossOrigin=e.crossOrigin??!0,this.alphaMode="number"==typeof e.alphaMode?e.alphaMode:null,this.ownsImageBitmap=e.ownsImageBitmap??s,this._load=null,!1!==e.autoLoad&&this.load()}load(){return this._load||(this._load=new Promise(async(t,e)=>{if(null===this.url){t(this);return}try{let e=await G.ADAPTER.fetch(this.url,{mode:this.crossOrigin?"cors":"no-cors"});if(this.destroyed)return;let r=await e.blob();if(this.destroyed)return;let i=await createImageBitmap(r,{premultiplyAlpha:null===this.alphaMode||this.alphaMode===M.UNPACK?"premultiply":"none"});if(this.destroyed){i.close();return}this.source=i,this.update(),t(this)}catch(t){if(this.destroyed)return;e(t),this.onError.emit(t)}})),this._load}/**
   * Upload the image bitmap resource to GPU.
   * @param renderer - Renderer to upload to
   * @param baseTexture - BaseTexture for this resource
   * @param glTexture - GLTexture to use
   * @returns {boolean} true is success
   */upload(t,e,r){return this.source instanceof ImageBitmap?("number"==typeof this.alphaMode&&(e.alphaMode=this.alphaMode),super.upload(t,e,r)):(this.load(),!1)}/** Destroys this resource. */dispose(){this.ownsImageBitmap&&this.source instanceof ImageBitmap&&this.source.close(),super.dispose(),this._load=null}/**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @returns {boolean} `true` if current environment support ImageBitmap, and source is string or ImageBitmap
   */static test(t){return!!globalThis.createImageBitmap&&"u">typeof ImageBitmap&&("string"==typeof t||t instanceof ImageBitmap)}/**
   * ImageBitmap cannot be created synchronously, so a empty placeholder canvas is needed when loading from URLs.
   * Only for internal usage.
   * @returns The cached placeholder canvas.
   */static get EMPTY(){return sF._EMPTY=sF._EMPTY??G.ADAPTER.createCanvas(0,0),sF._EMPTY}}const sN=class t extends ip{/**
   * @param sourceBase64 - Base64 encoded SVG element or URL for SVG file.
   * @param {object} [options] - Options to use
   * @param {number} [options.scale=1] - Scale to apply to SVG. Overridden by...
   * @param {number} [options.width] - Rasterize SVG this wide. Aspect ratio preserved if height not specified.
   * @param {number} [options.height] - Rasterize SVG this high. Aspect ratio preserved if width not specified.
   * @param {boolean} [options.autoLoad=true] - Start loading right away.
   */constructor(t,e){e=e||{},super(G.ADAPTER.createCanvas()),this._width=0,this._height=0,this.svg=t,this.scale=e.scale||1,this._overrideWidth=e.width,this._overrideHeight=e.height,this._resolve=null,this._crossorigin=e.crossorigin,this._load=null,!1!==e.autoLoad&&this.load()}load(){return this._load||(this._load=new Promise(e=>{if(this._resolve=()=>{this.update(),e(this)},t.SVG_XML.test(this.svg.trim())){if(!btoa)throw Error("Your browser doesn't support base64 conversions.");this.svg=`data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(this.svg)))}`}this._loadSvg()})),this._load}/** Loads an SVG image from `imageUrl` or `data URL`. */_loadSvg(){let t=new Image;ip.crossOrigin(t,this.svg,this._crossorigin),t.src=this.svg,t.onerror=e=>{this._resolve&&(t.onerror=null,this.onError.emit(e))},t.onload=()=>{if(!this._resolve)return;let e=t.width,r=t.height;if(!e||!r)throw Error("The SVG image must have width and height defined (in pixels), canvas API needs them.");let i=e*this.scale,s=r*this.scale;(this._overrideWidth||this._overrideHeight)&&(i=this._overrideWidth||this._overrideHeight/r*e,s=this._overrideHeight||this._overrideWidth/e*r),i=Math.round(i),s=Math.round(s);let n=this.source;n.width=i,n.height=s,n._pixiId=`canvas_${eM()}`,n.getContext("2d").drawImage(t,0,0,e,r,0,0,i,s),this._resolve(),this._resolve=null}}/**
   * Get size from an svg string using a regular expression.
   * @param svgString - a serialized svg element
   * @returns - image extension
   */static getSize(e){let r=t.SVG_SIZE.exec(e),i={};return r&&(i[r[1]]=Math.round(parseFloat(r[3])),i[r[5]]=Math.round(parseFloat(r[7]))),i}/** Destroys this texture. */dispose(){super.dispose(),this._resolve=null,this._crossorigin=null}/**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @param {string} extension - The extension of source, if set
   * @returns {boolean} - If the source is a SVG source or data file
   */static test(e,r){return"svg"===r||"string"==typeof e&&e.startsWith("data:image/svg+xml")||"string"==typeof e&&t.SVG_XML.test(e)}};sN.SVG_XML=/^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m,/**
* Regular expression for SVG size.
* @example &lt;svg width="100" height="100"&gt;&lt;/svg&gt;
* @readonly
*/sN.SVG_SIZE=/<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i;let sL=sN;const sk=class t extends ip{/**
   * @param {HTMLVideoElement|object|string|Array<string|object>} source - Video element to use.
   * @param {object} [options] - Options to use
   * @param {boolean} [options.autoLoad=true] - Start loading the video immediately
   * @param {boolean} [options.autoPlay=true] - Start playing video immediately
   * @param {number} [options.updateFPS=0] - How many times a second to update the texture from the video.
   * Leave at 0 to update at every render.
   * @param {boolean} [options.crossorigin=true] - Load image using cross origin
   * @param {boolean} [options.loop=false] - Loops the video
   * @param {boolean} [options.muted=false] - Mutes the video audio, useful for autoplay
   * @param {boolean} [options.playsinline=true] - Prevents opening the video on mobile devices
   */constructor(e,r){if(r=r||{},!(e instanceof HTMLVideoElement)){let i=document.createElement("video");!1!==r.autoLoad&&i.setAttribute("preload","auto"),!1!==r.playsinline&&(i.setAttribute("webkit-playsinline",""),i.setAttribute("playsinline","")),!0===r.muted&&(i.setAttribute("muted",""),i.muted=!0),!0===r.loop&&i.setAttribute("loop",""),!1!==r.autoPlay&&i.setAttribute("autoplay",""),"string"==typeof e&&(e=[e]);let s=e[0].src||e[0];ip.crossOrigin(i,s,r.crossorigin);for(let r=0;r<e.length;++r){let s=document.createElement("source"),{src:n,mime:a}=e[r];if((n=n||e[r]).startsWith("data:"))a=n.slice(5,n.indexOf(";"));else if(!n.startsWith("blob:")){let e=n.split("?").shift().toLowerCase(),r=e.slice(e.lastIndexOf(".")+1);a=a||t.MIME_TYPES[r]||`video/${r}`}s.src=n,a&&(s.type=a),i.appendChild(s)}e=i}super(e),this.noSubImage=!0,this._autoUpdate=!0,this._isConnectedToTicker=!1,this._updateFPS=r.updateFPS||0,this._msToNextUpdate=0,this.autoPlay=!1!==r.autoPlay,this._videoFrameRequestCallback=this._videoFrameRequestCallback.bind(this),this._videoFrameRequestCallbackHandle=null,this._load=null,this._resolve=null,this._reject=null,this._onCanPlay=this._onCanPlay.bind(this),this._onError=this._onError.bind(this),this._onPlayStart=this._onPlayStart.bind(this),this._onPlayStop=this._onPlayStop.bind(this),this._onSeeked=this._onSeeked.bind(this),!1!==r.autoLoad&&this.load()}/**
   * Trigger updating of the texture.
   * @param _deltaTime - time delta since last tick
   */update(t=0){if(!this.destroyed){if(this._updateFPS){let t=sg.shared.elapsedMS*this.source.playbackRate;this._msToNextUpdate=Math.floor(this._msToNextUpdate-t)}(!this._updateFPS||this._msToNextUpdate<=0)&&(super.update(),this._msToNextUpdate=this._updateFPS?Math.floor(1e3/this._updateFPS):0)}}_videoFrameRequestCallback(){this.update(),this.destroyed?this._videoFrameRequestCallbackHandle=null:this._videoFrameRequestCallbackHandle=this.source.requestVideoFrameCallback(this._videoFrameRequestCallback)}/**
   * Start preloading the video resource.
   * @returns {Promise<void>} Handle the validate event
   */load(){if(this._load)return this._load;let t=this.source;return(t.readyState===t.HAVE_ENOUGH_DATA||t.readyState===t.HAVE_FUTURE_DATA)&&t.width&&t.height&&(t.complete=!0),t.addEventListener("play",this._onPlayStart),t.addEventListener("pause",this._onPlayStop),t.addEventListener("seeked",this._onSeeked),this._isSourceReady()?this._onCanPlay():(t.addEventListener("canplay",this._onCanPlay),t.addEventListener("canplaythrough",this._onCanPlay),t.addEventListener("error",this._onError,!0)),this._load=new Promise((e,r)=>{this.valid?e(this):(this._resolve=e,this._reject=r,t.load())}),this._load}/**
   * Handle video error events.
   * @param event
   */_onError(t){this.source.removeEventListener("error",this._onError,!0),this.onError.emit(t),this._reject&&(this._reject(t),this._reject=null,this._resolve=null)}/**
   * Returns true if the underlying source is playing.
   * @returns - True if playing.
   */_isSourcePlaying(){let t=this.source;return!t.paused&&!t.ended}/**
   * Returns true if the underlying source is ready for playing.
   * @returns - True if ready.
   */_isSourceReady(){return this.source.readyState>2}/** Runs the update loop when the video is ready to play. */_onPlayStart(){this.valid||this._onCanPlay(),this._configureAutoUpdate()}/** Fired when a pause event is triggered, stops the update loop. */_onPlayStop(){this._configureAutoUpdate()}/** Fired when the video is completed seeking to the current playback position. */_onSeeked(){this._autoUpdate&&!this._isSourcePlaying()&&(this._msToNextUpdate=0,this.update(),this._msToNextUpdate=0)}/** Fired when the video is loaded and ready to play. */_onCanPlay(){let t=this.source;t.removeEventListener("canplay",this._onCanPlay),t.removeEventListener("canplaythrough",this._onCanPlay);let e=this.valid;this._msToNextUpdate=0,this.update(),this._msToNextUpdate=0,!e&&this._resolve&&(this._resolve(this),this._resolve=null,this._reject=null),this._isSourcePlaying()?this._onPlayStart():this.autoPlay&&t.play()}/** Destroys this texture. */dispose(){this._configureAutoUpdate();let t=this.source;t&&(t.removeEventListener("play",this._onPlayStart),t.removeEventListener("pause",this._onPlayStop),t.removeEventListener("seeked",this._onSeeked),t.removeEventListener("canplay",this._onCanPlay),t.removeEventListener("canplaythrough",this._onCanPlay),t.removeEventListener("error",this._onError,!0),t.pause(),t.src="",t.load()),super.dispose()}/** Should the base texture automatically update itself, set to true by default. */get autoUpdate(){return this._autoUpdate}set autoUpdate(t){t!==this._autoUpdate&&(this._autoUpdate=t,this._configureAutoUpdate())}/**
   * How many times a second to update the texture from the video. Leave at 0 to update at every render.
   * A lower fps can help performance, as updating the texture at 60fps on a 30ps video may not be efficient.
   */get updateFPS(){return this._updateFPS}set updateFPS(t){t!==this._updateFPS&&(this._updateFPS=t,this._configureAutoUpdate())}_configureAutoUpdate(){this._autoUpdate&&this._isSourcePlaying()?!this._updateFPS&&this.source.requestVideoFrameCallback?(this._isConnectedToTicker&&(sg.shared.remove(this.update,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0),null===this._videoFrameRequestCallbackHandle&&(this._videoFrameRequestCallbackHandle=this.source.requestVideoFrameCallback(this._videoFrameRequestCallback))):(null!==this._videoFrameRequestCallbackHandle&&(this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker||(sg.shared.add(this.update,this),this._isConnectedToTicker=!0,this._msToNextUpdate=0)):(null!==this._videoFrameRequestCallbackHandle&&(this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker&&(sg.shared.remove(this.update,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0))}/**
   * Used to auto-detect the type of resource.
   * @param {*} source - The source object
   * @param {string} extension - The extension of source, if set
   * @returns {boolean} `true` if video source
   */static test(e,r){return globalThis.HTMLVideoElement&&e instanceof HTMLVideoElement||t.TYPES.includes(r)}};sk.TYPES=["mp4","m4v","webm","ogg","ogv","h264","avi","mov"],/**
* Map of video MIME types that can't be directly derived from file extensions.
* @readonly
*/sk.MIME_TYPES={ogv:"video/ogg",mov:"video/quicktime",m4v:"video/mp4"};let sU=sk;e1.push(sF,im,sD,sU,sL,e6,sB,sP);class sG{constructor(){this._glTransformFeedbacks={},this.buffers=[],this.disposeRunner=new e4("disposeTransformFeedback")}/**
   * Bind buffer to TransformFeedback
   * @param index - index to bind
   * @param buffer - buffer to bind
   */bindBuffer(t,e){this.buffers[t]=e}/** Destroy WebGL resources that are connected to this TransformFeedback. */destroy(){this.disposeRunner.emit(this,!1)}}const sH="7.3.2";u(g,tV),u(g,_),u(g,eX),u(g,ru),u(g,e3),u(g,k),u(g,sc);var sj={};h(sj,"Bounds",()=>sz),h(sj,"Container",()=>sq),h(sj,"DisplayObject",()=>sV),h(sj,"TemporaryDisplayObject",()=>sW);class sz{constructor(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this.rect=null,this.updateID=-1}/**
   * Checks if bounds are empty.
   * @returns - True if empty.
   */isEmpty(){return this.minX>this.maxX||this.minY>this.maxY}/** Clears the bounds and resets. */clear(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0}/**
   * Can return Rectangle.EMPTY constant, either construct new rectangle, either use your rectangle
   * It is not guaranteed that it will return tempRect
   * @param rect - Temporary object will be used if AABB is not empty
   * @returns - A rectangle of the bounds
   */getRectangle(t){return this.minX>this.maxX||this.minY>this.maxY?r_.EMPTY:((t=t||new r_(0,0,1,1)).x=this.minX,t.y=this.minY,t.width=this.maxX-this.minX,t.height=this.maxY-this.minY,t)}/**
   * This function should be inlined when its possible.
   * @param point - The point to add.
   */addPoint(t){this.minX=Math.min(this.minX,t.x),this.maxX=Math.max(this.maxX,t.x),this.minY=Math.min(this.minY,t.y),this.maxY=Math.max(this.maxY,t.y)}/**
   * Adds a point, after transformed. This should be inlined when its possible.
   * @param matrix
   * @param point
   */addPointMatrix(t,e){let{a:r,b:i,c:s,d:n,tx:a,ty:o}=t,h=r*e.x+s*e.y+a,l=i*e.x+n*e.y+o;this.minX=Math.min(this.minX,h),this.maxX=Math.max(this.maxX,h),this.minY=Math.min(this.minY,l),this.maxY=Math.max(this.maxY,l)}/**
   * Adds a quad, not transformed
   * @param vertices - The verts to add.
   */addQuad(t){let e=this.minX,r=this.minY,i=this.maxX,s=this.maxY,n=t[0],a=t[1];e=n<e?n:e,r=a<r?a:r,i=n>i?n:i,s=a>s?a:s,n=t[2],a=t[3],e=n<e?n:e,r=a<r?a:r,i=n>i?n:i,s=a>s?a:s,n=t[4],a=t[5],e=n<e?n:e,r=a<r?a:r,i=n>i?n:i,s=a>s?a:s,n=t[6],a=t[7],e=n<e?n:e,r=a<r?a:r,i=n>i?n:i,s=a>s?a:s,this.minX=e,this.minY=r,this.maxX=i,this.maxY=s}/**
   * Adds sprite frame, transformed.
   * @param transform - transform to apply
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   */addFrame(t,e,r,i,s){this.addFrameMatrix(t.worldTransform,e,r,i,s)}/**
   * Adds sprite frame, multiplied by matrix
   * @param matrix - matrix to apply
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   */addFrameMatrix(t,e,r,i,s){let n=t.a,a=t.b,o=t.c,h=t.d,l=t.tx,u=t.ty,d=this.minX,c=this.minY,p=this.maxX,f=this.maxY,m=n*e+o*r+l,g=a*e+h*r+u;d=m<d?m:d,c=g<c?g:c,p=m>p?m:p,f=g>f?g:f,m=n*i+o*r+l,g=a*i+h*r+u,d=m<d?m:d,c=g<c?g:c,p=m>p?m:p,f=g>f?g:f,m=n*e+o*s+l,g=a*e+h*s+u,d=m<d?m:d,c=g<c?g:c,p=m>p?m:p,f=g>f?g:f,m=n*i+o*s+l,g=a*i+h*s+u,d=m<d?m:d,c=g<c?g:c,p=m>p?m:p,f=g>f?g:f,this.minX=d,this.minY=c,this.maxX=p,this.maxY=f}/**
   * Adds screen vertices from array
   * @param vertexData - calculated vertices
   * @param beginOffset - begin offset
   * @param endOffset - end offset, excluded
   */addVertexData(t,e,r){let i=this.minX,s=this.minY,n=this.maxX,a=this.maxY;for(let o=e;o<r;o+=2){let e=t[o],r=t[o+1];i=e<i?e:i,s=r<s?r:s,n=e>n?e:n,a=r>a?r:a}this.minX=i,this.minY=s,this.maxX=n,this.maxY=a}/**
   * Add an array of mesh vertices
   * @param transform - mesh transform
   * @param vertices - mesh coordinates in array
   * @param beginOffset - begin offset
   * @param endOffset - end offset, excluded
   */addVertices(t,e,r,i){this.addVerticesMatrix(t.worldTransform,e,r,i)}/**
   * Add an array of mesh vertices.
   * @param matrix - mesh matrix
   * @param vertices - mesh coordinates in array
   * @param beginOffset - begin offset
   * @param endOffset - end offset, excluded
   * @param padX - x padding
   * @param padY - y padding
   */addVerticesMatrix(t,e,r,i,s=0,n=s){let a=t.a,o=t.b,h=t.c,l=t.d,u=t.tx,d=t.ty,c=this.minX,p=this.minY,f=this.maxX,m=this.maxY;for(let t=r;t<i;t+=2){let r=e[t],i=e[t+1],g=a*r+h*i+u,_=l*i+o*r+d;c=Math.min(c,g-s),f=Math.max(f,g+s),p=Math.min(p,_-n),m=Math.max(m,_+n)}this.minX=c,this.minY=p,this.maxX=f,this.maxY=m}/**
   * Adds other {@link PIXI.Bounds}.
   * @param bounds - The Bounds to be added
   */addBounds(t){let e=this.minX,r=this.minY,i=this.maxX,s=this.maxY;this.minX=t.minX<e?t.minX:e,this.minY=t.minY<r?t.minY:r,this.maxX=t.maxX>i?t.maxX:i,this.maxY=t.maxY>s?t.maxY:s}/**
   * Adds other Bounds, masked with Bounds.
   * @param bounds - The Bounds to be added.
   * @param mask - TODO
   */addBoundsMask(t,e){let r=t.minX>e.minX?t.minX:e.minX,i=t.minY>e.minY?t.minY:e.minY,s=t.maxX<e.maxX?t.maxX:e.maxX,n=t.maxY<e.maxY?t.maxY:e.maxY;if(r<=s&&i<=n){let t=this.minX,e=this.minY,a=this.maxX,o=this.maxY;this.minX=r<t?r:t,this.minY=i<e?i:e,this.maxX=s>a?s:a,this.maxY=n>o?n:o}}/**
   * Adds other Bounds, multiplied by matrix. Bounds shouldn't be empty.
   * @param bounds - other bounds
   * @param matrix - multiplicator
   */addBoundsMatrix(t,e){this.addFrameMatrix(e,t.minX,t.minY,t.maxX,t.maxY)}/**
   * Adds other Bounds, masked with Rectangle.
   * @param bounds - TODO
   * @param area - TODO
   */addBoundsArea(t,e){let r=t.minX>e.x?t.minX:e.x,i=t.minY>e.y?t.minY:e.y,s=t.maxX<e.x+e.width?t.maxX:e.x+e.width,n=t.maxY<e.y+e.height?t.maxY:e.y+e.height;if(r<=s&&i<=n){let t=this.minX,e=this.minY,a=this.maxX,o=this.maxY;this.minX=r<t?r:t,this.minY=i<e?i:e,this.maxX=s>a?s:a,this.maxY=n>o?n:o}}/**
   * Pads bounds object, making it grow in all directions.
   * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
   * @param paddingX - The horizontal padding amount.
   * @param paddingY - The vertical padding amount.
   */pad(t=0,e=t){this.isEmpty()||(this.minX-=t,this.maxX+=t,this.minY-=e,this.maxY+=e)}/**
   * Adds padded frame. (x0, y0) should be strictly less than (x1, y1)
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   * @param padX - padding X
   * @param padY - padding Y
   */addFramePad(t,e,r,i,s,n){t-=s,e-=n,r+=s,i+=n,this.minX=this.minX<t?this.minX:t,this.maxX=this.maxX>r?this.maxX:r,this.minY=this.minY<e?this.minY:e,this.maxY=this.maxY>i?this.maxY:i}}class sV extends ta.EventEmitter{constructor(){super(),this.tempDisplayObjectParent=null,this.transform=new rO,this.alpha=1,this.visible=!0,this.renderable=!0,this.cullable=!1,this.cullArea=null,this.parent=null,this.worldAlpha=1,this._lastSortedIndex=0,this._zIndex=0,this.filterArea=null,this.filters=null,this._enabledFilters=null,this._bounds=new sz,this._localBounds=null,this._boundsID=0,this._boundsRect=null,this._localBoundsRect=null,this._mask=null,this._maskRefCount=0,this._destroyed=!1,this.isSprite=!1,this.isMask=!1}/**
   * Mixes all enumerable properties and methods from a source object to DisplayObject.
   * @param source - The source of properties and methods to mix in.
   */static mixin(t){let e=Object.keys(t);for(let r=0;r<e.length;++r){let i=e[r];Object.defineProperty(sV.prototype,i,Object.getOwnPropertyDescriptor(t,i))}}/**
   * Fired when this DisplayObject is added to a Container.
   * @instance
   * @event added
   * @param {PIXI.Container} container - The container added to.
   *//**
   * Fired when this DisplayObject is removed from a Container.
   * @instance
   * @event removed
   * @param {PIXI.Container} container - The container removed from.
   *//**
   * Fired when this DisplayObject is destroyed. This event is emitted once
   * destroy is finished.
   * @instance
   * @event destroyed
   *//** Readonly flag for destroyed display objects. */get destroyed(){return this._destroyed}/** Recursively updates transform of all objects from the root to this one internal function for toLocal() */_recursivePostUpdateTransform(){this.parent?(this.parent._recursivePostUpdateTransform(),this.transform.updateTransform(this.parent.transform)):this.transform.updateTransform(this._tempDisplayObjectParent.transform)}/** Updates the object transform for rendering. TODO - Optimization pass! */updateTransform(){this._boundsID++,this.transform.updateTransform(this.parent.transform),this.worldAlpha=this.alpha*this.parent.worldAlpha}/**
   * Calculates and returns the (world) bounds of the display object as a [Rectangle]{@link PIXI.Rectangle}.
   *
   * This method is expensive on containers with a large subtree (like the stage). This is because the bounds
   * of a container depend on its children's bounds, which recursively causes all bounds in the subtree to
   * be recalculated. The upside, however, is that calling `getBounds` once on a container will indeed update
   * the bounds of all children (the whole subtree, in fact). This side effect should be exploited by using
   * `displayObject._bounds.getRectangle()` when traversing through all the bounds in a scene graph. Otherwise,
   * calling `getBounds` on each object in a subtree will cause the total cost to increase quadratically as
   * its height increases.
   *
   * The transforms of all objects in a container's **subtree** and of all **ancestors** are updated.
   * The world bounds of all display objects in a container's **subtree** will also be recalculated.
   *
   * The `_bounds` object stores the last calculation of the bounds. You can use to entirely skip bounds
   * calculation if needed.
   *
   * ```js
   * const lastCalculatedBounds = displayObject._bounds.getRectangle(optionalRect);
   * ```
   *
   * Do know that usage of `getLocalBounds` can corrupt the `_bounds` of children (the whole subtree, actually). This
   * is a known issue that has not been solved. See [getLocalBounds]{@link PIXI.DisplayObject#getLocalBounds} for more
   * details.
   *
   * `getBounds` should be called with `skipUpdate` equal to `true` in a render() call. This is because the transforms
   * are guaranteed to be update-to-date. In fact, recalculating inside a render() call may cause corruption in certain
   * cases.
   * @param skipUpdate - Setting to `true` will stop the transforms of the scene graph from
   *  being updated. This means the calculation returned MAY be out of date BUT will give you a
   *  nice performance boost.
   * @param rect - Optional rectangle to store the result of the bounds calculation.
   * @returns - The minimum axis-aligned rectangle in world space that fits around this object.
   */getBounds(t,e){return t||(this.parent?(this._recursivePostUpdateTransform(),this.updateTransform()):(this.parent=this._tempDisplayObjectParent,this.updateTransform(),this.parent=null)),this._bounds.updateID!==this._boundsID&&(this.calculateBounds(),this._bounds.updateID=this._boundsID),e||(this._boundsRect||(this._boundsRect=new r_),e=this._boundsRect),this._bounds.getRectangle(e)}/**
   * Retrieves the local bounds of the displayObject as a rectangle object.
   * @param rect - Optional rectangle to store the result of the bounds calculation.
   * @returns - The rectangular bounding area.
   */getLocalBounds(t){t||(this._localBoundsRect||(this._localBoundsRect=new r_),t=this._localBoundsRect),this._localBounds||(this._localBounds=new sz);let e=this.transform,r=this.parent;this.parent=null,this._tempDisplayObjectParent.worldAlpha=r?.worldAlpha??1,this.transform=this._tempDisplayObjectParent.transform;let i=this._bounds,s=this._boundsID;this._bounds=this._localBounds;let n=this.getBounds(!1,t);return this.parent=r,this.transform=e,this._bounds=i,this._bounds.updateID+=this._boundsID-s,n}/**
   * Calculates the global position of the display object.
   * @param position - The world origin to calculate from.
   * @param point - A Point object in which to store the value, optional
   *  (otherwise will create a new Point).
   * @param skipUpdate - Should we skip the update transform.
   * @returns - A point object representing the position of this object.
   */toGlobal(t,e,r=!1){return r||(this._recursivePostUpdateTransform(),this.parent?this.displayObjectUpdateTransform():(this.parent=this._tempDisplayObjectParent,this.displayObjectUpdateTransform(),this.parent=null)),this.worldTransform.apply(t,e)}/**
   * Calculates the local position of the display object relative to another point.
   * @param position - The world origin to calculate from.
   * @param from - The DisplayObject to calculate the global position from.
   * @param point - A Point object in which to store the value, optional
   *  (otherwise will create a new Point).
   * @param skipUpdate - Should we skip the update transform
   * @returns - A point object representing the position of this object
   */toLocal(t,e,r,i){return e&&(t=e.toGlobal(t,r,i)),i||(this._recursivePostUpdateTransform(),this.parent?this.displayObjectUpdateTransform():(this.parent=this._tempDisplayObjectParent,this.displayObjectUpdateTransform(),this.parent=null)),this.worldTransform.applyInverse(t,r)}/**
   * Set the parent Container of this DisplayObject.
   * @param container - The Container to add this DisplayObject to.
   * @returns - The Container that this DisplayObject was added to.
   */setParent(t){if(!t||!t.addChild)throw Error("setParent: Argument must be a Container");return t.addChild(this),t}/** Remove the DisplayObject from its parent Container. If the DisplayObject has no parent, do nothing. */removeFromParent(){this.parent?.removeChild(this)}/**
   * Convenience function to set the position, scale, skew and pivot at once.
   * @param x - The X position
   * @param y - The Y position
   * @param scaleX - The X scale value
   * @param scaleY - The Y scale value
   * @param rotation - The rotation
   * @param skewX - The X skew value
   * @param skewY - The Y skew value
   * @param pivotX - The X pivot value
   * @param pivotY - The Y pivot value
   * @returns - The DisplayObject instance
   */setTransform(t=0,e=0,r=1,i=1,s=0,n=0,a=0,o=0,h=0){return this.position.x=t,this.position.y=e,this.scale.x=r||1,this.scale.y=i||1,this.rotation=s,this.skew.x=n,this.skew.y=a,this.pivot.x=o,this.pivot.y=h,this}/**
   * Base destroy method for generic display objects. This will automatically
   * remove the display object from its parent Container as well as remove
   * all current event listeners and internal references. Do not use a DisplayObject
   * after calling `destroy()`.
   * @param _options
   */destroy(t){this.removeFromParent(),this._destroyed=!0,this.transform=null,this.parent=null,this._bounds=null,this.mask=null,this.cullArea=null,this.filters=null,this.filterArea=null,this.hitArea=null,this.eventMode="auto",this.interactiveChildren=!1,this.emit("destroyed"),this.removeAllListeners()}/**
   * @protected
   * @member {PIXI.Container}
   */get _tempDisplayObjectParent(){return null===this.tempDisplayObjectParent&&(this.tempDisplayObjectParent=new sW),this.tempDisplayObjectParent}/**
   * Used in Renderer, cacheAsBitmap and other places where you call an `updateTransform` on root.
   *
   * ```js
   * const cacheParent = elem.enableTempParent();
   * elem.updateTransform();
   * elem.disableTempParent(cacheParent);
   * ```
   * @returns - Current parent
   */enableTempParent(){let t=this.parent;return this.parent=this._tempDisplayObjectParent,t}/**
   * Pair method for `enableTempParent`
   * @param cacheParent - Actual parent of element
   */disableTempParent(t){this.parent=t}/**
   * The position of the displayObject on the x axis relative to the local coordinates of the parent.
   * An alias to position.x
   */get x(){return this.position.x}set x(t){this.transform.position.x=t}/**
   * The position of the displayObject on the y axis relative to the local coordinates of the parent.
   * An alias to position.y
   */get y(){return this.position.y}set y(t){this.transform.position.y=t}/**
   * Current transform of the object based on world (parent) factors.
   * @readonly
   */get worldTransform(){return this.transform.worldTransform}/**
   * Current transform of the object based on local factors: position, scale, other stuff.
   * @readonly
   */get localTransform(){return this.transform.localTransform}/**
   * The coordinate of the object relative to the local coordinates of the parent.
   * @since 4.0.0
   */get position(){return this.transform.position}set position(t){this.transform.position.copyFrom(t)}/**
   * The scale factors of this object along the local coordinate axes.
   *
   * The default scale is (1, 1).
   * @since 4.0.0
   */get scale(){return this.transform.scale}set scale(t){this.transform.scale.copyFrom(t)}/**
   * The center of rotation, scaling, and skewing for this display object in its local space. The `position`
   * is the projection of `pivot` in the parent's local space.
   *
   * By default, the pivot is the origin (0, 0).
   * @since 4.0.0
   */get pivot(){return this.transform.pivot}set pivot(t){this.transform.pivot.copyFrom(t)}/**
   * The skew factor for the object in radians.
   * @since 4.0.0
   */get skew(){return this.transform.skew}set skew(t){this.transform.skew.copyFrom(t)}/**
   * The rotation of the object in radians.
   * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
   */get rotation(){return this.transform.rotation}set rotation(t){this.transform.rotation=t}/**
   * The angle of the object in degrees.
   * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
   */get angle(){return this.transform.rotation*rc}set angle(t){this.transform.rotation=t*rp}/**
   * The zIndex of the displayObject.
   *
   * If a container has the sortableChildren property set to true, children will be automatically
   * sorted by zIndex value; a higher value will mean it will be moved towards the end of the array,
   * and thus rendered on top of other display objects within the same container.
   * @see PIXI.Container#sortableChildren
   */get zIndex(){return this._zIndex}set zIndex(t){this._zIndex=t,this.parent&&(this.parent.sortDirty=!0)}/**
   * Indicates if the object is globally visible.
   * @readonly
   */get worldVisible(){let t=this;do{if(!t.visible)return!1;t=t.parent}while(t)return!0}/**
   * Sets a mask for the displayObject. A mask is an object that limits the visibility of an
   * object to the shape of the mask applied to it. In PixiJS a regular mask must be a
   * {@link PIXI.Graphics} or a {@link PIXI.Sprite} object. This allows for much faster masking in canvas as it
   * utilities shape clipping. Furthermore, a mask of an object must be in the subtree of its parent.
   * Otherwise, `getLocalBounds` may calculate incorrect bounds, which makes the container's width and height wrong.
   * To remove a mask, set this property to `null`.
   *
   * For sprite mask both alpha and red channel are used. Black mask is the same as transparent mask.
   * @example
   * import { Graphics, Sprite } from 'pixi.js';
   *
   * const graphics = new Graphics();
   * graphics.beginFill(0xFF3300);
   * graphics.drawRect(50, 250, 100, 100);
   * graphics.endFill();
   *
   * const sprite = new Sprite(texture);
   * sprite.mask = graphics;
   * @todo At the moment, CanvasRenderer doesn't support Sprite as mask.
   */get mask(){return this._mask}set mask(t){if(this._mask!==t){if(this._mask){let t=this._mask.isMaskData?this._mask.maskObject:this._mask;t&&(t._maskRefCount--,0===t._maskRefCount&&(t.renderable=!0,t.isMask=!1))}if(this._mask=t,this._mask){let t=this._mask.isMaskData?this._mask.maskObject:this._mask;t&&(0===t._maskRefCount&&(t.renderable=!1,t.isMask=!0),t._maskRefCount++)}}}}class sW extends sV{constructor(){super(...arguments),this.sortDirty=null}}sV.prototype.displayObjectUpdateTransform=sV.prototype.updateTransform;const sX=new rT;function s$(t,e){return t.zIndex===e.zIndex?t._lastSortedIndex-e._lastSortedIndex:t.zIndex-e.zIndex}const sY=class t extends sV{constructor(){super(),this.children=[],this.sortableChildren=t.defaultSortableChildren,this.sortDirty=!1}/**
   * Overridable method that can be used by Container subclasses whenever the children array is modified.
   * @param _length
   */onChildrenChange(t){}/**
   * Adds one or more children to the container.
   *
   * Multiple items can be added like so: `myContainer.addChild(thingOne, thingTwo, thingThree)`
   * @param {...PIXI.DisplayObject} children - The DisplayObject(s) to add to the container
   * @returns {PIXI.DisplayObject} - The first child that was added.
   */addChild(...t){if(t.length>1)for(let e=0;e<t.length;e++)this.addChild(t[e]);else{let e=t[0];e.parent&&e.parent.removeChild(e),e.parent=this,this.sortDirty=!0,e.transform._parentID=-1,this.children.push(e),this._boundsID++,this.onChildrenChange(this.children.length-1),this.emit("childAdded",e,this,this.children.length-1),e.emit("added",this)}return t[0]}/**
   * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown.
   * If the child is already in this container, it will be moved to the specified index.
   * @param {PIXI.DisplayObject} child - The child to add.
   * @param {number} index - The absolute index where the child will be positioned at the end of the operation.
   * @returns {PIXI.DisplayObject} The child that was added.
   */addChildAt(t,e){if(e<0||e>this.children.length)throw Error(`${t}addChildAt: The index ${e} supplied is out of bounds ${this.children.length}`);return t.parent&&t.parent.removeChild(t),t.parent=this,this.sortDirty=!0,t.transform._parentID=-1,this.children.splice(e,0,t),this._boundsID++,this.onChildrenChange(e),t.emit("added",this),this.emit("childAdded",t,this,e),t}/**
   * Swaps the position of 2 Display Objects within this container.
   * @param child - First display object to swap
   * @param child2 - Second display object to swap
   */swapChildren(t,e){if(t===e)return;let r=this.getChildIndex(t),i=this.getChildIndex(e);this.children[r]=e,this.children[i]=t,this.onChildrenChange(r<i?r:i)}/**
   * Returns the index position of a child DisplayObject instance
   * @param child - The DisplayObject instance to identify
   * @returns - The index position of the child display object to identify
   */getChildIndex(t){let e=this.children.indexOf(t);if(-1===e)throw Error("The supplied DisplayObject must be a child of the caller");return e}/**
   * Changes the position of an existing child in the display object container
   * @param child - The child DisplayObject instance for which you want to change the index number
   * @param index - The resulting index number for the child display object
   */setChildIndex(t,e){if(e<0||e>=this.children.length)throw Error(`The index ${e} supplied is out of bounds ${this.children.length}`);let r=this.getChildIndex(t);ta.removeItems(this.children,r,1),this.children.splice(e,0,t),this.onChildrenChange(e)}/**
   * Returns the child at the specified index
   * @param index - The index to get the child at
   * @returns - The child at the given index, if any.
   */getChildAt(t){if(t<0||t>=this.children.length)throw Error(`getChildAt: Index (${t}) does not exist.`);return this.children[t]}/**
   * Removes one or more children from the container.
   * @param {...PIXI.DisplayObject} children - The DisplayObject(s) to remove
   * @returns {PIXI.DisplayObject} The first child that was removed.
   */removeChild(...t){if(t.length>1)for(let e=0;e<t.length;e++)this.removeChild(t[e]);else{let e=t[0],r=this.children.indexOf(e);if(-1===r)return null;e.parent=null,e.transform._parentID=-1,ta.removeItems(this.children,r,1),this._boundsID++,this.onChildrenChange(r),e.emit("removed",this),this.emit("childRemoved",e,this,r)}return t[0]}/**
   * Removes a child from the specified index position.
   * @param index - The index to get the child from
   * @returns The child that was removed.
   */removeChildAt(t){let e=this.getChildAt(t);return e.parent=null,e.transform._parentID=-1,ta.removeItems(this.children,t,1),this._boundsID++,this.onChildrenChange(t),e.emit("removed",this),this.emit("childRemoved",e,this,t),e}/**
   * Removes all children from this container that are within the begin and end indexes.
   * @param beginIndex - The beginning position.
   * @param endIndex - The ending position. Default value is size of the container.
   * @returns - List of removed children
   */removeChildren(t=0,e=this.children.length){let r;let i=e-t;if(i>0&&i<=e){r=this.children.splice(t,i);for(let t=0;t<r.length;++t)r[t].parent=null,r[t].transform&&(r[t].transform._parentID=-1);this._boundsID++,this.onChildrenChange(t);for(let t=0;t<r.length;++t)r[t].emit("removed",this),this.emit("childRemoved",r[t],this,t);return r}if(0===i&&0===this.children.length)return[];throw RangeError("removeChildren: numeric values are outside the acceptable range.")}/** Sorts children by zIndex. Previous order is maintained for 2 children with the same zIndex. */sortChildren(){let t=!1;for(let e=0,r=this.children.length;e<r;++e){let r=this.children[e];r._lastSortedIndex=e,t||0===r.zIndex||(t=!0)}t&&this.children.length>1&&this.children.sort(s$),this.sortDirty=!1}/** Updates the transform on all children of this container for rendering. */updateTransform(){this.sortableChildren&&this.sortDirty&&this.sortChildren(),this._boundsID++,this.transform.updateTransform(this.parent.transform),this.worldAlpha=this.alpha*this.parent.worldAlpha;for(let t=0,e=this.children.length;t<e;++t){let e=this.children[t];e.visible&&e.updateTransform()}}/**
   * Recalculates the bounds of the container.
   *
   * This implementation will automatically fit the children's bounds into the calculation. Each child's bounds
   * is limited to its mask's bounds or filterArea, if any is applied.
   */calculateBounds(){this._bounds.clear(),this._calculateBounds();for(let t=0;t<this.children.length;t++){let e=this.children[t];if(!(!e.visible||!e.renderable)){if(e.calculateBounds(),e._mask){let t=e._mask.isMaskData?e._mask.maskObject:e._mask;t?(t.calculateBounds(),this._bounds.addBoundsMask(e._bounds,t._bounds)):this._bounds.addBounds(e._bounds)}else e.filterArea?this._bounds.addBoundsArea(e._bounds,e.filterArea):this._bounds.addBounds(e._bounds)}}this._bounds.updateID=this._boundsID}/**
   * Retrieves the local bounds of the displayObject as a rectangle object.
   *
   * Calling `getLocalBounds` may invalidate the `_bounds` of the whole subtree below. If using it inside a render()
   * call, it is advised to call `getBounds()` immediately after to recalculate the world bounds of the subtree.
   * @param rect - Optional rectangle to store the result of the bounds calculation.
   * @param skipChildrenUpdate - Setting to `true` will stop re-calculation of children transforms,
   *  it was default behaviour of pixi 4.0-5.2 and caused many problems to users.
   * @returns - The rectangular bounding area.
   */getLocalBounds(t,e=!1){let r=super.getLocalBounds(t);if(!e)for(let t=0,e=this.children.length;t<e;++t){let e=this.children[t];e.visible&&e.updateTransform()}return r}/**
   * Recalculates the content bounds of this object. This should be overriden to
   * calculate the bounds of this specific object (not including children).
   * @protected
   */_calculateBounds(){}/**
   * Renders this object and its children with culling.
   * @protected
   * @param {PIXI.Renderer} renderer - The renderer
   */_renderWithCulling(e){let r,i;let s=e.renderTexture.sourceFrame;if(!(s.width>0&&s.height>0))return;this.cullArea?(r=this.cullArea,i=this.worldTransform):this._render!==t.prototype._render&&(r=this.getBounds(!0));let n=e.projection.transform;if(n&&(i?(i=sX.copyFrom(i)).prepend(n):i=n),r&&s.intersects(r,i))this._render(e);else if(this.cullArea)return;for(let t=0,r=this.children.length;t<r;++t){let r=this.children[t],i=r.cullable;r.cullable=i||!this.cullArea,r.render(e),r.cullable=i}}/**
   * Renders the object using the WebGL renderer.
   *
   * The [_render]{@link PIXI.Container#_render} method is be overriden for rendering the contents of the
   * container itself. This `render` method will invoke it, and also invoke the `render` methods of all
   * children afterward.
   *
   * If `renderable` or `visible` is false or if `worldAlpha` is not positive or if `cullable` is true and
   * the bounds of this object are out of frame, this implementation will entirely skip rendering.
   * See {@link PIXI.DisplayObject} for choosing between `renderable` or `visible`. Generally,
   * setting alpha to zero is not recommended for purely skipping rendering.
   *
   * When your scene becomes large (especially when it is larger than can be viewed in a single screen), it is
   * advised to employ **culling** to automatically skip rendering objects outside of the current screen.
   * See [cullable]{@link PIXI.DisplayObject#cullable} and [cullArea]{@link PIXI.DisplayObject#cullArea}.
   * Other culling methods might be better suited for a large number static objects; see
   * [@pixi-essentials/cull]{@link https://www.npmjs.com/package/@pixi-essentials/cull} and
   * [pixi-cull]{@link https://www.npmjs.com/package/pixi-cull}.
   *
   * The [renderAdvanced]{@link PIXI.Container#renderAdvanced} method is internally used when when masking or
   * filtering is applied on a container. This does, however, break batching and can affect performance when
   * masking and filtering is applied extensively throughout the scene graph.
   * @param renderer - The renderer
   */render(t){if(!(!this.visible||this.worldAlpha<=0||!this.renderable)){if(this._mask||this.filters?.length)this.renderAdvanced(t);else if(this.cullable)this._renderWithCulling(t);else{this._render(t);for(let e=0,r=this.children.length;e<r;++e)this.children[e].render(t)}}}/**
   * Render the object using the WebGL renderer and advanced features.
   * @param renderer - The renderer
   */renderAdvanced(t){let e=this.filters,r=this._mask;if(e){this._enabledFilters||(this._enabledFilters=[]),this._enabledFilters.length=0;for(let t=0;t<e.length;t++)e[t].enabled&&this._enabledFilters.push(e[t])}let i=e&&this._enabledFilters?.length||r&&(!r.isMaskData||r.enabled&&(r.autoDetect||r.type!==B.NONE));if(i&&t.batch.flush(),e&&this._enabledFilters?.length&&t.filter.push(this,this._enabledFilters),r&&t.mask.push(this,this._mask),this.cullable)this._renderWithCulling(t);else{this._render(t);for(let e=0,r=this.children.length;e<r;++e)this.children[e].render(t)}i&&t.batch.flush(),r&&t.mask.pop(this),e&&this._enabledFilters?.length&&t.filter.pop()}/**
   * To be overridden by the subclasses.
   * @param _renderer - The renderer
   */_render(t){}/**
   * Removes all internal references and listeners as well as removes children from the display list.
   * Do not use a Container after calling `destroy`.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have their destroy
   *  method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the texture of the child sprite
   * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the base texture of the child sprite
   */destroy(t){super.destroy(),this.sortDirty=!1;let e="boolean"==typeof t?t:t?.children,r=this.removeChildren(0,this.children.length);if(e)for(let e=0;e<r.length;++e)r[e].destroy(t)}/** The width of the Container, setting this will actually modify the scale to achieve the value set. */get width(){return this.scale.x*this.getLocalBounds().width}set width(t){let e=this.getLocalBounds().width;0!==e?this.scale.x=t/e:this.scale.x=1,this._width=t}/** The height of the Container, setting this will actually modify the scale to achieve the value set. */get height(){return this.scale.y*this.getLocalBounds().height}set height(t){let e=this.getLocalBounds().height;0!==e?this.scale.y=t/e:this.scale.y=1,this._height=t}};sY.defaultSortableChildren=!1;let sq=sY;sq.prototype.containerUpdateTransform=sq.prototype.updateTransform,Object.defineProperties(G,{/**
   * Sets the default value for the container property 'sortableChildren'.
   * @static
   * @name SORTABLE_CHILDREN
   * @memberof PIXI.settings
   * @deprecated since 7.1.0
   * @type {boolean}
   * @see PIXI.Container.defaultSortableChildren
   */SORTABLE_CHILDREN:{get:()=>sq.defaultSortableChildren,set(t){ta.deprecation("7.1.0","settings.SORTABLE_CHILDREN is deprecated, use Container.defaultSortableChildren"),sq.defaultSortableChildren=t}}});var sK={};h(sK,"Sprite",()=>sJ);const sZ=new rm,sQ=new Uint16Array([0,1,2,0,2,3]);class sJ extends sq{/** @param texture - The texture for this sprite. */constructor(t){super(),this._anchor=new rP(this._onAnchorUpdate,this,t?t.defaultAnchor.x:0,t?t.defaultAnchor.y:0),this._texture=null,this._width=0,this._height=0,this._tintColor=new el(16777215),this._tintRGB=null,this.tint=16777215,this.blendMode=b.NORMAL,this._cachedTint=16777215,this.uvs=null,this.texture=t||iv.EMPTY,this.vertexData=new Float32Array(8),this.vertexTrimmedData=null,this._transformID=-1,this._textureID=-1,this._transformTrimmedID=-1,this._textureTrimmedID=-1,this.indices=sQ,this.pluginName="batch",this.isSprite=!0,this._roundPixels=G.ROUND_PIXELS}/** When the texture is updated, this event will fire to update the scale and frame. */_onTextureUpdate(){this._textureID=-1,this._textureTrimmedID=-1,this._cachedTint=16777215,this._width&&(this.scale.x=ta.sign(this.scale.x)*this._width/this._texture.orig.width),this._height&&(this.scale.y=ta.sign(this.scale.y)*this._height/this._texture.orig.height)}/** Called when the anchor position updates. */_onAnchorUpdate(){this._transformID=-1,this._transformTrimmedID=-1}/** Calculates worldTransform * vertices, store it in vertexData. */calculateVertices(){let t=this._texture;if(this._transformID===this.transform._worldID&&this._textureID===t._updateID)return;this._textureID!==t._updateID&&(this.uvs=this._texture._uvs.uvsFloat32),this._transformID=this.transform._worldID,this._textureID=t._updateID;let e=this.transform.worldTransform,r=e.a,i=e.b,s=e.c,n=e.d,a=e.tx,o=e.ty,h=this.vertexData,l=t.trim,u=t.orig,d=this._anchor,c=0,p=0,f=0,m=0;if(l?(c=(p=l.x-d._x*u.width)+l.width,f=(m=l.y-d._y*u.height)+l.height):(c=(p=-d._x*u.width)+u.width,f=(m=-d._y*u.height)+u.height),h[0]=r*p+s*m+a,h[1]=n*m+i*p+o,h[2]=r*c+s*m+a,h[3]=n*m+i*c+o,h[4]=r*c+s*f+a,h[5]=n*f+i*c+o,h[6]=r*p+s*f+a,h[7]=n*f+i*p+o,this._roundPixels){let t=G.RESOLUTION;for(let e=0;e<h.length;++e)h[e]=Math.round(h[e]*t)/t}}/**
   * Calculates worldTransform * vertices for a non texture with a trim. store it in vertexTrimmedData.
   *
   * This is used to ensure that the true width and height of a trimmed texture is respected.
   */calculateTrimmedVertices(){if(this.vertexTrimmedData){if(this._transformTrimmedID===this.transform._worldID&&this._textureTrimmedID===this._texture._updateID)return}else this.vertexTrimmedData=new Float32Array(8);this._transformTrimmedID=this.transform._worldID,this._textureTrimmedID=this._texture._updateID;let t=this._texture,e=this.vertexTrimmedData,r=t.orig,i=this._anchor,s=this.transform.worldTransform,n=s.a,a=s.b,o=s.c,h=s.d,l=s.tx,u=s.ty,d=-i._x*r.width,c=d+r.width,p=-i._y*r.height,f=p+r.height;if(e[0]=n*d+o*p+l,e[1]=h*p+a*d+u,e[2]=n*c+o*p+l,e[3]=h*p+a*c+u,e[4]=n*c+o*f+l,e[5]=h*f+a*c+u,e[6]=n*d+o*f+l,e[7]=h*f+a*d+u,this._roundPixels){let t=G.RESOLUTION;for(let r=0;r<e.length;++r)e[r]=Math.round(e[r]*t)/t}}/**
   *
   * Renders the object using the WebGL renderer
   * @param renderer - The webgl renderer to use.
   */_render(t){this.calculateVertices(),t.batch.setObjectRenderer(t.plugins[this.pluginName]),t.plugins[this.pluginName].render(this)}/** Updates the bounds of the sprite. */_calculateBounds(){let t=this._texture.trim,e=this._texture.orig;t&&(t.width!==e.width||t.height!==e.height)?(this.calculateTrimmedVertices(),this._bounds.addQuad(this.vertexTrimmedData)):(this.calculateVertices(),this._bounds.addQuad(this.vertexData))}/**
   * Gets the local bounds of the sprite object.
   * @param rect - Optional output rectangle.
   * @returns The bounds.
   */getLocalBounds(t){return 0===this.children.length?(this._localBounds||(this._localBounds=new sz),this._localBounds.minX=-(this._texture.orig.width*this._anchor._x),this._localBounds.minY=-(this._texture.orig.height*this._anchor._y),this._localBounds.maxX=this._texture.orig.width*(1-this._anchor._x),this._localBounds.maxY=this._texture.orig.height*(1-this._anchor._y),t||(this._localBoundsRect||(this._localBoundsRect=new r_),t=this._localBoundsRect),this._localBounds.getRectangle(t)):super.getLocalBounds.call(this,t)}/**
   * Tests if a point is inside this sprite
   * @param point - the point to test
   * @returns The result of the test
   */containsPoint(t){this.worldTransform.applyInverse(t,sZ);let e=this._texture.orig.width,r=this._texture.orig.height,i=-e*this.anchor.x,s=0;return sZ.x>=i&&sZ.x<i+e&&(s=-r*this.anchor.y,sZ.y>=s&&sZ.y<s+r)}/**
   * Destroys this sprite and optionally its texture and children.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param [options.children=false] - if set to true, all the children will have their destroy
   *      method called as well. 'options' will be passed on to those calls.
   * @param [options.texture=false] - Should it destroy the current texture of the sprite as well
   * @param [options.baseTexture=false] - Should it destroy the base texture of the sprite as well
   */destroy(t){if(super.destroy(t),this._texture.off("update",this._onTextureUpdate,this),this._anchor=null,"boolean"==typeof t?t:t?.texture){let e="boolean"==typeof t?t:t?.baseTexture;this._texture.destroy(!!e)}this._texture=null}// some helper functions..
/**
   * Helper function that creates a new sprite based on the source you provide.
   * The source can be - frame id, image url, video url, canvas element, video element, base texture
   * @param {string|PIXI.Texture|HTMLImageElement|HTMLVideoElement|ImageBitmap|PIXI.ICanvas} source
   *     - Source to create texture from
   * @param {object} [options] - See {@link PIXI.BaseTexture}'s constructor for options.
   * @returns The newly created sprite
   */static from(t,e){let r=t instanceof iv?t:iv.from(t,e);return new sJ(r)}/**
   * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
   *
   * Advantages can include sharper image quality (like text) and faster rendering on canvas.
   * The main disadvantage is movement of objects may appear less smooth.
   *
   * To set the global default, change {@link PIXI.settings.ROUND_PIXELS}.
   * @default false
   */set roundPixels(t){this._roundPixels!==t&&(this._transformID=-1,this._transformTrimmedID=-1),this._roundPixels=t}get roundPixels(){return this._roundPixels}/** The width of the sprite, setting this will actually modify the scale to achieve the value set. */get width(){return Math.abs(this.scale.x)*this._texture.orig.width}set width(t){let e=ta.sign(this.scale.x)||1;this.scale.x=e*t/this._texture.orig.width,this._width=t}/** The height of the sprite, setting this will actually modify the scale to achieve the value set. */get height(){return Math.abs(this.scale.y)*this._texture.orig.height}set height(t){let e=ta.sign(this.scale.y)||1;this.scale.y=e*t/this._texture.orig.height,this._height=t}/**
   * The anchor sets the origin point of the sprite. The default value is taken from the {@link PIXI.Texture|Texture}
   * and passed to the constructor.
   *
   * The default is `(0,0)`, this means the sprite's origin is the top left.
   *
   * Setting the anchor to `(0.5,0.5)` means the sprite's origin is centered.
   *
   * Setting the anchor to `(1,1)` would mean the sprite's origin point will be the bottom right corner.
   *
   * If you pass only single parameter, it will set both x and y to the same value as shown in the example below.
   * @example
   * import { Sprite } from 'pixi.js';
   *
   * const sprite = new Sprite(Texture.WHITE);
   * sprite.anchor.set(0.5); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
   */get anchor(){return this._anchor}set anchor(t){this._anchor.copyFrom(t)}/**
   * The tint applied to the sprite. This is a hex value.
   *
   * A value of 0xFFFFFF will remove any tint effect.
   * @default 0xFFFFFF
   */get tint(){return this._tintColor.value}set tint(t){this._tintColor.setValue(t),this._tintRGB=this._tintColor.toLittleEndianNumber()}/**
   * Get the tint as a RGB integer.
   * @ignore
   */get tintValue(){return this._tintColor.toNumber()}/** The texture that the sprite is using. */get texture(){return this._texture}set texture(t){this._texture!==t&&(this._texture&&this._texture.off("update",this._onTextureUpdate,this),this._texture=t||iv.EMPTY,this._cachedTint=16777215,this._textureID=-1,this._textureTrimmedID=-1,t&&(t.baseTexture.valid?this._onTextureUpdate():t.once("update",this._onTextureUpdate,this)))}}const s0=new rT;sV.prototype._cacheAsBitmap=!1,sV.prototype._cacheData=null,sV.prototype._cacheAsBitmapResolution=null,sV.prototype._cacheAsBitmapMultisample=null;class s1{constructor(){this.textureCacheId=null,this.originalRender=null,this.originalRenderCanvas=null,this.originalCalculateBounds=null,this.originalGetLocalBounds=null,this.originalUpdateTransform=null,this.originalDestroy=null,this.originalMask=null,this.originalFilterArea=null,this.originalContainsPoint=null,this.sprite=null}}Object.defineProperties(sV.prototype,{/**
   * The resolution to use for cacheAsBitmap. By default this will use the renderer's resolution
   * but can be overriden for performance. Lower values will reduce memory usage at the expense
   * of render quality. A falsey value of `null` or `0` will default to the renderer's resolution.
   * If `cacheAsBitmap` is set to `true`, this will re-render with the new resolution.
   * @member {number|null} cacheAsBitmapResolution
   * @memberof PIXI.DisplayObject#
   * @default null
   */cacheAsBitmapResolution:{get(){return this._cacheAsBitmapResolution},set(t){t!==this._cacheAsBitmapResolution&&(this._cacheAsBitmapResolution=t,this.cacheAsBitmap&&(this.cacheAsBitmap=!1,this.cacheAsBitmap=!0))}},/**
   * The number of samples to use for cacheAsBitmap. If set to `null`, the renderer's
   * sample count is used.
   * If `cacheAsBitmap` is set to `true`, this will re-render with the new number of samples.
   * @member {number|null} cacheAsBitmapMultisample
   * @memberof PIXI.DisplayObject#
   * @default null
   */cacheAsBitmapMultisample:{get(){return this._cacheAsBitmapMultisample},set(t){t!==this._cacheAsBitmapMultisample&&(this._cacheAsBitmapMultisample=t,this.cacheAsBitmap&&(this.cacheAsBitmap=!1,this.cacheAsBitmap=!0))}},/**
   * Set this to true if you want this display object to be cached as a bitmap.
   * This basically takes a snapshot of the display object as it is at that moment. It can
   * provide a performance benefit for complex static displayObjects.
   * To remove simply set this property to `false`
   *
   * IMPORTANT GOTCHA - Make sure that all your textures are preloaded BEFORE setting this property to true
   * as it will take a snapshot of what is currently there. If the textures have not loaded then they will not appear.
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   */cacheAsBitmap:{get(){return this._cacheAsBitmap},set(t){let e;this._cacheAsBitmap!==t&&(this._cacheAsBitmap=t,t?(this._cacheData||(this._cacheData=new s1),(e=this._cacheData).originalRender=this.render,e.originalRenderCanvas=this.renderCanvas,e.originalUpdateTransform=this.updateTransform,e.originalCalculateBounds=this.calculateBounds,e.originalGetLocalBounds=this.getLocalBounds,e.originalDestroy=this.destroy,e.originalContainsPoint=this.containsPoint,e.originalMask=this._mask,e.originalFilterArea=this.filterArea,this.render=this._renderCached,this.renderCanvas=this._renderCachedCanvas,this.destroy=this._cacheAsBitmapDestroy):((e=this._cacheData).sprite&&this._destroyCachedDisplayObject(),this.render=e.originalRender,this.renderCanvas=e.originalRenderCanvas,this.calculateBounds=e.originalCalculateBounds,this.getLocalBounds=e.originalGetLocalBounds,this.destroy=e.originalDestroy,this.updateTransform=e.originalUpdateTransform,this.containsPoint=e.originalContainsPoint,this._mask=e.originalMask,this.filterArea=e.originalFilterArea))}}}),sV.prototype._renderCached=function(t){this.visible&&!(this.worldAlpha<=0)&&this.renderable&&(this._initCachedDisplayObject(t),this._cacheData.sprite.transform._worldID=this.transform._worldID,this._cacheData.sprite.worldAlpha=this.worldAlpha,this._cacheData.sprite._render(t))},sV.prototype._initCachedDisplayObject=function(t){if(this._cacheData?.sprite)return;let e=this.alpha;this.alpha=1,t.batch.flush();let r=this.getLocalBounds(new r_,!0);if(this.filters?.length){let t=this.filters[0].padding;r.pad(t)}let i=this.cacheAsBitmapResolution||t.resolution;r.ceil(i),r.width=Math.max(r.width,1/i),r.height=Math.max(r.height,1/i);let s=t.renderTexture.current,n=t.renderTexture.sourceFrame.clone(),a=t.renderTexture.destinationFrame.clone(),o=t.projection.transform,h=ix.create({width:r.width,height:r.height,resolution:i,multisample:this.cacheAsBitmapMultisample??t.multisample}),l=`cacheAsBitmap_${ta.uid()}`;this._cacheData.textureCacheId=l,e9.addToCache(h.baseTexture,l),iv.addToCache(h,l);let u=this.transform.localTransform.copyTo(s0).invert().translate(-r.x,-r.y);this.render=this._cacheData.originalRender,t.render(this,{renderTexture:h,clear:!0,transform:u,skipUpdateTransform:!1}),t.framebuffer.blit(),t.projection.transform=o,t.renderTexture.bind(s,n,a),this.render=this._renderCached,this.updateTransform=this.displayObjectUpdateTransform,this.calculateBounds=this._calculateCachedBounds,this.getLocalBounds=this._getCachedLocalBounds,this._mask=null,this.filterArea=null,this.alpha=e;let d=new sJ(h);d.transform.worldTransform=this.transform.worldTransform,d.anchor.x=-(r.x/r.width),d.anchor.y=-(r.y/r.height),d.alpha=e,d._bounds=this._bounds,this._cacheData.sprite=d,this.transform._parentID=-1,this.parent?this.updateTransform():(this.enableTempParent(),this.updateTransform(),this.disableTempParent(null)),this.containsPoint=d.containsPoint.bind(d)},sV.prototype._renderCachedCanvas=function(t){this.visible&&!(this.worldAlpha<=0)&&this.renderable&&(this._initCachedDisplayObjectCanvas(t),this._cacheData.sprite.worldAlpha=this.worldAlpha,this._cacheData.sprite._renderCanvas(t))},sV.prototype._initCachedDisplayObjectCanvas=function(t){if(this._cacheData?.sprite)return;let e=this.getLocalBounds(new r_,!0),r=this.alpha;this.alpha=1;let i=t.canvasContext.activeContext,s=t._projTransform,n=this.cacheAsBitmapResolution||t.resolution;e.ceil(n),e.width=Math.max(e.width,1/n),e.height=Math.max(e.height,1/n);let a=ix.create({width:e.width,height:e.height,resolution:n}),o=`cacheAsBitmap_${ta.uid()}`;this._cacheData.textureCacheId=o,e9.addToCache(a.baseTexture,o),iv.addToCache(a,o),this.transform.localTransform.copyTo(s0),s0.invert(),s0.tx-=e.x,s0.ty-=e.y,this.renderCanvas=this._cacheData.originalRenderCanvas,t.render(this,{renderTexture:a,clear:!0,transform:s0,skipUpdateTransform:!1}),t.canvasContext.activeContext=i,t._projTransform=s,this.renderCanvas=this._renderCachedCanvas,this.updateTransform=this.displayObjectUpdateTransform,this.calculateBounds=this._calculateCachedBounds,this.getLocalBounds=this._getCachedLocalBounds,this._mask=null,this.filterArea=null,this.alpha=r;let h=new sJ(a);h.transform.worldTransform=this.transform.worldTransform,h.anchor.x=-(e.x/e.width),h.anchor.y=-(e.y/e.height),h.alpha=r,h._bounds=this._bounds,this._cacheData.sprite=h,this.transform._parentID=-1,this.parent?this.updateTransform():(this.parent=t._tempDisplayObjectParent,this.updateTransform(),this.parent=null),this.containsPoint=h.containsPoint.bind(h)},sV.prototype._calculateCachedBounds=function(){this._bounds.clear(),this._cacheData.sprite.transform._worldID=this.transform._worldID,this._cacheData.sprite._calculateBounds(),this._bounds.updateID=this._boundsID},sV.prototype._getCachedLocalBounds=function(){return this._cacheData.sprite.getLocalBounds(null)},sV.prototype._destroyCachedDisplayObject=function(){this._cacheData.sprite._texture.destroy(!0),this._cacheData.sprite=null,e9.removeFromCache(this._cacheData.textureCacheId),iv.removeFromCache(this._cacheData.textureCacheId),this._cacheData.textureCacheId=null},sV.prototype._cacheAsBitmapDestroy=function(t){this.cacheAsBitmap=!1,this.destroy(t)},sV.prototype.name=null,sq.prototype.getChildByName=function(t,e){for(let e=0,r=this.children.length;e<r;e++)if(this.children[e].name===t)return this.children[e];if(e)for(let e=0,r=this.children.length;e<r;e++){let r=this.children[e];if(!r.getChildByName)continue;let i=r.getChildByName(t,!0);if(i)return i}return null},sV.prototype.getGlobalPosition=function(t=new rm,e=!1){return this.parent?this.parent.toGlobal(this.position,t,e):(t.x=this.position.x,t.y=this.position.y),t};var s2={};h(s2,"AlphaFilter",()=>s4);var s3=`varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float uAlpha;

void main(void)
{
   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;
}
`;class s4 extends ia{/**
   * @param alpha - Amount of alpha from 0 to 1, where 0 is transparent
   */constructor(t=1){super(sT,s3,{uAlpha:1}),this.alpha=t}/**
   * Coefficient for alpha multiplication
   * @default 1
   */get alpha(){return this.uniforms.uAlpha}set alpha(t){this.uniforms.uAlpha=t}}var s5={};h(s5,"BlurFilter",()=>nt),h(s5,"BlurFilterPass",()=>s9);const s6={5:[.153388,.221461,.250301],7:[.071303,.131514,.189879,.214607],9:[.028532,.067234,.124009,.179044,.20236],11:[.0093,.028002,.065984,.121703,.175713,.198596],13:[.002406,.009255,.027867,.065666,.121117,.174868,.197641],15:[489e-6,.002403,.009246,.02784,.065602,.120999,.174697,.197448]},s8=["varying vec2 vBlurTexCoords[%size%];","uniform sampler2D uSampler;","void main(void)","{","    gl_FragColor = vec4(0.0);","    %blur%","}"].join(`
`),s7=`
    attribute vec2 aVertexPosition;

    uniform mat3 projectionMatrix;

    uniform float strength;

    varying vec2 vBlurTexCoords[%size%];

    uniform vec4 inputSize;
    uniform vec4 outputFrame;

    vec4 filterVertexPosition( void )
    {
        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
    }

    vec2 filterTextureCoord( void )
    {
        return aVertexPosition * (outputFrame.zw * inputSize.zw);
    }

    void main(void)
    {
        gl_Position = filterVertexPosition();

        vec2 textureCoord = filterTextureCoord();
        %blur%
    }`;class s9 extends ia{/**
   * @param horizontal - Do pass along the x-axis (`true`) or y-axis (`false`).
   * @param strength - The strength of the blur filter.
   * @param quality - The quality of the blur filter.
   * @param {number|null} [resolution=PIXI.Filter.defaultResolution] - The resolution of the blur filter.
   * @param kernelSize - The kernelSize of the blur filter.Options: 5, 7, 9, 11, 13, 15.
   */constructor(t,e=8,r=4,i=ia.defaultResolution,s=5){let n=function(t,e){let r=Math.ceil(t/2),i=s7,s="",n;n=e?"vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);":"vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);";for(let e=0;e<t;e++){let t=n.replace("%index%",e.toString());s+=(t=t.replace("%sampleIndex%",`${e-(r-1)}.0`))+`
`}return(i=i.replace("%blur%",s)).replace("%size%",t.toString())}(s,t),a=function(t){let e;let r=s6[t],i=r.length,s=s8,n="";for(let s=0;s<t;s++){let a="gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;".replace("%index%",s.toString());e=s,s>=i&&(e=t-s-1),n+=(a=a.replace("%value%",r[e].toString()))+`
`}return(s=s.replace("%blur%",n)).replace("%size%",t.toString())}(s);super(n,a),this.horizontal=t,this.resolution=i,this._quality=0,this.quality=r,this.blur=e}/**
   * Applies the filter.
   * @param filterManager - The manager.
   * @param input - The input target.
   * @param output - The output target.
   * @param clearMode - How to clear
   */apply(t,e,r,i){if(r?this.horizontal?this.uniforms.strength=1/r.width*(r.width/e.width):this.uniforms.strength=1/r.height*(r.height/e.height):this.horizontal?this.uniforms.strength=1/t.renderer.width*(t.renderer.width/e.width):this.uniforms.strength=1/t.renderer.height*(t.renderer.height/e.height),this.uniforms.strength*=this.strength,this.uniforms.strength/=this.passes,1===this.passes)t.applyFilter(this,e,r,i);else{let s=t.getFilterTexture(),n=t.renderer,a=e,o=s;this.state.blend=!1,t.applyFilter(this,a,o,P.CLEAR);for(let e=1;e<this.passes-1;e++){t.bindAndClear(a,P.BLIT),this.uniforms.uSampler=o;let e=o;o=a,a=e,n.shader.bind(this),n.geometry.draw(5)}this.state.blend=!0,t.applyFilter(this,o,r,i),t.returnFilterTexture(s)}}/**
   * Sets the strength of both the blur.
   * @default 16
   */get blur(){return this.strength}set blur(t){this.padding=1+2*Math.abs(t),this.strength=t}/**
   * Sets the quality of the blur by modifying the number of passes. More passes means higher
   * quality bluring but the lower the performance.
   * @default 4
   */get quality(){return this._quality}set quality(t){this._quality=t,this.passes=t}}class nt extends ia{/**
   * @param strength - The strength of the blur filter.
   * @param quality - The quality of the blur filter.
   * @param {number|null} [resolution=PIXI.Filter.defaultResolution] - The resolution of the blur filter.
   * @param kernelSize - The kernelSize of the blur filter.Options: 5, 7, 9, 11, 13, 15.
   */constructor(t=8,e=4,r=ia.defaultResolution,i=5){super(),this._repeatEdgePixels=!1,this.blurXFilter=new s9(!0,t,e,r,i),this.blurYFilter=new s9(!1,t,e,r,i),this.resolution=r,this.quality=e,this.blur=t,this.repeatEdgePixels=!1}/**
   * Applies the filter.
   * @param filterManager - The manager.
   * @param input - The input target.
   * @param output - The output target.
   * @param clearMode - How to clear
   */apply(t,e,r,i){let s=Math.abs(this.blurXFilter.strength),n=Math.abs(this.blurYFilter.strength);if(s&&n){let s=t.getFilterTexture();this.blurXFilter.apply(t,e,s,P.CLEAR),this.blurYFilter.apply(t,s,r,i),t.returnFilterTexture(s)}else n?this.blurYFilter.apply(t,e,r,i):this.blurXFilter.apply(t,e,r,i)}updatePadding(){this._repeatEdgePixels?this.padding=0:this.padding=2*Math.max(Math.abs(this.blurXFilter.strength),Math.abs(this.blurYFilter.strength))}/**
   * Sets the strength of both the blurX and blurY properties simultaneously
   * @default 2
   */get blur(){return this.blurXFilter.blur}set blur(t){this.blurXFilter.blur=this.blurYFilter.blur=t,this.updatePadding()}/**
   * Sets the number of passes for blur. More passes means higher quality bluring.
   * @default 1
   */get quality(){return this.blurXFilter.quality}set quality(t){this.blurXFilter.quality=this.blurYFilter.quality=t}/**
   * Sets the strength of the blurX property
   * @default 2
   */get blurX(){return this.blurXFilter.blur}set blurX(t){this.blurXFilter.blur=t,this.updatePadding()}/**
   * Sets the strength of the blurY property
   * @default 2
   */get blurY(){return this.blurYFilter.blur}set blurY(t){this.blurYFilter.blur=t,this.updatePadding()}/**
   * Sets the blendmode of the filter
   * @default PIXI.BLEND_MODES.NORMAL
   */get blendMode(){return this.blurYFilter.blendMode}set blendMode(t){this.blurYFilter.blendMode=t}/**
   * If set to true the edge of the target will be clamped
   * @default false
   */get repeatEdgePixels(){return this._repeatEdgePixels}set repeatEdgePixels(t){this._repeatEdgePixels=t,this.updatePadding()}}var ne={};h(ne,"ColorMatrixFilter",()=>ni);var nr=`varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float m[20];
uniform float uAlpha;

void main(void)
{
    vec4 c = texture2D(uSampler, vTextureCoord);

    if (uAlpha == 0.0) {
        gl_FragColor = c;
        return;
    }

    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (c.a > 0.0) {
      c.rgb /= c.a;
    }

    vec4 result;

    result.r = (m[0] * c.r);
        result.r += (m[1] * c.g);
        result.r += (m[2] * c.b);
        result.r += (m[3] * c.a);
        result.r += m[4];

    result.g = (m[5] * c.r);
        result.g += (m[6] * c.g);
        result.g += (m[7] * c.b);
        result.g += (m[8] * c.a);
        result.g += m[9];

    result.b = (m[10] * c.r);
       result.b += (m[11] * c.g);
       result.b += (m[12] * c.b);
       result.b += (m[13] * c.a);
       result.b += m[14];

    result.a = (m[15] * c.r);
       result.a += (m[16] * c.g);
       result.a += (m[17] * c.b);
       result.a += (m[18] * c.a);
       result.a += m[19];

    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);

    // Premultiply alpha again.
    rgb *= result.a;

    gl_FragColor = vec4(rgb, result.a);
}
`;class ni extends ia{constructor(){let t={m:new Float32Array([1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0]),uAlpha:1};super(sE,nr,t),this.alpha=1}/**
   * Transforms current matrix and set the new one
   * @param {number[]} matrix - 5x4 matrix
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */_loadMatrix(t,e=!1){let r=t;e&&(this._multiply(r,this.uniforms.m,t),r=this._colorMatrix(r)),this.uniforms.m=r}/**
   * Multiplies two mat5's
   * @private
   * @param out - 5x4 matrix the receiving matrix
   * @param a - 5x4 matrix the first operand
   * @param b - 5x4 matrix the second operand
   * @returns {number[]} 5x4 matrix
   */_multiply(t,e,r){return t[0]=e[0]*r[0]+e[1]*r[5]+e[2]*r[10]+e[3]*r[15],t[1]=e[0]*r[1]+e[1]*r[6]+e[2]*r[11]+e[3]*r[16],t[2]=e[0]*r[2]+e[1]*r[7]+e[2]*r[12]+e[3]*r[17],t[3]=e[0]*r[3]+e[1]*r[8]+e[2]*r[13]+e[3]*r[18],t[4]=e[0]*r[4]+e[1]*r[9]+e[2]*r[14]+e[3]*r[19]+e[4],t[5]=e[5]*r[0]+e[6]*r[5]+e[7]*r[10]+e[8]*r[15],t[6]=e[5]*r[1]+e[6]*r[6]+e[7]*r[11]+e[8]*r[16],t[7]=e[5]*r[2]+e[6]*r[7]+e[7]*r[12]+e[8]*r[17],t[8]=e[5]*r[3]+e[6]*r[8]+e[7]*r[13]+e[8]*r[18],t[9]=e[5]*r[4]+e[6]*r[9]+e[7]*r[14]+e[8]*r[19]+e[9],t[10]=e[10]*r[0]+e[11]*r[5]+e[12]*r[10]+e[13]*r[15],t[11]=e[10]*r[1]+e[11]*r[6]+e[12]*r[11]+e[13]*r[16],t[12]=e[10]*r[2]+e[11]*r[7]+e[12]*r[12]+e[13]*r[17],t[13]=e[10]*r[3]+e[11]*r[8]+e[12]*r[13]+e[13]*r[18],t[14]=e[10]*r[4]+e[11]*r[9]+e[12]*r[14]+e[13]*r[19]+e[14],t[15]=e[15]*r[0]+e[16]*r[5]+e[17]*r[10]+e[18]*r[15],t[16]=e[15]*r[1]+e[16]*r[6]+e[17]*r[11]+e[18]*r[16],t[17]=e[15]*r[2]+e[16]*r[7]+e[17]*r[12]+e[18]*r[17],t[18]=e[15]*r[3]+e[16]*r[8]+e[17]*r[13]+e[18]*r[18],t[19]=e[15]*r[4]+e[16]*r[9]+e[17]*r[14]+e[18]*r[19]+e[19],t}/**
   * Create a Float32 Array and normalize the offset component to 0-1
   * @param {number[]} matrix - 5x4 matrix
   * @returns {number[]} 5x4 matrix with all values between 0-1
   */_colorMatrix(t){let e=new Float32Array(t);return e[4]/=255,e[9]/=255,e[14]/=255,e[19]/=255,e}/**
   * Adjusts brightness
   * @param b - value of the brigthness (0-1, where 0 is black)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */brightness(t,e){this._loadMatrix([t,0,0,0,0,0,t,0,0,0,0,0,t,0,0,0,0,0,1,0],e)}/**
   * Sets each channel on the diagonal of the color matrix.
   * This can be used to achieve a tinting effect on Containers similar to the tint field of some
   * display objects like Sprite, Text, Graphics, and Mesh.
   * @param color - Color of the tint. This is a hex value.
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */tint(t,e){let[r,i,s]=el.shared.setValue(t).toArray();this._loadMatrix([r,0,0,0,0,0,i,0,0,0,0,0,s,0,0,0,0,0,1,0],e)}/**
   * Set the matrices in grey scales
   * @param scale - value of the grey (0-1, where 0 is black)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */greyscale(t,e){this._loadMatrix([t,t,t,0,0,t,t,t,0,0,t,t,t,0,0,0,0,0,1,0],e)}/**
   * Set the black and white matrice.
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */blackAndWhite(t){this._loadMatrix([.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0],t)}/**
   * Set the hue property of the color
   * @param rotation - in degrees
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */hue(t,e){t=(t||0)/180*Math.PI;let r=Math.cos(t),i=Math.sin(t),s=1/3,n=(0,Math.sqrt)(s);this._loadMatrix([r+(1-r)*s,s*(1-r)-n*i,s*(1-r)+n*i,0,0,s*(1-r)+n*i,r+s*(1-r),s*(1-r)-n*i,0,0,s*(1-r)-n*i,s*(1-r)+n*i,r+s*(1-r),0,0,0,0,0,1,0],e)}/**
   * Set the contrast matrix, increase the separation between dark and bright
   * Increase contrast : shadows darker and highlights brighter
   * Decrease contrast : bring the shadows up and the highlights down
   * @param amount - value of the contrast (0-1)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */contrast(t,e){let r=(t||0)+1,i=-.5*(r-1);this._loadMatrix([r,0,0,0,i,0,r,0,0,i,0,0,r,0,i,0,0,0,1,0],e)}/**
   * Set the saturation matrix, increase the separation between colors
   * Increase saturation : increase contrast, brightness, and sharpness
   * @param amount - The saturation amount (0-1)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */saturate(t=0,e){let r=2*t/3+1,i=-((r-1)*.5);this._loadMatrix([r,i,i,0,0,i,r,i,0,0,i,i,r,0,0,0,0,0,1,0],e)}/** Desaturate image (remove color) Call the saturate function */desaturate(){this.saturate(-1)}/**
   * Negative image (inverse of classic rgb matrix)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */negative(t){this._loadMatrix([-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0],t)}/**
   * Sepia image
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */sepia(t){this._loadMatrix([.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0],t)}/**
   * Color motion picture process invented in 1916 (thanks Dominic Szablewski)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */technicolor(t){this._loadMatrix([1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0],t)}/**
   * Polaroid filter
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */polaroid(t){this._loadMatrix([1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0],t)}/**
   * Filter who transforms : Red -> Blue and Blue -> Red
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */toBGR(t){this._loadMatrix([0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0],t)}/**
   * Color reversal film introduced by Eastman Kodak in 1935. (thanks Dominic Szablewski)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */kodachrome(t){this._loadMatrix([1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0],t)}/**
   * Brown delicious browni filter (thanks Dominic Szablewski)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */browni(t){this._loadMatrix([.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0],t)}/**
   * Vintage filter (thanks Dominic Szablewski)
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */vintage(t){this._loadMatrix([.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0],t)}/**
   * We don't know exactly what it does, kind of gradient map, but funny to play with!
   * @param desaturation - Tone values.
   * @param toned - Tone values.
   * @param lightColor - Tone values, example: `0xFFE580`
   * @param darkColor - Tone values, example: `0xFFE580`
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */colorTone(t,e,r,i,s){t=t||.2,e=e||.15,r=r||16770432,i=i||3375104;let n=el.shared,[a,o,h]=n.setValue(r).toArray(),[l,u,d]=n.setValue(i).toArray(),c=[.3,.59,.11,0,0,a,o,h,t,0,l,u,d,e,0,a-l,o-u,h-d,0,0];this._loadMatrix(c,s)}/**
   * Night effect
   * @param intensity - The intensity of the night effect.
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */night(t,e){t=t||.1;let r=[-2*t,-t,0,0,0,-t,0,t,0,0,0,t,2*t,0,0,0,0,0,1,0];this._loadMatrix(r,e)}/**
   * Predator effect
   *
   * Erase the current matrix by setting a new indepent one
   * @param amount - how much the predator feels his future victim
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */predator(t,e){this._loadMatrix([// row 1
11.224130630493164*t,-4.794486999511719*t,-2.8746118545532227*t,0*t,.40342438220977783*t,// row 2
-3.6330697536468506*t,9.193157196044922*t,-2.951810836791992*t,0*t,-1.316135048866272*t,// row 3
-3.2184197902679443*t,-4.2375030517578125*t,7.476448059082031*t,0*t,.8044459223747253*t,// row 4
0,0,0,1,0],e)}/**
   * LSD effect
   *
   * Multiply the current matrix
   * @param multiply - if true, current matrix and matrix are multiplied. If false,
   *  just set the current matrix with @param matrix
   */lsd(t){this._loadMatrix([2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0],t)}/** Erase the current matrix by setting the default one. */reset(){this._loadMatrix([1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],!1)}/**
   * The matrix of the color matrix filter
   * @member {number[]}
   * @default [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
   */get matrix(){return this.uniforms.m}set matrix(t){this.uniforms.m=t}/**
   * The opacity value to use when mixing the original and resultant colors.
   *
   * When the value is 0, the original color is used without modification.
   * When the value is 1, the result color is used.
   * When in the range (0, 1) the color is interpolated between the original and result by this amount.
   * @default 1
   */get alpha(){return this.uniforms.uAlpha}set alpha(t){this.uniforms.uAlpha=t}}ni.prototype.grayscale=ni.prototype.greyscale;var ns={};h(ns,"DisplacementFilter",()=>no);var nn=`varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform vec2 scale;
uniform mat2 rotation;
uniform sampler2D uSampler;
uniform sampler2D mapSampler;

uniform highp vec4 inputSize;
uniform vec4 inputClamp;

void main(void)
{
  vec4 map =  texture2D(mapSampler, vFilterCoord);

  map -= 0.5;
  map.xy = scale * inputSize.zw * (rotation * map.xy);

  gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), inputClamp.xy, inputClamp.zw));
}
`,na=`attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;
uniform mat3 filterMatrix;

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
	gl_Position = filterVertexPosition();
	vTextureCoord = filterTextureCoord();
	vFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;
}
`;class no extends ia{/**
   * @param {PIXI.Sprite} sprite - The sprite used for the displacement map. (make sure its added to the scene!)
   * @param scale - The scale of the displacement
   */constructor(t,e){let r=new rT;t.renderable=!1,super(na,nn,{mapSampler:t._texture,filterMatrix:r,scale:{x:1,y:1},rotation:new Float32Array([1,0,0,1])}),this.maskSprite=t,this.maskMatrix=r,null==e&&(e=20),this.scale=new rm(e,e)}/**
   * Applies the filter.
   * @param filterManager - The manager.
   * @param input - The input target.
   * @param output - The output target.
   * @param clearMode - clearMode.
   */apply(t,e,r,i){this.uniforms.filterMatrix=t.calculateSpriteMatrix(this.maskMatrix,this.maskSprite),this.uniforms.scale.x=this.scale.x,this.uniforms.scale.y=this.scale.y;let s=this.maskSprite.worldTransform,n=Math.sqrt(s.a*s.a+s.b*s.b),a=Math.sqrt(s.c*s.c+s.d*s.d);0!==n&&0!==a&&(this.uniforms.rotation[0]=s.a/n,this.uniforms.rotation[1]=s.b/n,this.uniforms.rotation[2]=s.c/a,this.uniforms.rotation[3]=s.d/a),t.applyFilter(this,e,r,i)}/** The texture used for the displacement map. Must be power of 2 sized texture. */get map(){return this.uniforms.mapSampler}set map(t){this.uniforms.mapSampler=t}}var nh={};h(nh,"FXAAFilter",()=>nd);var nl=`varying vec2 v_rgbNW;
varying vec2 v_rgbNE;
varying vec2 v_rgbSW;
varying vec2 v_rgbSE;
varying vec2 v_rgbM;

varying vec2 vFragCoord;
uniform sampler2D uSampler;
uniform highp vec4 inputSize;


/**
 Basic FXAA implementation based on the code on geeks3d.com with the
 modification that the texture2DLod stuff was removed since it's
 unsupported by WebGL.

 --

 From:
 https://github.com/mitsuhiko/webgl-meincraft

 Copyright (c) 2011 by Armin Ronacher.

 Some rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are
 met:

 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.

 * Redistributions in binary form must reproduce the above
 copyright notice, this list of conditions and the following
 disclaimer in the documentation and/or other materials provided
 with the distribution.

 * The names of the contributors may not be used to endorse or
 promote products derived from this software without specific
 prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

#ifndef FXAA_REDUCE_MIN
#define FXAA_REDUCE_MIN   (1.0/ 128.0)
#endif
#ifndef FXAA_REDUCE_MUL
#define FXAA_REDUCE_MUL   (1.0 / 8.0)
#endif
#ifndef FXAA_SPAN_MAX
#define FXAA_SPAN_MAX     8.0
#endif

//optimized version for mobile, where dependent
//texture reads can be a bottleneck
vec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 inverseVP,
          vec2 v_rgbNW, vec2 v_rgbNE,
          vec2 v_rgbSW, vec2 v_rgbSE,
          vec2 v_rgbM) {
    vec4 color;
    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;
    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;
    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;
    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;
    vec4 texColor = texture2D(tex, v_rgbM);
    vec3 rgbM  = texColor.xyz;
    vec3 luma = vec3(0.299, 0.587, 0.114);
    float lumaNW = dot(rgbNW, luma);
    float lumaNE = dot(rgbNE, luma);
    float lumaSW = dot(rgbSW, luma);
    float lumaSE = dot(rgbSE, luma);
    float lumaM  = dot(rgbM,  luma);
    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

    mediump vec2 dir;
    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *
                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);

    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);
    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),
              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
                  dir * rcpDirMin)) * inverseVP;

    vec3 rgbA = 0.5 * (
                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +
                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);
    vec3 rgbB = rgbA * 0.5 + 0.25 * (
                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +
                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);

    float lumaB = dot(rgbB, luma);
    if ((lumaB < lumaMin) || (lumaB > lumaMax))
        color = vec4(rgbA, texColor.a);
    else
        color = vec4(rgbB, texColor.a);
    return color;
}

void main() {

      vec4 color;

      color = fxaa(uSampler, vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);

      gl_FragColor = color;
}
`,nu=`
attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 v_rgbNW;
varying vec2 v_rgbNE;
varying vec2 v_rgbSW;
varying vec2 v_rgbSE;
varying vec2 v_rgbM;

varying vec2 vFragCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

void texcoords(vec2 fragCoord, vec2 inverseVP,
               out vec2 v_rgbNW, out vec2 v_rgbNE,
               out vec2 v_rgbSW, out vec2 v_rgbSE,
               out vec2 v_rgbM) {
    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;
    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;
    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;
    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;
    v_rgbM = vec2(fragCoord * inverseVP);
}

void main(void) {

   gl_Position = filterVertexPosition();

   vFragCoord = aVertexPosition * outputFrame.zw;

   texcoords(vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);
}
`;class nd extends ia{constructor(){super(nu,nl)}}var nc={};h(nc,"NoiseFilter",()=>nf);var np=`precision highp float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform float uNoise;
uniform float uSeed;
uniform sampler2D uSampler;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture2D(uSampler, vTextureCoord);
    float randomValue = rand(gl_FragCoord.xy * uSeed);
    float diff = (randomValue - 0.5) * uNoise;

    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (color.a > 0.0) {
        color.rgb /= color.a;
    }

    color.r += diff;
    color.g += diff;
    color.b += diff;

    // Premultiply alpha again.
    color.rgb *= color.a;

    gl_FragColor = color;
}
`;class nf extends ia{/**
   * @param {number} [noise=0.5] - The noise intensity, should be a normalized value in the range [0, 1].
   * @param {number} [seed] - A random seed for the noise generation. Default is `Math.random()`.
   */constructor(t=.5,e=Math.random()){super(sE,np,{uNoise:0,uSeed:0}),this.noise=t,this.seed=e}/**
   * The amount of noise to apply, this value should be in the range (0, 1].
   * @default 0.5
   */get noise(){return this.uniforms.uNoise}set noise(t){this.uniforms.uNoise=t}/** A seed value to apply to the random noise generation. `Math.random()` is a good value to use. */get seed(){return this.uniforms.uSeed}set seed(t){this.uniforms.uSeed=t}}const nm={AlphaFilter:/**
   * @class
   * @memberof PIXI.filters
   * @deprecated since 7.1.0
   * @see PIXI.AlphaFilter
   */s4,BlurFilter:/**
   * @class
   * @memberof PIXI.filters
   * @deprecated since 7.1.0
   * @see PIXI.BlurFilter
   */nt,BlurFilterPass:/**
   * @class
   * @memberof PIXI.filters
   * @deprecated since 7.1.0
   * @see PIXI.BlurFilterPass
   */s9,ColorMatrixFilter:/**
   * @class
   * @memberof PIXI.filters
   * @deprecated since 7.1.0
   * @see PIXI.ColorMatrixFilter
   */ni,DisplacementFilter:/**
   * @class
   * @memberof PIXI.filters
   * @deprecated since 7.1.0
   * @see PIXI.DisplacementFilter
   */no,FXAAFilter:/**
   * @class
   * @memberof PIXI.filters
   * @deprecated since 7.1.0
   * @see PIXI.FXAAFilter
   */nd,NoiseFilter:/**
   * @class
   * @memberof PIXI.filters
   * @deprecated since 7.1.0
   * @see PIXI.NoiseFilter
   */nf};Object.entries(nm).forEach(([t,e])=>{Object.defineProperty(nm,t,{get:()=>(ta.deprecation("7.1.0",`filters.${t} has moved to ${t}`),e)})});var ng={};h(ng,"AccessibilityManager",()=>nD),h(ng,"accessibleTarget",()=>nP);var n_={};h(n_,"EventBoundary",()=>nw),h(n_,"EventSystem",()=>nI),h(n_,"FederatedDisplayObject",()=>nM),h(n_,"FederatedEvent",()=>nv),h(n_,"FederatedMouseEvent",()=>nx),h(n_,"FederatedPointerEvent",()=>nb),h(n_,"FederatedWheelEvent",()=>nT);const ny=new class{constructor(){this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this.tickerAdded=!1,this._pauseUpdate=!0}/**
   * Initializes the event ticker.
   * @param events - The event system.
   */init(t){this.removeTickerListener(),this.events=t,this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this.tickerAdded=!1,this._pauseUpdate=!0}/** Whether to pause the update checks or not. */get pauseUpdate(){return this._pauseUpdate}set pauseUpdate(t){this._pauseUpdate=t}/** Adds the ticker listener. */addTickerListener(){this.tickerAdded||!this.domElement||(sg.system.add(this.tickerUpdate,this,sp.INTERACTION),this.tickerAdded=!0)}/** Removes the ticker listener. */removeTickerListener(){this.tickerAdded&&(sg.system.remove(this.tickerUpdate,this),this.tickerAdded=!1)}/** Sets flag to not fire extra events when the user has already moved there mouse */pointerMoved(){this._didMove=!0}/** Updates the state of interactive objects. */update(){if(!this.domElement||this._pauseUpdate)return;if(this._didMove){this._didMove=!1;return}let t=this.events.rootPointerEvent;this.events.supportsTouchEvents&&"touch"===t.pointerType||globalThis.document.dispatchEvent(new PointerEvent("pointermove",{clientX:t.clientX,clientY:t.clientY}))}/**
   * Updates the state of interactive objects if at least {@link interactionFrequency}
   * milliseconds have passed since the last invocation.
   *
   * Invoked by a throttled ticker update from {@link PIXI.Ticker.system}.
   * @param deltaTime - time delta since the last call
   */tickerUpdate(t){this._deltaTime+=t,this._deltaTime<this.interactionFrequency||(this._deltaTime=0,this.update())}};class nv{/**
   * @param manager - The event boundary which manages this event. Propagation can only occur
   *  within the boundary's jurisdiction.
   */constructor(t){this.bubbles=!0,this.cancelBubble=!0,this.cancelable=!1,this.composed=!1,this.defaultPrevented=!1,this.eventPhase=nv.prototype.NONE,this.propagationStopped=!1,this.propagationImmediatelyStopped=!1,this.layer=new rm,this.page=new rm,this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,this.manager=t}/** @readonly */get layerX(){return this.layer.x}/** @readonly */get layerY(){return this.layer.y}/** @readonly */get pageX(){return this.page.x}/** @readonly */get pageY(){return this.page.y}/**
   * Fallback for the deprecated @code{PIXI.InteractionEvent.data}.
   * @deprecated since 7.0.0
   */get data(){return this}/** The propagation path for this event. Alias for {@link PIXI.EventBoundary.propagationPath}. */composedPath(){return this.manager&&(!this.path||this.path[this.path.length-1]!==this.target)&&(this.path=this.target?this.manager.propagationPath(this.target):[]),this.path}/**
   * Unimplemented method included for implementing the DOM interface {@code Event}. It will throw an {@code Error}.
   * @deprecated
   * @param _type
   * @param _bubbles
   * @param _cancelable
   */initEvent(t,e,r){throw Error("initEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}/**
   * Unimplemented method included for implementing the DOM interface {@code UIEvent}. It will throw an {@code Error}.
   * @deprecated
   * @param _typeArg
   * @param _bubblesArg
   * @param _cancelableArg
   * @param _viewArg
   * @param _detailArg
   */initUIEvent(t,e,r,i,s){throw Error("initUIEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}/** Prevent default behavior of PixiJS and the user agent. */preventDefault(){this.nativeEvent instanceof Event&&this.nativeEvent.cancelable&&this.nativeEvent.preventDefault(),this.defaultPrevented=!0}/**
   * Stop this event from propagating to any addition listeners, including on the
   * {@link PIXI.FederatedEventTarget.currentTarget currentTarget} and also the following
   * event targets on the propagation path.
   */stopImmediatePropagation(){this.propagationImmediatelyStopped=!0}/**
   * Stop this event from propagating to the next {@link PIXI.FederatedEventTarget}. The rest of the listeners
   * on the {@link PIXI.FederatedEventTarget.currentTarget currentTarget} will still be notified.
   */stopPropagation(){this.propagationStopped=!0}}class nx extends nv{constructor(){super(...arguments),this.client=new rm,this.movement=new rm,this.offset=new rm,this.global=new rm,this.screen=new rm}/** @readonly */get clientX(){return this.client.x}/** @readonly */get clientY(){return this.client.y}/**
   * Alias for {@link PIXI.FederatedMouseEvent.clientX this.clientX}.
   * @readonly
   */get x(){return this.clientX}/**
   * Alias for {@link PIXI.FederatedMouseEvent.clientY this.clientY}.
   * @readonly
   */get y(){return this.clientY}/** @readonly */get movementX(){return this.movement.x}/** @readonly */get movementY(){return this.movement.y}/** @readonly */get offsetX(){return this.offset.x}/** @readonly */get offsetY(){return this.offset.y}/** @readonly */get globalX(){return this.global.x}/** @readonly */get globalY(){return this.global.y}/**
   * The pointer coordinates in the renderer's screen. Alias for {@code screen.x}.
   * @readonly
   */get screenX(){return this.screen.x}/**
   * The pointer coordinates in the renderer's screen. Alias for {@code screen.y}.
   * @readonly
   */get screenY(){return this.screen.y}/**
   * This will return the local coordinates of the specified displayObject for this InteractionData
   * @param {PIXI.DisplayObject} displayObject - The DisplayObject that you would like the local
   *  coords off
   * @param {PIXI.IPointData} point - A Point object in which to store the value, optional (otherwise
   *  will create a new point)
   * @param {PIXI.IPointData} globalPos - A Point object containing your custom global coords, optional
   *  (otherwise will use the current global coords)
   * @returns - A point containing the coordinates of the InteractionData position relative
   *  to the DisplayObject
   */getLocalPosition(t,e,r){return t.worldTransform.applyInverse(r||this.global,e)}/**
   * Whether the modifier key was pressed when this event natively occurred.
   * @param key - The modifier key.
   */getModifierState(t){return"getModifierState"in this.nativeEvent&&this.nativeEvent.getModifierState(t)}/**
   * Not supported.
   * @param _typeArg
   * @param _canBubbleArg
   * @param _cancelableArg
   * @param _viewArg
   * @param _detailArg
   * @param _screenXArg
   * @param _screenYArg
   * @param _clientXArg
   * @param _clientYArg
   * @param _ctrlKeyArg
   * @param _altKeyArg
   * @param _shiftKeyArg
   * @param _metaKeyArg
   * @param _buttonArg
   * @param _relatedTargetArg
   * @deprecated since 7.0.0
   */// eslint-disable-next-line max-params
initMouseEvent(t,e,r,i,s,n,a,o,h,l,u,d,c,p,f){throw Error("Method not implemented.")}}class nb extends nx{constructor(){super(...arguments),this.width=0,this.height=0,this.isPrimary=!1}// Only included for completeness for now
getCoalescedEvents(){return"pointermove"===this.type||"mousemove"===this.type||"touchmove"===this.type?[this]:[]}// Only included for completeness for now
getPredictedEvents(){throw Error("getPredictedEvents is not supported!")}}class nT extends nx{constructor(){super(...arguments),this.DOM_DELTA_PIXEL=0,this.DOM_DELTA_LINE=1,this.DOM_DELTA_PAGE=2}}nT.DOM_DELTA_PIXEL=0,/** Units specified in lines. */nT.DOM_DELTA_LINE=1,/** Units specified in pages. */nT.DOM_DELTA_PAGE=2;const nE=new rm,nA=new rm;class nw{/**
   * @param rootTarget - The holder of the event boundary.
   */constructor(t){this.dispatch=new ta.EventEmitter,this.moveOnAll=!1,this.enableGlobalMoveEvents=!0,this.mappingState={trackingData:{}},this.eventPool=/* @__PURE__ */new Map,this._allInteractiveElements=[],this._hitElements=[],this._isPointerMoveEvent=!1,this.rootTarget=t,this.hitPruneFn=this.hitPruneFn.bind(this),this.hitTestFn=this.hitTestFn.bind(this),this.mapPointerDown=this.mapPointerDown.bind(this),this.mapPointerMove=this.mapPointerMove.bind(this),this.mapPointerOut=this.mapPointerOut.bind(this),this.mapPointerOver=this.mapPointerOver.bind(this),this.mapPointerUp=this.mapPointerUp.bind(this),this.mapPointerUpOutside=this.mapPointerUpOutside.bind(this),this.mapWheel=this.mapWheel.bind(this),this.mappingTable={},this.addEventMapping("pointerdown",this.mapPointerDown),this.addEventMapping("pointermove",this.mapPointerMove),this.addEventMapping("pointerout",this.mapPointerOut),this.addEventMapping("pointerleave",this.mapPointerOut),this.addEventMapping("pointerover",this.mapPointerOver),this.addEventMapping("pointerup",this.mapPointerUp),this.addEventMapping("pointerupoutside",this.mapPointerUpOutside),this.addEventMapping("wheel",this.mapWheel)}/**
   * Adds an event mapping for the event `type` handled by `fn`.
   *
   * Event mappings can be used to implement additional or custom events. They take an event
   * coming from the upstream scene (or directly from the {@link PIXI.EventSystem}) and dispatch new downstream events
   * generally trickling down and bubbling up to {@link PIXI.EventBoundary.rootTarget this.rootTarget}.
   *
   * To modify the semantics of existing events, the built-in mapping methods of EventBoundary should be overridden
   * instead.
   * @param type - The type of upstream event to map.
   * @param fn - The mapping method. The context of this function must be bound manually, if desired.
   */addEventMapping(t,e){this.mappingTable[t]||(this.mappingTable[t]=[]),this.mappingTable[t].push({fn:e,priority:0}),this.mappingTable[t].sort((t,e)=>t.priority-e.priority)}/**
   * Dispatches the given event
   * @param e
   * @param type
   */dispatchEvent(t,e){t.propagationStopped=!1,t.propagationImmediatelyStopped=!1,this.propagate(t,e),this.dispatch.emit(e||t.type,t)}/**
   * Maps the given upstream event through the event boundary and propagates it downstream.
   * @param e
   */mapEvent(t){if(!this.rootTarget)return;let e=this.mappingTable[t.type];if(e)for(let r=0,i=e.length;r<i;r++)e[r].fn(t);else console.warn(`[EventBoundary]: Event mapping not defined for ${t.type}`)}/**
   * Finds the DisplayObject that is the target of a event at the given coordinates.
   *
   * The passed (x,y) coordinates are in the world space above this event boundary.
   * @param x
   * @param y
   */hitTest(t,e){ny.pauseUpdate=!0;let r=this._isPointerMoveEvent&&this.enableGlobalMoveEvents?"hitTestMoveRecursive":"hitTestRecursive",i=this[r](this.rootTarget,this.rootTarget.eventMode,nE.set(t,e),this.hitTestFn,this.hitPruneFn);return i&&i[0]}/**
   * Propagate the passed event from from {@link PIXI.EventBoundary.rootTarget this.rootTarget} to its
   * target {@code e.target}.
   * @param e - The event to propagate.
   * @param type
   */propagate(t,e){if(!t.target)return;let r=t.composedPath();t.eventPhase=t.CAPTURING_PHASE;for(let i=0,s=r.length-1;i<s;i++)if(t.currentTarget=r[i],this.notifyTarget(t,e),t.propagationStopped||t.propagationImmediatelyStopped)return;if(t.eventPhase=t.AT_TARGET,t.currentTarget=t.target,this.notifyTarget(t,e),!(t.propagationStopped||t.propagationImmediatelyStopped)){t.eventPhase=t.BUBBLING_PHASE;for(let i=r.length-2;i>=0;i--)if(t.currentTarget=r[i],this.notifyTarget(t,e),t.propagationStopped||t.propagationImmediatelyStopped)return}}/**
   * Emits the event {@code e} to all interactive display objects. The event is propagated in the bubbling phase always.
   *
   * This is used in the `globalpointermove` event.
   * @param e - The emitted event.
   * @param type - The listeners to notify.
   * @param targets - The targets to notify.
   */all(t,e,r=this._allInteractiveElements){if(0===r.length)return;t.eventPhase=t.BUBBLING_PHASE;let i=Array.isArray(e)?e:[e];for(let e=r.length-1;e>=0;e--)i.forEach(i=>{t.currentTarget=r[e],this.notifyTarget(t,i)})}/**
   * Finds the propagation path from {@link PIXI.EventBoundary.rootTarget rootTarget} to the passed
   * {@code target}. The last element in the path is {@code target}.
   * @param target
   */propagationPath(t){let e=[t];for(let r=0;r<2048&&t!==this.rootTarget;r++){if(!t.parent)throw Error("Cannot find propagation path to disconnected target");e.push(t.parent),t=t.parent}return e.reverse(),e}hitTestMoveRecursive(t,e,r,i,s,n=!1){let a=!1;if(this._interactivePrune(t))return null;if(("dynamic"===t.eventMode||"dynamic"===e)&&(ny.pauseUpdate=!1),t.interactiveChildren&&t.children){let o=t.children;for(let h=o.length-1;h>=0;h--){let l=o[h],u=this.hitTestMoveRecursive(l,this._isInteractive(e)?e:l.eventMode,r,i,s,n||s(t,r));if(u){if(u.length>0&&!u[u.length-1].parent)continue;let e=t.isInteractive();(u.length>0||e)&&(e&&this._allInteractiveElements.push(t),u.push(t)),0===this._hitElements.length&&(this._hitElements=u),a=!0}}}let o=this._isInteractive(e),h=t.isInteractive();return o&&h&&this._allInteractiveElements.push(t),n||this._hitElements.length>0?null:a?this._hitElements:o&&!s(t,r)&&i(t,r)?h?[t]:[]:null}/**
   * Recursive implementation for {@link PIXI.EventBoundary.hitTest hitTest}.
   * @param currentTarget - The DisplayObject that is to be hit tested.
   * @param eventMode - The event mode for the `currentTarget` or one of its parents.
   * @param location - The location that is being tested for overlap.
   * @param testFn - Callback that determines whether the target passes hit testing. This callback
   *  can assume that `pruneFn` failed to prune the display object.
   * @param pruneFn - Callback that determiness whether the target and all of its children
   *  cannot pass the hit test. It is used as a preliminary optimization to prune entire subtrees
   *  of the scene graph.
   * @returns An array holding the hit testing target and all its ancestors in order. The first element
   *  is the target itself and the last is {@link PIXI.EventBoundary.rootTarget rootTarget}. This is the opposite
   *  order w.r.t. the propagation path. If no hit testing target is found, null is returned.
   */hitTestRecursive(t,e,r,i,s){if(this._interactivePrune(t)||s(t,r))return null;if(("dynamic"===t.eventMode||"dynamic"===e)&&(ny.pauseUpdate=!1),t.interactiveChildren&&t.children){let n=t.children;for(let a=n.length-1;a>=0;a--){let o=n[a],h=this.hitTestRecursive(o,this._isInteractive(e)?e:o.eventMode,r,i,s);if(h){if(h.length>0&&!h[h.length-1].parent)continue;let e=t.isInteractive();return(h.length>0||e)&&h.push(t),h}}}let n=this._isInteractive(e),a=t.isInteractive();return n&&i(t,r)?a?[t]:[]:null}_isInteractive(t){return"static"===t||"dynamic"===t}_interactivePrune(t){return!!(!t||t.isMask||!t.visible||!t.renderable||"none"===t.eventMode||"passive"===t.eventMode&&!t.interactiveChildren||t.isMask)}/**
   * Checks whether the display object or any of its children cannot pass the hit test at all.
   *
   * {@link PIXI.EventBoundary}'s implementation uses the {@link PIXI.DisplayObject.hitArea hitArea}
   * and {@link PIXI.DisplayObject._mask} for pruning.
   * @param displayObject
   * @param location
   */hitPruneFn(t,e){if(t.hitArea&&(t.worldTransform.applyInverse(e,nA),!t.hitArea.contains(nA.x,nA.y)))return!0;if(t._mask){let r=t._mask.isMaskData?t._mask.maskObject:t._mask;if(r&&!r.containsPoint?.(e))return!0}return!1}/**
   * Checks whether the display object passes hit testing for the given location.
   * @param displayObject
   * @param location
   * @returns - Whether `displayObject` passes hit testing for `location`.
   */hitTestFn(t,e){return"passive"!==t.eventMode&&(!!t.hitArea||!!t.containsPoint&&t.containsPoint(e))}/**
   * Notify all the listeners to the event's `currentTarget`.
   *
   * If the `currentTarget` contains the property `on<type>`, then it is called here,
   * simulating the behavior from version 6.x and prior.
   * @param e - The event passed to the target.
   * @param type
   */notifyTarget(t,e){e=e??t.type;let r=`on${e}`;t.currentTarget[r]?.(t);let i=t.eventPhase===t.CAPTURING_PHASE||t.eventPhase===t.AT_TARGET?`${e}capture`:e;this.notifyListeners(t,i),t.eventPhase===t.AT_TARGET&&this.notifyListeners(t,e)}/**
   * Maps the upstream `pointerdown` events to a downstream `pointerdown` event.
   *
   * `touchstart`, `rightdown`, `mousedown` events are also dispatched for specific pointer types.
   * @param from
   */mapPointerDown(t){if(!(t instanceof nb)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}let e=this.createPointerEvent(t);if(this.dispatchEvent(e,"pointerdown"),"touch"===e.pointerType)this.dispatchEvent(e,"touchstart");else if("mouse"===e.pointerType||"pen"===e.pointerType){let t=2===e.button;this.dispatchEvent(e,t?"rightdown":"mousedown")}let r=this.trackingData(t.pointerId);r.pressTargetsByButton[t.button]=e.composedPath(),this.freeEvent(e)}/**
   * Maps the upstream `pointermove` to downstream `pointerout`, `pointerover`, and `pointermove` events, in that order.
   *
   * The tracking data for the specific pointer has an updated `overTarget`. `mouseout`, `mouseover`,
   * `mousemove`, and `touchmove` events are fired as well for specific pointer types.
   * @param from - The upstream `pointermove` event.
   */mapPointerMove(t){if(!(t instanceof nb)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}this._allInteractiveElements.length=0,this._hitElements.length=0,this._isPointerMoveEvent=!0;let e=this.createPointerEvent(t);this._isPointerMoveEvent=!1;let r="mouse"===e.pointerType||"pen"===e.pointerType,i=this.trackingData(t.pointerId),s=this.findMountedTarget(i.overTargets);if(i.overTargets?.length>0&&s!==e.target){let i="mousemove"===t.type?"mouseout":"pointerout",n=this.createPointerEvent(t,i,s);if(this.dispatchEvent(n,"pointerout"),r&&this.dispatchEvent(n,"mouseout"),!e.composedPath().includes(s)){let i=this.createPointerEvent(t,"pointerleave",s);for(i.eventPhase=i.AT_TARGET;i.target&&!e.composedPath().includes(i.target);)i.currentTarget=i.target,this.notifyTarget(i),r&&this.notifyTarget(i,"mouseleave"),i.target=i.target.parent;this.freeEvent(i)}this.freeEvent(n)}if(s!==e.target){let i="mousemove"===t.type?"mouseover":"pointerover",n=this.clonePointerEvent(e,i);this.dispatchEvent(n,"pointerover"),r&&this.dispatchEvent(n,"mouseover");let a=s?.parent;for(;a&&a!==this.rootTarget.parent&&a!==e.target;)a=a.parent;if(!a||a===this.rootTarget.parent){let t=this.clonePointerEvent(e,"pointerenter");for(t.eventPhase=t.AT_TARGET;t.target&&t.target!==s&&t.target!==this.rootTarget.parent;)t.currentTarget=t.target,this.notifyTarget(t),r&&this.notifyTarget(t,"mouseenter"),t.target=t.target.parent;this.freeEvent(t)}this.freeEvent(n)}let n=[],a=this.enableGlobalMoveEvents??!0;this.moveOnAll?n.push("pointermove"):this.dispatchEvent(e,"pointermove"),a&&n.push("globalpointermove"),"touch"===e.pointerType&&(this.moveOnAll?n.splice(1,0,"touchmove"):this.dispatchEvent(e,"touchmove"),a&&n.push("globaltouchmove")),r&&(this.moveOnAll?n.splice(1,0,"mousemove"):this.dispatchEvent(e,"mousemove"),a&&n.push("globalmousemove"),this.cursor=e.target?.cursor),n.length>0&&this.all(e,n),this._allInteractiveElements.length=0,this._hitElements.length=0,i.overTargets=e.composedPath(),this.freeEvent(e)}/**
   * Maps the upstream `pointerover` to downstream `pointerover` and `pointerenter` events, in that order.
   *
   * The tracking data for the specific pointer gets a new `overTarget`.
   * @param from - The upstream `pointerover` event.
   */mapPointerOver(t){if(!(t instanceof nb)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}let e=this.trackingData(t.pointerId),r=this.createPointerEvent(t),i="mouse"===r.pointerType||"pen"===r.pointerType;this.dispatchEvent(r,"pointerover"),i&&this.dispatchEvent(r,"mouseover"),"mouse"===r.pointerType&&(this.cursor=r.target?.cursor);let s=this.clonePointerEvent(r,"pointerenter");for(s.eventPhase=s.AT_TARGET;s.target&&s.target!==this.rootTarget.parent;)s.currentTarget=s.target,this.notifyTarget(s),i&&this.notifyTarget(s,"mouseenter"),s.target=s.target.parent;e.overTargets=r.composedPath(),this.freeEvent(r),this.freeEvent(s)}/**
   * Maps the upstream `pointerout` to downstream `pointerout`, `pointerleave` events, in that order.
   *
   * The tracking data for the specific pointer is cleared of a `overTarget`.
   * @param from - The upstream `pointerout` event.
   */mapPointerOut(t){if(!(t instanceof nb)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}let e=this.trackingData(t.pointerId);if(e.overTargets){let r="mouse"===t.pointerType||"pen"===t.pointerType,i=this.findMountedTarget(e.overTargets),s=this.createPointerEvent(t,"pointerout",i);this.dispatchEvent(s),r&&this.dispatchEvent(s,"mouseout");let n=this.createPointerEvent(t,"pointerleave",i);for(n.eventPhase=n.AT_TARGET;n.target&&n.target!==this.rootTarget.parent;)n.currentTarget=n.target,this.notifyTarget(n),r&&this.notifyTarget(n,"mouseleave"),n.target=n.target.parent;e.overTargets=null,this.freeEvent(s),this.freeEvent(n)}this.cursor=null}/**
   * Maps the upstream `pointerup` event to downstream `pointerup`, `pointerupoutside`,
   * and `click`/`rightclick`/`pointertap` events, in that order.
   *
   * The `pointerupoutside` event bubbles from the original `pointerdown` target to the most specific
   * ancestor of the `pointerdown` and `pointerup` targets, which is also the `click` event's target. `touchend`,
   * `rightup`, `mouseup`, `touchendoutside`, `rightupoutside`, `mouseupoutside`, and `tap` are fired as well for
   * specific pointer types.
   * @param from - The upstream `pointerup` event.
   */mapPointerUp(t){if(!(t instanceof nb)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}let e=performance.now(),r=this.createPointerEvent(t);if(this.dispatchEvent(r,"pointerup"),"touch"===r.pointerType)this.dispatchEvent(r,"touchend");else if("mouse"===r.pointerType||"pen"===r.pointerType){let t=2===r.button;this.dispatchEvent(r,t?"rightup":"mouseup")}let i=this.trackingData(t.pointerId),s=this.findMountedTarget(i.pressTargetsByButton[t.button]),n=s;if(s&&!r.composedPath().includes(s)){let e=s;for(;e&&!r.composedPath().includes(e);){if(r.currentTarget=e,this.notifyTarget(r,"pointerupoutside"),"touch"===r.pointerType)this.notifyTarget(r,"touchendoutside");else if("mouse"===r.pointerType||"pen"===r.pointerType){let t=2===r.button;this.notifyTarget(r,t?"rightupoutside":"mouseupoutside")}e=e.parent}delete i.pressTargetsByButton[t.button],n=e}if(n){let s=this.clonePointerEvent(r,"click");s.target=n,s.path=null,i.clicksByButton[t.button]||(i.clicksByButton[t.button]={clickCount:0,target:s.target,timeStamp:e});let a=i.clicksByButton[t.button];if(a.target===s.target&&e-a.timeStamp<200?++a.clickCount:a.clickCount=1,a.target=s.target,a.timeStamp=e,s.detail=a.clickCount,"mouse"===s.pointerType){let t=2===s.button;this.dispatchEvent(s,t?"rightclick":"click")}else"touch"===s.pointerType&&this.dispatchEvent(s,"tap");this.dispatchEvent(s,"pointertap"),this.freeEvent(s)}this.freeEvent(r)}/**
   * Maps the upstream `pointerupoutside` event to a downstream `pointerupoutside` event, bubbling from the original
   * `pointerdown` target to `rootTarget`.
   *
   * (The most specific ancestor of the `pointerdown` event and the `pointerup` event must the
   * `{@link PIXI.EventBoundary}'s root because the `pointerup` event occurred outside of the boundary.)
   *
   * `touchendoutside`, `mouseupoutside`, and `rightupoutside` events are fired as well for specific pointer
   * types. The tracking data for the specific pointer is cleared of a `pressTarget`.
   * @param from - The upstream `pointerupoutside` event.
   */mapPointerUpOutside(t){if(!(t instanceof nb)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}let e=this.trackingData(t.pointerId),r=this.findMountedTarget(e.pressTargetsByButton[t.button]),i=this.createPointerEvent(t);if(r){let s=r;for(;s;)i.currentTarget=s,this.notifyTarget(i,"pointerupoutside"),"touch"===i.pointerType?this.notifyTarget(i,"touchendoutside"):("mouse"===i.pointerType||"pen"===i.pointerType)&&this.notifyTarget(i,2===i.button?"rightupoutside":"mouseupoutside"),s=s.parent;delete e.pressTargetsByButton[t.button]}this.freeEvent(i)}/**
   * Maps the upstream `wheel` event to a downstream `wheel` event.
   * @param from - The upstream `wheel` event.
   */mapWheel(t){if(!(t instanceof nT)){console.warn("EventBoundary cannot map a non-wheel event as a wheel event");return}let e=this.createWheelEvent(t);this.dispatchEvent(e),this.freeEvent(e)}/**
   * Finds the most specific event-target in the given propagation path that is still mounted in the scene graph.
   *
   * This is used to find the correct `pointerup` and `pointerout` target in the case that the original `pointerdown`
   * or `pointerover` target was unmounted from the scene graph.
   * @param propagationPath - The propagation path was valid in the past.
   * @returns - The most specific event-target still mounted at the same location in the scene graph.
   */findMountedTarget(t){if(!t)return null;let e=t[0];for(let r=1;r<t.length&&t[r].parent===e;r++)e=t[r];return e}/**
   * Creates an event whose {@code originalEvent} is {@code from}, with an optional `type` and `target` override.
   *
   * The event is allocated using {@link PIXI.EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The {@code originalEvent} for the returned event.
   * @param [type=from.type] - The type of the returned event.
   * @param target - The target of the returned event.
   */createPointerEvent(t,e,r){let i=this.allocateEvent(nb);return this.copyPointerData(t,i),this.copyMouseData(t,i),this.copyData(t,i),i.nativeEvent=t.nativeEvent,i.originalEvent=t,i.target=r??this.hitTest(i.global.x,i.global.y)??this._hitElements[0],"string"==typeof e&&(i.type=e),i}/**
   * Creates a wheel event whose {@code originalEvent} is {@code from}.
   *
   * The event is allocated using {@link PIXI.EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The upstream wheel event.
   */createWheelEvent(t){let e=this.allocateEvent(nT);return this.copyWheelData(t,e),this.copyMouseData(t,e),this.copyData(t,e),e.nativeEvent=t.nativeEvent,e.originalEvent=t,e.target=this.hitTest(e.global.x,e.global.y),e}/**
   * Clones the event {@code from}, with an optional {@code type} override.
   *
   * The event is allocated using {@link PIXI.EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The event to clone.
   * @param [type=from.type] - The type of the returned event.
   */clonePointerEvent(t,e){let r=this.allocateEvent(nb);return r.nativeEvent=t.nativeEvent,r.originalEvent=t.originalEvent,this.copyPointerData(t,r),this.copyMouseData(t,r),this.copyData(t,r),r.target=t.target,r.path=t.composedPath().slice(),r.type=e??r.type,r}/**
   * Copies wheel {@link PIXI.FederatedWheelEvent} data from {@code from} into {@code to}.
   *
   * The following properties are copied:
   * + deltaMode
   * + deltaX
   * + deltaY
   * + deltaZ
   * @param from
   * @param to
   */copyWheelData(t,e){e.deltaMode=t.deltaMode,e.deltaX=t.deltaX,e.deltaY=t.deltaY,e.deltaZ=t.deltaZ}/**
   * Copies pointer {@link PIXI.FederatedPointerEvent} data from {@code from} into {@code to}.
   *
   * The following properties are copied:
   * + pointerId
   * + width
   * + height
   * + isPrimary
   * + pointerType
   * + pressure
   * + tangentialPressure
   * + tiltX
   * + tiltY
   * @param from
   * @param to
   */copyPointerData(t,e){t instanceof nb&&e instanceof nb&&(e.pointerId=t.pointerId,e.width=t.width,e.height=t.height,e.isPrimary=t.isPrimary,e.pointerType=t.pointerType,e.pressure=t.pressure,e.tangentialPressure=t.tangentialPressure,e.tiltX=t.tiltX,e.tiltY=t.tiltY,e.twist=t.twist)}/**
   * Copies mouse {@link PIXI.FederatedMouseEvent} data from {@code from} to {@code to}.
   *
   * The following properties are copied:
   * + altKey
   * + button
   * + buttons
   * + clientX
   * + clientY
   * + metaKey
   * + movementX
   * + movementY
   * + pageX
   * + pageY
   * + x
   * + y
   * + screen
   * + shiftKey
   * + global
   * @param from
   * @param to
   */copyMouseData(t,e){t instanceof nx&&e instanceof nx&&(e.altKey=t.altKey,e.button=t.button,e.buttons=t.buttons,e.client.copyFrom(t.client),e.ctrlKey=t.ctrlKey,e.metaKey=t.metaKey,e.movement.copyFrom(t.movement),e.screen.copyFrom(t.screen),e.shiftKey=t.shiftKey,e.global.copyFrom(t.global))}/**
   * Copies base {@link PIXI.FederatedEvent} data from {@code from} into {@code to}.
   *
   * The following properties are copied:
   * + isTrusted
   * + srcElement
   * + timeStamp
   * + type
   * @param from - The event to copy data from.
   * @param to - The event to copy data into.
   */copyData(t,e){e.isTrusted=t.isTrusted,e.srcElement=t.srcElement,e.timeStamp=performance.now(),e.type=t.type,e.detail=t.detail,e.view=t.view,e.which=t.which,e.layer.copyFrom(t.layer),e.page.copyFrom(t.page)}/**
   * @param id - The pointer ID.
   * @returns The tracking data stored for the given pointer. If no data exists, a blank
   *  state will be created.
   */trackingData(t){return this.mappingState.trackingData[t]||(this.mappingState.trackingData[t]={pressTargetsByButton:{},clicksByButton:{},overTarget:null}),this.mappingState.trackingData[t]}/**
   * Allocate a specific type of event from {@link PIXI.EventBoundary#eventPool this.eventPool}.
   *
   * This allocation is constructor-agnostic, as long as it only takes one argument - this event
   * boundary.
   * @param constructor - The event's constructor.
   */allocateEvent(t){this.eventPool.has(t)||this.eventPool.set(t,[]);let e=this.eventPool.get(t).pop()||new t(this);return e.eventPhase=e.NONE,e.currentTarget=null,e.path=null,e.target=null,e}/**
   * Frees the event and puts it back into the event pool.
   *
   * It is illegal to reuse the event until it is allocated again, using `this.allocateEvent`.
   *
   * It is also advised that events not allocated from {@link PIXI.EventBoundary#allocateEvent this.allocateEvent}
   * not be freed. This is because of the possibility that the same event is freed twice, which can cause
   * it to be allocated twice & result in overwriting.
   * @param event - The event to be freed.
   * @throws Error if the event is managed by another event boundary.
   */freeEvent(t){if(t.manager!==this)throw Error("It is illegal to free an event not managed by this EventBoundary!");let e=t.constructor;this.eventPool.has(e)||this.eventPool.set(e,[]),this.eventPool.get(e).push(t)}/**
   * Similar to {@link PIXI.EventEmitter.emit}, except it stops if the `propagationImmediatelyStopped` flag
   * is set on the event.
   * @param e - The event to call each listener with.
   * @param type - The event key.
   */notifyListeners(t,e){let r=t.currentTarget._events[e];if(r&&t.currentTarget.isInteractive()){if("fn"in r)r.once&&t.currentTarget.removeListener(e,r.fn,void 0,!0),r.fn.call(r.context,t);else for(let i=0,s=r.length;i<s&&!t.propagationImmediatelyStopped;i++)r[i].once&&t.currentTarget.removeListener(e,r[i].fn,void 0,!0),r[i].fn.call(r[i].context,t)}}}const nS={touchstart:"pointerdown",touchend:"pointerup",touchendoutside:"pointerupoutside",touchmove:"pointermove",touchcancel:"pointercancel"},nR=class t{/**
   * @param {PIXI.Renderer} renderer
   */constructor(e){this.supportsTouchEvents="ontouchstart"in globalThis,this.supportsPointerEvents=!!globalThis.PointerEvent,this.domElement=null,this.resolution=1,this.renderer=e,this.rootBoundary=new nw(null),ny.init(this),this.autoPreventDefault=!0,this.eventsAdded=!1,this.rootPointerEvent=new nb(null),this.rootWheelEvent=new nT(null),this.cursorStyles={default:"inherit",pointer:"pointer"},this.features=new Proxy({...t.defaultEventFeatures},{set:(t,e,r)=>("globalMove"===e&&(this.rootBoundary.enableGlobalMoveEvents=r),t[e]=r,!0)}),this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onPointerOverOut=this.onPointerOverOut.bind(this),this.onWheel=this.onWheel.bind(this)}/**
   * The default interaction mode for all display objects.
   * @see PIXI.DisplayObject.eventMode
   * @type {PIXI.EventMode}
   * @readonly
   * @since 7.2.0
   */static get defaultEventMode(){return this._defaultEventMode}/**
   * Runner init called, view is available at this point.
   * @ignore
   */init(e){let{view:r,resolution:i}=this.renderer;this.setTargetElement(r),this.resolution=i,t._defaultEventMode=e.eventMode??"auto",Object.assign(this.features,e.eventFeatures??{}),this.rootBoundary.enableGlobalMoveEvents=this.features.globalMove}/**
   * Handle changing resolution.
   * @ignore
   */resolutionChange(t){this.resolution=t}/** Destroys all event listeners and detaches the renderer. */destroy(){this.setTargetElement(null),this.renderer=null}/**
   * Sets the current cursor mode, handling any callbacks or CSS style changes.
   * @param mode - cursor mode, a key from the cursorStyles dictionary
   */setCursor(t){t=t||"default";let e=!0;if(globalThis.OffscreenCanvas&&this.domElement instanceof OffscreenCanvas&&(e=!1),this.currentCursor===t)return;this.currentCursor=t;let r=this.cursorStyles[t];if(r)switch(typeof r){case"string":e&&(this.domElement.style.cursor=r);break;case"function":r(t);break;case"object":e&&Object.assign(this.domElement.style,r)}else e&&"string"==typeof t&&!Object.prototype.hasOwnProperty.call(this.cursorStyles,t)&&(this.domElement.style.cursor=t)}/**
   * The global pointer event.
   * Useful for getting the pointer position without listening to events.
   * @since 7.2.0
   */get pointer(){return this.rootPointerEvent}/**
   * Event handler for pointer down events on {@link PIXI.EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch event.
   */onPointerDown(t){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;let e=this.normalizeToPointerData(t);this.autoPreventDefault&&e[0].isNormalized&&(t.cancelable||!("cancelable"in t))&&t.preventDefault();for(let t=0,r=e.length;t<r;t++){let r=e[t],i=this.bootstrapEvent(this.rootPointerEvent,r);this.rootBoundary.mapEvent(i)}this.setCursor(this.rootBoundary.cursor)}/**
   * Event handler for pointer move events on on {@link PIXI.EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch events.
   */onPointerMove(t){if(!this.features.move)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,ny.pointerMoved();let e=this.normalizeToPointerData(t);for(let t=0,r=e.length;t<r;t++){let r=this.bootstrapEvent(this.rootPointerEvent,e[t]);this.rootBoundary.mapEvent(r)}this.setCursor(this.rootBoundary.cursor)}/**
   * Event handler for pointer up events on {@link PIXI.EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch event.
   */onPointerUp(t){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;let e=t.target;t.composedPath&&t.composedPath().length>0&&(e=t.composedPath()[0]);let r=e!==this.domElement?"outside":"",i=this.normalizeToPointerData(t);for(let t=0,e=i.length;t<e;t++){let e=this.bootstrapEvent(this.rootPointerEvent,i[t]);e.type+=r,this.rootBoundary.mapEvent(e)}this.setCursor(this.rootBoundary.cursor)}/**
   * Event handler for pointer over & out events on {@link PIXI.EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch event.
   */onPointerOverOut(t){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;let e=this.normalizeToPointerData(t);for(let t=0,r=e.length;t<r;t++){let r=this.bootstrapEvent(this.rootPointerEvent,e[t]);this.rootBoundary.mapEvent(r)}this.setCursor(this.rootBoundary.cursor)}/**
   * Passive handler for `wheel` events on {@link PIXI.EventSystem.domElement this.domElement}.
   * @param nativeEvent - The native wheel event.
   */onWheel(t){if(!this.features.wheel)return;let e=this.normalizeWheelEvent(t);this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.rootBoundary.mapEvent(e)}/**
   * Sets the {@link PIXI.EventSystem#domElement domElement} and binds event listeners.
   *
   * To deregister the current DOM element without setting a new one, pass {@code null}.
   * @param element - The new DOM element.
   */setTargetElement(t){this.removeEvents(),this.domElement=t,ny.domElement=t,this.addEvents()}/** Register event listeners on {@link PIXI.Renderer#domElement this.domElement}. */addEvents(){if(this.eventsAdded||!this.domElement)return;ny.addTickerListener();let t=this.domElement.style;t&&(globalThis.navigator.msPointerEnabled?(t.msContentZooming="none",t.msTouchAction="none"):this.supportsPointerEvents&&(t.touchAction="none")),this.supportsPointerEvents?(globalThis.document.addEventListener("pointermove",this.onPointerMove,!0),this.domElement.addEventListener("pointerdown",this.onPointerDown,!0),this.domElement.addEventListener("pointerleave",this.onPointerOverOut,!0),this.domElement.addEventListener("pointerover",this.onPointerOverOut,!0),globalThis.addEventListener("pointerup",this.onPointerUp,!0)):(globalThis.document.addEventListener("mousemove",this.onPointerMove,!0),this.domElement.addEventListener("mousedown",this.onPointerDown,!0),this.domElement.addEventListener("mouseout",this.onPointerOverOut,!0),this.domElement.addEventListener("mouseover",this.onPointerOverOut,!0),globalThis.addEventListener("mouseup",this.onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.addEventListener("touchstart",this.onPointerDown,!0),this.domElement.addEventListener("touchend",this.onPointerUp,!0),this.domElement.addEventListener("touchmove",this.onPointerMove,!0))),this.domElement.addEventListener("wheel",this.onWheel,{passive:!0,capture:!0}),this.eventsAdded=!0}/** Unregister event listeners on {@link PIXI.EventSystem#domElement this.domElement}. */removeEvents(){if(!this.eventsAdded||!this.domElement)return;ny.removeTickerListener();let t=this.domElement.style;globalThis.navigator.msPointerEnabled?(t.msContentZooming="",t.msTouchAction=""):this.supportsPointerEvents&&(t.touchAction=""),this.supportsPointerEvents?(globalThis.document.removeEventListener("pointermove",this.onPointerMove,!0),this.domElement.removeEventListener("pointerdown",this.onPointerDown,!0),this.domElement.removeEventListener("pointerleave",this.onPointerOverOut,!0),this.domElement.removeEventListener("pointerover",this.onPointerOverOut,!0),globalThis.removeEventListener("pointerup",this.onPointerUp,!0)):(globalThis.document.removeEventListener("mousemove",this.onPointerMove,!0),this.domElement.removeEventListener("mousedown",this.onPointerDown,!0),this.domElement.removeEventListener("mouseout",this.onPointerOverOut,!0),this.domElement.removeEventListener("mouseover",this.onPointerOverOut,!0),globalThis.removeEventListener("mouseup",this.onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.removeEventListener("touchstart",this.onPointerDown,!0),this.domElement.removeEventListener("touchend",this.onPointerUp,!0),this.domElement.removeEventListener("touchmove",this.onPointerMove,!0))),this.domElement.removeEventListener("wheel",this.onWheel,!0),this.domElement=null,this.eventsAdded=!1}/**
   * Maps x and y coords from a DOM object and maps them correctly to the PixiJS view. The
   * resulting value is stored in the point. This takes into account the fact that the DOM
   * element could be scaled and positioned anywhere on the screen.
   * @param  {PIXI.IPointData} point - the point that the result will be stored in
   * @param  {number} x - the x coord of the position to map
   * @param  {number} y - the y coord of the position to map
   */mapPositionToPoint(t,e,r){let i=this.domElement.isConnected?this.domElement.getBoundingClientRect():{x:0,y:0,width:this.domElement.width,height:this.domElement.height,left:0,top:0},s=1/this.resolution;t.x=(e-i.left)*(this.domElement.width/i.width)*s,t.y=(r-i.top)*(this.domElement.height/i.height)*s}/**
   * Ensures that the original event object contains all data that a regular pointer event would have
   * @param event - The original event data from a touch or mouse event
   * @returns An array containing a single normalized pointer event, in the case of a pointer
   *  or mouse event, or a multiple normalized pointer events if there are multiple changed touches
   */normalizeToPointerData(t){let e=[];if(this.supportsTouchEvents&&t instanceof TouchEvent)for(let r=0,i=t.changedTouches.length;r<i;r++){let i=t.changedTouches[r];typeof i.button>"u"&&(i.button=0),typeof i.buttons>"u"&&(i.buttons=1),typeof i.isPrimary>"u"&&(i.isPrimary=1===t.touches.length&&"touchstart"===t.type),typeof i.width>"u"&&(i.width=i.radiusX||1),typeof i.height>"u"&&(i.height=i.radiusY||1),typeof i.tiltX>"u"&&(i.tiltX=0),typeof i.tiltY>"u"&&(i.tiltY=0),typeof i.pointerType>"u"&&(i.pointerType="touch"),typeof i.pointerId>"u"&&(i.pointerId=i.identifier||0),typeof i.pressure>"u"&&(i.pressure=i.force||.5),typeof i.twist>"u"&&(i.twist=0),typeof i.tangentialPressure>"u"&&(i.tangentialPressure=0),typeof i.layerX>"u"&&(i.layerX=i.offsetX=i.clientX),typeof i.layerY>"u"&&(i.layerY=i.offsetY=i.clientY),i.isNormalized=!0,i.type=t.type,e.push(i)}else(!globalThis.MouseEvent||t instanceof MouseEvent&&(!this.supportsPointerEvents||!(t instanceof globalThis.PointerEvent)))&&(typeof t.isPrimary>"u"&&(t.isPrimary=!0),typeof t.width>"u"&&(t.width=1),typeof t.height>"u"&&(t.height=1),typeof t.tiltX>"u"&&(t.tiltX=0),typeof t.tiltY>"u"&&(t.tiltY=0),typeof t.pointerType>"u"&&(t.pointerType="mouse"),typeof t.pointerId>"u"&&(t.pointerId=1),typeof t.pressure>"u"&&(t.pressure=.5),typeof t.twist>"u"&&(t.twist=0),typeof t.tangentialPressure>"u"&&(t.tangentialPressure=0),t.isNormalized=!0),e.push(t);return e}/**
   * Normalizes the native {@link https://w3c.github.io/uievents/#interface-wheelevent WheelEvent}.
   *
   * The returned {@link PIXI.FederatedWheelEvent} is a shared instance. It will not persist across
   * multiple native wheel events.
   * @param nativeEvent - The native wheel event that occurred on the canvas.
   * @returns A federated wheel event.
   */normalizeWheelEvent(t){let e=this.rootWheelEvent;return this.transferMouseData(e,t),e.deltaX=t.deltaX,e.deltaY=t.deltaY,e.deltaZ=t.deltaZ,e.deltaMode=t.deltaMode,this.mapPositionToPoint(e.screen,t.clientX,t.clientY),e.global.copyFrom(e.screen),e.offset.copyFrom(e.screen),e.nativeEvent=t,e.type=t.type,e}/**
   * Normalizes the `nativeEvent` into a federateed {@link PIXI.FederatedPointerEvent}.
   * @param event
   * @param nativeEvent
   */bootstrapEvent(t,e){return t.originalEvent=null,t.nativeEvent=e,t.pointerId=e.pointerId,t.width=e.width,t.height=e.height,t.isPrimary=e.isPrimary,t.pointerType=e.pointerType,t.pressure=e.pressure,t.tangentialPressure=e.tangentialPressure,t.tiltX=e.tiltX,t.tiltY=e.tiltY,t.twist=e.twist,this.transferMouseData(t,e),this.mapPositionToPoint(t.screen,e.clientX,e.clientY),t.global.copyFrom(t.screen),t.offset.copyFrom(t.screen),t.isTrusted=e.isTrusted,"pointerleave"===t.type&&(t.type="pointerout"),t.type.startsWith("mouse")&&(t.type=t.type.replace("mouse","pointer")),t.type.startsWith("touch")&&(t.type=nS[t.type]||t.type),t}/**
   * Transfers base & mouse event data from the {@code nativeEvent} to the federated event.
   * @param event
   * @param nativeEvent
   */transferMouseData(t,e){t.isTrusted=e.isTrusted,t.srcElement=e.srcElement,t.timeStamp=performance.now(),t.type=e.type,t.altKey=e.altKey,t.button=e.button,t.buttons=e.buttons,t.client.x=e.clientX,t.client.y=e.clientY,t.ctrlKey=e.ctrlKey,t.metaKey=e.metaKey,t.movement.x=e.movementX,t.movement.y=e.movementY,t.page.x=e.pageX,t.page.y=e.pageY,t.relatedTarget=null,t.shiftKey=e.shiftKey}};nR.extension={name:"events",type:[e$.RendererSystem,e$.CanvasRendererSystem]},/**
* The event features that are enabled by the EventSystem
* This option only is available when using **@pixi/events** package
* (included in the **pixi.js** and **pixi.js-legacy** bundle), otherwise it will be ignored.
* @since 7.2.0
*/nR.defaultEventFeatures={move:!0,globalMove:!0,click:!0,wheel:!0};let nI=nR;function nC(t){return"dynamic"===t||"static"===t}eK.add(nI);const nM={/**
   * Property-based event handler for the `click` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onclick = (event) => {
   *  //some function here that happens on click
   * }
   */onclick:null,/**
   * Property-based event handler for the `mousedown` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmousedown = (event) => {
   *  //some function here that happens on mousedown
   * }
   */onmousedown:null,/**
   * Property-based event handler for the `mouseenter` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseenter = (event) => {
   *  //some function here that happens on mouseenter
   * }
   */onmouseenter:null,/**
   * Property-based event handler for the `mouseleave` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseleave = (event) => {
   *  //some function here that happens on mouseleave
   * }
   */onmouseleave:null,/**
   * Property-based event handler for the `mousemove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmousemove = (event) => {
   *  //some function here that happens on mousemove
   * }
   */onmousemove:null,/**
   * Property-based event handler for the `globalmousemove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onglobalmousemove = (event) => {
   *  //some function here that happens on globalmousemove
   * }
   */onglobalmousemove:null,/**
   * Property-based event handler for the `mouseout` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseout = (event) => {
   *  //some function here that happens on mouseout
   * }
   */onmouseout:null,/**
   * Property-based event handler for the `mouseover` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseover = (event) => {
   *  //some function here that happens on mouseover
   * }
   */onmouseover:null,/**
   * Property-based event handler for the `mouseup` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseup = (event) => {
   *  //some function here that happens on mouseup
   * }
   */onmouseup:null,/**
   * Property-based event handler for the `mouseupoutside` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onmouseupoutside = (event) => {
   *  //some function here that happens on mouseupoutside
   * }
   */onmouseupoutside:null,/**
   * Property-based event handler for the `pointercancel` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointercancel = (event) => {
   *  //some function here that happens on pointercancel
   * }
   */onpointercancel:null,/**
   * Property-based event handler for the `pointerdown` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerdown = (event) => {
   *  //some function here that happens on pointerdown
   * }
   */onpointerdown:null,/**
   * Property-based event handler for the `pointerenter` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerenter = (event) => {
   *  //some function here that happens on pointerenter
   * }
   */onpointerenter:null,/**
   * Property-based event handler for the `pointerleave` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerleave = (event) => {
   *  //some function here that happens on pointerleave
   * }
   */onpointerleave:null,/**
   * Property-based event handler for the `pointermove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointermove = (event) => {
   *  //some function here that happens on pointermove
   * }
   */onpointermove:null,/**
   * Property-based event handler for the `globalpointermove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onglobalpointermove = (event) => {
   *  //some function here that happens on globalpointermove
   * }
   */onglobalpointermove:null,/**
   * Property-based event handler for the `pointerout` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerout = (event) => {
   *  //some function here that happens on pointerout
   * }
   */onpointerout:null,/**
   * Property-based event handler for the `pointerover` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerover = (event) => {
   *  //some function here that happens on pointerover
   * }
   */onpointerover:null,/**
   * Property-based event handler for the `pointertap` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointertap = (event) => {
   *  //some function here that happens on pointertap
   * }
   */onpointertap:null,/**
   * Property-based event handler for the `pointerup` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerup = (event) => {
   *  //some function here that happens on pointerup
   * }
   */onpointerup:null,/**
   * Property-based event handler for the `pointerupoutside` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onpointerupoutside = (event) => {
   *  //some function here that happens on pointerupoutside
   * }
   */onpointerupoutside:null,/**
   * Property-based event handler for the `rightclick` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onrightclick = (event) => {
   *  //some function here that happens on rightclick
   * }
   */onrightclick:null,/**
   * Property-based event handler for the `rightdown` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onrightdown = (event) => {
   *  //some function here that happens on rightdown
   * }
   */onrightdown:null,/**
   * Property-based event handler for the `rightup` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onrightup = (event) => {
   *  //some function here that happens on rightup
   * }
   */onrightup:null,/**
   * Property-based event handler for the `rightupoutside` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onrightupoutside = (event) => {
   *  //some function here that happens on rightupoutside
   * }
   */onrightupoutside:null,/**
   * Property-based event handler for the `tap` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontap = (event) => {
   *  //some function here that happens on tap
   * }
   */ontap:null,/**
   * Property-based event handler for the `touchcancel` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontouchcancel = (event) => {
   *  //some function here that happens on touchcancel
   * }
   */ontouchcancel:null,/**
   * Property-based event handler for the `touchend` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontouchend = (event) => {
   *  //some function here that happens on touchend
   * }
   */ontouchend:null,/**
   * Property-based event handler for the `touchendoutside` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontouchendoutside = (event) => {
   *  //some function here that happens on touchendoutside
   * }
   */ontouchendoutside:null,/**
   * Property-based event handler for the `touchmove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontouchmove = (event) => {
   *  //some function here that happens on touchmove
   * }
   */ontouchmove:null,/**
   * Property-based event handler for the `globaltouchmove` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onglobaltouchmove = (event) => {
   *  //some function here that happens on globaltouchmove
   * }
   */onglobaltouchmove:null,/**
   * Property-based event handler for the `touchstart` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.ontouchstart = (event) => {
   *  //some function here that happens on touchstart
   * }
   */ontouchstart:null,/**
   * Property-based event handler for the `wheel` event.
   * @memberof PIXI.DisplayObject#
   * @default null
   * @example
   * this.onwheel = (event) => {
   *  //some function here that happens on wheel
   * }
   */onwheel:null,/**
   * @ignore
   */_internalInteractive:void 0,/**
   * Enable interaction events for the DisplayObject. Touch, pointer and mouse
   * @memberof PIXI.DisplayObject#
   */get interactive(){return this._internalInteractive??nC(nI.defaultEventMode)},set interactive(value){ta.deprecation("7.2.0","Setting interactive is deprecated, use eventMode = 'none'/'passive'/'auto'/'static'/'dynamic' instead."),this._internalInteractive=value,this.eventMode=value?"static":"auto"},/**
   * @ignore
   */_internalEventMode:void 0,/**
   * Enable interaction events for the DisplayObject. Touch, pointer and mouse.
   * This now replaces the `interactive` property.
   * There are 5 types of interaction settings:
   * - `'none'`: Ignores all interaction events, even on its children.
   * - `'passive'`: Does not emit events and ignores all hit testing on itself and non-interactive children.
   * Interactive children will still emit events.
   * - `'auto'`: Does not emit events but is hit tested if parent is interactive. Same as `interactive = false` in v7
   * - `'static'`: Emit events and is hit tested. Same as `interaction = true` in v7
   * - `'dynamic'`: Emits events and is hit tested but will also receive mock interaction events fired from a ticker to
   * allow for interaction when the mouse isn't moving
   * @example
   * import { Sprite } from 'pixi.js';
   *
   * const sprite = new Sprite(texture);
   * sprite.eventMode = 'static';
   * sprite.on('tap', (event) => {
   *     // Handle event
   * });
   * @memberof PIXI.DisplayObject#
   * @since 7.2.0
   */get eventMode(){return this._internalEventMode??nI.defaultEventMode},set eventMode(value){this._internalInteractive=nC(value),this._internalEventMode=value},/**
   * Determines if the displayObject is interactive or not
   * @returns {boolean} Whether the displayObject is interactive or not
   * @memberof PIXI.DisplayObject#
   * @since 7.2.0
   * @example
   * import { Sprite } from 'pixi.js';
   * const sprite = new Sprite(texture);
   * sprite.eventMode = 'static';
   * sprite.isInteractive(); // true
   *
   * sprite.eventMode = 'dynamic';
   * sprite.isInteractive(); // true
   *
   * sprite.eventMode = 'none';
   * sprite.isInteractive(); // false
   *
   * sprite.eventMode = 'passive';
   * sprite.isInteractive(); // false
   *
   * sprite.eventMode = 'auto';
   * sprite.isInteractive(); // false
   */isInteractive(){return"static"===this.eventMode||"dynamic"===this.eventMode},/**
   * Determines if the children to the displayObject can be clicked/touched
   * Setting this to false allows PixiJS to bypass a recursive `hitTest` function
   * @memberof PIXI.Container#
   */interactiveChildren:!0,/**
   * Interaction shape. Children will be hit first, then this shape will be checked.
   * Setting this will cause this shape to be checked in hit tests rather than the displayObject's bounds.
   * @example
   * import { Rectangle, Sprite } from 'pixi.js';
   *
   * const sprite = new Sprite(texture);
   * sprite.interactive = true;
   * sprite.hitArea = new Rectangle(0, 0, 100, 100);
   * @member {PIXI.IHitArea}
   * @memberof PIXI.DisplayObject#
   */hitArea:null,/**
   * Unlike `on` or `addListener` which are methods from EventEmitter, `addEventListener`
   * seeks to be compatible with the DOM's `addEventListener` with support for options.
   * **IMPORTANT:** _Only_ available if using the `@pixi/events` package.
   * @memberof PIXI.DisplayObject
   * @param type - The type of event to listen to.
   * @param listener - The listener callback or object.
   * @param options - Listener options, used for capture phase.
   * @example
   * // Tell the user whether they did a single, double, triple, or nth click.
   * button.addEventListener('click', {
   *     handleEvent(e): {
   *         let prefix;
   *
   *         switch (e.detail) {
   *             case 1: prefix = 'single'; break;
   *             case 2: prefix = 'double'; break;
   *             case 3: prefix = 'triple'; break;
   *             default: prefix = e.detail + 'th'; break;
   *         }
   *
   *         console.log('That was a ' + prefix + 'click');
   *     }
   * });
   *
   * // But skip the first click!
   * button.parent.addEventListener('click', function blockClickOnce(e) {
   *     e.stopImmediatePropagation();
   *     button.parent.removeEventListener('click', blockClickOnce, true);
   * }, {
   *     capture: true,
   * });
   */addEventListener(t,e,r){let i="boolean"==typeof r&&r||"object"==typeof r&&r.capture,s="function"==typeof e?void 0:e;t=i?`${t}capture`:t,e="function"==typeof e?e:e.handleEvent,this.on(t,e,s)},/**
   * Unlike `off` or `removeListener` which are methods from EventEmitter, `removeEventListener`
   * seeks to be compatible with the DOM's `removeEventListener` with support for options.
   * **IMPORTANT:** _Only_ available if using the `@pixi/events` package.
   * @memberof PIXI.DisplayObject
   * @param type - The type of event the listener is bound to.
   * @param listener - The listener callback or object.
   * @param options - The original listener options. This is required to deregister a capture phase listener.
   */removeEventListener(t,e,r){let i="boolean"==typeof r&&r||"object"==typeof r&&r.capture,s="function"==typeof e?void 0:e;t=i?`${t}capture`:t,e="function"==typeof e?e:e.handleEvent,this.off(t,e,s)},/**
   * Dispatch the event on this {@link PIXI.DisplayObject} using the event's {@link PIXI.EventBoundary}.
   *
   * The target of the event is set to `this` and the `defaultPrevented` flag is cleared before dispatch.
   *
   * **IMPORTANT:** _Only_ available if using the `@pixi/events` package.
   * @memberof PIXI.DisplayObject
   * @param e - The event to dispatch.
   * @returns Whether the {@link PIXI.FederatedEvent.preventDefault preventDefault}() method was not invoked.
   * @example
   * // Reuse a click event!
   * button.dispatchEvent(clickEvent);
   */dispatchEvent(t){if(!(t instanceof nv))throw Error("DisplayObject cannot propagate events outside of the Federated Events API");return t.defaultPrevented=!1,t.path=null,t.target=this,t.manager.dispatchEvent(t),!t.defaultPrevented}};sV.mixin(nM);const nP={/**
   *  Flag for if the object is accessible. If true AccessibilityManager will overlay a
   *   shadow div with attributes set
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   */accessible:!1,/**
   * Sets the title attribute of the shadow div
   * If accessibleTitle AND accessibleHint has not been this will default to 'displayObject [tabIndex]'
   * @member {?string}
   * @memberof PIXI.DisplayObject#
   */accessibleTitle:null,/**
   * Sets the aria-label attribute of the shadow div
   * @member {string}
   * @memberof PIXI.DisplayObject#
   */accessibleHint:null,/**
   * @member {number}
   * @memberof PIXI.DisplayObject#
   * @private
   * @todo Needs docs.
   */tabIndex:0,/**
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   * @todo Needs docs.
   */_accessibleActive:!1,/**
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   * @todo Needs docs.
   */_accessibleDiv:null,/**
   * Specify the type of div the accessible layer is. Screen readers treat the element differently
   * depending on this type. Defaults to button.
   * @member {string}
   * @memberof PIXI.DisplayObject#
   * @default 'button'
   */accessibleType:"button",/**
   * Specify the pointer-events the accessible div will use
   * Defaults to auto.
   * @member {string}
   * @memberof PIXI.DisplayObject#
   * @default 'auto'
   */accessiblePointerEvents:"auto",/**
   * Setting to false will prevent any children inside this container to
   * be accessible. Defaults to true.
   * @member {boolean}
   * @memberof PIXI.DisplayObject#
   * @default true
   */accessibleChildren:!0,renderId:-1};sV.mixin(nP);class nD{// 2fps
/**
   * @param {PIXI.CanvasRenderer|PIXI.Renderer} renderer - A reference to the current renderer
   */constructor(t){this.debug=!1,this._isActive=!1,this._isMobileAccessibility=!1,this.pool=[],this.renderId=0,this.children=[],this.androidUpdateCount=0,this.androidUpdateFrequency=500,this._hookDiv=null,(ta.isMobile.tablet||ta.isMobile.phone)&&this.createTouchHook();let e=document.createElement("div");e.style.width="100px",e.style.height="100px",e.style.position="absolute",e.style.top="0px",e.style.left="0px",e.style.zIndex="2",this.div=e,this.renderer=t,this._onKeyDown=this._onKeyDown.bind(this),this._onMouseMove=this._onMouseMove.bind(this),globalThis.addEventListener("keydown",this._onKeyDown,!1)}/**
   * Value of `true` if accessibility is currently active and accessibility layers are showing.
   * @member {boolean}
   * @readonly
   */get isActive(){return this._isActive}/**
   * Value of `true` if accessibility is enabled for touch devices.
   * @member {boolean}
   * @readonly
   */get isMobileAccessibility(){return this._isMobileAccessibility}/**
   * Creates the touch hooks.
   * @private
   */createTouchHook(){let t=document.createElement("button");t.style.width="1px",t.style.height="1px",t.style.position="absolute",t.style.top="-1000px",t.style.left="-1000px",t.style.zIndex="2",t.style.backgroundColor="#FF0000",t.title="select to enable accessibility for this content",t.addEventListener("focus",()=>{this._isMobileAccessibility=!0,this.activate(),this.destroyTouchHook()}),document.body.appendChild(t),this._hookDiv=t}/**
   * Destroys the touch hooks.
   * @private
   */destroyTouchHook(){this._hookDiv&&(document.body.removeChild(this._hookDiv),this._hookDiv=null)}/**
   * Activating will cause the Accessibility layer to be shown.
   * This is called when a user presses the tab key.
   * @private
   */activate(){this._isActive||(this._isActive=!0,globalThis.document.addEventListener("mousemove",this._onMouseMove,!0),globalThis.removeEventListener("keydown",this._onKeyDown,!1),this.renderer.on("postrender",this.update,this),this.renderer.view.parentNode?.appendChild(this.div))}/**
   * Deactivating will cause the Accessibility layer to be hidden.
   * This is called when a user moves the mouse.
   * @private
   */deactivate(){!this._isActive||this._isMobileAccessibility||(this._isActive=!1,globalThis.document.removeEventListener("mousemove",this._onMouseMove,!0),globalThis.addEventListener("keydown",this._onKeyDown,!1),this.renderer.off("postrender",this.update),this.div.parentNode?.removeChild(this.div))}/**
   * This recursive function will run through the scene graph and add any new accessible objects to the DOM layer.
   * @private
   * @param {PIXI.Container} displayObject - The DisplayObject to check.
   */updateAccessibleObjects(t){if(!t.visible||!t.accessibleChildren)return;t.accessible&&t.isInteractive()&&(t._accessibleActive||this.addChild(t),t.renderId=this.renderId);let e=t.children;if(e)for(let t=0;t<e.length;t++)this.updateAccessibleObjects(e[t])}/**
   * Before each render this function will ensure that all divs are mapped correctly to their DisplayObjects.
   * @private
   */update(){let t=performance.now();if(ta.isMobile.android.device&&t<this.androidUpdateCount||(this.androidUpdateCount=t+this.androidUpdateFrequency,!this.renderer.renderingToScreen))return;this.renderer.lastObjectRendered&&this.updateAccessibleObjects(this.renderer.lastObjectRendered);let{x:e,y:r,width:i,height:s}=this.renderer.view.getBoundingClientRect(),{width:n,height:a,resolution:o}=this.renderer,h=i/n*o,l=s/a*o,u=this.div;u.style.left=`${e}px`,u.style.top=`${r}px`,u.style.width=`${n}px`,u.style.height=`${a}px`;for(let t=0;t<this.children.length;t++){let e=this.children[t];if(e.renderId!==this.renderId)e._accessibleActive=!1,ta.removeItems(this.children,t,1),this.div.removeChild(e._accessibleDiv),this.pool.push(e._accessibleDiv),e._accessibleDiv=null,t--;else{u=e._accessibleDiv;let t=e.hitArea,r=e.worldTransform;e.hitArea?(u.style.left=`${(r.tx+t.x*r.a)*h}px`,u.style.top=`${(r.ty+t.y*r.d)*l}px`,u.style.width=`${t.width*r.a*h}px`,u.style.height=`${t.height*r.d*l}px`):(t=e.getBounds(),this.capHitArea(t),u.style.left=`${t.x*h}px`,u.style.top=`${t.y*l}px`,u.style.width=`${t.width*h}px`,u.style.height=`${t.height*l}px`,u.title!==e.accessibleTitle&&null!==e.accessibleTitle&&(u.title=e.accessibleTitle),u.getAttribute("aria-label")!==e.accessibleHint&&null!==e.accessibleHint&&u.setAttribute("aria-label",e.accessibleHint)),(e.accessibleTitle!==u.title||e.tabIndex!==u.tabIndex)&&(u.title=e.accessibleTitle,u.tabIndex=e.tabIndex,this.debug&&this.updateDebugHTML(u))}}this.renderId++}/**
   * private function that will visually add the information to the
   * accessability div
   * @param {HTMLElement} div -
   */updateDebugHTML(t){t.innerHTML=`type: ${t.type}</br> title : ${t.title}</br> tabIndex: ${t.tabIndex}`}/**
   * Adjust the hit area based on the bounds of a display object
   * @param {PIXI.Rectangle} hitArea - Bounds of the child
   */capHitArea(t){t.x<0&&(t.width+=t.x,t.x=0),t.y<0&&(t.height+=t.y,t.y=0);let{width:e,height:r}=this.renderer;t.x+t.width>e&&(t.width=e-t.x),t.y+t.height>r&&(t.height=r-t.y)}/**
   * Adds a DisplayObject to the accessibility manager
   * @private
   * @param {PIXI.DisplayObject} displayObject - The child to make accessible.
   */addChild(t){let e=this.pool.pop();e||((e=document.createElement("button")).style.width="100px",e.style.height="100px",e.style.backgroundColor=this.debug?"rgba(255,255,255,0.5)":"transparent",e.style.position="absolute",e.style.zIndex="2",e.style.borderStyle="none",navigator.userAgent.toLowerCase().includes("chrome")?e.setAttribute("aria-live","off"):e.setAttribute("aria-live","polite"),navigator.userAgent.match(/rv:.*Gecko\//)?e.setAttribute("aria-relevant","additions"):e.setAttribute("aria-relevant","text"),e.addEventListener("click",this._onClick.bind(this)),e.addEventListener("focus",this._onFocus.bind(this)),e.addEventListener("focusout",this._onFocusOut.bind(this))),e.style.pointerEvents=t.accessiblePointerEvents,e.type=t.accessibleType,t.accessibleTitle&&null!==t.accessibleTitle?e.title=t.accessibleTitle:t.accessibleHint&&null!==t.accessibleHint||(e.title=`displayObject ${t.tabIndex}`),t.accessibleHint&&null!==t.accessibleHint&&e.setAttribute("aria-label",t.accessibleHint),this.debug&&this.updateDebugHTML(e),t._accessibleActive=!0,t._accessibleDiv=e,e.displayObject=t,this.children.push(t),this.div.appendChild(t._accessibleDiv),t._accessibleDiv.tabIndex=t.tabIndex}/**
   * Dispatch events with the EventSystem.
   * @param e
   * @param type
   * @private
   */_dispatchEvent(t,e){let{displayObject:r}=t.target,i=this.renderer.events.rootBoundary,s=Object.assign(new nv(i),{target:r});i.rootTarget=this.renderer.lastObjectRendered,e.forEach(t=>i.dispatchEvent(s,t))}/**
   * Maps the div button press to pixi's EventSystem (click)
   * @private
   * @param {MouseEvent} e - The click event.
   */_onClick(t){this._dispatchEvent(t,["click","pointertap","tap"])}/**
   * Maps the div focus events to pixi's EventSystem (mouseover)
   * @private
   * @param {FocusEvent} e - The focus event.
   */_onFocus(t){t.target.getAttribute("aria-live")||t.target.setAttribute("aria-live","assertive"),this._dispatchEvent(t,["mouseover"])}/**
   * Maps the div focus events to pixi's EventSystem (mouseout)
   * @private
   * @param {FocusEvent} e - The focusout event.
   */_onFocusOut(t){t.target.getAttribute("aria-live")||t.target.setAttribute("aria-live","polite"),this._dispatchEvent(t,["mouseout"])}/**
   * Is called when a key is pressed
   * @private
   * @param {KeyboardEvent} e - The keydown event.
   */_onKeyDown(t){9===t.keyCode&&this.activate()}/**
   * Is called when the mouse moves across the renderer element
   * @private
   * @param {MouseEvent} e - The mouse event.
   */_onMouseMove(t){0===t.movementX&&0===t.movementY||this.deactivate()}/** Destroys the accessibility manager */destroy(){this.destroyTouchHook(),this.div=null,globalThis.document.removeEventListener("mousemove",this._onMouseMove,!0),globalThis.removeEventListener("keydown",this._onKeyDown),this.pool=null,this.children=null,this.renderer=null}}nD.extension={name:"accessibility",type:[e$.RendererPlugin,e$.CanvasRendererPlugin]},eK.add(nD);var nO={};h(nO,"Application",()=>nF),h(nO,"ResizePlugin",()=>nN);const nB=class t{/**
   * @param options - The optional application and renderer parameters.
   */constructor(e){this.stage=new sq,e=Object.assign({forceCanvas:!1},e),this.renderer=sv(e),t._plugins.forEach(t=>{t.init.call(this,e)})}/** Render the current stage. */render(){this.renderer.render(this.stage)}/**
   * Reference to the renderer's canvas element.
   * @member {PIXI.ICanvas}
   * @readonly
   */get view(){return this.renderer?.view}/**
   * Reference to the renderer's screen rectangle. Its safe to use as `filterArea` or `hitArea` for the whole screen.
   * @member {PIXI.Rectangle}
   * @readonly
   */get screen(){return this.renderer?.screen}/**
   * Destroy and don't use after this.
   * @param {boolean} [removeView=false] - Automatically remove canvas from DOM.
   * @param {object|boolean} [stageOptions] - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [stageOptions.children=false] - if set to true, all the children will have their destroy
   *  method called as well. 'stageOptions' will be passed on to those calls.
   * @param {boolean} [stageOptions.texture=false] - Only used for child Sprites if stageOptions.children is set
   *  to true. Should it destroy the texture of the child sprite
   * @param {boolean} [stageOptions.baseTexture=false] - Only used for child Sprites if stageOptions.children is set
   *  to true. Should it destroy the base texture of the child sprite
   */destroy(e,r){let i=t._plugins.slice(0);i.reverse(),i.forEach(t=>{t.destroy.call(this)}),this.stage.destroy(r),this.stage=null,this.renderer.destroy(e),this.renderer=null}};nB._plugins=[];let nF=nB;eK.handleByList(e$.Application,nF._plugins);class nN{/**
   * Initialize the plugin with scope of application instance
   * @static
   * @private
   * @param {object} [options] - See application options
   */static init(t){Object.defineProperty(this,"resizeTo",/**
       * The HTML element or window to automatically resize the
       * renderer's view element to match width and height.
       * @member {Window|HTMLElement}
       * @name resizeTo
       * @memberof PIXI.Application#
       */{set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this.cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this.cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{let t,e;if(this._resizeTo){if(this.cancelResize(),this._resizeTo===globalThis.window)t=globalThis.innerWidth,e=globalThis.innerHeight;else{let{clientWidth:r,clientHeight:i}=this._resizeTo;t=r,e=i}this.renderer.resize(t,e),this.render()}},this._resizeId=null,this._resizeTo=null,this.resizeTo=t.resizeTo||null}/**
   * Clean up the ticker, scoped to application
   * @static
   * @private
   */static destroy(){globalThis.removeEventListener("resize",this.queueResize),this.cancelResize(),this.cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}nN.extension=e$.Application,eK.add(nN);var nL={};h(nL,"Assets",()=>au),h(nL,"AssetsClass",()=>al),h(nL,"Cache",()=>nX),h(nL,"LoaderParserPriority",()=>nY),h(nL,"cacheTextureArray",()=>ad),h(nL,"checkDataUrl",()=>nG),h(nL,"checkExtension",()=>nH),h(nL,"convertToList",()=>nj),h(nL,"copySearchParams",()=>nz),h(nL,"createStringVariations",()=>nV),h(nL,"createTexture",()=>n9),h(nL,"detectAvif",()=>ap),h(nL,"detectDefaults",()=>ag),h(nL,"detectMp4",()=>ax),h(nL,"detectOgv",()=>ab),h(nL,"detectWebm",()=>av),h(nL,"detectWebp",()=>af),h(nL,"getFontFamilyName",()=>n1),h(nL,"isSingleItem",()=>nW),h(nL,"loadImageBitmap",()=>ar),h(nL,"loadJson",()=>nq),h(nL,"loadSVG",()=>as),h(nL,"loadTextures",()=>ai),h(nL,"loadTxt",()=>nK),h(nL,"loadVideo",()=>ao),h(nL,"loadWebFont",()=>n3),h(nL,"resolveTextureUrl",()=>aT);const nk={loader:e$.LoadParser,resolver:e$.ResolveParser,cache:e$.CacheParser,detection:e$.DetectionParser};eK.handle(e$.Asset,t=>{let e=t.ref;Object.entries(nk).filter(([t])=>!!e[t]).forEach(([t,r])=>eK.add(Object.assign(e[t],// ExtensionMetadata, the use cases here is priority for LoaderParsers
    {extension:e[t].extension??r})))},t=>{let e=t.ref;Object.keys(nk).filter(t=>!!e[t]).forEach(t=>eK.remove(e[t]))});class nU{/**
   * @param loader
   * @param verbose - should the loader log to the console
   */constructor(t,e=!1){this._loader=t,this._assetList=[],this._isLoading=!1,this._maxConcurrent=1,this.verbose=e}/**
   * Adds an array of assets to load.
   * @param assetUrls - assets to load
   */add(t){t.forEach(t=>{this._assetList.push(t)}),this.verbose&&console.log("[BackgroundLoader] assets: ",this._assetList),this._isActive&&!this._isLoading&&this._next()}/**
   * Loads the next set of assets. Will try to load as many assets as it can at the same time.
   *
   * The max assets it will try to load at one time will be 4.
   */async _next(){if(this._assetList.length&&this._isActive){this._isLoading=!0;let t=[],e=Math.min(this._assetList.length,this._maxConcurrent);for(let r=0;r<e;r++)t.push(this._assetList.pop());await this._loader.load(t),this._isLoading=!1,this._next()}}/**
   * Activate/Deactivate the loading. If set to true then it will immediately continue to load the next asset.
   * @returns whether the class is active
   */get active(){return this._isActive}set active(t){this._isActive!==t&&(this._isActive=t,t&&!this._isLoading&&this._next())}}function nG(t,e){if(Array.isArray(e)){for(let r of e)if(t.startsWith(`data:${r}`))return!0;return!1}return t.startsWith(`data:${e}`)}function nH(t,e){let r=t.split("?")[0],i=ta.path.extname(r).toLowerCase();return Array.isArray(e)?e.includes(i):i===e}const nj=(t,e,r=!1)=>(Array.isArray(t)||(t=[t]),e?t.map(t=>"string"==typeof t||r?e(t):t):t),nz=(t,e)=>{let r=e.split("?")[1];return r&&(t+=`?${r}`),t};function nV(t){let e=t.match(/\{(.*?)\}/g),r=[];if(e){let i=[];e.forEach(t=>{let e=t.substring(1,t.length-1).split(",");i.push(e)}),function t(e,r,i,s,n){let a=r[i];for(let o=0;o<a.length;o++){let h=a[o];i<r.length-1?t(e.replace(s[i],h),r,i+1,s,n):n.push(e.replace(s[i],h))}}(t,i,0,e,r)}else r.push(t);return r}const nW=t=>!Array.isArray(t),nX=new class{constructor(){this._parsers=[],this._cache=/* @__PURE__ */new Map,this._cacheMap=/* @__PURE__ */new Map}/** Clear all entries. */reset(){this._cacheMap.clear(),this._cache.clear()}/**
   * Check if the key exists
   * @param key - The key to check
   */has(t){return this._cache.has(t)}/**
   * Fetch entry by key
   * @param key - The key of the entry to get
   */get(t){let e=this._cache.get(t);return e||console.warn(`[Assets] Asset id ${t} was not found in the Cache`),e}/**
   * Set a value by key or keys name
   * @param key - The key or keys to set
   * @param value - The value to store in the cache or from which cacheable assets will be derived.
   */set(t,e){let r;let i=nj(t);for(let t=0;t<this.parsers.length;t++){let s=this.parsers[t];if(s.test(e)){r=s.getCacheableAssets(i,e);break}}r||(r={},i.forEach(t=>{r[t]=e}));let s=Object.keys(r),n={cacheKeys:s,keys:i};i.forEach(t=>{this._cacheMap.set(t,n)}),s.forEach(t=>{this._cache.has(t)&&this._cache.get(t)!==e&&console.warn("[Cache] already has key:",t),this._cache.set(t,r[t])}),e instanceof iv&&i.forEach(t=>{e.baseTexture!==iv.EMPTY.baseTexture&&e9.addToCache(e.baseTexture,t),iv.addToCache(e,t)})}/**
   * Remove entry by key
   *
   * This function will also remove any associated alias from the cache also.
   * @param key - The key of the entry to remove
   */remove(t){if(!this._cacheMap.has(t)){console.warn(`[Assets] Asset id ${t} was not found in the Cache`);return}let e=this._cacheMap.get(t);e.cacheKeys.forEach(t=>{this._cache.delete(t)}),e.keys.forEach(t=>{this._cacheMap.delete(t)})}/** All loader parsers registered */get parsers(){return this._parsers}};class n${constructor(){this._parsers=[],this._parsersValidated=!1,this.parsers=new Proxy(this._parsers,{set:(t,e,r)=>(this._parsersValidated=!1,t[e]=r,!0)}),this.promiseCache={}}/** function used for testing */reset(){this._parsersValidated=!1,this.promiseCache={}}/**
   * Used internally to generate a promise for the asset to be loaded.
   * @param url - The URL to be loaded
   * @param data - any custom additional information relevant to the asset being loaded
   * @returns - a promise that will resolve to an Asset for example a Texture of a JSON object
   */_getLoadPromiseAndParser(t,e){let r={promise:null,parser:null};return r.promise=(async()=>{let i=null,s=null;if(e.loadParser&&((s=this._parserHash[e.loadParser])||console.warn(`[Assets] specified load parser "${e.loadParser}" not found while loading ${t}`)),!s){for(let r=0;r<this.parsers.length;r++){let i=this.parsers[r];if(i.load&&i.test?.(t,e,this)){s=i;break}}if(!s)return console.warn(`[Assets] ${t} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`),null}i=await s.load(t,e,this),r.parser=s;for(let t=0;t<this.parsers.length;t++){let s=this.parsers[t];s.parse&&s.parse&&await s.testParse?.(i,e,this)&&(i=await s.parse(i,e,this)||i,r.parser=s)}return i})(),r}async load(t,e){this._parsersValidated||this._validateParsers();let r=0,i={},s=nW(t),n=nj(t,t=>({alias:[t],src:t})),a=n.length,o=n.map(async t=>{let s=ta.path.toAbsolute(t.src);if(!i[t.src])try{this.promiseCache[s]||(this.promiseCache[s]=this._getLoadPromiseAndParser(s,t)),i[t.src]=await this.promiseCache[s].promise,e&&e(++r/a)}catch(e){throw delete this.promiseCache[s],delete i[t.src],Error(`[Loader.load] Failed to load ${s}.
${e}`)}});return await Promise.all(o),s?i[n[0].src]:i}/**
   * Unloads one or more assets. Any unloaded assets will be destroyed, freeing up memory for your app.
   * The parser that created the asset, will be the one that unloads it.
   * @example
   * // Single asset:
   * const asset = await Loader.load('cool.png');
   *
   * await Loader.unload('cool.png');
   *
   * console.log(asset.destroyed); // true
   * @param assetsToUnloadIn - urls that you want to unload, or a single one!
   */async unload(t){let e=nj(t,t=>({alias:[t],src:t})).map(async t=>{let e=ta.path.toAbsolute(t.src),r=this.promiseCache[e];if(r){let i=await r.promise;delete this.promiseCache[e],r.parser?.unload?.(i,t,this)}});await Promise.all(e)}/** validates our parsers, right now it only checks for name conflicts but we can add more here as required! */_validateParsers(){this._parsersValidated=!0,this._parserHash=this._parsers.filter(t=>t.name).reduce((t,e)=>(t[e.name]&&console.warn(`[Assets] loadParser name conflict "${e.name}"`),{...t,[e.name]:e}),{})}}var nY=((ls=nY||{})[ls.Low=0]="Low",ls[ls.Normal=1]="Normal",ls[ls.High=2]="High",ls);const nq={extension:{type:e$.LoadParser,priority:nY.Low},name:"loadJson",test:t=>nG(t,"application/json")||nH(t,".json"),load:async t=>await (await G.ADAPTER.fetch(t)).json()};eK.add(nq);const nK={name:"loadTxt",extension:{type:e$.LoadParser,priority:nY.Low},test:t=>nG(t,"text/plain")||nH(t,".txt"),load:async t=>await (await G.ADAPTER.fetch(t)).text()};eK.add(nK);const nZ=["normal","bold","100","200","300","400","500","600","700","800","900"],nQ=[".ttf",".otf",".woff",".woff2"],nJ=["font/ttf","font/otf","font/woff","font/woff2"],n0=/^(--|-?[A-Z_])[0-9A-Z_-]*$/i;function n1(t){let e=ta.path.extname(t),r=ta.path.basename(t,e).replace(/(-|_)/g," ").toLowerCase().split(" ").map(t=>t.charAt(0).toUpperCase()+t.slice(1)),i=r.length>0;for(let t of r)if(!t.match(n0)){i=!1;break}let s=r.join(" ");return i||(s=`"${s.replace(/[\\"]/g,"\\$&")}"`),s}const n2=/^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/,n3={extension:{type:e$.LoadParser,priority:nY.Low},name:"loadWebFont",test:t=>nG(t,nJ)||nH(t,nQ),async load(t,e){let r=G.ADAPTER.getFontFaceSet();if(r){let i=[],s=e.data?.family??n1(t),n=e.data?.weights?.filter(t=>nZ.includes(t))??["normal"],a=e.data??{};for(let e=0;e<n.length;e++){let o=n[e],h=new FontFace(s,`url(${n2.test(t)?t:encodeURI(t)})`,{...a,weight:o});await h.load(),r.add(h),i.push(h)}return 1===i.length?i[0]:i}return console.warn("[loadWebFont] FontFace API is not supported. Skipping loading font"),null},unload(t){(Array.isArray(t)?t:[t]).forEach(t=>G.ADAPTER.getFontFaceSet().delete(t))}};eK.add(n3);let n4=0,n5;const n6={id:"checkImageBitmap",code:`
    async function checkImageBitmap()
    {
        try
        {
            if (typeof createImageBitmap !== 'function') return false;

            const response = await fetch('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=');
            const imageBlob =  await response.blob();
            const imageBitmap = await createImageBitmap(imageBlob);

            return imageBitmap.width === 1 && imageBitmap.height === 1;
        }
        catch (e)
        {
            return false;
        }
    }
    checkImageBitmap().then((result) => { self.postMessage(result); });
    `},n8={id:"loadImageBitmap",code:`
    async function loadImageBitmap(url)
    {
        const response = await fetch(url);

        if (!response.ok)
        {
            throw new Error(\`[WorkerManager.loadImageBitmap] Failed to fetch \${url}: \`
                + \`\${response.status} \${response.statusText}\`);
        }

        const imageBlob =  await response.blob();
        const imageBitmap = await createImageBitmap(imageBlob);

        return imageBitmap;
    }
    self.onmessage = async (event) =>
    {
        try
        {
            const imageBitmap = await loadImageBitmap(event.data.data[0]);

            self.postMessage({
                data: imageBitmap,
                uuid: event.data.uuid,
                id: event.data.id,
            }, [imageBitmap]);
        }
        catch(e)
        {
            self.postMessage({
                error: e,
                uuid: event.data.uuid,
                id: event.data.id,
            });
        }
    };`},n7=new class{constructor(){this._initialized=!1,this._createdWorkers=0,this.workerPool=[],this.queue=[],this.resolveHash={}}isImageBitmapSupported(){return void 0!==this._isImageBitmapSupported||(this._isImageBitmapSupported=new Promise(t=>{let e=URL.createObjectURL(new Blob([n6.code],{type:"application/javascript"})),r=new Worker(e);r.addEventListener("message",i=>{r.terminate(),URL.revokeObjectURL(e),t(i.data)})})),this._isImageBitmapSupported}loadImageBitmap(t){return this._run("loadImageBitmap",[t])}async _initWorkers(){this._initialized||(this._initialized=!0)}getWorker(){void 0===n5&&(n5=navigator.hardwareConcurrency||4);let t=this.workerPool.pop();return!t&&this._createdWorkers<n5&&(s||(s=URL.createObjectURL(new Blob([n8.code],{type:"application/javascript"}))),this._createdWorkers++,(t=new Worker(s)).addEventListener("message",t=>{this.complete(t.data),this.returnWorker(t.target),this.next()})),t}returnWorker(t){this.workerPool.push(t)}complete(t){void 0!==t.error?this.resolveHash[t.uuid].reject(t.error):this.resolveHash[t.uuid].resolve(t.data),this.resolveHash[t.uuid]=null}async _run(t,e){await this._initWorkers();let r=new Promise((r,i)=>{this.queue.push({id:t,arguments:e,resolve:r,reject:i})});return this.next(),r}next(){if(!this.queue.length)return;let t=this.getWorker();if(!t)return;let e=this.queue.pop(),r=e.id;this.resolveHash[n4]={resolve:e.resolve,reject:e.reject},t.postMessage({data:e.arguments,uuid:n4++,id:r})}};function n9(t,e,r){t.resource.internal=!0;let i=new iv(t),s=()=>{delete e.promiseCache[r],nX.has(r)&&nX.remove(r)};return i.baseTexture.once("destroyed",()=>{r in e.promiseCache&&(console.warn("[Assets] A BaseTexture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the BaseTexture."),s())}),i.once("destroyed",()=>{t.destroyed||(console.warn("[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture."),s())}),i}const at=[".jpeg",".jpg",".png",".webp",".avif"],ae=["image/jpeg","image/png","image/webp","image/avif"];async function ar(t){let e=await G.ADAPTER.fetch(t);if(!e.ok)throw Error(`[loadImageBitmap] Failed to fetch ${t}: ${e.status} ${e.statusText}`);let r=await e.blob();return await createImageBitmap(r)}const ai={name:"loadTextures",extension:{type:e$.LoadParser,priority:nY.High},config:{preferWorkers:!0,preferCreateImageBitmap:!0,crossOrigin:"anonymous"},test:t=>nG(t,ae)||nH(t,at),async load(t,e,r){let i;let s=globalThis.createImageBitmap&&this.config.preferCreateImageBitmap;i=s?this.config.preferWorkers&&await n7.isImageBitmapSupported()?await n7.loadImageBitmap(t):await ar(t):await new Promise((e,r)=>{let i=new Image;i.crossOrigin=this.config.crossOrigin,i.src=t,i.complete?e(i):(i.onload=()=>e(i),i.onerror=t=>r(t))});let n={...e.data};n.resolution??(n.resolution=ta.getResolutionOfUrl(t)),s&&n.resourceOptions?.ownsImageBitmap===void 0&&(n.resourceOptions={...n.resourceOptions},n.resourceOptions.ownsImageBitmap=!0);let a=new e9(i,n);return a.resource.src=t,n9(a,r,t)},unload(t){t.destroy(!0)}};eK.add(ai);const as={extension:{type:e$.LoadParser,priority:nY.High},name:"loadSVG",test:t=>nG(t,"image/svg+xml")||nH(t,".svg"),testParse:async t=>sL.test(t),async parse(t,e,r){let i=new sL(t,e?.data?.resourceOptions);await i.load();let s=new e9(i,{resolution:ta.getResolutionOfUrl(t),...e?.data});return s.resource.src=e.src,n9(s,r,e.src)},load:async(t,e)=>(await G.ADAPTER.fetch(t)).text(),unload:ai.unload};eK.add(as);const an=[".mp4",".m4v",".webm",".ogv"],aa=["video/mp4","video/webm","video/ogg"],ao={name:"loadVideo",extension:{type:e$.LoadParser,priority:nY.High},config:{defaultAutoPlay:!0},test:t=>nG(t,aa)||nH(t,an),async load(t,e,r){let i;let s=await (await G.ADAPTER.fetch(t)).blob(),n=URL.createObjectURL(s);try{let s={autoPlay:this.config.defaultAutoPlay,...e?.data?.resourceOptions},a=new sU(n,s);await a.load();let o=new e9(a,{alphaMode:await ta.detectVideoAlphaMode(),resolution:ta.getResolutionOfUrl(t),...e?.data});o.resource.src=t,(i=n9(o,r,t)).baseTexture.once("destroyed",()=>{URL.revokeObjectURL(n)})}catch(t){throw URL.revokeObjectURL(n),t}return i},unload(t){t.destroy(!0)}};eK.add(ao);class ah{constructor(){this._defaultBundleIdentifierOptions={connector:"-",createBundleAssetId:(t,e)=>`${t}${this._bundleIdConnector}${e}`,extractAssetIdFromBundle:(t,e)=>e.replace(`${t}${this._bundleIdConnector}`,"")},this._bundleIdConnector=this._defaultBundleIdentifierOptions.connector,this._createBundleAssetId=this._defaultBundleIdentifierOptions.createBundleAssetId,this._extractAssetIdFromBundle=this._defaultBundleIdentifierOptions.extractAssetIdFromBundle,this._assetMap={},this._preferredOrder=[],this._parsers=[],this._resolverHash={},this._bundles={}}/**
   * Override how the resolver deals with generating bundle ids.
   * must be called before any bundles are added
   * @param bundleIdentifier - the bundle identifier options
   */setBundleIdentifier(t){if(this._bundleIdConnector=t.connector??this._bundleIdConnector,this._createBundleAssetId=t.createBundleAssetId??this._createBundleAssetId,this._extractAssetIdFromBundle=t.extractAssetIdFromBundle??this._extractAssetIdFromBundle,"bar"!==this._extractAssetIdFromBundle("foo",this._createBundleAssetId("foo","bar")))throw Error("[Resolver] GenerateBundleAssetId are not working correctly")}/**
   * Let the resolver know which assets you prefer to use when resolving assets.
   * Multiple prefer user defined rules can be added.
   * @example
   * resolver.prefer({
   *     // first look for something with the correct format, and then then correct resolution
   *     priority: ['format', 'resolution'],
   *     params:{
   *         format:'webp', // prefer webp images
   *         resolution: 2, // prefer a resolution of 2
   *     }
   * })
   * resolver.add('foo', ['bar@2x.webp', 'bar@2x.png', 'bar.webp', 'bar.png']);
   * resolver.resolveUrl('foo') // => 'bar@2x.webp'
   * @param preferOrders - the prefer options
   */prefer(...t){t.forEach(t=>{this._preferredOrder.push(t),t.priority||(t.priority=Object.keys(t.params))}),this._resolverHash={}}/**
   * Set the base path to prepend to all urls when resolving
   * @example
   * resolver.basePath = 'https://home.com/';
   * resolver.add('foo', 'bar.ong');
   * resolver.resolveUrl('foo', 'bar.png'); // => 'https://home.com/bar.png'
   * @param basePath - the base path to use
   */set basePath(t){this._basePath=t}get basePath(){return this._basePath}/**
   * Set the root path for root-relative URLs. By default the `basePath`'s root is used. If no `basePath` is set, then the
   * default value for browsers is `window.location.origin`
   * @example
   * // Application hosted on https://home.com/some-path/index.html
   * resolver.basePath = 'https://home.com/some-path/';
   * resolver.rootPath = 'https://home.com/';
   * resolver.add('foo', '/bar.png');
   * resolver.resolveUrl('foo', '/bar.png'); // => 'https://home.com/bar.png'
   * @param rootPath - the root path to use
   */set rootPath(t){this._rootPath=t}get rootPath(){return this._rootPath}/**
   * All the active URL parsers that help the parser to extract information and create
   * an asset object-based on parsing the URL itself.
   *
   * Can be added using the extensions API
   * @example
   * resolver.add('foo', [
   *     {
   *         resolution: 2,
   *         format: 'png',
   *         src: 'image@2x.png',
   *     },
   *     {
   *         resolution:1,
   *         format:'png',
   *         src: 'image.png',
   *     },
   * ]);
   *
   * // With a url parser the information such as resolution and file format could extracted from the url itself:
   * extensions.add({
   *     extension: ExtensionType.ResolveParser,
   *     test: loadTextures.test, // test if url ends in an image
   *     parse: (value: string) =>
   *     ({
   *         resolution: parseFloat(settings.RETINA_PREFIX.exec(value)?.[1] ?? '1'),
   *         format: value.split('.').pop(),
   *         src: value,
   *     }),
   * });
   *
   * // Now resolution and format can be extracted from the url
   * resolver.add('foo', [
   *     'image@2x.png',
   *     'image.png',
   * ]);
   */get parsers(){return this._parsers}/** Used for testing, this resets the resolver to its initial state */reset(){this.setBundleIdentifier(this._defaultBundleIdentifierOptions),this._assetMap={},this._preferredOrder=[],this._resolverHash={},this._rootPath=null,this._basePath=null,this._manifest=null,this._bundles={},this._defaultSearchParams=null}/**
   * Sets the default URL search parameters for the URL resolver. The urls can be specified as a string or an object.
   * @param searchParams - the default url parameters to append when resolving urls
   */setDefaultSearchParams(t){"string"==typeof t?this._defaultSearchParams=t:this._defaultSearchParams=Object.keys(t).map(e=>`${encodeURIComponent(e)}=${encodeURIComponent(t[e])}`).join("&")}/**
   * Returns the aliases for a given asset
   * @param asset - the asset to get the aliases for
   */getAlias(t){let{alias:e,name:r,src:i,srcs:s}=t;return nj(e||r||i||s,t=>"string"==typeof t?t:Array.isArray(t)?t.map(t=>t?.src??t?.srcs??t):t?.src||t?.srcs?t.src??t.srcs:t,!0)}/**
   * Add a manifest to the asset resolver. This is a nice way to add all the asset information in one go.
   * generally a manifest would be built using a tool.
   * @param manifest - the manifest to add to the resolver
   */addManifest(t){this._manifest&&console.warn("[Resolver] Manifest already exists, this will be overwritten"),this._manifest=t,t.bundles.forEach(t=>{this.addBundle(t.name,t.assets)})}/**
   * This adds a bundle of assets in one go so that you can resolve them as a group.
   * For example you could add a bundle for each screen in you pixi app
   * @example
   * resolver.addBundle('animals', {
   *     bunny: 'bunny.png',
   *     chicken: 'chicken.png',
   *     thumper: 'thumper.png',
   * });
   *
   * const resolvedAssets = await resolver.resolveBundle('animals');
   * @param bundleId - The id of the bundle to add
   * @param assets - A record of the asset or assets that will be chosen from when loading via the specified key
   */addBundle(t,e){let r=[];Array.isArray(e)?e.forEach(e=>{let i;let s=e.src??e.srcs,n=e.alias??e.name;if("string"==typeof n){let e=this._createBundleAssetId(t,n);r.push(e),i=[n,e]}else{let e=n.map(e=>this._createBundleAssetId(t,e));r.push(...e),i=[...n,...e]}this.add({...e,alias:i,src:s})}):Object.keys(e).forEach(i=>{let s=[i,this._createBundleAssetId(t,i)];if("string"==typeof e[i])this.add({alias:s,src:e[i]});else if(Array.isArray(e[i]))this.add({alias:s,src:e[i]});else{let t=e[i],r=t.src??t.srcs;this.add({...t,alias:s,src:Array.isArray(r)?r:[r]})}r.push(...s)}),this._bundles[t]=r}add(t,e,r,i,s){let n;let a=[];"string"==typeof t||Array.isArray(t)&&"string"==typeof t[0]?(ta.deprecation("7.2.0",`Assets.add now uses an object instead of individual parameters.
Please use Assets.add({ alias, src, data, format, loadParser }) instead.`),a.push({alias:t,src:e,data:r,format:i,loadParser:s})):Array.isArray(t)?a.push(...t):a.push(t),n=t=>{this.hasKey(t)&&console.warn(`[Resolver] already has key: ${t} overwriting`)},nj(a).forEach(t=>{let{src:e,srcs:r}=t,{data:i,format:s,loadParser:a}=t,o=nj(e||r).map(t=>"string"==typeof t?nV(t):Array.isArray(t)?t:[t]),h=this.getAlias(t);Array.isArray(h)?h.forEach(n):n(h);let l=[];o.forEach(t=>{t.forEach(t=>{let e={};if("object"!=typeof t){e.src=t;for(let r=0;r<this._parsers.length;r++){let i=this._parsers[r];if(i.test(t)){e=i.parse(t);break}}}else i=t.data??i,s=t.format??s,a=t.loadParser??a,e={...e,...t};if(!h)throw Error(`[Resolver] alias is undefined for this asset: ${e.src}`);e=this.buildResolvedAsset(e,{aliases:h,data:i,format:s,loadParser:a}),l.push(e)})}),h.forEach(t=>{this._assetMap[t]=l})})}// TODO: this needs an overload like load did in Assets
/**
   * If the resolver has had a manifest set via setManifest, this will return the assets urls for
   * a given bundleId or bundleIds.
   * @example
   * // Manifest Example
   * const manifest = {
   *     bundles: [
   *         {
   *             name: 'load-screen',
   *             assets: [
   *                 {
   *                     alias: 'background',
   *                     src: 'sunset.png',
   *                 },
   *                 {
   *                     alias: 'bar',
   *                     src: 'load-bar.{png,webp}',
   *                 },
   *             ],
   *         },
   *         {
   *             name: 'game-screen',
   *             assets: [
   *                 {
   *                     alias: 'character',
   *                     src: 'robot.png',
   *                 },
   *                 {
   *                     alias: 'enemy',
   *                     src: 'bad-guy.png',
   *                 },
   *             ],
   *         },
   *     ]
   * };
   *
   * resolver.setManifest(manifest);
   * const resolved = resolver.resolveBundle('load-screen');
   * @param bundleIds - The bundle ids to resolve
   * @returns All the bundles assets or a hash of assets for each bundle specified
   */resolveBundle(t){let e=nW(t);t=nj(t);let r={};return t.forEach(t=>{let e=this._bundles[t];if(e){let i=this.resolve(e),s={};for(let e in i){let r=i[e];s[this._extractAssetIdFromBundle(t,e)]=r}r[t]=s}}),e?r[t[0]]:r}/**
   * Does exactly what resolve does, but returns just the URL rather than the whole asset object
   * @param key - The key or keys to resolve
   * @returns - The URLs associated with the key(s)
   */resolveUrl(t){let e=this.resolve(t);if("string"!=typeof t){let t={};for(let r in e)t[r]=e[r].src;return t}return e.src}resolve(t){let e=nW(t);t=nj(t);let r={};return t.forEach(t=>{if(!this._resolverHash[t]){if(this._assetMap[t]){let e=this._assetMap[t],r=e[0],i=this._getPreferredOrder(e);i?.priority.forEach(t=>{i.params[t].forEach(r=>{let i=e.filter(e=>!!e[t]&&e[t]===r);i.length&&(e=i)})}),this._resolverHash[t]=e[0]??r}else this._resolverHash[t]=this.buildResolvedAsset({alias:[t],src:t},{})}r[t]=this._resolverHash[t]}),e?r[t[0]]:r}/**
   * Checks if an asset with a given key exists in the resolver
   * @param key - The key of the asset
   */hasKey(t){return!!this._assetMap[t]}/**
   * Checks if a bundle with the given key exists in the resolver
   * @param key - The key of the bundle
   */hasBundle(t){return!!this._bundles[t]}/**
   * Internal function for figuring out what prefer criteria an asset should use.
   * @param assets
   */_getPreferredOrder(t){for(let e=0;e<t.length;e++){let e=t[0],r=this._preferredOrder.find(t=>t.params.format.includes(e.format));if(r)return r}return this._preferredOrder[0]}/**
   * Appends the default url parameters to the url
   * @param url - The url to append the default parameters to
   * @returns - The url with the default parameters appended
   */_appendDefaultSearchParams(t){if(!this._defaultSearchParams)return t;let e=/\?/.test(t)?"&":"?";return`${t}${e}${this._defaultSearchParams}`}buildResolvedAsset(t,e){let{aliases:r,data:i,loadParser:s,format:n}=e;return(this._basePath||this._rootPath)&&(t.src=ta.path.toAbsolute(t.src,this._basePath,this._rootPath)),t.alias=r??t.alias??[t.src],t.src=this._appendDefaultSearchParams(t.src),t.data={...i||{},...t.data},t.loadParser=s??t.loadParser,t.format=n??ta.path.extname(t.src).slice(1),t.srcs=t.src,t.name=t.alias,t}}class al{constructor(){this._detections=[],this._initialized=!1,this.resolver=new ah,this.loader=new n$,this.cache=nX,this._backgroundLoader=new nU(this.loader),this._backgroundLoader.active=!0,this.reset()}/**
   * Best practice is to call this function before any loading commences
   * Initiating is the best time to add any customization to the way things are loaded.
   *
   * you do not need to call this for the Asset class to work, only if you want to set any initial properties
   * @param options - options to initialize the Asset manager with
   */async init(t={}){if(this._initialized){console.warn("[Assets]AssetManager already initialized, did you load before calling this Asset.init()?");return}if(this._initialized=!0,t.defaultSearchParams&&this.resolver.setDefaultSearchParams(t.defaultSearchParams),t.basePath&&(this.resolver.basePath=t.basePath),t.bundleIdentifier&&this.resolver.setBundleIdentifier(t.bundleIdentifier),t.manifest){let e=t.manifest;"string"==typeof e&&(e=await this.load(e)),this.resolver.addManifest(e)}let e=t.texturePreference?.resolution??1,r=await this._detectFormats({preferredFormats:t.texturePreference?.format,skipDetections:t.skipDetections,detections:this._detections});this.resolver.prefer({params:{format:r,resolution:"number"==typeof e?[e]:e}}),t.preferences&&this.setPreferences(t.preferences)}add(t,e,r,i,s){this.resolver.add(t,e,r,i,s)}async load(t,e){this._initialized||await this.init();let r=nW(t),i=nj(t).map(t=>{if("string"!=typeof t){let e=this.resolver.getAlias(t);return e.some(t=>!this.resolver.hasKey(t))&&this.add(t),Array.isArray(e)?e[0]:e}return this.resolver.hasKey(t)||this.add({alias:t,src:t}),t}),s=this.resolver.resolve(i),n=await this._mapLoadToResolve(s,e);return r?n[i[0]]:n}/**
   * This adds a bundle of assets in one go so that you can load them as a group.
   * For example you could add a bundle for each screen in you pixi app
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.addBundle('animals', {
   *     bunny: 'bunny.png',
   *     chicken: 'chicken.png',
   *     thumper: 'thumper.png',
   * });
   *
   * const assets = await Assets.loadBundle('animals');
   * @param bundleId - the id of the bundle to add
   * @param assets - a record of the asset or assets that will be chosen from when loading via the specified key
   */addBundle(t,e){this.resolver.addBundle(t,e)}/**
   * Bundles are a way to load multiple assets at once.
   * If a manifest has been provided to the init function then you can load a bundle, or bundles.
   * you can also add bundles via `addBundle`
   * @example
   * import { Assets } from 'pixi.js';
   *
   * // Manifest Example
   * const manifest = {
   *     bundles: [
   *         {
   *             name: 'load-screen',
   *             assets: [
   *                 {
   *                     alias: 'background',
   *                     src: 'sunset.png',
   *                 },
   *                 {
   *                     alias: 'bar',
   *                     src: 'load-bar.{png,webp}',
   *                 },
   *             ],
   *         },
   *         {
   *             name: 'game-screen',
   *             assets: [
   *                 {
   *                     alias: 'character',
   *                     src: 'robot.png',
   *                 },
   *                 {
   *                     alias: 'enemy',
   *                     src: 'bad-guy.png',
   *                 },
   *             ],
   *         },
   *     ]
   * };
   *
   * await Asset.init({ manifest });
   *
   * // Load a bundle...
   * loadScreenAssets = await Assets.loadBundle('load-screen');
   * // Load another bundle...
   * gameScreenAssets = await Assets.loadBundle('game-screen');
   * @param bundleIds - the bundle id or ids to load
   * @param onProgress - Optional function that is called when progress on asset loading is made.
   * The function is passed a single parameter, `progress`, which represents the percentage (0.0 - 1.0)
   * of the assets loaded. Do not use this function to detect when assets are complete and available,
   * instead use the Promise returned by this function.
   * @returns all the bundles assets or a hash of assets for each bundle specified
   */async loadBundle(t,e){this._initialized||await this.init();let r=!1;"string"==typeof t&&(r=!0,t=[t]);let i=this.resolver.resolveBundle(t),s={},n=Object.keys(i),a=0,o=0,h=()=>{e?.(++a/o)},l=n.map(t=>{let e=i[t];return o+=Object.keys(e).length,this._mapLoadToResolve(e,h).then(e=>{s[t]=e})});return await Promise.all(l),r?s[t[0]]:s}/**
   * Initiate a background load of some assets. It will passively begin to load these assets in the background.
   * So when you actually come to loading them you will get a promise that resolves to the loaded assets immediately
   *
   * An example of this might be that you would background load game assets after your inital load.
   * then when you got to actually load your game screen assets when a player goes to the game - the loading
   * would already have stared or may even be complete, saving you having to show an interim load bar.
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.backgroundLoad('bunny.png');
   *
   * // later on in your app...
   * await Assets.loadBundle('bunny.png'); // Will resolve quicker as loading may have completed!
   * @param urls - the url / urls you want to background load
   */async backgroundLoad(t){this._initialized||await this.init(),"string"==typeof t&&(t=[t]);let e=this.resolver.resolve(t);this._backgroundLoader.add(Object.values(e))}/**
   * Initiate a background of a bundle, works exactly like backgroundLoad but for bundles.
   * this can only be used if the loader has been initiated with a manifest
   * @example
   * import { Assets } from 'pixi.js';
   *
   * await Assets.init({
   *     manifest: {
   *         bundles: [
   *             {
   *                 name: 'load-screen',
   *                 assets: [...],
   *             },
   *             ...
   *         ],
   *     },
   * });
   *
   * Assets.backgroundLoadBundle('load-screen');
   *
   * // Later on in your app...
   * await Assets.loadBundle('load-screen'); // Will resolve quicker as loading may have completed!
   * @param bundleIds - the bundleId / bundleIds you want to background load
   */async backgroundLoadBundle(t){this._initialized||await this.init(),"string"==typeof t&&(t=[t]);let e=this.resolver.resolveBundle(t);Object.values(e).forEach(t=>{this._backgroundLoader.add(Object.values(t))})}/**
   * Only intended for development purposes.
   * This will wipe the resolver and caches.
   * You will need to reinitialize the Asset
   */reset(){this.resolver.reset(),this.loader.reset(),this.cache.reset(),this._initialized=!1}get(t){if("string"==typeof t)return nX.get(t);let e={};for(let r=0;r<t.length;r++)e[r]=nX.get(t[r]);return e}/**
   * helper function to map resolved assets back to loaded assets
   * @param resolveResults - the resolve results from the resolver
   * @param onProgress - the progress callback
   */async _mapLoadToResolve(t,e){let r=Object.values(t),i=Object.keys(t);this._backgroundLoader.active=!1;let s=await this.loader.load(r,e);this._backgroundLoader.active=!0;let n={};return r.forEach((t,e)=>{let r=s[t.src],a=[t.src];t.alias&&a.push(...t.alias),n[i[e]]=r,nX.set(a,r)}),n}/**
   * Unload an asset or assets. As the Assets class is responsible for creating the assets via the `load` function
   * this will make sure to destroy any assets and release them from memory.
   * Once unloaded, you will need to load the asset again.
   *
   * Use this to help manage assets if you find that you have a large app and you want to free up memory.
   *
   * - it's up to you as the developer to make sure that textures are not actively being used when you unload them,
   * Pixi won't break but you will end up with missing assets. Not a good look for the user!
   * @example
   * import { Assets } from 'pixi.js';
   *
   * // Load a URL:
   * const myImageTexture = await Assets.load('http://some.url.com/image.png'); // => returns a texture
   *
   * await Assets.unload('http://some.url.com/image.png')
   *
   * // myImageTexture will be destroyed now.
   *
   * // Unload multiple assets:
   * const textures = await Assets.unload(['thumper', 'chicko']);
   * @param urls - the urls to unload
   */async unload(t){this._initialized||await this.init();let e=nj(t).map(t=>"string"!=typeof t?t.src:t),r=this.resolver.resolve(e);await this._unloadFromResolved(r)}/**
   * Bundles are a way to manage multiple assets at once.
   * this will unload all files in a bundle.
   *
   * once a bundle has been unloaded, you need to load it again to have access to the assets.
   * @example
   * import { Assets } from 'pixi.js';
   *
   * Assets.addBundle({
   *     'thumper': 'http://some.url.com/thumper.png',
   * })
   *
   * const assets = await Assets.loadBundle('thumper');
   *
   * // Now to unload...
   *
   * await Assets.unloadBundle('thumper');
   *
   * // All assets in the assets object will now have been destroyed and purged from the cache
   * @param bundleIds - the bundle id or ids to unload
   */async unloadBundle(t){this._initialized||await this.init(),t=nj(t);let e=this.resolver.resolveBundle(t),r=Object.keys(e).map(t=>this._unloadFromResolved(e[t]));await Promise.all(r)}async _unloadFromResolved(t){let e=Object.values(t);e.forEach(t=>{nX.remove(t.src)}),await this.loader.unload(e)}/**
   * Detects the supported formats for the browser, and returns an array of supported formats, respecting
   * the users preferred formats order.
   * @param options - the options to use when detecting formats
   * @param options.preferredFormats - the preferred formats to use
   * @param options.skipDetections - if we should skip the detections altogether
   * @param options.detections - the detections to use
   * @returns - the detected formats
   */async _detectFormats(t){let e=[];for(let r of(t.preferredFormats&&(e=Array.isArray(t.preferredFormats)?t.preferredFormats:[t.preferredFormats]),t.detections))t.skipDetections||await r.test()?e=await r.add(e):t.skipDetections||(e=await r.remove(e));return e=e.filter((t,r)=>e.indexOf(t)===r)}/** All the detection parsers currently added to the Assets class. */get detections(){return this._detections}/**
   * @deprecated since 7.2.0
   * @see {@link Assets.setPreferences}
   */get preferWorkers(){return ai.config.preferWorkers}set preferWorkers(t){ta.deprecation("7.2.0","Assets.prefersWorkers is deprecated, use Assets.setPreferences({ preferWorkers: true }) instead."),this.setPreferences({preferWorkers:t})}/**
   * General setter for preferences. This is a helper function to set preferences on all parsers.
   * @param preferences - the preferences to set
   */setPreferences(t){this.loader.parsers.forEach(e=>{e.config&&Object.keys(e.config).filter(e=>e in t).forEach(r=>{e.config[r]=t[r]})})}}const au=new al;eK.handleByList(e$.LoadParser,au.loader.parsers).handleByList(e$.ResolveParser,au.resolver.parsers).handleByList(e$.CacheParser,au.cache.parsers).handleByList(e$.DetectionParser,au.detections);const ad={extension:e$.CacheParser,test:t=>Array.isArray(t)&&t.every(t=>t instanceof iv),getCacheableAssets:(t,e)=>{let r={};return t.forEach(t=>{e.forEach((e,i)=>{r[t+(0===i?"":i+1)]=e})}),r}};async function ac(t){if("Image"in globalThis)return new Promise(e=>{let r=new Image;r.onload=()=>{e(!0)},r.onerror=()=>{e(!1)},r.src=t});if("createImageBitmap"in globalThis&&"fetch"in globalThis){try{let e=await (await fetch(t)).blob();await createImageBitmap(e)}catch{return!1}return!0}return!1}eK.add(ad);const ap={extension:{type:e$.DetectionParser,priority:1},test:async()=>ac("data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="),add:async t=>[...t,"avif"],remove:async t=>t.filter(t=>"avif"!==t)};eK.add(ap);const af={extension:{type:e$.DetectionParser,priority:0},test:async()=>ac("data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="),add:async t=>[...t,"webp"],remove:async t=>t.filter(t=>"webp"!==t)};eK.add(af);const am=["png","jpg","jpeg"],ag={extension:{type:e$.DetectionParser,priority:-1},test:()=>Promise.resolve(!0),add:async t=>[...t,...am],remove:async t=>t.filter(t=>!am.includes(t))};eK.add(ag);const a_="WorkerGlobalScope"in globalThis&&globalThis instanceof globalThis.WorkerGlobalScope;function ay(t){return!a_&&""!==document.createElement("video").canPlayType(t)}const av={extension:{type:e$.DetectionParser,priority:0},test:async()=>ay("video/webm"),add:async t=>[...t,"webm"],remove:async t=>t.filter(t=>"webm"!==t)};eK.add(av);const ax={extension:{type:e$.DetectionParser,priority:0},test:async()=>ay("video/mp4"),add:async t=>[...t,"mp4","m4v"],remove:async t=>t.filter(t=>"mp4"!==t&&"m4v"!==t)};eK.add(ax);const ab={extension:{type:e$.DetectionParser,priority:0},test:async()=>ay("video/ogg"),add:async t=>[...t,"ogv"],remove:async t=>t.filter(t=>"ogv"!==t)};eK.add(ab);const aT={extension:e$.ResolveParser,test:ai.test,parse:t=>({resolution:parseFloat(G.RETINA_PREFIX.exec(t)?.[1]??"1"),format:ta.path.extname(t).slice(1),src:t})};eK.add(aT);var aE={};h(aE,"BlobResource",()=>aI),h(aE,"CompressedTextureResource",()=>aC),h(aE,"FORMATS_TO_COMPONENTS",()=>ak),h(aE,"INTERNAL_FORMATS",()=>aA),h(aE,"INTERNAL_FORMAT_TO_BYTES_PER_PIXEL",()=>aw),h(aE,"TYPES_TO_BYTES_PER_COMPONENT",()=>aL),h(aE,"TYPES_TO_BYTES_PER_PIXEL",()=>aU),h(aE,"detectCompressedTextures",()=>aR),h(aE,"loadDDS",()=>aH),h(aE,"loadKTX",()=>aj),h(aE,"parseDDS",()=>aB),h(aE,"parseKTX",()=>aG),h(aE,"resolveCompressedTextureUrl",()=>az);var aA=((ln=aA||{})[ln.COMPRESSED_RGB_S3TC_DXT1_EXT=33776]="COMPRESSED_RGB_S3TC_DXT1_EXT",ln[ln.COMPRESSED_RGBA_S3TC_DXT1_EXT=33777]="COMPRESSED_RGBA_S3TC_DXT1_EXT",ln[ln.COMPRESSED_RGBA_S3TC_DXT3_EXT=33778]="COMPRESSED_RGBA_S3TC_DXT3_EXT",ln[ln.COMPRESSED_RGBA_S3TC_DXT5_EXT=33779]="COMPRESSED_RGBA_S3TC_DXT5_EXT",ln[ln.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT=35917]="COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT",ln[ln.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT=35918]="COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT",ln[ln.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT=35919]="COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT",ln[ln.COMPRESSED_SRGB_S3TC_DXT1_EXT=35916]="COMPRESSED_SRGB_S3TC_DXT1_EXT",ln[ln.COMPRESSED_R11_EAC=37488]="COMPRESSED_R11_EAC",ln[ln.COMPRESSED_SIGNED_R11_EAC=37489]="COMPRESSED_SIGNED_R11_EAC",ln[ln.COMPRESSED_RG11_EAC=37490]="COMPRESSED_RG11_EAC",ln[ln.COMPRESSED_SIGNED_RG11_EAC=37491]="COMPRESSED_SIGNED_RG11_EAC",ln[ln.COMPRESSED_RGB8_ETC2=37492]="COMPRESSED_RGB8_ETC2",ln[ln.COMPRESSED_RGBA8_ETC2_EAC=37496]="COMPRESSED_RGBA8_ETC2_EAC",ln[ln.COMPRESSED_SRGB8_ETC2=37493]="COMPRESSED_SRGB8_ETC2",ln[ln.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC=37497]="COMPRESSED_SRGB8_ALPHA8_ETC2_EAC",ln[ln.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2=37494]="COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2",ln[ln.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2=37495]="COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2",ln[ln.COMPRESSED_RGB_PVRTC_4BPPV1_IMG=35840]="COMPRESSED_RGB_PVRTC_4BPPV1_IMG",ln[ln.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG=35842]="COMPRESSED_RGBA_PVRTC_4BPPV1_IMG",ln[ln.COMPRESSED_RGB_PVRTC_2BPPV1_IMG=35841]="COMPRESSED_RGB_PVRTC_2BPPV1_IMG",ln[ln.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG=35843]="COMPRESSED_RGBA_PVRTC_2BPPV1_IMG",ln[ln.COMPRESSED_RGB_ETC1_WEBGL=36196]="COMPRESSED_RGB_ETC1_WEBGL",ln[ln.COMPRESSED_RGB_ATC_WEBGL=35986]="COMPRESSED_RGB_ATC_WEBGL",ln[ln.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL=35986]="COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL",ln[ln.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL=34798]="COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL",ln[ln.COMPRESSED_RGBA_ASTC_4x4_KHR=37808]="COMPRESSED_RGBA_ASTC_4x4_KHR",ln);const aw={// WEBGL_compressed_texture_s3tc
33776:.5,33777:.5,33778:1,33779:1,// WEBGL_compressed_texture_s3tc
35916:.5,35917:.5,35918:1,35919:1,// WEBGL_compressed_texture_etc
37488:.5,37489:.5,37490:1,37491:1,37492:.5,37496:1,37493:.5,37497:1,37494:.5,// ~~
37495:.5,// ~~
// WEBGL_compressed_texture_pvrtc
35840:.5,35842:.5,35841:.25,35843:.25,// WEBGL_compressed_texture_etc1
36196:.5,// @see https://www.khronos.org/registry/OpenGL/extensions/AMD/AMD_compressed_ATC_texture.txt
// WEBGL_compressed_texture_atc
35986:.5,35986:1,34798:1,// @see https://registry.khronos.org/OpenGL/extensions/KHR/KHR_texture_compression_astc_hdr.txt
// WEBGL_compressed_texture_astc
/* eslint-disable-next-line camelcase */37808:1};function aS(){a={s3tc:n.getExtension("WEBGL_compressed_texture_s3tc"),s3tc_sRGB:n.getExtension("WEBGL_compressed_texture_s3tc_srgb"),/* eslint-disable-line camelcase */etc:n.getExtension("WEBGL_compressed_texture_etc"),etc1:n.getExtension("WEBGL_compressed_texture_etc1"),pvrtc:n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),atc:n.getExtension("WEBGL_compressed_texture_atc"),astc:n.getExtension("WEBGL_compressed_texture_astc")}}const aR={extension:{type:e$.DetectionParser,priority:2},test:async()=>{let t=G.ADAPTER.createCanvas().getContext("webgl");return t?(n=t,!0):(console.warn("WebGL not available for compressed textures."),!1)},add:async t=>{a||aS();let e=[];for(let t in a)a[t]&&e.push(t);return[...e,...t]},remove:async t=>(a||aS(),t.filter(t=>!(t in a)))};eK.add(aR);class aI extends e6{/**
   * @param source - The buffer/URL of the texture file.
   * @param {PIXI.IBlobResourceOptions} [options]
   * @param {boolean} [options.autoLoad=false] - Whether to fetch the data immediately;
   *  you can fetch it later via {@link PIXI.BlobResource#load}.
   * @param {number} [options.width=1] - The width in pixels.
   * @param {number} [options.height=1] - The height in pixels.
   * @param {1|2|4|8} [options.unpackAlignment=4] - The alignment of the pixel rows.
   */constructor(t,e={width:1,height:1,autoLoad:!0}){let r,i;"string"==typeof t?(r=t,i=new Uint8Array):(r=null,i=t),super(i,e),this.origin=r,this.buffer=i?new eZ(i):null,this._load=null,this.loaded=!1,null!==this.origin&&!1!==e.autoLoad&&this.load(),null===this.origin&&this.buffer&&(this._load=Promise.resolve(this),this.loaded=!0,this.onBlobLoaded(this.buffer.rawBinaryData))}onBlobLoaded(t){}/** Loads the blob */load(){return this._load||(this._load=fetch(this.origin).then(t=>t.blob()).then(t=>t.arrayBuffer()).then(t=>(this.data=new Uint32Array(t),this.buffer=new eZ(t),this.loaded=!0,this.onBlobLoaded(t),this.update(),this))),this._load}}class aC extends aI{/**
   * @param source - the buffer/URL holding the compressed texture data
   * @param options
   * @param {PIXI.INTERNAL_FORMATS} options.format - the compression format
   * @param {number} options.width - the image width in pixels.
   * @param {number} options.height - the image height in pixels.
   * @param {number} [options.level=1] - the mipmap levels stored in the compressed texture, including level 0.
   * @param {number} [options.levelBuffers] - the buffers for each mipmap level. `CompressedTextureResource` can allows you
   *      to pass `null` for `source`, for cases where each level is stored in non-contiguous memory.
   */constructor(t,e){super(t,e),this.format=e.format,this.levels=e.levels||1,this._width=e.width,this._height=e.height,this._extension=aC._formatToExtension(this.format),(e.levelBuffers||this.buffer)&&(this._levelBuffers=e.levelBuffers||aC._createLevelBuffers(t instanceof Uint8Array?t:this.buffer.uint8View,this.format,this.levels,4,4,this.width,this.height))}/**
   * @override
   * @param renderer - A reference to the current renderer
   * @param _texture - the texture
   * @param _glTexture - texture instance for this webgl context
   */upload(t,e,r){let i=t.gl;if(!t.context.extensions[this._extension])throw Error(`${this._extension} textures are not supported on the current machine`);if(!this._levelBuffers)return!1;i.pixelStorei(i.UNPACK_ALIGNMENT,4);for(let t=0,e=this.levels;t<e;t++){let{levelID:e,levelWidth:r,levelHeight:s,levelBuffer:n}=this._levelBuffers[t];i.compressedTexImage2D(i.TEXTURE_2D,e,this.format,r,s,0,n)}return!0}/** @protected */onBlobLoaded(){this._levelBuffers=aC._createLevelBuffers(this.buffer.uint8View,this.format,this.levels,4,4,this.width,this.height)}/**
   * Returns the key (to ContextSystem#extensions) for the WebGL extension supporting the compression format
   * @private
   * @param format - the compression format to get the extension for.
   */static _formatToExtension(t){if(t>=33776&&t<=33779)return"s3tc";if(t>=37488&&t<=37497)return"etc";if(t>=35840&&t<=35843)return"pvrtc";if(t>=36196)return"etc1";if(t>=35986&&t<=34798)return"atc";throw Error("Invalid (compressed) texture format given!")}/**
   * Pre-creates buffer views for each mipmap level
   * @private
   * @param buffer -
   * @param format - compression formats
   * @param levels - mipmap levels
   * @param blockWidth -
   * @param blockHeight -
   * @param imageWidth - width of the image in pixels
   * @param imageHeight - height of the image in pixels
   */static _createLevelBuffers(t,e,r,i,s,n,a){let o=Array(r),h=t.byteOffset,l=n,u=a,d=l+i-1&~(i-1),c=u+s-1&~(s-1),p=d*c*aw[e];for(let n=0;n<r;n++)o[n]={levelID:n,levelWidth:r>1?l:d,levelHeight:r>1?u:c,levelBuffer:new Uint8Array(t.buffer,h,p)},h+=p,u=u>>1||1,p=(d=(l=l>>1||1)+i-1&~(i-1))*(c=u+s-1&~(s-1))*aw[e];return o}}const aM={FOURCC:2},aP={DXGI_FORMAT:0,RESOURCE_DIMENSION:1,MISC_FLAG:2,ARRAY_SIZE:3},aD={827611204:aA.COMPRESSED_RGBA_S3TC_DXT1_EXT,861165636:aA.COMPRESSED_RGBA_S3TC_DXT3_EXT,894720068:aA.COMPRESSED_RGBA_S3TC_DXT5_EXT},aO={// WEBGL_compressed_texture_s3tc
70:aA.COMPRESSED_RGBA_S3TC_DXT1_EXT,71:aA.COMPRESSED_RGBA_S3TC_DXT1_EXT,73:aA.COMPRESSED_RGBA_S3TC_DXT3_EXT,74:aA.COMPRESSED_RGBA_S3TC_DXT3_EXT,76:aA.COMPRESSED_RGBA_S3TC_DXT5_EXT,77:aA.COMPRESSED_RGBA_S3TC_DXT5_EXT,// WEBGL_compressed_texture_s3tc_srgb
72:aA.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT,75:aA.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT,78:aA.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT};function aB(t){let e=new Uint32Array(t);if(542327876!==e[0])throw Error("Invalid DDS file magic word");let r=new Uint32Array(t,0,124/Uint32Array.BYTES_PER_ELEMENT),i=r[3],s=r[4],n=r[7],a=new Uint32Array(t,19*Uint32Array.BYTES_PER_ELEMENT,32/Uint32Array.BYTES_PER_ELEMENT),o=a[1];if(4&o){let r=a[aM.FOURCC];if(808540228!==r){let e=aD[r],a=new Uint8Array(t,128);return[new aC(a,{format:e,width:s,height:i,levels:n})]}let o=new Uint32Array(e.buffer,128,20/Uint32Array.BYTES_PER_ELEMENT),h=o[aP.DXGI_FORMAT],l=o[aP.RESOURCE_DIMENSION],u=o[aP.MISC_FLAG],d=o[aP.ARRAY_SIZE],c=aO[h];if(void 0===c)throw Error(`DDSParser cannot parse texture data with DXGI format ${h}`);if(4===u)throw Error("DDSParser does not support cubemap textures");if(6===l)throw Error("DDSParser does not supported 3D texture data");let p=[];if(1===d)p.push(new Uint8Array(t,148));else{let e=aw[c],r=0,a=s,o=i;for(let t=0;t<n;t++){let t=Math.max(1,a+3&-4),i=Math.max(1,o+3&-4),s=t*i*e;r+=s,a>>>=1,o>>>=1}let h=148;for(let e=0;e<d;e++)p.push(new Uint8Array(t,h,r)),h+=r}return p.map(t=>new aC(t,{format:c,width:s,height:i,levels:n}))}throw 64&o?Error("DDSParser does not support uncompressed texture data."):512&o?Error("DDSParser does not supported YUV uncompressed texture data."):131072&o?Error("DDSParser does not support single-channel (lumninance) texture data!"):2&o?Error("DDSParser does not support single-channel (alpha) texture data!"):Error("DDSParser failed to load a texture file due to an unknown reason!")}const aF=[171,75,84,88,32,49,49,187,13,10,26,10],aN={ENDIANNESS:12,GL_TYPE:16,GL_FORMAT:24,GL_INTERNAL_FORMAT:28,PIXEL_WIDTH:36,PIXEL_HEIGHT:40,PIXEL_DEPTH:44,NUMBER_OF_ARRAY_ELEMENTS:48,NUMBER_OF_FACES:52,NUMBER_OF_MIPMAP_LEVELS:56,BYTES_OF_KEY_VALUE_DATA:60},aL={[w.UNSIGNED_BYTE]:1,[w.UNSIGNED_SHORT]:2,[w.INT]:4,[w.UNSIGNED_INT]:4,[w.FLOAT]:4,[w.HALF_FLOAT]:8},ak={[E.RGBA]:4,[E.RGB]:3,[E.RG]:2,[E.RED]:1,[E.LUMINANCE]:1,[E.LUMINANCE_ALPHA]:2,[E.ALPHA]:1},aU={[w.UNSIGNED_SHORT_4_4_4_4]:2,[w.UNSIGNED_SHORT_5_5_5_1]:2,[w.UNSIGNED_SHORT_5_6_5]:2};function aG(t,e,r=!1){let i;let s=new DataView(e);if(!function(t,e){for(let r=0;r<aF.length;r++)if(e.getUint8(r)!==aF[r])return console.error(`${t} is not a valid *.ktx file!`),!1;return!0}(t,s))return null;let n=67305985===s.getUint32(aN.ENDIANNESS,!0),a=s.getUint32(aN.GL_TYPE,n),o=s.getUint32(aN.GL_FORMAT,n),h=s.getUint32(aN.GL_INTERNAL_FORMAT,n),l=s.getUint32(aN.PIXEL_WIDTH,n),u=s.getUint32(aN.PIXEL_HEIGHT,n)||1,d=s.getUint32(aN.PIXEL_DEPTH,n)||1,c=s.getUint32(aN.NUMBER_OF_ARRAY_ELEMENTS,n)||1,p=s.getUint32(aN.NUMBER_OF_FACES,n),f=s.getUint32(aN.NUMBER_OF_MIPMAP_LEVELS,n),m=s.getUint32(aN.BYTES_OF_KEY_VALUE_DATA,n);if(0===u||1!==d)throw Error("Only 2D textures are supported");if(1!==p)throw Error("CubeTextures are not supported by KTXLoader yet!");if(1!==c)throw Error("WebGL does not support array textures");let g=l+3&-4,_=u+3&-4,y=Array(c),v=l*u;if(0===a&&(v=g*_),void 0===(i=0!==a?aL[a]?aL[a]*ak[o]:aU[a]:aw[h]))throw Error("Unable to resolve the pixel format stored in the *.ktx file!");let x=r?function(t,e,r){let i=/* @__PURE__ */new Map,s=0;for(;s<e;){let n=t.getUint32(64+s,r),a=64+s+4,o=3-(n+3)%4;if(0===n||n>e-s){console.error("KTXLoader: keyAndValueByteSize out of bounds");break}let h=0;for(;h<n&&0!==t.getUint8(a+h);h++);if(-1===h){console.error("KTXLoader: Failed to find null byte terminating kvData key");break}let l=new TextDecoder().decode(new Uint8Array(t.buffer,a,h)),u=new DataView(t.buffer,a+h+1,n-h-1);i.set(l,u),s+=4+n+o}return i}(s,m,n):null,b=v*i,T=l,A=u,S=g,R=_,I=64+m;for(let t=0;t<f;t++){let r=s.getUint32(I,n),o=I+4;for(let r=0;r<c;r++){let i=y[r];i||(i=y[r]=Array(f)),i[t]={levelID:t,// don't align mipWidth when texture not compressed! (glType not zero)
levelWidth:f>1||0!==a?T:S,levelHeight:f>1||0!==a?A:R,levelBuffer:new Uint8Array(e,o,b)},o+=b}I+=r+4,I=I%4!=0?I+4-I%4:I,A=A>>1||1,b=(S=(T=T>>1||1)+4-1&-4)*(R=A+4-1&-4)*i}return 0!==a?{uncompressed:y.map(t=>{let e=t[0].levelBuffer,r=!1;return a===w.FLOAT?e=new Float32Array(t[0].levelBuffer.buffer,t[0].levelBuffer.byteOffset,t[0].levelBuffer.byteLength/4):a===w.UNSIGNED_INT?(r=!0,e=new Uint32Array(t[0].levelBuffer.buffer,t[0].levelBuffer.byteOffset,t[0].levelBuffer.byteLength/4)):a===w.INT&&(r=!0,e=new Int32Array(t[0].levelBuffer.buffer,t[0].levelBuffer.byteOffset,t[0].levelBuffer.byteLength/4)),{resource:new e6(e,{width:t[0].levelWidth,height:t[0].levelHeight}),type:a,format:r?function(t){switch(t){case E.RGBA:return E.RGBA_INTEGER;case E.RGB:return E.RGB_INTEGER;case E.RG:return E.RG_INTEGER;case E.RED:return E.RED_INTEGER;default:return t}}(o):o}}),kvData:x}:{compressed:y.map(t=>new aC(null,{format:h,width:l,height:u,levels:f,levelBuffers:t})),kvData:x}}const aH={extension:{type:e$.LoadParser,priority:nY.High},name:"loadDDS",test:t=>nH(t,".dds"),async load(t,e,r){let i=await (await G.ADAPTER.fetch(t)).arrayBuffer(),s=aB(i).map(i=>{let s=new e9(i,{mipmap:C.OFF,alphaMode:M.NO_PREMULTIPLIED_ALPHA,resolution:ta.getResolutionOfUrl(t),...e.data});return n9(s,r,t)});return 1===s.length?s[0]:s},unload(t){Array.isArray(t)?t.forEach(t=>t.destroy(!0)):t.destroy(!0)}};eK.add(aH);const aj={extension:{type:e$.LoadParser,priority:nY.High},name:"loadKTX",test:t=>nH(t,".ktx"),async load(t,e,r){let i=await (await G.ADAPTER.fetch(t)).arrayBuffer(),{compressed:s,uncompressed:n,kvData:a}=aG(t,i),o=s??n,h={mipmap:C.OFF,alphaMode:M.NO_PREMULTIPLIED_ALPHA,resolution:ta.getResolutionOfUrl(t),...e.data},l=o.map(e=>{o===n&&Object.assign(h,{type:e.type,format:e.format});let i=e.resource??e,s=new e9(i,h);return s.ktxKeyValueData=a,n9(s,r,t)});return 1===l.length?l[0]:l},unload(t){Array.isArray(t)?t.forEach(t=>t.destroy(!0)):t.destroy(!0)}};eK.add(aj);const az={extension:e$.ResolveParser,test:t=>{let e=ta.path.extname(t).slice(1);return["basis","ktx","dds"].includes(e)},parse:t=>{let e=ta.path.extname(t).slice(1);if("ktx"===e){let e=[".s3tc.ktx",".s3tc_sRGB.ktx",".etc.ktx",".etc1.ktx",".pvrt.ktx",".atc.ktx",".astc.ktx"];if(e.some(e=>t.endsWith(e)))return{resolution:parseFloat(G.RETINA_PREFIX.exec(t)?.[1]??"1"),format:e.find(e=>t.endsWith(e)),src:t}}return{resolution:parseFloat(G.RETINA_PREFIX.exec(t)?.[1]??"1"),format:e,src:t}}};eK.add(az);var aV={};h(aV,"Extract",()=>a$);const aW=new r_,aX=class t{/**
   * @param renderer - A reference to the current renderer
   */constructor(t){this.renderer=t,this._rendererPremultipliedAlpha=!1}contextChange(){let t=this.renderer?.gl.getContextAttributes();this._rendererPremultipliedAlpha=!!(t&&t.alpha&&t.premultipliedAlpha)}/**
   * Will return a HTML Image of the target
   * @param target - A displayObject or renderTexture
   *  to convert. If left empty will use the main renderer
   * @param format - Image format, e.g. "image/jpeg" or "image/webp".
   * @param quality - JPEG or Webp compression from 0 to 1. Default is 0.92.
   * @param frame - The frame the extraction is restricted to.
   * @returns - HTML Image of the target
   */async image(t,e,r,i){let s=new Image;return s.src=await this.base64(t,e,r,i),s}/**
   * Will return a base64 encoded string of this target. It works by calling
   *  `Extract.canvas` and then running toDataURL on that.
   * @param target - A displayObject or renderTexture
   *  to convert. If left empty will use the main renderer
   * @param format - Image format, e.g. "image/jpeg" or "image/webp".
   * @param quality - JPEG or Webp compression from 0 to 1. Default is 0.92.
   * @param frame - The frame the extraction is restricted to.
   * @returns - A base64 encoded string of the texture.
   */async base64(t,e,r,i){let s=this.canvas(t,i);if(void 0!==s.toBlob)return new Promise((t,i)=>{s.toBlob(e=>{if(!e){i(Error("ICanvas.toBlob failed!"));return}let r=new FileReader;r.onload=()=>t(r.result),r.onerror=i,r.readAsDataURL(e)},e,r)});if(void 0!==s.toDataURL)return s.toDataURL(e,r);if(void 0!==s.convertToBlob){let t=await s.convertToBlob({type:e,quality:r});return new Promise((e,r)=>{let i=new FileReader;i.onload=()=>e(i.result),i.onerror=r,i.readAsDataURL(t)})}throw Error("Extract.base64() requires ICanvas.toDataURL, ICanvas.toBlob, or ICanvas.convertToBlob to be implemented")}/**
   * Creates a Canvas element, renders this target to it and then returns it.
   * @param target - A displayObject or renderTexture
   *  to convert. If left empty will use the main renderer
   * @param frame - The frame the extraction is restricted to.
   * @returns - A Canvas element with the texture rendered on.
   */canvas(e,r){let{pixels:i,width:s,height:n,flipY:a,premultipliedAlpha:o}=this._rawPixels(e,r);a&&t._flipY(i,s,n),o&&t._unpremultiplyAlpha(i);let h=new ta.CanvasRenderTarget(s,n,1),l=new ImageData(new Uint8ClampedArray(i.buffer),s,n);return h.context.putImageData(l,0,0),h.canvas}/**
   * Will return a one-dimensional array containing the pixel data of the entire texture in RGBA
   * order, with integer values between 0 and 255 (included).
   * @param target - A displayObject or renderTexture
   *  to convert. If left empty will use the main renderer
   * @param frame - The frame the extraction is restricted to.
   * @returns - One-dimensional array containing the pixel data of the entire texture
   */pixels(e,r){let{pixels:i,width:s,height:n,flipY:a,premultipliedAlpha:o}=this._rawPixels(e,r);return a&&t._flipY(i,s,n),o&&t._unpremultiplyAlpha(i),i}_rawPixels(t,e){let r=this.renderer;if(!r)throw Error("The Extract has already been destroyed");let i,s=!1,n=!1,a,o=!1;t&&(t instanceof ix?a=t:(a=r.generateTexture(t,{region:e,resolution:r.resolution,multisample:r.multisample}),o=!0,e&&(aW.width=e.width,aW.height=e.height,e=aW)));let h=r.gl;if(a){if(i=a.baseTexture.resolution,e=e??a.frame,s=!1,n=a.baseTexture.alphaMode>0&&a.baseTexture.format===E.RGBA,!o){r.renderTexture.bind(a);let t=a.framebuffer.glFramebuffers[r.CONTEXT_UID];t.blitFramebuffer&&r.framebuffer.bind(t.blitFramebuffer)}}else i=r.resolution,e||((e=aW).width=r.width/i,e.height=r.height/i),s=!0,n=this._rendererPremultipliedAlpha,r.renderTexture.bind();let l=Math.max(Math.round(e.width*i),1),u=Math.max(Math.round(e.height*i),1),d=new Uint8Array(4*l*u);return h.readPixels(Math.round(e.x*i),Math.round(e.y*i),l,u,h.RGBA,h.UNSIGNED_BYTE,d),o&&a?.destroy(!0),{pixels:d,width:l,height:u,flipY:s,premultipliedAlpha:n}}/** Destroys the extract. */destroy(){this.renderer=null}static _flipY(t,e,r){let i=e<<2,s=r>>1,n=new Uint8Array(i);for(let e=0;e<s;e++){let s=e*i,a=(r-e-1)*i;n.set(t.subarray(s,s+i)),t.copyWithin(s,a,a+i),t.set(n,a)}}static _unpremultiplyAlpha(t){t instanceof Uint8ClampedArray&&(t=new Uint8Array(t.buffer));let e=t.length;for(let r=0;r<e;r+=4){let e=t[r+3];if(0!==e){let i=255.001/e;t[r]=t[r]*i+.5,t[r+1]=t[r+1]*i+.5,t[r+2]=t[r+2]*i+.5}}}};aX.extension={name:"extract",type:e$.RendererSystem};let a$=aX;eK.add(a$);var aY={};h(aY,"graphicsUtils",()=>op),h(aY,"FillStyle",()=>oh),h(aY,"GRAPHICS_CURVES",()=>a3),h(aY,"Graphics",()=>oc),h(aY,"GraphicsData",()=>os),h(aY,"GraphicsGeometry",()=>oo),h(aY,"LINE_CAP",()=>a1),h(aY,"LINE_JOIN",()=>a0),h(aY,"LineStyle",()=>ol),h(aY,"curves",()=>a2);const aq={build(t){let e,r,i,s,n,a;let o=t.points;if(t.type===rf.CIRC){let o=t.shape;e=o.x,r=o.y,n=a=o.radius,i=s=0}else if(t.type===rf.ELIP){let o=t.shape;e=o.x,r=o.y,n=o.width,a=o.height,i=s=0}else{let o=t.shape,h=o.width/2,l=o.height/2;e=o.x+h,r=o.y+l,n=a=Math.max(0,Math.min(o.radius,Math.min(h,l))),i=h-n,s=l-a}if(!(n>=0&&a>=0&&i>=0&&s>=0)){o.length=0;return}let h=Math.ceil(2.3*Math.sqrt(n+a)),l=8*h+(i?4:0)+(s?4:0);if(o.length=l,0===l)return;if(0===h){o.length=8,o[0]=o[6]=e+i,o[1]=o[3]=r+s,o[2]=o[4]=e-i,o[5]=o[7]=r-s;return}let u=0,d=4*h+(i?2:0)+2,c=d,p=l;{let t=i+n,a=s,h=e+t,l=e-t,f=r+a;if(o[u++]=h,o[u++]=f,o[--d]=f,o[--d]=l,s){let t=r-a;o[c++]=l,o[c++]=t,o[--p]=t,o[--p]=h}}for(let t=1;t<h;t++){let l=Math.PI/2*(t/h),f=i+Math.cos(l)*n,m=s+Math.sin(l)*a,g=e+f,_=e-f,y=r+m,v=r-m;o[u++]=g,o[u++]=y,o[--d]=y,o[--d]=_,o[c++]=_,o[c++]=v,o[--p]=v,o[--p]=g}{let t=i,n=s+a,h=e+t,l=e-t,d=r+n,c=r-n;o[u++]=h,o[u++]=d,o[--p]=c,o[--p]=h,i&&(o[u++]=l,o[u++]=d,o[--p]=c,o[--p]=l)}},triangulate(t,e){let r,i;let s=t.points,n=e.points,a=e.indices;if(0===s.length)return;let o=n.length/2,h=o;if(t.type!==rf.RREC){let e=t.shape;r=e.x,i=e.y}else{let e=t.shape;r=e.x+e.width/2,i=e.y+e.height/2}let l=t.matrix;n.push(t.matrix?l.a*r+l.c*i+l.tx:r,t.matrix?l.b*r+l.d*i+l.ty:i),o++,n.push(s[0],s[1]);for(let t=2;t<s.length;t+=2)n.push(s[t],s[t+1]),a.push(o++,h,o);a.push(h+1,h,o)}};function aK(t,e=!1){let r=t.length;if(r<6)return;let i=0;for(let e=0,s=t[r-2],n=t[r-1];e<r;e+=2){let r=t[e],a=t[e+1];i+=(r-s)*(a+n),s=r,n=a}if(!e&&i>0||e&&i<=0){let e=r/2;for(let i=e+e%2;i<r;i+=2){let e=r-i-2,s=r-i-1,n=i,a=i+1;[t[e],t[n]]=[t[n],t[e]],[t[s],t[a]]=[t[a],t[s]]}}}const aZ={build(t){t.points=t.shape.points.slice()},triangulate(t,e){let r=t.points,i=t.holes,s=e.points,n=e.indices;if(r.length>=6){aK(r,!1);let t=[];for(let e=0;e<i.length;e++){let s=i[e];aK(s.points,!0),t.push(r.length/2),r=r.concat(s.points)}let e=ta.earcut(r,t,2);if(!e)return;let a=s.length/2;for(let t=0;t<e.length;t+=3)n.push(e[t]+a),n.push(e[t+1]+a),n.push(e[t+2]+a);for(let t=0;t<r.length;t++)s.push(r[t])}}},aQ={build(t){let e=t.shape,r=e.x,i=e.y,s=e.width,n=e.height,a=t.points;a.length=0,s>=0&&n>=0&&a.push(r,i,r+s,i,r+s,i+n,r,i+n)},triangulate(t,e){let r=t.points,i=e.points;if(0===r.length)return;let s=i.length/2;i.push(r[0],r[1],r[2],r[3],r[6],r[7],r[4],r[5]),e.indices.push(s,s+1,s+2,s+1,s+2,s+3)}},aJ={build(t){aq.build(t)},triangulate(t,e){aq.triangulate(t,e)}};var a0=((la=a0||{}).MITER="miter",la.BEVEL="bevel",la.ROUND="round",la),a1=((lo=a1||{}).BUTT="butt",lo.ROUND="round",lo.SQUARE="square",lo);const a2={adaptive:!0,maxLength:10,minSegments:8,maxSegments:2048,epsilon:1e-4,_segmentsCount(t,e=20){if(!this.adaptive||!t||isNaN(t))return e;let r=Math.ceil(t/this.maxLength);return r<this.minSegments?r=this.minSegments:r>this.maxSegments&&(r=this.maxSegments),r}},a3=a2;class a4{/**
   * Calculate information of the arc for {@link PIXI.Graphics.arcTo}.
   * @private
   * @param x1 - The x-coordinate of the first control point of the arc
   * @param y1 - The y-coordinate of the first control point of the arc
   * @param x2 - The x-coordinate of the second control point of the arc
   * @param y2 - The y-coordinate of the second control point of the arc
   * @param radius - The radius of the arc
   * @param points - Collection of points to add to
   * @returns - If the arc length is valid, return center of circle, radius and other info otherwise `null`.
   */static curveTo(t,e,r,i,s,n){let a=n[n.length-2],o=n[n.length-1]-e,h=a-t,l=i-e,u=r-t,d=Math.abs(o*u-h*l);if(d<1e-8||0===s)return(n[n.length-2]!==t||n[n.length-1]!==e)&&n.push(t,e),null;let c=o*o+h*h,p=l*l+u*u,f=o*l+h*u,m=s*Math.sqrt(c)/d,g=s*Math.sqrt(p)/d,_=m*f/c,y=g*f/p,v=m*u+g*h,x=m*l+g*o;return{cx:v+t,cy:x+e,radius:s,startAngle:Math.atan2(o*(g+_)-x,h*(g+_)-v),endAngle:Math.atan2(l*(m+y)-x,u*(m+y)-v),anticlockwise:h*l>u*o}}/**
   * The arc method creates an arc/curve (used to create circles, or parts of circles).
   * @private
   * @param _startX - Start x location of arc
   * @param _startY - Start y location of arc
   * @param cx - The x-coordinate of the center of the circle
   * @param cy - The y-coordinate of the center of the circle
   * @param radius - The radius of the circle
   * @param startAngle - The starting angle, in radians (0 is at the 3 o'clock position
   *  of the arc's circle)
   * @param endAngle - The ending angle, in radians
   * @param _anticlockwise - Specifies whether the drawing should be
   *  counter-clockwise or clockwise. False is default, and indicates clockwise, while true
   *  indicates counter-clockwise.
   * @param points - Collection of points to add to
   */static arc(t,e,r,i,s,n,a,o,h){let l=a-n,u=a2._segmentsCount(Math.abs(l)*s,40*Math.ceil(Math.abs(l)/rd)),d=l/(2*u),c=2*d,p=Math.cos(d),f=Math.sin(d),m=u-1,g=m%1/m;for(let t=0;t<=m;++t){let e=t+g*t,a=d+n+c*e,o=Math.cos(a),l=-Math.sin(a);h.push((p*o+f*l)*s+r,(-(p*l)+f*o)*s+i)}}}class a5{constructor(){this.reset()}/**
   * Begin batch part.
   * @param style
   * @param startIndex
   * @param attribStart
   */begin(t,e,r){this.reset(),this.style=t,this.start=e,this.attribStart=r}/**
   * End batch part.
   * @param endIndex
   * @param endAttrib
   */end(t,e){this.attribSize=e-this.attribStart,this.size=t-this.start}reset(){this.style=null,this.size=0,this.start=0,this.attribStart=0,this.attribSize=0}}class a6{/**
   * Calculate length of bezier curve.
   * Analytical solution is impossible, since it involves an integral that does not integrate in general.
   * Therefore numerical solution is used.
   * @private
   * @param fromX - Starting point x
   * @param fromY - Starting point y
   * @param cpX - Control point x
   * @param cpY - Control point y
   * @param cpX2 - Second Control point x
   * @param cpY2 - Second Control point y
   * @param toX - Destination point x
   * @param toY - Destination point y
   * @returns - Length of bezier curve
   */static curveLength(t,e,r,i,s,n,a,o){let h=0,l=0,u=0,d=0,c=0,p=0,f=0,m=0,g=0,_=0,y=0,v=t,x=e;for(let b=1;b<=10;++b)d=(u=(l=b/10)*l)*l,m=(f=(p=(c=1-l)*c)*c)*t+3*p*l*r+3*c*u*s+d*a,g=f*e+3*p*l*i+3*c*u*n+d*o,_=v-m,y=x-g,v=m,x=g,h+=Math.sqrt(_*_+y*y);return h}/**
   * Calculate the points for a bezier curve and then draws it.
   *
   * Ignored from docs since it is not directly exposed.
   * @ignore
   * @param cpX - Control point x
   * @param cpY - Control point y
   * @param cpX2 - Second Control point x
   * @param cpY2 - Second Control point y
   * @param toX - Destination point x
   * @param toY - Destination point y
   * @param points - Path array to push points into
   */static curveTo(t,e,r,i,s,n,a){let o=a[a.length-2],h=a[a.length-1];a.length-=2;let l=a2._segmentsCount(a6.curveLength(o,h,t,e,r,i,s,n)),u=0,d=0,c=0,p=0,f=0;a.push(o,h);for(let m=1,g=0;m<=l;++m)c=(d=(u=1-(g=m/l))*u)*u,f=(p=g*g)*g,a.push(c*o+3*d*g*t+3*u*p*r+f*s,c*h+3*d*g*e+3*u*p*i+f*n)}}function a8(t,e,r,i,s,n,a,o){let h,l;a?(h=i,l=-r):(h=-i,l=r);let u=t-r*s+h,d=e-i*s+l,c=t+r*n+h,p=e+i*n+l;return o.push(u,d,c,p),2}function a7(t,e,r,i,s,n,a,o){let h=r-t,l=i-e,u=Math.atan2(h,l),d=Math.atan2(s-t,n-e);o&&u<d?u+=2*Math.PI:!o&&u>d&&(d+=2*Math.PI);let c=u,p=d-u,f=Math.sqrt(h*h+l*l),m=(15*Math.abs(p)*Math.sqrt(f)/Math.PI>>0)+1,g=p/m;if(c+=g,o){a.push(t,e,r,i);for(let r=1,i=c;r<m;r++,i+=g)a.push(t,e,t+Math.sin(i)*f,e+Math.cos(i)*f);a.push(t,e,s,n)}else{a.push(r,i,t,e);for(let r=1,i=c;r<m;r++,i+=g)a.push(t+Math.sin(i)*f,e+Math.cos(i)*f,t,e);a.push(s,n,t,e)}return 2*m}function a9(t,e){t.lineStyle.native?function(t,e){let r=0,i=t.shape,s=t.points||i.points,n=i.type!==rf.POLY||i.closeStroke;if(0===s.length)return;let a=e.points,o=e.indices,h=s.length/2,l=a.length/2,u=l;for(a.push(s[0],s[1]),r=1;r<h;r++)a.push(s[2*r],s[2*r+1]),o.push(u,u+1),u++;n&&o.push(u,l)}(t,e):function(t,e){let r=t.shape,i=t.points||r.points.slice(),s=e.closePointEps;if(0===i.length)return;let n=t.lineStyle,a=new rm(i[0],i[1]),o=new rm(i[i.length-2],i[i.length-1]),h=r.type!==rf.POLY||r.closeStroke,l=Math.abs(a.x-o.x)<s&&Math.abs(a.y-o.y)<s;if(h){i=i.slice(),l&&(i.pop(),i.pop(),o.set(i[i.length-2],i[i.length-1]));let t=(a.x+o.x)*.5,e=(o.y+a.y)*.5;i.unshift(t,e),i.push(t,e)}let u=e.points,d=i.length/2,c=i.length,p=u.length/2,f=n.width/2,m=f*f,g=n.miterLimit*n.miterLimit,_=i[0],y=i[1],v=i[2],x=i[3],b=0,T=0,E=-(y-x),A=_-v,w=0,S=0,R=Math.sqrt(E*E+A*A);E/=R,A/=R,E*=f,A*=f;let I=n.alignment,C=(1-I)*2,M=2*I;h||(n.cap===a1.ROUND?c+=a7(_-E*(C-M)*.5,y-A*(C-M)*.5,_-E*C,y-A*C,_+E*M,y+A*M,u,!0)+2:n.cap===a1.SQUARE&&(c+=a8(_,y,E,A,C,M,!0,u))),u.push(_-E*C,y-A*C,_+E*M,y+A*M);for(let t=1;t<d-1;++t){_=i[(t-1)*2],y=i[(t-1)*2+1],v=i[2*t],x=i[2*t+1],b=i[(t+1)*2],T=i[(t+1)*2+1],R=Math.sqrt((E=-(y-x))*E+(A=_-v)*A),E/=R,A/=R,E*=f,A*=f,R=Math.sqrt((w=-(x-T))*w+(S=v-b)*S),w/=R,S/=R,w*=f,S*=f;let e=v-_,r=y-x,s=v-b,a=T-x,o=e*s+r*a,h=r*s-a*e,l=h<0;if(Math.abs(h)<.001*Math.abs(o)){u.push(v-E*C,x-A*C,v+E*M,x+A*M),o>=0&&(n.join===a0.ROUND?c+=a7(v,x,v-E*C,x-A*C,v-w*C,x-S*C,u,!1)+4:c+=2,u.push(v-w*M,x-S*M,v+w*C,x+S*C));continue}let d=(-E+_)*(-A+x)-(-E+v)*(-A+y),p=(-w+b)*(-S+x)-(-w+v)*(-S+T),I=(e*p-s*d)/h,P=(a*d-r*p)/h,D=(I-v)*(I-v)+(P-x)*(P-x),O=v+(I-v)*C,B=x+(P-x)*C,F=v-(I-v)*M,N=x-(P-x)*M,L=Math.min(e*e+r*r,s*s+a*a),k=l?C:M,U=L+k*k*m,G=D<=U,H=n.join;if(H===a0.MITER&&D/m>g&&(H=a0.BEVEL),G)switch(H){case a0.MITER:u.push(O,B,F,N);break;case a0.BEVEL:l?u.push(O,B,v+E*M,x+A*M,O,B,v+w*M,x+S*M):u.push(v-E*C,x-A*C,F,N,v-w*C,x-S*C,F,N),c+=2;break;case a0.ROUND:l?(u.push(O,B,v+E*M,x+A*M),c+=a7(v,x,v+E*M,x+A*M,v+w*M,x+S*M,u,!0)+4,u.push(O,B,v+w*M,x+S*M)):(u.push(v-E*C,x-A*C,F,N),c+=a7(v,x,v-E*C,x-A*C,v-w*C,x-S*C,u,!1)+4,u.push(v-w*C,x-S*C,F,N))}else{switch(u.push(v-E*C,x-A*C,v+E*M,x+A*M),H){case a0.MITER:l?u.push(F,N,F,N):u.push(O,B,O,B),c+=2;break;case a0.ROUND:l?c+=a7(v,x,v+E*M,x+A*M,v+w*M,x+S*M,u,!0)+2:c+=a7(v,x,v-E*C,x-A*C,v-w*C,x-S*C,u,!1)+2}u.push(v-w*C,x-S*C,v+w*M,x+S*M),c+=2}}_=i[(d-2)*2],y=i[(d-2)*2+1],v=i[(d-1)*2],R=Math.sqrt((E=-(y-(x=i[(d-1)*2+1])))*E+(A=_-v)*A),E/=R,A/=R,E*=f,A*=f,u.push(v-E*C,x-A*C,v+E*M,x+A*M),h||(n.cap===a1.ROUND?c+=a7(v-E*(C-M)*.5,x-A*(C-M)*.5,v-E*C,x-A*C,v+E*M,x+A*M,u,!1)+2:n.cap===a1.SQUARE&&(c+=a8(v,x,E,A,C,M,!1,u)));let P=e.indices,D=a2.epsilon*a2.epsilon;for(let t=p;t<c+p-2;++t)_=u[2*t],y=u[2*t+1],v=u[(t+1)*2],x=u[(t+1)*2+1],b=u[(t+2)*2],Math.abs(_*(x-(T=u[(t+2)*2+1]))+v*(T-y)+b*(y-x))<D||P.push(t,t+1,t+2)}(t,e)}class ot{/**
   * Calculate length of quadratic curve
   * @see {@link http://www.malczak.linuxpl.com/blog/quadratic-bezier-curve-length/}
   * for the detailed explanation of math behind this.
   * @private
   * @param fromX - x-coordinate of curve start point
   * @param fromY - y-coordinate of curve start point
   * @param cpX - x-coordinate of curve control point
   * @param cpY - y-coordinate of curve control point
   * @param toX - x-coordinate of curve end point
   * @param toY - y-coordinate of curve end point
   * @returns - Length of quadratic curve
   */static curveLength(t,e,r,i,s,n){let a=t-2*r+s,o=e-2*i+n,h=2*r-2*t,l=2*i-2*e,u=4*(a*a+o*o),d=4*(a*h+o*l),c=h*h+l*l,p=2*Math.sqrt(u+d+c),f=Math.sqrt(u),m=2*u*f,g=2*Math.sqrt(c),_=d/f;return(m*p+f*d*(p-g)+(4*c*u-d*d)*Math.log((2*f+_+p)/(_+g)))/(4*m)}/**
   * Calculate the points for a quadratic bezier curve and then draws it.
   * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
   * @private
   * @param cpX - Control point x
   * @param cpY - Control point y
   * @param toX - Destination point x
   * @param toY - Destination point y
   * @param points - Points to add segments to.
   */static curveTo(t,e,r,i,s){let n=s[s.length-2],a=s[s.length-1],o=a2._segmentsCount(ot.curveLength(n,a,t,e,r,i)),h=0,l=0;for(let u=1;u<=o;++u){let d=u/o;h=n+(t-n)*d,l=a+(e-a)*d,s.push(h+(t+(r-t)*d-h)*d,l+(e+(i-e)*d-l)*d)}}}const oe={[rf.POLY]:aZ,[rf.CIRC]:aq,[rf.ELIP]:aq,[rf.RECT]:aQ,[rf.RREC]:aJ},or=[],oi=[];class os{/**
   * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - The shape object to draw.
   * @param fillStyle - the width of the line to draw
   * @param lineStyle - the color of the line to draw
   * @param matrix - Transform matrix
   */constructor(t,e=null,r=null,i=null){this.points=[],this.holes=[],this.shape=t,this.lineStyle=r,this.fillStyle=e,this.matrix=i,this.type=t.type}/**
   * Creates a new GraphicsData object with the same values as this one.
   * @returns - Cloned GraphicsData object
   */clone(){return new os(this.shape,this.fillStyle,this.lineStyle,this.matrix)}/** Destroys the Graphics data. */destroy(){this.shape=null,this.holes.length=0,this.holes=null,this.points.length=0,this.points=null,this.lineStyle=null,this.fillStyle=null}}const on=new rm,oa=class t extends rl{// eslint-disable-next-line @typescript-eslint/no-useless-constructor
constructor(){super(),this.closePointEps=1e-4,this.boundsPadding=0,this.uvsFloat32=null,this.indicesUint16=null,this.batchable=!1,this.points=[],this.colors=[],this.uvs=[],this.indices=[],this.textureIds=[],this.graphicsData=[],this.drawCalls=[],this.batchDirty=-1,this.batches=[],this.dirty=0,this.cacheDirty=-1,this.clearDirty=0,this.shapeIndex=0,this._bounds=new sz,this.boundsDirty=-1}/**
   * Get the current bounds of the graphic geometry.
   *
   * Since 6.5.0, bounds of the graphics geometry are calculated based on the vertices of generated geometry.
   * Since shapes or strokes with full transparency (`alpha: 0`) will not generate geometry, they are not considered
   * when calculating bounds for the graphics geometry. See PR [#8343]{@link https://github.com/pixijs/pixijs/pull/8343}
   * and issue [#8623]{@link https://github.com/pixijs/pixijs/pull/8623}.
   * @readonly
   */get bounds(){return this.updateBatches(),this.boundsDirty!==this.dirty&&(this.boundsDirty=this.dirty,this.calculateBounds()),this._bounds}/** Call if you changed graphicsData manually. Empties all batch buffers. */invalidate(){this.boundsDirty=-1,this.dirty++,this.batchDirty++,this.shapeIndex=0,this.points.length=0,this.colors.length=0,this.uvs.length=0,this.indices.length=0,this.textureIds.length=0;for(let t=0;t<this.drawCalls.length;t++)this.drawCalls[t].texArray.clear(),oi.push(this.drawCalls[t]);this.drawCalls.length=0;for(let t=0;t<this.batches.length;t++){let e=this.batches[t];e.reset(),or.push(e)}this.batches.length=0}/**
   * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
   * @returns - This GraphicsGeometry object. Good for chaining method calls
   */clear(){return this.graphicsData.length>0&&(this.invalidate(),this.clearDirty++,this.graphicsData.length=0),this}/**
   * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
   * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - The shape object to draw.
   * @param fillStyle - Defines style of the fill.
   * @param lineStyle - Defines style of the lines.
   * @param matrix - Transform applied to the points of the shape.
   * @returns - Returns geometry for chaining.
   */drawShape(t,e=null,r=null,i=null){let s=new os(t,e,r,i);return this.graphicsData.push(s),this.dirty++,this}/**
   * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
   * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - The shape object to draw.
   * @param matrix - Transform applied to the points of the shape.
   * @returns - Returns geometry for chaining.
   */drawHole(t,e=null){if(!this.graphicsData.length)return null;let r=new os(t,null,null,e),i=this.graphicsData[this.graphicsData.length-1];return r.lineStyle=i.lineStyle,i.holes.push(r),this.dirty++,this}/** Destroys the GraphicsGeometry object. */destroy(){super.destroy();for(let t=0;t<this.graphicsData.length;++t)this.graphicsData[t].destroy();this.points.length=0,this.points=null,this.colors.length=0,this.colors=null,this.uvs.length=0,this.uvs=null,this.indices.length=0,this.indices=null,this.indexBuffer.destroy(),this.indexBuffer=null,this.graphicsData.length=0,this.graphicsData=null,this.drawCalls.length=0,this.drawCalls=null,this.batches.length=0,this.batches=null,this._bounds=null}/**
   * Check to see if a point is contained within this geometry.
   * @param point - Point to check if it's contained.
   * @returns {boolean} `true` if the point is contained within geometry.
   */containsPoint(t){let e=this.graphicsData;for(let r=0;r<e.length;++r){let i=e[r];if(i.fillStyle.visible&&i.shape&&(i.matrix?i.matrix.applyInverse(t,on):on.copyFrom(t),i.shape.contains(on.x,on.y))){let t=!1;if(i.holes){for(let e=0;e<i.holes.length;e++)if(i.holes[e].shape.contains(on.x,on.y)){t=!0;break}}if(!t)return!0}}return!1}/**
   * Generates intermediate batch data. Either gets converted to drawCalls
   * or used to convert to batch objects directly by the Graphics object.
   */updateBatches(){if(!this.graphicsData.length){this.batchable=!0;return}if(!this.validateBatching())return;this.cacheDirty=this.dirty;let t=this.uvs,e=this.graphicsData,r=null,i=null;this.batches.length>0&&(i=(r=this.batches[this.batches.length-1]).style);for(let s=this.shapeIndex;s<e.length;s++){this.shapeIndex++;let n=e[s],a=n.fillStyle,o=n.lineStyle;oe[n.type].build(n),n.matrix&&this.transformPoints(n.points,n.matrix),(a.visible||o.visible)&&this.processHoles(n.holes);for(let e=0;e<2;e++){let s=0===e?a:o;if(!s.visible)continue;let h=s.texture.baseTexture,l=this.indices.length,u=this.points.length/2;h.wrapMode=I.REPEAT,0===e?this.processFill(n):this.processLine(n);let d=this.points.length/2-u;0!==d&&(r&&!this._compareStyles(i,s)&&(r.end(l,u),r=null),r||((r=or.pop()||new a5).begin(s,l,u),this.batches.push(r),i=s),this.addUvs(this.points,t,s.texture,u,d,s.matrix))}}let s=this.indices.length,n=this.points.length/2;if(r&&r.end(s,n),0===this.batches.length){this.batchable=!0;return}let a=n>65535;this.indicesUint16&&this.indices.length===this.indicesUint16.length&&a===this.indicesUint16.BYTES_PER_ELEMENT>2?this.indicesUint16.set(this.indices):this.indicesUint16=a?new Uint32Array(this.indices):new Uint16Array(this.indices),this.batchable=this.isBatchable(),this.batchable?this.packBatches():this.buildDrawCalls()}/**
   * Affinity check
   * @param styleA
   * @param styleB
   */_compareStyles(t,e){return!(!t||!e||t.texture.baseTexture!==e.texture.baseTexture||t.color+t.alpha!==e.color+e.alpha||!!t.native!=!!e.native)}/** Test geometry for batching process. */validateBatching(){if(this.dirty===this.cacheDirty||!this.graphicsData.length)return!1;for(let t=0,e=this.graphicsData.length;t<e;t++){let e=this.graphicsData[t],r=e.fillStyle,i=e.lineStyle;if(r&&!r.texture.baseTexture.valid||i&&!i.texture.baseTexture.valid)return!1}return!0}/** Offset the indices so that it works with the batcher. */packBatches(){this.batchDirty++,this.uvsFloat32=new Float32Array(this.uvs);let t=this.batches;for(let e=0,r=t.length;e<r;e++){let r=t[e];for(let t=0;t<r.size;t++){let e=r.start+t;this.indicesUint16[e]=this.indicesUint16[e]-r.attribStart}}}/**
   * Checks to see if this graphics geometry can be batched.
   * Currently it needs to be small enough and not contain any native lines.
   */isBatchable(){if(this.points.length>131070)return!1;let e=this.batches;for(let t=0;t<e.length;t++)if(e[t].style.native)return!1;return this.points.length<2*t.BATCHABLE_SIZE}/** Converts intermediate batches data to drawCalls. */buildDrawCalls(){let t=++e9._globalBatch;for(let t=0;t<this.drawCalls.length;t++)this.drawCalls[t].texArray.clear(),oi.push(this.drawCalls[t]);this.drawCalls.length=0;let e=this.colors,r=this.textureIds,i=oi.pop();i||((i=new rt).texArray=new r6),i.texArray.count=0,i.start=0,i.size=0,i.type=T.TRIANGLES;let s=0,n=null,a=0,o=!1,h=T.TRIANGLES,l=0;this.drawCalls.push(i);for(let u=0;u<this.batches.length;u++){let d=this.batches[u],c=d.style,p=c.texture.baseTexture;!!c.native!==o&&(h=(o=!!c.native)?T.LINES:T.TRIANGLES,n=null,s=8,t++),n!==p&&(n=p,p._batchEnabled!==t&&(8===s&&(t++,s=0,i.size>0&&((i=oi.pop())||((i=new rt).texArray=new r6),this.drawCalls.push(i)),i.start=l,i.size=0,i.texArray.count=0,i.type=h),p.touched=1,p._batchEnabled=t,p._batchLocation=s,p.wrapMode=I.REPEAT,i.texArray.elements[i.texArray.count++]=p,s++)),i.size+=d.size,l+=d.size,a=p._batchLocation,this.addColors(e,c.color,c.alpha,d.attribSize,d.attribStart),this.addTextureIds(r,a,d.attribSize,d.attribStart)}e9._globalBatch=t,this.packAttributes()}/** Packs attributes to single buffer. */packAttributes(){let t=this.points,e=this.uvs,r=this.colors,i=this.textureIds,s=new ArrayBuffer(12*t.length),n=new Float32Array(s),a=new Uint32Array(s),o=0;for(let s=0;s<t.length/2;s++)n[o++]=t[2*s],n[o++]=t[2*s+1],n[o++]=e[2*s],n[o++]=e[2*s+1],a[o++]=r[s],n[o++]=i[s];this._buffer.update(s),this._indexBuffer.update(this.indicesUint16)}/**
   * Process fill part of Graphics.
   * @param data
   */processFill(t){t.holes.length?aZ.triangulate(t,this):oe[t.type].triangulate(t,this)}/**
   * Process line part of Graphics.
   * @param data
   */processLine(t){a9(t,this);for(let e=0;e<t.holes.length;e++)a9(t.holes[e],this)}/**
   * Process the holes data.
   * @param holes
   */processHoles(t){for(let e=0;e<t.length;e++){let r=t[e];oe[r.type].build(r),r.matrix&&this.transformPoints(r.points,r.matrix)}}/** Update the local bounds of the object. Expensive to use performance-wise. */calculateBounds(){let t=this._bounds;t.clear(),t.addVertexData(this.points,0,this.points.length),t.pad(this.boundsPadding,this.boundsPadding)}/**
   * Transform points using matrix.
   * @param points - Points to transform
   * @param matrix - Transform matrix
   */transformPoints(t,e){for(let r=0;r<t.length/2;r++){let i=t[2*r],s=t[2*r+1];t[2*r]=e.a*i+e.c*s+e.tx,t[2*r+1]=e.b*i+e.d*s+e.ty}}/**
   * Add colors.
   * @param colors - List of colors to add to
   * @param color - Color to add
   * @param alpha - Alpha to use
   * @param size - Number of colors to add
   * @param offset
   */addColors(t,e,r,i,s=0){let n=el.shared.setValue(e).toLittleEndianNumber(),a=el.shared.setValue(n).toPremultiplied(r);t.length=Math.max(t.length,s+i);for(let e=0;e<i;e++)t[s+e]=a}/**
   * Add texture id that the shader/fragment wants to use.
   * @param textureIds
   * @param id
   * @param size
   * @param offset
   */addTextureIds(t,e,r,i=0){t.length=Math.max(t.length,i+r);for(let s=0;s<r;s++)t[i+s]=e}/**
   * Generates the UVs for a shape.
   * @param verts - Vertices
   * @param uvs - UVs
   * @param texture - Reference to Texture
   * @param start - Index buffer start index.
   * @param size - The size/length for index buffer.
   * @param matrix - Optional transform for all points.
   */addUvs(t,e,r,i,s,n=null){let a=0,o=e.length,h=r.frame;for(;a<s;){let r=t[(i+a)*2],s=t[(i+a)*2+1];if(n){let t=n.a*r+n.c*s+n.tx;s=n.b*r+n.d*s+n.ty,r=t}a++,e.push(r/h.width,s/h.height)}let l=r.baseTexture;(h.width<l.width||h.height<l.height)&&this.adjustUvs(e,r,o,s)}/**
   * Modify uvs array according to position of texture region
   * Does not work with rotated or trimmed textures
   * @param uvs - array
   * @param texture - region
   * @param start - starting index for uvs
   * @param size - how many points to adjust
   */adjustUvs(t,e,r,i){let s=e.baseTexture,n=r+2*i,a=e.frame,o=a.width/s.width,h=a.height/s.height,l=a.x/a.width,u=a.y/a.height,d=Math.floor(t[r]+1e-6),c=Math.floor(t[r+1]+1e-6);for(let e=r+2;e<n;e+=2)d=Math.min(d,Math.floor(t[e]+1e-6)),c=Math.min(c,Math.floor(t[e+1]+1e-6));l-=d,u-=c;for(let e=r;e<n;e+=2)t[e]=(t[e]+l)*o,t[e+1]=(t[e+1]+u)*h}};oa.BATCHABLE_SIZE=100;let oo=oa;class oh{constructor(){this.color=16777215,this.alpha=1,this.texture=iv.WHITE,this.matrix=null,this.visible=!1,this.reset()}/** Clones the object */clone(){let t=new oh;return t.color=this.color,t.alpha=this.alpha,t.texture=this.texture,t.matrix=this.matrix,t.visible=this.visible,t}/** Reset */reset(){this.color=16777215,this.alpha=1,this.texture=iv.WHITE,this.matrix=null,this.visible=!1}/** Destroy and don't use after this. */destroy(){this.texture=null,this.matrix=null}}class ol extends oh{constructor(){super(...arguments),this.width=0,this.alignment=.5,this.native=!1,this.cap=a1.BUTT,this.join=a0.MITER,this.miterLimit=10}/** Clones the object. */clone(){let t=new ol;return t.color=this.color,t.alpha=this.alpha,t.texture=this.texture,t.matrix=this.matrix,t.visible=this.visible,t.width=this.width,t.alignment=this.alignment,t.native=this.native,t.cap=this.cap,t.join=this.join,t.miterLimit=this.miterLimit,t}/** Reset the line style to default. */reset(){super.reset(),this.color=0,this.alignment=.5,this.width=0,this.native=!1,this.cap=a1.BUTT,this.join=a0.MITER,this.miterLimit=10}}const ou={},od=class t extends sq{/**
   * @param geometry - Geometry to use, if omitted will create a new GraphicsGeometry instance.
   */constructor(t=null){super(),this.shader=null,this.pluginName="batch",this.currentPath=null,this.batches=[],this.batchTint=-1,this.batchDirty=-1,this.vertexData=null,this._fillStyle=new oh,this._lineStyle=new ol,this._matrix=null,this._holeMode=!1,this.state=e0.for2d(),this._geometry=t||new oo,this._geometry.refCount++,this._transformID=-1,this._tintColor=new el(16777215),this.blendMode=b.NORMAL}/**
   * Includes vertex positions, face indices, normals, colors, UVs, and
   * custom attributes within buffers, reducing the cost of passing all
   * this data to the GPU. Can be shared between multiple Mesh or Graphics objects.
   * @readonly
   */get geometry(){return this._geometry}/**
   * Creates a new Graphics object with the same values as this one.
   * Note that only the geometry of the object is cloned, not its transform (position,scale,etc)
   * @returns - A clone of the graphics object
   */clone(){return this.finishPoly(),new t(this._geometry)}/**
   * The blend mode to be applied to the graphic shape. Apply a value of
   * `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.  Note that, since each
   * primitive in the GraphicsGeometry list is rendered sequentially, modes
   * such as `PIXI.BLEND_MODES.ADD` and `PIXI.BLEND_MODES.MULTIPLY` will
   * be applied per-primitive.
   * @default PIXI.BLEND_MODES.NORMAL
   */set blendMode(t){this.state.blendMode=t}get blendMode(){return this.state.blendMode}/**
   * The tint applied to each graphic shape. This is a hex value. A value of
   * 0xFFFFFF will remove any tint effect.
   * @default 0xFFFFFF
   */get tint(){return this._tintColor.value}set tint(t){this._tintColor.setValue(t)}/**
   * The current fill style.
   * @readonly
   */get fill(){return this._fillStyle}/**
   * The current line style.
   * @readonly
   */get line(){return this._lineStyle}lineStyle(t=null,e=0,r,i=.5,s=!1){return"number"==typeof t&&(t={width:t,color:e,alpha:r,alignment:i,native:s}),this.lineTextureStyle(t)}/**
   * Like line style but support texture for line fill.
   * @param [options] - Collection of options for setting line style.
   * @param {number} [options.width=0] - width of the line to draw, will update the objects stored style
   * @param {PIXI.Texture} [options.texture=PIXI.Texture.WHITE] - Texture to use
   * @param {PIXI.ColorSource} [options.color=0x0] - color of the line to draw, will update the objects stored style.
   *  Default 0xFFFFFF if texture present.
   * @param {number} [options.alpha=1] - alpha of the line to draw, will update the objects stored style
   * @param {PIXI.Matrix} [options.matrix=null] - Texture matrix to transform texture
   * @param {number} [options.alignment=0.5] - alignment of the line to draw, (0 = inner, 0.5 = middle, 1 = outer).
   *        WebGL only.
   * @param {boolean} [options.native=false] - If true the lines will be draw using LINES instead of TRIANGLE_STRIP
   * @param {PIXI.LINE_CAP}[options.cap=PIXI.LINE_CAP.BUTT] - line cap style
   * @param {PIXI.LINE_JOIN}[options.join=PIXI.LINE_JOIN.MITER] - line join style
   * @param {number}[options.miterLimit=10] - miter limit ratio
   * @returns {PIXI.Graphics} This Graphics object. Good for chaining method calls
   */lineTextureStyle(t){let e={width:0,texture:iv.WHITE,color:t?.texture?16777215:0,matrix:null,alignment:.5,native:!1,cap:a1.BUTT,join:a0.MITER,miterLimit:10};t=Object.assign(e,t),this.normalizeColor(t),this.currentPath&&this.startPoly();let r=t.width>0&&t.alpha>0;return r?(t.matrix&&(t.matrix=t.matrix.clone(),t.matrix.invert()),Object.assign(this._lineStyle,{visible:r},t)):this._lineStyle.reset(),this}/**
   * Start a polygon object internally.
   * @protected
   */startPoly(){if(this.currentPath){let t=this.currentPath.points,e=this.currentPath.points.length;e>2&&(this.drawShape(this.currentPath),this.currentPath=new rx,this.currentPath.closeStroke=!1,this.currentPath.points.push(t[e-2],t[e-1]))}else this.currentPath=new rx,this.currentPath.closeStroke=!1}/**
   * Finish the polygon object.
   * @protected
   */finishPoly(){this.currentPath&&(this.currentPath.points.length>2?(this.drawShape(this.currentPath),this.currentPath=null):this.currentPath.points.length=0)}/**
   * Moves the current drawing position to x, y.
   * @param x - the X coordinate to move to
   * @param y - the Y coordinate to move to
   * @returns - This Graphics object. Good for chaining method calls
   */moveTo(t,e){return this.startPoly(),this.currentPath.points[0]=t,this.currentPath.points[1]=e,this}/**
   * Draws a line using the current line style from the current drawing position to (x, y);
   * The current drawing position is then set to (x, y).
   * @param x - the X coordinate to draw to
   * @param y - the Y coordinate to draw to
   * @returns - This Graphics object. Good for chaining method calls
   */lineTo(t,e){this.currentPath||this.moveTo(0,0);let r=this.currentPath.points,i=r[r.length-2],s=r[r.length-1];return(i!==t||s!==e)&&r.push(t,e),this}/**
   * Initialize the curve
   * @param x
   * @param y
   */_initCurve(t=0,e=0){this.currentPath?0===this.currentPath.points.length&&(this.currentPath.points=[t,e]):this.moveTo(t,e)}/**
   * Calculate the points for a quadratic bezier curve and then draws it.
   * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
   * @param cpX - Control point x
   * @param cpY - Control point y
   * @param toX - Destination point x
   * @param toY - Destination point y
   * @returns - This Graphics object. Good for chaining method calls
   */quadraticCurveTo(t,e,r,i){this._initCurve();let s=this.currentPath.points;return 0===s.length&&this.moveTo(0,0),ot.curveTo(t,e,r,i,s),this}/**
   * Calculate the points for a bezier curve and then draws it.
   * @param cpX - Control point x
   * @param cpY - Control point y
   * @param cpX2 - Second Control point x
   * @param cpY2 - Second Control point y
   * @param toX - Destination point x
   * @param toY - Destination point y
   * @returns This Graphics object. Good for chaining method calls
   */bezierCurveTo(t,e,r,i,s,n){return this._initCurve(),a6.curveTo(t,e,r,i,s,n,this.currentPath.points),this}/**
   * The `arcTo` method creates an arc/curve between two tangents on the canvas.
   * The first tangent is from the start point to the first control point,
   * and the second tangent is from the first control point to the second control point.
   * Note that the second control point is not necessarily the end point of the arc.
   *
   * "borrowed" from https://code.google.com/p/fxcanvas/ - thanks google!
   * @param x1 - The x-coordinate of the first control point of the arc
   * @param y1 - The y-coordinate of the first control point of the arc
   * @param x2 - The x-coordinate of the second control point of the arc
   * @param y2 - The y-coordinate of the second control point of the arc
   * @param radius - The radius of the arc
   * @returns - This Graphics object. Good for chaining method calls
   */arcTo(t,e,r,i,s){this._initCurve(t,e);let n=this.currentPath.points,a=a4.curveTo(t,e,r,i,s,n);if(a){let{cx:t,cy:e,radius:r,startAngle:i,endAngle:s,anticlockwise:n}=a;this.arc(t,e,r,i,s,n)}return this}/**
   * The arc method creates an arc/curve (used to create circles, or parts of circles).
   * @param cx - The x-coordinate of the center of the circle
   * @param cy - The y-coordinate of the center of the circle
   * @param radius - The radius of the circle
   * @param startAngle - The starting angle, in radians (0 is at the 3 o'clock position
   *  of the arc's circle)
   * @param endAngle - The ending angle, in radians
   * @param anticlockwise - Specifies whether the drawing should be
   *  counter-clockwise or clockwise. False is default, and indicates clockwise, while true
   *  indicates counter-clockwise.
   * @returns - This Graphics object. Good for chaining method calls
   */arc(t,e,r,i,s,n=!1){if(i===s||(!n&&s<=i?s+=rd:n&&i<=s&&(i+=rd),s-i==0))return this;let a=t+Math.cos(i)*r,o=e+Math.sin(i)*r,h=this._geometry.closePointEps,l=this.currentPath?this.currentPath.points:null;if(l){let t=Math.abs(l[l.length-2]-a),e=Math.abs(l[l.length-1]-o);t<h&&e<h||l.push(a,o)}else this.moveTo(a,o),l=this.currentPath.points;return a4.arc(a,o,t,e,r,i,s,n,l),this}/**
   * Specifies a simple one-color fill that subsequent calls to other Graphics methods
   * (such as lineTo() or drawCircle()) use when drawing.
   * @param {PIXI.ColorSource} color - the color of the fill
   * @param alpha - the alpha of the fill, will override the color's alpha
   * @returns - This Graphics object. Suitable for chaining method calls
   */beginFill(t=0,e){return this.beginTextureFill({texture:iv.WHITE,color:t,alpha:e})}/**
   * Normalize the color input from options for line style or fill
   * @param {PIXI.IFillStyleOptions} options - Fill style object.
   */normalizeColor(t){let e=el.shared.setValue(t.color??0);t.color=e.toNumber(),t.alpha??(t.alpha=e.alpha)}/**
   * Begin the texture fill.
   * Note: The wrap mode of the texture is forced to REPEAT on render.
   * @param options - Fill style object.
   * @param {PIXI.Texture} [options.texture=PIXI.Texture.WHITE] - Texture to fill
   * @param {PIXI.ColorSource} [options.color=0xffffff] - Background to fill behind texture
   * @param {number} [options.alpha] - Alpha of fill, overrides the color's alpha
   * @param {PIXI.Matrix} [options.matrix=null] - Transform matrix
   * @returns {PIXI.Graphics} This Graphics object. Good for chaining method calls
   */beginTextureFill(t){let e={texture:iv.WHITE,color:16777215,matrix:null};t=Object.assign(e,t),this.normalizeColor(t),this.currentPath&&this.startPoly();let r=t.alpha>0;return r?(t.matrix&&(t.matrix=t.matrix.clone(),t.matrix.invert()),Object.assign(this._fillStyle,{visible:r},t)):this._fillStyle.reset(),this}/**
   * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
   * @returns - This Graphics object. Good for chaining method calls
   */endFill(){return this.finishPoly(),this._fillStyle.reset(),this}/**
   * Draws a rectangle shape.
   * @param x - The X coord of the top-left of the rectangle
   * @param y - The Y coord of the top-left of the rectangle
   * @param width - The width of the rectangle
   * @param height - The height of the rectangle
   * @returns - This Graphics object. Good for chaining method calls
   */drawRect(t,e,r,i){return this.drawShape(new r_(t,e,r,i))}/**
   * Draw a rectangle shape with rounded/beveled corners.
   * @param x - The X coord of the top-left of the rectangle
   * @param y - The Y coord of the top-left of the rectangle
   * @param width - The width of the rectangle
   * @param height - The height of the rectangle
   * @param radius - Radius of the rectangle corners
   * @returns - This Graphics object. Good for chaining method calls
   */drawRoundedRect(t,e,r,i,s){return this.drawShape(new rb(t,e,r,i,s))}/**
   * Draws a circle.
   * @param x - The X coordinate of the center of the circle
   * @param y - The Y coordinate of the center of the circle
   * @param radius - The radius of the circle
   * @returns - This Graphics object. Good for chaining method calls
   */drawCircle(t,e,r){return this.drawShape(new ry(t,e,r))}/**
   * Draws an ellipse.
   * @param x - The X coordinate of the center of the ellipse
   * @param y - The Y coordinate of the center of the ellipse
   * @param width - The half width of the ellipse
   * @param height - The half height of the ellipse
   * @returns - This Graphics object. Good for chaining method calls
   */drawEllipse(t,e,r,i){return this.drawShape(new rv(t,e,r,i))}/**
   * Draws a polygon using the given path.
   * @param {number[]|PIXI.IPointData[]|PIXI.Polygon} path - The path data used to construct the polygon.
   * @returns - This Graphics object. Good for chaining method calls
   */drawPolygon(...t){let e,r=!0,i=t[0];i.points?(r=i.closeStroke,e=i.points):e=Array.isArray(t[0])?t[0]:t;let s=new rx(e);return s.closeStroke=r,this.drawShape(s),this}/**
   * Draw any shape.
   * @param {PIXI.Circle|PIXI.Ellipse|PIXI.Polygon|PIXI.Rectangle|PIXI.RoundedRectangle} shape - Shape to draw
   * @returns - This Graphics object. Good for chaining method calls
   */drawShape(t){return this._holeMode?this._geometry.drawHole(t,this._matrix):this._geometry.drawShape(t,this._fillStyle.clone(),this._lineStyle.clone(),this._matrix),this}/**
   * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
   * @returns - This Graphics object. Good for chaining method calls
   */clear(){return this._geometry.clear(),this._lineStyle.reset(),this._fillStyle.reset(),this._boundsID++,this._matrix=null,this._holeMode=!1,this.currentPath=null,this}/**
   * True if graphics consists of one rectangle, and thus, can be drawn like a Sprite and
   * masked with gl.scissor.
   * @returns - True if only 1 rect.
   */isFastRect(){let t=this._geometry.graphicsData;return 1===t.length&&t[0].shape.type===rf.RECT&&!t[0].matrix&&!t[0].holes.length&&!(t[0].lineStyle.visible&&t[0].lineStyle.width)}/**
   * Renders the object using the WebGL renderer
   * @param renderer - The renderer
   */_render(t){this.finishPoly();let e=this._geometry;e.updateBatches(),e.batchable?(this.batchDirty!==e.batchDirty&&this._populateBatches(),this._renderBatched(t)):(t.batch.flush(),this._renderDirect(t))}/** Populating batches for rendering. */_populateBatches(){let t=this._geometry,e=this.blendMode,r=t.batches.length;this.batchTint=-1,this._transformID=-1,this.batchDirty=t.batchDirty,this.batches.length=r,this.vertexData=new Float32Array(t.points);for(let i=0;i<r;i++){let r=t.batches[i],s=r.style.color,n=new Float32Array(this.vertexData.buffer,8*r.attribStart,2*r.attribSize),a=new Float32Array(t.uvsFloat32.buffer,8*r.attribStart,2*r.attribSize),o=new Uint16Array(t.indicesUint16.buffer,2*r.start,r.size),h={vertexData:n,blendMode:e,indices:o,uvs:a,_batchRGB:el.shared.setValue(s).toRgbArray(),_tintRGB:s,_texture:r.style.texture,alpha:r.style.alpha,worldAlpha:1};this.batches[i]=h}}/**
   * Renders the batches using the BathedRenderer plugin
   * @param renderer - The renderer
   */_renderBatched(t){if(this.batches.length){t.batch.setObjectRenderer(t.plugins[this.pluginName]),this.calculateVertices(),this.calculateTints();for(let e=0,r=this.batches.length;e<r;e++){let r=this.batches[e];r.worldAlpha=this.worldAlpha*r.alpha,t.plugins[this.pluginName].render(r)}}}/**
   * Renders the graphics direct
   * @param renderer - The renderer
   */_renderDirect(t){let e=this._resolveDirectShader(t),r=this._geometry,i=this.worldAlpha,s=e.uniforms,n=r.drawCalls;s.translationMatrix=this.transform.worldTransform,el.shared.setValue(this._tintColor).premultiply(i).toArray(s.tint),t.shader.bind(e),t.geometry.bind(r,e),t.state.set(this.state);for(let e=0,i=n.length;e<i;e++)this._renderDrawCallDirect(t,r.drawCalls[e])}/**
   * Renders specific DrawCall
   * @param renderer
   * @param drawCall
   */_renderDrawCallDirect(t,e){let{texArray:r,type:i,size:s,start:n}=e,a=r.count;for(let e=0;e<a;e++)t.texture.bind(r.elements[e],e);t.geometry.draw(i,s,n)}/**
   * Resolves shader for direct rendering
   * @param renderer - The renderer
   */_resolveDirectShader(t){let e=this.shader,r=this.pluginName;if(!e){if(!ou[r]){let{maxTextures:e}=t.plugins[r],i=new Int32Array(e);for(let t=0;t<e;t++)i[t]=t;let s={tint:new Float32Array([1,1,1,1]),translationMatrix:new rT,default:r3.from({uSamplers:i},!0)},n=t.plugins[r]._shader.program;ou[r]=new r4(n,s)}e=ou[r]}return e}/**
   * Retrieves the bounds of the graphic shape as a rectangle object.
   * @see PIXI.GraphicsGeometry#bounds
   */_calculateBounds(){this.finishPoly();let t=this._geometry;if(!t.graphicsData.length)return;let{minX:e,minY:r,maxX:i,maxY:s}=t.bounds;this._bounds.addFrame(this.transform,e,r,i,s)}/**
   * Tests if a point is inside this graphics object
   * @param point - the point to test
   * @returns - the result of the test
   */containsPoint(e){return this.worldTransform.applyInverse(e,t._TEMP_POINT),this._geometry.containsPoint(t._TEMP_POINT)}/** Recalculate the tint by applying tint to batches using Graphics tint. */calculateTints(){if(this.batchTint!==this.tint){this.batchTint=this._tintColor.toNumber();for(let t=0;t<this.batches.length;t++){let e=this.batches[t];e._tintRGB=el.shared.setValue(this._tintColor).multiply(e._batchRGB).toLittleEndianNumber()}}}/** If there's a transform update or a change to the shape of the geometry, recalculate the vertices. */calculateVertices(){let t=this.transform._worldID;if(this._transformID===t)return;this._transformID=t;let e=this.transform.worldTransform,r=e.a,i=e.b,s=e.c,n=e.d,a=e.tx,o=e.ty,h=this._geometry.points,l=this.vertexData,u=0;for(let t=0;t<h.length;t+=2){let e=h[t],d=h[t+1];l[u++]=r*e+s*d+a,l[u++]=n*d+i*e+o}}/**
   * Closes the current path.
   * @returns - Returns itself.
   */closePath(){let t=this.currentPath;return t&&(t.closeStroke=!0,this.finishPoly()),this}/**
   * Apply a matrix to the positional data.
   * @param matrix - Matrix to use for transform current shape.
   * @returns - Returns itself.
   */setMatrix(t){return this._matrix=t,this}/**
   * Begin adding holes to the last draw shape
   * IMPORTANT: holes must be fully inside a shape to work
   * Also weirdness ensues if holes overlap!
   * Ellipses, Circles, Rectangles and Rounded Rectangles cannot be holes or host for holes in CanvasRenderer,
   * please use `moveTo` `lineTo`, `quadraticCurveTo` if you rely on pixi-legacy bundle.
   * @returns - Returns itself.
   */beginHole(){return this.finishPoly(),this._holeMode=!0,this}/**
   * End adding holes to the last draw shape.
   * @returns - Returns itself.
   */endHole(){return this.finishPoly(),this._holeMode=!1,this}/**
   * Destroys the Graphics object.
   * @param options - Options parameter. A boolean will act as if all
   *  options have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have
   *  their destroy method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the texture of the child sprite
   * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the base texture of the child sprite
   */destroy(t){this._geometry.refCount--,0===this._geometry.refCount&&this._geometry.dispose(),this._matrix=null,this.currentPath=null,this._lineStyle.destroy(),this._lineStyle=null,this._fillStyle.destroy(),this._fillStyle=null,this._geometry=null,this.shader=null,this.vertexData=null,this.batches.length=0,this.batches=null,super.destroy(t)}};od.curves=a2,/**
* Temporary point to use for containsPoint.
* @private
*/od._TEMP_POINT=new rm;let oc=od;const op={buildPoly:aZ,buildCircle:aq,buildRectangle:aQ,buildRoundedRectangle:aJ,buildLine:a9,ArcUtils:a4,BezierUtils:a6,QuadraticUtils:ot,BatchPart:a5,FILL_COMMANDS:oe,BATCH_POOL:or,DRAW_CALL_POOL:oi};var of={};h(of,"Mesh",()=>ov),h(of,"MeshBatchUvs",()=>om),h(of,"MeshGeometry",()=>ox),h(of,"MeshMaterial",()=>oE);class om{/**
   * @param uvBuffer - Buffer with normalized uv's
   * @param uvMatrix - Material UV matrix
   */constructor(t,e){this.uvBuffer=t,this.uvMatrix=e,this.data=null,this._bufferUpdateId=-1,this._textureUpdateId=-1,this._updateID=0}/**
   * Updates
   * @param forceUpdate - force the update
   */update(t){if(!t&&this._bufferUpdateId===this.uvBuffer._updateID&&this._textureUpdateId===this.uvMatrix._updateID)return;this._bufferUpdateId=this.uvBuffer._updateID,this._textureUpdateId=this.uvMatrix._updateID;let e=this.uvBuffer.data;this.data&&this.data.length===e.length||(this.data=new Float32Array(e.length)),this.uvMatrix.multiplyUvs(e,this.data),this._updateID++}}const og=new rm,o_=new rx,oy=class t extends sq{/**
   * @param geometry - The geometry the mesh will use.
   * @param {PIXI.MeshMaterial} shader - The shader the mesh will use.
   * @param state - The state that the WebGL context is required to be in to render the mesh
   *        if no state is provided, uses {@link PIXI.State.for2d} to create a 2D state for PixiJS.
   * @param drawMode - The drawMode, can be any of the {@link PIXI.DRAW_MODES} constants.
   */constructor(t,e,r,i=T.TRIANGLES){super(),this.geometry=t,this.shader=e,this.state=r||e0.for2d(),this.drawMode=i,this.start=0,this.size=0,this.uvs=null,this.indices=null,this.vertexData=new Float32Array(1),this.vertexDirty=-1,this._transformID=-1,this._roundPixels=G.ROUND_PIXELS,this.batchUvs=null}/**
   * Includes vertex positions, face indices, normals, colors, UVs, and
   * custom attributes within buffers, reducing the cost of passing all
   * this data to the GPU. Can be shared between multiple Mesh objects.
   */get geometry(){return this._geometry}set geometry(t){this._geometry!==t&&(this._geometry&&(this._geometry.refCount--,0===this._geometry.refCount&&this._geometry.dispose()),this._geometry=t,this._geometry&&this._geometry.refCount++,this.vertexDirty=-1)}/**
   * To change mesh uv's, change its uvBuffer data and increment its _updateID.
   * @readonly
   */get uvBuffer(){return this.geometry.buffers[1]}/**
   * To change mesh vertices, change its uvBuffer data and increment its _updateID.
   * Incrementing _updateID is optional because most of Mesh objects do it anyway.
   * @readonly
   */get verticesBuffer(){return this.geometry.buffers[0]}/** Alias for {@link PIXI.Mesh#shader}. */set material(t){this.shader=t}get material(){return this.shader}/**
   * The blend mode to be applied to the Mesh. Apply a value of
   * `PIXI.BLEND_MODES.NORMAL` to reset the blend mode.
   * @default PIXI.BLEND_MODES.NORMAL;
   */set blendMode(t){this.state.blendMode=t}get blendMode(){return this.state.blendMode}/**
   * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
   * Advantages can include sharper image quality (like text) and faster rendering on canvas.
   * The main disadvantage is movement of objects may appear less smooth.
   * To set the global default, change {@link PIXI.settings.ROUND_PIXELS}
   * @default false
   */set roundPixels(t){this._roundPixels!==t&&(this._transformID=-1),this._roundPixels=t}get roundPixels(){return this._roundPixels}/**
   * The multiply tint applied to the Mesh. This is a hex value. A value of
   * `0xFFFFFF` will remove any tint effect.
   *
   * Null for non-MeshMaterial shaders
   * @default 0xFFFFFF
   */get tint(){return"tint"in this.shader?this.shader.tint:null}set tint(t){this.shader.tint=t}/**
   * The tint color as a RGB integer
   * @ignore
   */get tintValue(){return this.shader.tintValue}/** The texture that the Mesh uses. Null for non-MeshMaterial shaders */get texture(){return"texture"in this.shader?this.shader.texture:null}set texture(t){this.shader.texture=t}/**
   * Standard renderer draw.
   * @param renderer - Instance to renderer.
   */_render(e){let r=this.geometry.buffers[0].data;this.shader.batchable&&this.drawMode===T.TRIANGLES&&r.length<2*t.BATCHABLE_SIZE?this._renderToBatch(e):this._renderDefault(e)}/**
   * Standard non-batching way of rendering.
   * @param renderer - Instance to renderer.
   */_renderDefault(t){let e=this.shader;e.alpha=this.worldAlpha,e.update&&e.update(),t.batch.flush(),e.uniforms.translationMatrix=this.transform.worldTransform.toArray(!0),t.shader.bind(e),t.state.set(this.state),t.geometry.bind(this.geometry,e),t.geometry.draw(this.drawMode,this.size,this.start,this.geometry.instanceCount)}/**
   * Rendering by using the Batch system.
   * @param renderer - Instance to renderer.
   */_renderToBatch(t){let e=this.geometry,r=this.shader;r.uvMatrix&&(r.uvMatrix.update(),this.calculateUvs()),this.calculateVertices(),this.indices=e.indexBuffer.data,this._tintRGB=r._tintRGB,this._texture=r.texture;let i=this.material.pluginName;t.batch.setObjectRenderer(t.plugins[i]),t.plugins[i].render(this)}/** Updates vertexData field based on transform and vertices. */calculateVertices(){let t=this.geometry.buffers[0],e=t.data,r=t._updateID;if(r===this.vertexDirty&&this._transformID===this.transform._worldID)return;this._transformID=this.transform._worldID,this.vertexData.length!==e.length&&(this.vertexData=new Float32Array(e.length));let i=this.transform.worldTransform,s=i.a,n=i.b,a=i.c,o=i.d,h=i.tx,l=i.ty,u=this.vertexData;for(let t=0;t<u.length/2;t++){let r=e[2*t],i=e[2*t+1];u[2*t]=s*r+a*i+h,u[2*t+1]=n*r+o*i+l}if(this._roundPixels){let t=G.RESOLUTION;for(let e=0;e<u.length;++e)u[e]=Math.round(u[e]*t)/t}this.vertexDirty=r}/** Updates uv field based on from geometry uv's or batchUvs. */calculateUvs(){let t=this.geometry.buffers[1],e=this.shader;e.uvMatrix.isSimple?this.uvs=t.data:(this.batchUvs||(this.batchUvs=new om(t,e.uvMatrix)),this.batchUvs.update(),this.uvs=this.batchUvs.data)}/**
   * Updates the bounds of the mesh as a rectangle. The bounds calculation takes the worldTransform into account.
   * there must be a aVertexPosition attribute present in the geometry for bounds to be calculated correctly.
   */_calculateBounds(){this.calculateVertices(),this._bounds.addVertexData(this.vertexData,0,this.vertexData.length)}/**
   * Tests if a point is inside this mesh. Works only for PIXI.DRAW_MODES.TRIANGLES.
   * @param point - The point to test.
   * @returns - The result of the test.
   */containsPoint(t){if(!this.getBounds().contains(t.x,t.y))return!1;this.worldTransform.applyInverse(t,og);let e=this.geometry.getBuffer("aVertexPosition").data,r=o_.points,i=this.geometry.getIndex().data,s=i.length,n=4===this.drawMode?3:1;for(let t=0;t+2<s;t+=n){let s=2*i[t],n=2*i[t+1],a=2*i[t+2];if(r[0]=e[s],r[1]=e[s+1],r[2]=e[n],r[3]=e[n+1],r[4]=e[a],r[5]=e[a+1],o_.contains(og.x,og.y))return!0}return!1}destroy(t){super.destroy(t),this._cachedTexture&&(this._cachedTexture.destroy(),this._cachedTexture=null),this.geometry=null,this.shader=null,this.state=null,this.uvs=null,this.indices=null,this.vertexData=null}};oy.BATCHABLE_SIZE=100;let ov=oy;class ox extends rh{/**
   * @param {Float32Array|number[]} [vertices] - Positional data on geometry.
   * @param {Float32Array|number[]} [uvs] - Texture UVs.
   * @param {Uint16Array|number[]} [index] - IndexBuffer
   */constructor(t,e,r){super();let i=new rr(t),s=new rr(e,!0),n=new rr(r,!0,!0);this.addAttribute("aVertexPosition",i,2,!1,w.FLOAT).addAttribute("aTextureCoord",s,2,!1,w.FLOAT).addIndex(n),this._updateId=-1}/**
   * If the vertex position is updated.
   * @readonly
   * @private
   */get vertexDirtyId(){return this.buffers[0]._updateID}}var ob=`varying vec2 vTextureCoord;
uniform vec4 uColor;

uniform sampler2D uSampler;

void main(void)
{
    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;
}
`,oT=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTextureMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;
}
`;class oE extends r4{/**
   * @param uSampler - Texture that material uses to render.
   * @param options - Additional options
   * @param {number} [options.alpha=1] - Default alpha.
   * @param {PIXI.ColorSource} [options.tint=0xFFFFFF] - Default tint.
   * @param {string} [options.pluginName='batch'] - Renderer plugin for batching.
   * @param {PIXI.Program} [options.program=0xFFFFFF] - Custom program.
   * @param {object} [options.uniforms] - Custom uniforms.
   */constructor(t,e){let r={uSampler:t,alpha:1,uTextureMatrix:rT.IDENTITY,uColor:new Float32Array([1,1,1,1])};(e=Object.assign({tint:16777215,alpha:1,pluginName:"batch"},e)).uniforms&&Object.assign(r,e.uniforms),super(e.program||r1.from(oT,ob),r),this._colorDirty=!1,this.uvMatrix=new iB(t),this.batchable=void 0===e.program,this.pluginName=e.pluginName,this._tintColor=new el(e.tint),this._tintRGB=this._tintColor.toLittleEndianNumber(),this._colorDirty=!0,this.alpha=e.alpha}/** Reference to the texture being rendered. */get texture(){return this.uniforms.uSampler}set texture(t){this.uniforms.uSampler!==t&&(!this.uniforms.uSampler.baseTexture.alphaMode!=!t.baseTexture.alphaMode&&(this._colorDirty=!0),this.uniforms.uSampler=t,this.uvMatrix.texture=t)}/**
   * This gets automatically set by the object using this.
   * @default 1
   */set alpha(t){t!==this._alpha&&(this._alpha=t,this._colorDirty=!0)}get alpha(){return this._alpha}/**
   * Multiply tint for the material.
   * @default 0xFFFFFF
   */set tint(t){t!==this.tint&&(this._tintColor.setValue(t),this._tintRGB=this._tintColor.toLittleEndianNumber(),this._colorDirty=!0)}get tint(){return this._tintColor.value}/**
   * Get the internal number from tint color
   * @ignore
   */get tintValue(){return this._tintColor.toNumber()}/** Gets called automatically by the Mesh. Intended to be overridden for custom {@link PIXI.MeshMaterial} objects. */update(){if(this._colorDirty){this._colorDirty=!1;let t=this.texture.baseTexture.alphaMode;el.shared.setValue(this._tintColor).premultiply(this._alpha,t).toArray(this.uniforms.uColor)}this.uvMatrix.update()&&(this.uniforms.uTextureMatrix=this.uvMatrix.mapCoord)}}var oA={};h(oA,"NineSlicePlane",()=>oI),h(oA,"PlaneGeometry",()=>ow),h(oA,"RopeGeometry",()=>oS),h(oA,"SimpleMesh",()=>oC),h(oA,"SimplePlane",()=>oR),h(oA,"SimpleRope",()=>oM);class ow extends ox{/**
   * @param width - The width of the plane.
   * @param height - The height of the plane.
   * @param segWidth - Number of horizontal segments.
   * @param segHeight - Number of vertical segments.
   */constructor(t=100,e=100,r=10,i=10){super(),this.segWidth=r,this.segHeight=i,this.width=t,this.height=e,this.build()}/**
   * Refreshes plane coordinates
   * @private
   */build(){let t=this.segWidth*this.segHeight,e=[],r=[],i=[],s=this.segWidth-1,n=this.segHeight-1,a=this.width/s,o=this.height/n;for(let i=0;i<t;i++){let t=i%this.segWidth,h=i/this.segWidth|0;e.push(t*a,h*o),r.push(t/s,h/n)}let h=s*n;for(let t=0;t<h;t++){let e=t%s,r=t/s|0,n=r*this.segWidth+e,a=r*this.segWidth+e+1,o=(r+1)*this.segWidth+e,h=(r+1)*this.segWidth+e+1;i.push(n,a,o,a,h,o)}this.buffers[0].data=new Float32Array(e),this.buffers[1].data=new Float32Array(r),this.indexBuffer.data=new Uint16Array(i),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}}class oS extends ox{/**
   * @param width - The width (i.e., thickness) of the rope.
   * @param points - An array of {@link PIXI.Point} objects to construct this rope.
   * @param textureScale - By default the rope texture will be stretched to match
   *     rope length. If textureScale is positive this value will be treated as a scaling
   *     factor and the texture will preserve its aspect ratio instead. To create a tiling rope
   *     set baseTexture.wrapMode to {@link PIXI.WRAP_MODES.REPEAT} and use a power of two texture,
   *     then set textureScale=1 to keep the original texture pixel size.
   *     In order to reduce alpha channel artifacts provide a larger texture and downsample -
   *     i.e. set textureScale=0.5 to scale it down twice.
   */constructor(t=200,e,r=0){super(new Float32Array(4*e.length),new Float32Array(4*e.length),new Uint16Array((e.length-1)*6)),this.points=e,this._width=t,this.textureScale=r,this.build()}/**
   * The width (i.e., thickness) of the rope.
   * @readonly
   */get width(){return this._width}/** Refreshes Rope indices and uvs */build(){let t=this.points;if(!t)return;let e=this.getBuffer("aVertexPosition"),r=this.getBuffer("aTextureCoord"),i=this.getIndex();if(t.length<1)return;e.data.length/4!==t.length&&(e.data=new Float32Array(4*t.length),r.data=new Float32Array(4*t.length),i.data=new Uint16Array((t.length-1)*6));let s=r.data,n=i.data;s[0]=0,s[1]=0,s[2]=0,s[3]=1;let a=0,o=t[0],h=this._width*this.textureScale,l=t.length;for(let e=0;e<l;e++){let r=4*e;if(this.textureScale>0){let r=o.x-t[e].x,i=o.y-t[e].y,s=Math.sqrt(r*r+i*i);o=t[e],a+=s/h}else a=e/(l-1);s[r]=a,s[r+1]=0,s[r+2]=a,s[r+3]=1}let u=0;for(let t=0;t<l-1;t++){let e=2*t;n[u++]=e,n[u++]=e+1,n[u++]=e+2,n[u++]=e+2,n[u++]=e+1,n[u++]=e+3}r.update(),i.update(),this.updateVertices()}/** refreshes vertices of Rope mesh */updateVertices(){let t=this.points;if(t.length<1)return;let e=t[0],r,i=0,s=0,n=this.buffers[0].data,a=t.length,o=this.textureScale>0?this.textureScale*this._width/2:this._width/2;for(let h=0;h<a;h++){let l=t[h],u=4*h;s=-((r=h<t.length-1?t[h+1]:l).x-e.x),i=r.y-e.y;let d=(1-h/(a-1))*10;d>1&&(d=1);let c=Math.sqrt(i*i+s*s);c<1e-6?(i=0,s=0):(i/=c,s/=c,i*=o,s*=o),n[u]=l.x+i,n[u+1]=l.y+s,n[u+2]=l.x-i,n[u+3]=l.y-s,e=l}this.buffers[0].update()}update(){this.textureScale>0?this.build():this.updateVertices()}}class oR extends ov{/**
   * @param texture - The texture to use on the SimplePlane.
   * @param verticesX - The number of vertices in the x-axis
   * @param verticesY - The number of vertices in the y-axis
   */constructor(t,e,r){let i=new ow(t.width,t.height,e,r),s=new oE(iv.WHITE);super(i,s),this.texture=t,this.autoResize=!0}/**
   * Method used for overrides, to do something in case texture frame was changed.
   * Meshes based on plane can override it and change more details based on texture.
   */textureUpdated(){this._textureID=this.shader.texture._updateID;let t=this.geometry,{width:e,height:r}=this.shader.texture;this.autoResize&&(t.width!==e||t.height!==r)&&(t.width=this.shader.texture.width,t.height=this.shader.texture.height,t.build())}set texture(t){this.shader.texture!==t&&(this.shader.texture=t,this._textureID=-1,t.baseTexture.valid?this.textureUpdated():t.once("update",this.textureUpdated,this))}get texture(){return this.shader.texture}_render(t){this._textureID!==this.shader.texture._updateID&&this.textureUpdated(),super._render(t)}destroy(t){this.shader.texture.off("update",this.textureUpdated,this),super.destroy(t)}}class oI extends oR{/**
   * @param texture - The texture to use on the NineSlicePlane.
   * @param {number} [leftWidth=10] - size of the left vertical bar (A)
   * @param {number} [topHeight=10] - size of the top horizontal bar (C)
   * @param {number} [rightWidth=10] - size of the right vertical bar (B)
   * @param {number} [bottomHeight=10] - size of the bottom horizontal bar (D)
   */constructor(t,e,r,i,s){super(iv.WHITE,4,4),this._origWidth=t.orig.width,this._origHeight=t.orig.height,this._width=this._origWidth,this._height=this._origHeight,this._leftWidth=e??t.defaultBorders?.left??10,this._rightWidth=i??t.defaultBorders?.right??10,this._topHeight=r??t.defaultBorders?.top??10,this._bottomHeight=s??t.defaultBorders?.bottom??10,this.texture=t}textureUpdated(){this._textureID=this.shader.texture._updateID,this._refresh()}get vertices(){return this.geometry.getBuffer("aVertexPosition").data}set vertices(t){this.geometry.getBuffer("aVertexPosition").data=t}/** Updates the horizontal vertices. */updateHorizontalVertices(){let t=this.vertices,e=this._getMinScale();t[9]=t[11]=t[13]=t[15]=this._topHeight*e,t[17]=t[19]=t[21]=t[23]=this._height-this._bottomHeight*e,t[25]=t[27]=t[29]=t[31]=this._height}/** Updates the vertical vertices. */updateVerticalVertices(){let t=this.vertices,e=this._getMinScale();t[2]=t[10]=t[18]=t[26]=this._leftWidth*e,t[4]=t[12]=t[20]=t[28]=this._width-this._rightWidth*e,t[6]=t[14]=t[22]=t[30]=this._width}/**
   * Returns the smaller of a set of vertical and horizontal scale of nine slice corners.
   * @returns Smaller number of vertical and horizontal scale.
   */_getMinScale(){let t=this._leftWidth+this._rightWidth,e=this._width>t?1:this._width/t,r=this._topHeight+this._bottomHeight,i=this._height>r?1:this._height/r;return Math.min(e,i)}/** The width of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */get width(){return this._width}set width(t){this._width=t,this._refresh()}/** The height of the NineSlicePlane, setting this will actually modify the vertices and UV's of this plane. */get height(){return this._height}set height(t){this._height=t,this._refresh()}/** The width of the left column. */get leftWidth(){return this._leftWidth}set leftWidth(t){this._leftWidth=t,this._refresh()}/** The width of the right column. */get rightWidth(){return this._rightWidth}set rightWidth(t){this._rightWidth=t,this._refresh()}/** The height of the top row. */get topHeight(){return this._topHeight}set topHeight(t){this._topHeight=t,this._refresh()}/** The height of the bottom row. */get bottomHeight(){return this._bottomHeight}set bottomHeight(t){this._bottomHeight=t,this._refresh()}/** Refreshes NineSlicePlane coords. All of them. */_refresh(){let t=this.texture,e=this.geometry.buffers[1].data;this._origWidth=t.orig.width,this._origHeight=t.orig.height;let r=1/this._origWidth,i=1/this._origHeight;e[0]=e[8]=e[16]=e[24]=0,e[1]=e[3]=e[5]=e[7]=0,e[6]=e[14]=e[22]=e[30]=1,e[25]=e[27]=e[29]=e[31]=1,e[2]=e[10]=e[18]=e[26]=r*this._leftWidth,e[4]=e[12]=e[20]=e[28]=1-r*this._rightWidth,e[9]=e[11]=e[13]=e[15]=i*this._topHeight,e[17]=e[19]=e[21]=e[23]=1-i*this._bottomHeight,this.updateHorizontalVertices(),this.updateVerticalVertices(),this.geometry.buffers[0].update(),this.geometry.buffers[1].update()}}class oC extends ov{/**
   * @param texture - The texture to use
   * @param {Float32Array} [vertices] - if you want to specify the vertices
   * @param {Float32Array} [uvs] - if you want to specify the uvs
   * @param {Uint16Array} [indices] - if you want to specify the indices
   * @param drawMode - the drawMode, can be any of the Mesh.DRAW_MODES consts
   */constructor(t=iv.EMPTY,e,r,i,s){let n=new ox(e,r,i);n.getBuffer("aVertexPosition").static=!1;let a=new oE(t);super(n,a,null,s),this.autoUpdate=!0}/**
   * Collection of vertices data.
   * @type {Float32Array}
   */get vertices(){return this.geometry.getBuffer("aVertexPosition").data}set vertices(t){this.geometry.getBuffer("aVertexPosition").data=t}_render(t){this.autoUpdate&&this.geometry.getBuffer("aVertexPosition").update(),super._render(t)}}class oM extends ov{/**
   * Note: The wrap mode of the texture is set to REPEAT if `textureScale` is positive.
   * @param texture - The texture to use on the rope.
   * @param points - An array of {@link PIXI.Point} objects to construct this rope.
   * @param {number} textureScale - Optional. Positive values scale rope texture
   * keeping its aspect ratio. You can reduce alpha channel artifacts by providing a larger texture
   * and downsampling here. If set to zero, texture will be stretched instead.
   */constructor(t,e,r=0){let i=new oS(t.height,e,r),s=new oE(t);r>0&&(t.baseTexture.wrapMode=I.REPEAT),super(i,s),this.autoUpdate=!0}_render(t){let e=this.geometry;(this.autoUpdate||e._width!==this.shader.texture.height)&&(e._width=this.shader.texture.height,e.update()),super._render(t)}}var oP={};h(oP,"ParticleContainer",()=>oD),h(oP,"ParticleRenderer",()=>oN);class oD extends sq{/**
   * @param maxSize - The maximum number of particles that can be rendered by the container.
   *  Affects size of allocated buffers.
   * @param properties - The properties of children that should be uploaded to the gpu and applied.
   * @param {boolean} [properties.vertices=false] - When true, vertices be uploaded and applied.
   *                  if sprite's ` scale/anchor/trim/frame/orig` is dynamic, please set `true`.
   * @param {boolean} [properties.position=true] - When true, position be uploaded and applied.
   * @param {boolean} [properties.rotation=false] - When true, rotation be uploaded and applied.
   * @param {boolean} [properties.uvs=false] - When true, uvs be uploaded and applied.
   * @param {boolean} [properties.tint=false] - When true, alpha and tint be uploaded and applied.
   * @param {number} [batchSize=16384] - Number of particles per batch. If less than maxSize, it uses maxSize instead.
   * @param {boolean} [autoResize=false] - If true, container allocates more batches in case
   *  there are more than `maxSize` particles.
   */constructor(t=1500,e,r=16384,i=!1){super(),r>16384&&(r=16384),this._properties=[!1,!0,!1,!1,!1],this._maxSize=t,this._batchSize=r,this._buffers=null,this._bufferUpdateIDs=[],this._updateID=0,this.interactiveChildren=!1,this.blendMode=b.NORMAL,this.autoResize=i,this.roundPixels=!0,this.baseTexture=null,this.setProperties(e),this._tintColor=new el(0),this.tintRgb=new Float32Array(3),this.tint=16777215}/**
   * Sets the private properties array to dynamic / static based on the passed properties object
   * @param properties - The properties to be uploaded
   */setProperties(t){t&&(this._properties[0]="vertices"in t||"scale"in t?!!t.vertices||!!t.scale:this._properties[0],this._properties[1]="position"in t?!!t.position:this._properties[1],this._properties[2]="rotation"in t?!!t.rotation:this._properties[2],this._properties[3]="uvs"in t?!!t.uvs:this._properties[3],this._properties[4]="tint"in t||"alpha"in t?!!t.tint||!!t.alpha:this._properties[4])}updateTransform(){this.displayObjectUpdateTransform()}/**
   * The tint applied to the container. This is a hex value.
   * A value of 0xFFFFFF will remove any tint effect.
   * IMPORTANT: This is a WebGL only feature and will be ignored by the canvas renderer.
   * @default 0xFFFFFF
   */get tint(){return this._tintColor.value}set tint(t){this._tintColor.setValue(t),this._tintColor.toRgbArray(this.tintRgb)}/**
   * Renders the container using the WebGL renderer.
   * @param renderer - The WebGL renderer.
   */render(t){this.visible&&!(this.worldAlpha<=0)&&this.children.length&&this.renderable&&(this.baseTexture||(this.baseTexture=this.children[0]._texture.baseTexture,this.baseTexture.valid||this.baseTexture.once("update",()=>this.onChildrenChange(0))),t.batch.setObjectRenderer(t.plugins.particle),t.plugins.particle.render(this))}/**
   * Set the flag that static data should be updated to true
   * @param smallestChildIndex - The smallest child index.
   */onChildrenChange(t){let e=Math.floor(t/this._batchSize);for(;this._bufferUpdateIDs.length<e;)this._bufferUpdateIDs.push(0);this._bufferUpdateIDs[e]=++this._updateID}dispose(){if(this._buffers){for(let t=0;t<this._buffers.length;++t)this._buffers[t].destroy();this._buffers=null}}/**
   * Destroys the container
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have their
   *  destroy method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the texture of the child sprite
   * @param {boolean} [options.baseTexture=false] - Only used for child Sprites if options.children is set to true
   *  Should it destroy the base texture of the child sprite
   */destroy(t){super.destroy(t),this.dispose(),this._properties=null,this._buffers=null,this._bufferUpdateIDs=null}}class oO{/**
   * @param {object} properties - The properties to upload.
   * @param {boolean[]} dynamicPropertyFlags - Flags for which properties are dynamic.
   * @param {number} size - The size of the batch.
   */constructor(t,e,r){this.geometry=new rh,this.indexBuffer=null,this.size=r,this.dynamicProperties=[],this.staticProperties=[];for(let r=0;r<t.length;++r){let i=t[r];i={attributeName:i.attributeName,size:i.size,uploadFunction:i.uploadFunction,type:i.type||w.FLOAT,offset:i.offset},e[r]?this.dynamicProperties.push(i):this.staticProperties.push(i)}this.staticStride=0,this.staticBuffer=null,this.staticData=null,this.staticDataUint32=null,this.dynamicStride=0,this.dynamicBuffer=null,this.dynamicData=null,this.dynamicDataUint32=null,this._updateID=0,this.initBuffers()}/** Sets up the renderer context and necessary buffers. */initBuffers(){let t=this.geometry,e=0;this.indexBuffer=new rr(ta.createIndicesForQuads(this.size),!0,!0),t.addIndex(this.indexBuffer),this.dynamicStride=0;for(let t=0;t<this.dynamicProperties.length;++t){let r=this.dynamicProperties[t];r.offset=e,e+=r.size,this.dynamicStride+=r.size}let r=new ArrayBuffer(this.size*this.dynamicStride*16);this.dynamicData=new Float32Array(r),this.dynamicDataUint32=new Uint32Array(r),this.dynamicBuffer=new rr(this.dynamicData,!1,!1);let i=0;this.staticStride=0;for(let t=0;t<this.staticProperties.length;++t){let e=this.staticProperties[t];e.offset=i,i+=e.size,this.staticStride+=e.size}let s=new ArrayBuffer(this.size*this.staticStride*16);this.staticData=new Float32Array(s),this.staticDataUint32=new Uint32Array(s),this.staticBuffer=new rr(this.staticData,!0,!1);for(let e=0;e<this.dynamicProperties.length;++e){let r=this.dynamicProperties[e];t.addAttribute(r.attributeName,this.dynamicBuffer,0,r.type===w.UNSIGNED_BYTE,r.type,4*this.dynamicStride,4*r.offset)}for(let e=0;e<this.staticProperties.length;++e){let r=this.staticProperties[e];t.addAttribute(r.attributeName,this.staticBuffer,0,r.type===w.UNSIGNED_BYTE,r.type,4*this.staticStride,4*r.offset)}}/**
   * Uploads the dynamic properties.
   * @param children - The children to upload.
   * @param startIndex - The index to start at.
   * @param amount - The number to upload.
   */uploadDynamic(t,e,r){for(let i=0;i<this.dynamicProperties.length;i++){let s=this.dynamicProperties[i];s.uploadFunction(t,e,r,s.type===w.UNSIGNED_BYTE?this.dynamicDataUint32:this.dynamicData,this.dynamicStride,s.offset)}this.dynamicBuffer._updateID++}/**
   * Uploads the static properties.
   * @param children - The children to upload.
   * @param startIndex - The index to start at.
   * @param amount - The number to upload.
   */uploadStatic(t,e,r){for(let i=0;i<this.staticProperties.length;i++){let s=this.staticProperties[i];s.uploadFunction(t,e,r,s.type===w.UNSIGNED_BYTE?this.staticDataUint32:this.staticData,this.staticStride,s.offset)}this.staticBuffer._updateID++}/** Destroys the ParticleBuffer. */destroy(){this.indexBuffer=null,this.dynamicProperties=null,this.dynamicBuffer=null,this.dynamicData=null,this.dynamicDataUint32=null,this.staticProperties=null,this.staticBuffer=null,this.staticData=null,this.staticDataUint32=null,this.geometry.destroy()}}var oB=`varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;

void main(void){
    vec4 color = texture2D(uSampler, vTextureCoord) * vColor;
    gl_FragColor = color;
}`,oF=`attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;

attribute vec2 aPositionCoord;
attribute float aRotation;

uniform mat3 translationMatrix;
uniform vec4 uColor;

varying vec2 vTextureCoord;
varying vec4 vColor;

void main(void){
    float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);
    float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);

    vec2 v = vec2(x, y);
    v = v + aPositionCoord;

    gl_Position = vec4((translationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vColor = aColor * uColor;
}
`;class oN extends r8{/**
   * @param renderer - The renderer this sprite batch works for.
   */constructor(t){super(t),this.shader=null,this.properties=null,this.tempMatrix=new rT,this.properties=[// verticesData
{attributeName:"aVertexPosition",size:2,uploadFunction:this.uploadVertices,offset:0},// positionData
{attributeName:"aPositionCoord",size:2,uploadFunction:this.uploadPosition,offset:0},// rotationData
{attributeName:"aRotation",size:1,uploadFunction:this.uploadRotation,offset:0},// uvsData
{attributeName:"aTextureCoord",size:2,uploadFunction:this.uploadUvs,offset:0},// tintData
{attributeName:"aColor",size:1,type:w.UNSIGNED_BYTE,uploadFunction:this.uploadTint,offset:0}],this.shader=r4.from(oF,oB,{}),this.state=e0.for2d()}/**
   * Renders the particle container object.
   * @param container - The container to render using this ParticleRenderer.
   */render(t){let e=t.children,r=t._maxSize,i=t._batchSize,s=this.renderer,n=e.length;if(0===n)return;n>r&&!t.autoResize&&(n=r);let a=t._buffers;a||(a=t._buffers=this.generateBuffers(t));let o=e[0]._texture.baseTexture,h=o.alphaMode>0;this.state.blendMode=ta.correctBlendMode(t.blendMode,h),s.state.set(this.state);let l=s.gl,u=t.worldTransform.copyTo(this.tempMatrix);u.prepend(s.globalUniforms.uniforms.projectionMatrix),this.shader.uniforms.translationMatrix=u.toArray(!0),this.shader.uniforms.uColor=el.shared.setValue(t.tintRgb).premultiply(t.worldAlpha,h).toArray(this.shader.uniforms.uColor),this.shader.uniforms.uSampler=o,this.renderer.shader.bind(this.shader);let d=!1;for(let r=0,o=0;r<n;r+=i,o+=1){let h=n-r;h>i&&(h=i),o>=a.length&&a.push(this._generateOneMoreBuffer(t));let u=a[o];u.uploadDynamic(e,r,h);let c=t._bufferUpdateIDs[o]||0;(d=d||u._updateID<c)&&(u._updateID=t._updateID,u.uploadStatic(e,r,h)),s.geometry.bind(u.geometry),l.drawElements(l.TRIANGLES,6*h,l.UNSIGNED_SHORT,0)}}/**
   * Creates one particle buffer for each child in the container we want to render and updates internal properties.
   * @param container - The container to render using this ParticleRenderer
   * @returns - The buffers
   */generateBuffers(t){let e=[],r=t._maxSize,i=t._batchSize,s=t._properties;for(let t=0;t<r;t+=i)e.push(new oO(this.properties,s,i));return e}/**
   * Creates one more particle buffer, because container has autoResize feature.
   * @param container - The container to render using this ParticleRenderer
   * @returns - The generated buffer
   */_generateOneMoreBuffer(t){let e=t._batchSize,r=t._properties;return new oO(this.properties,r,e)}/**
   * Uploads the vertices.
   * @param children - the array of sprites to render
   * @param startIndex - the index to start from in the children array
   * @param amount - the amount of children that will have their vertices uploaded
   * @param array - The vertices to upload.
   * @param stride - Stride to use for iteration.
   * @param offset - Offset to start at.
   */uploadVertices(t,e,r,i,s,n){let a=0,o=0,h=0,l=0;for(let u=0;u<r;++u){let r=t[e+u],d=r._texture,c=r.scale.x,p=r.scale.y,f=d.trim,m=d.orig;f?(a=(o=f.x-r.anchor.x*m.width)+f.width,h=(l=f.y-r.anchor.y*m.height)+f.height):(a=m.width*(1-r.anchor.x),o=-(m.width*r.anchor.x),h=m.height*(1-r.anchor.y),l=-(m.height*r.anchor.y)),i[n]=o*c,i[n+1]=l*p,i[n+s]=a*c,i[n+s+1]=l*p,i[n+2*s]=a*c,i[n+2*s+1]=h*p,i[n+3*s]=o*c,i[n+3*s+1]=h*p,n+=4*s}}/**
   * Uploads the position.
   * @param children - the array of sprites to render
   * @param startIndex - the index to start from in the children array
   * @param amount - the amount of children that will have their positions uploaded
   * @param array - The vertices to upload.
   * @param stride - Stride to use for iteration.
   * @param offset - Offset to start at.
   */uploadPosition(t,e,r,i,s,n){for(let a=0;a<r;a++){let r=t[e+a].position;i[n]=r.x,i[n+1]=r.y,i[n+s]=r.x,i[n+s+1]=r.y,i[n+2*s]=r.x,i[n+2*s+1]=r.y,i[n+3*s]=r.x,i[n+3*s+1]=r.y,n+=4*s}}/**
   * Uploads the rotation.
   * @param children - the array of sprites to render
   * @param startIndex - the index to start from in the children array
   * @param amount - the amount of children that will have their rotation uploaded
   * @param array - The vertices to upload.
   * @param stride - Stride to use for iteration.
   * @param offset - Offset to start at.
   */uploadRotation(t,e,r,i,s,n){for(let a=0;a<r;a++){let r=t[e+a].rotation;i[n]=r,i[n+s]=r,i[n+2*s]=r,i[n+3*s]=r,n+=4*s}}/**
   * Uploads the UVs.
   * @param children - the array of sprites to render
   * @param startIndex - the index to start from in the children array
   * @param amount - the amount of children that will have their rotation uploaded
   * @param array - The vertices to upload.
   * @param stride - Stride to use for iteration.
   * @param offset - Offset to start at.
   */uploadUvs(t,e,r,i,s,n){for(let a=0;a<r;++a){let r=t[e+a]._texture._uvs;r?(i[n]=r.x0,i[n+1]=r.y0,i[n+s]=r.x1,i[n+s+1]=r.y1,i[n+2*s]=r.x2,i[n+2*s+1]=r.y2,i[n+3*s]=r.x3,i[n+3*s+1]=r.y3):(i[n]=0,i[n+1]=0,i[n+s]=0,i[n+s+1]=0,i[n+2*s]=0,i[n+2*s+1]=0,i[n+3*s]=0,i[n+3*s+1]=0),n+=4*s}}/**
   * Uploads the tint.
   * @param children - the array of sprites to render
   * @param startIndex - the index to start from in the children array
   * @param amount - the amount of children that will have their rotation uploaded
   * @param array - The vertices to upload.
   * @param stride - Stride to use for iteration.
   * @param offset - Offset to start at.
   */uploadTint(t,e,r,i,s,n){for(let a=0;a<r;++a){let r=t[e+a],o=el.shared.setValue(r._tintRGB).toPremultiplied(r.alpha,r.texture.baseTexture.alphaMode>0);i[n]=o,i[n+s]=o,i[n+2*s]=o,i[n+3*s]=o,n+=4*s}}/** Destroys the ParticleRenderer. */destroy(){super.destroy(),this.shader&&(this.shader.destroy(),this.shader=null),this.tempMatrix=null}}oN.extension={name:"particle",type:e$.RendererPlugin},eK.add(oN);var oL={};h(oL,"BasePrepare",()=>o6),h(oL,"CountLimiter",()=>oZ),h(oL,"Prepare",()=>ht),h(oL,"TimeLimiter",()=>he);var ok={};h(ok,"TEXT_GRADIENT",()=>oU),h(ok,"Text",()=>oK),h(ok,"TextMetrics",()=>oj),h(ok,"TextStyle",()=>oW);var oU=((lh=oU||{})[lh.LINEAR_VERTICAL=0]="LINEAR_VERTICAL",lh[lh.LINEAR_HORIZONTAL=1]="LINEAR_HORIZONTAL",lh);const oG={// TextMetrics requires getImageData readback for measuring fonts.
willReadFrequently:!0},oH=class t{/**
   * Checking that we can use modern canvas 2D API.
   *
   * Note: This is an unstable API, Chrome < 94 use `textLetterSpacing`, later versions use `letterSpacing`.
   * @see PIXI.TextMetrics.experimentalLetterSpacing
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/letterSpacing
   * @see https://developer.chrome.com/origintrials/#/view_trial/3585991203293757441
   */static get experimentalLetterSpacingSupported(){let e=t._experimentalLetterSpacingSupported;if(void 0!==e){let r=G.ADAPTER.getCanvasRenderingContext2D().prototype;e=t._experimentalLetterSpacingSupported="letterSpacing"in r||"textLetterSpacing"in r}return e}/**
   * @param text - the text that was measured
   * @param style - the style that was measured
   * @param width - the measured width of the text
   * @param height - the measured height of the text
   * @param lines - an array of the lines of text broken by new lines and wrapping if specified in style
   * @param lineWidths - an array of the line widths for each line matched to `lines`
   * @param lineHeight - the measured line height for this style
   * @param maxLineWidth - the maximum line width for all measured lines
   * @param {PIXI.IFontMetrics} fontProperties - the font properties object from TextMetrics.measureFont
   */constructor(t,e,r,i,s,n,a,o,h){this.text=t,this.style=e,this.width=r,this.height=i,this.lines=s,this.lineWidths=n,this.lineHeight=a,this.maxLineWidth=o,this.fontProperties=h}/**
   * Measures the supplied string of text and returns a Rectangle.
   * @param text - The text to measure.
   * @param style - The text style to use for measuring
   * @param wordWrap - Override for if word-wrap should be applied to the text.
   * @param canvas - optional specification of the canvas to use for measuring.
   * @returns Measured width and height of the text.
   */static measureText(e,r,i,s=t._canvas){i=i??r.wordWrap;let n=r.toFontString(),a=t.measureFont(n);0===a.fontSize&&(a.fontSize=r.fontSize,a.ascent=r.fontSize);let o=s.getContext("2d",oG);o.font=n;let h=(i?t.wordWrap(e,r,s):e).split(/(?:\r\n|\r|\n)/),l=Array(h.length),u=0;for(let e=0;e<h.length;e++){let i=t._measureText(h[e],r.letterSpacing,o);l[e]=i,u=Math.max(u,i)}let d=u+r.strokeThickness;r.dropShadow&&(d+=r.dropShadowDistance);let c=r.lineHeight||a.fontSize+r.strokeThickness,p=Math.max(c,a.fontSize+2*r.strokeThickness)+r.leading+(h.length-1)*(c+r.leading);return r.dropShadow&&(p+=r.dropShadowDistance),new t(e,r,d,p,h,l,c+r.leading,u,a)}static _measureText(e,r,i){let s=!1;t.experimentalLetterSpacingSupported&&(t.experimentalLetterSpacing?(i.letterSpacing=`${r}px`,i.textLetterSpacing=`${r}px`,s=!0):(i.letterSpacing="0px",i.textLetterSpacing="0px"));let n=i.measureText(e).width;return n>0&&(s?n-=r:n+=(t.graphemeSegmenter(e).length-1)*r),n}/**
   * Applies newlines to a string to have it optimally fit into the horizontal
   * bounds set by the Text object's wordWrapWidth property.
   * @param text - String to apply word wrapping to
   * @param style - the style to use when wrapping
   * @param canvas - optional specification of the canvas to use for measuring.
   * @returns New string with new lines applied where required
   */static wordWrap(e,r,i=t._canvas){let s=i.getContext("2d",oG),n=0,a="",o="",h=/* @__PURE__ */Object.create(null),{letterSpacing:l,whiteSpace:u}=r,d=t.collapseSpaces(u),c=t.collapseNewlines(u),p=!d,f=r.wordWrapWidth+l,m=t.tokenize(e);for(let e=0;e<m.length;e++){let i=m[e];if(t.isNewline(i)){if(!c){o+=t.addLine(a),p=!d,a="",n=0;continue}i=" "}if(d){let e=t.isBreakingSpace(i),r=t.isBreakingSpace(a[a.length-1]);if(e&&r)continue}let u=t.getFromCache(i,l,h,s);if(u>f){if(""!==a&&(o+=t.addLine(a),a="",n=0),t.canBreakWords(i,r.breakWords)){let e=t.wordWrapSplit(i);for(let u=0;u<e.length;u++){let d=e[u],c=d,m=1;for(;e[u+m];){let s=e[u+m];if(t.canBreakChars(c,s,i,u,r.breakWords))break;d+=s,c=s,m++}u+=m-1;let g=t.getFromCache(d,l,h,s);g+n>f&&(o+=t.addLine(a),p=!1,a="",n=0),a+=d,n+=g}}else{a.length>0&&(o+=t.addLine(a),a="",n=0);let r=e===m.length-1;o+=t.addLine(i,!r),p=!1,a="",n=0}}else u+n>f&&(p=!1,o+=t.addLine(a),a="",n=0),(a.length>0||!t.isBreakingSpace(i)||p)&&(a+=i,n+=u)}return o+t.addLine(a,!1)}/**
   * Convienience function for logging each line added during the wordWrap method.
   * @param line    - The line of text to add
   * @param newLine - Add new line character to end
   * @returns A formatted line
   */static addLine(e,r=!0){return e=t.trimRight(e),e=r?`${e}
`:e}/**
   * Gets & sets the widths of calculated characters in a cache object
   * @param key            - The key
   * @param letterSpacing  - The letter spacing
   * @param cache          - The cache
   * @param context        - The canvas context
   * @returns The from cache.
   */static getFromCache(e,r,i,s){let n=i[e];return"number"!=typeof n&&(n=t._measureText(e,r,s)+r,i[e]=n),n}/**
   * Determines whether we should collapse breaking spaces.
   * @param whiteSpace - The TextStyle property whiteSpace
   * @returns Should collapse
   */static collapseSpaces(t){return"normal"===t||"pre-line"===t}/**
   * Determines whether we should collapse newLine chars.
   * @param whiteSpace - The white space
   * @returns should collapse
   */static collapseNewlines(t){return"normal"===t}/**
   * Trims breaking whitespaces from string.
   * @param text - The text
   * @returns Trimmed string
   */static trimRight(e){if("string"!=typeof e)return"";for(let r=e.length-1;r>=0;r--){let i=e[r];if(!t.isBreakingSpace(i))break;e=e.slice(0,-1)}return e}/**
   * Determines if char is a newline.
   * @param char - The character
   * @returns True if newline, False otherwise.
   */static isNewline(e){return"string"==typeof e&&t._newlines.includes(e.charCodeAt(0))}/**
   * Determines if char is a breaking whitespace.
   *
   * It allows one to determine whether char should be a breaking whitespace
   * For example certain characters in CJK langs or numbers.
   * It must return a boolean.
   * @param char - The character
   * @param [_nextChar] - The next character
   * @returns True if whitespace, False otherwise.
   */static isBreakingSpace(e,r){return"string"==typeof e&&t._breakingSpaces.includes(e.charCodeAt(0))}/**
   * Splits a string into words, breaking-spaces and newLine characters
   * @param text - The text
   * @returns A tokenized array
   */static tokenize(e){let r=[],i="";if("string"!=typeof e)return r;for(let s=0;s<e.length;s++){let n=e[s],a=e[s+1];if(t.isBreakingSpace(n,a)||t.isNewline(n)){""!==i&&(r.push(i),i=""),r.push(n);continue}i+=n}return""!==i&&r.push(i),r}/**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It allows one to customise which words should break
   * Examples are if the token is CJK or numbers.
   * It must return a boolean.
   * @param _token - The token
   * @param breakWords - The style attr break words
   * @returns Whether to break word or not
   */static canBreakWords(t,e){return e}/**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It allows one to determine whether a pair of characters
   * should be broken by newlines
   * For example certain characters in CJK langs or numbers.
   * It must return a boolean.
   * @param _char - The character
   * @param _nextChar - The next character
   * @param _token - The token/word the characters are from
   * @param _index - The index in the token of the char
   * @param _breakWords - The style attr break words
   * @returns whether to break word or not
   */static canBreakChars(t,e,r,i,s){return!0}/**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It is called when a token (usually a word) has to be split into separate pieces
   * in order to determine the point to break a word.
   * It must return an array of characters.
   * @param token - The token to split
   * @returns The characters of the token
   * @see TextMetrics.graphemeSegmenter
   */static wordWrapSplit(e){return t.graphemeSegmenter(e)}/**
   * Calculates the ascent, descent and fontSize of a given font-style
   * @param font - String representing the style of the font
   * @returns Font properties object
   */static measureFont(e){if(t._fonts[e])return t._fonts[e];let r={ascent:0,descent:0,fontSize:0},i=t._canvas,s=t._context;s.font=e;let n=t.METRICS_STRING+t.BASELINE_SYMBOL,a=Math.ceil(s.measureText(n).width),o=Math.ceil(s.measureText(t.BASELINE_SYMBOL).width),h=Math.ceil(t.HEIGHT_MULTIPLIER*o);if(o=o*t.BASELINE_MULTIPLIER|0,0===a||0===h)return t._fonts[e]=r,r;i.width=a,i.height=h,s.fillStyle="#f00",s.fillRect(0,0,a,h),s.font=e,s.textBaseline="alphabetic",s.fillStyle="#000",s.fillText(n,0,o);let l=s.getImageData(0,0,a,h).data,u=l.length,d=4*a,c=0,p=0,f=!1;for(c=0;c<o;++c){for(let t=0;t<d;t+=4)if(255!==l[p+t]){f=!0;break}if(f)break;p+=d}for(r.ascent=o-c,p=u-d,f=!1,c=h;c>o;--c){for(let t=0;t<d;t+=4)if(255!==l[p+t]){f=!0;break}if(f)break;p-=d}return r.descent=c-o,r.fontSize=r.ascent+r.descent,t._fonts[e]=r,r}/**
   * Clear font metrics in metrics cache.
   * @param {string} [font] - font name. If font name not set then clear cache for all fonts.
   */static clearMetrics(e=""){e?delete t._fonts[e]:t._fonts={}}/**
   * Cached canvas element for measuring text
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */static get _canvas(){if(!t.__canvas){let e;try{let r=new OffscreenCanvas(0,0);if(r.getContext("2d",oG)?.measureText)return t.__canvas=r,r;e=G.ADAPTER.createCanvas()}catch{e=G.ADAPTER.createCanvas()}e.width=e.height=10,t.__canvas=e}return t.__canvas}/**
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */static get _context(){return t.__context||(t.__context=t._canvas.getContext("2d",oG)),t.__context}};oH.METRICS_STRING="|\xc9q\xc5",/** Baseline symbol for calculate font metrics. */oH.BASELINE_SYMBOL="M",/** Baseline multiplier for calculate font metrics. */oH.BASELINE_MULTIPLIER=1.4,/** Height multiplier for setting height of canvas to calculate font metrics. */oH.HEIGHT_MULTIPLIER=2,/**
* A Unicode "character", or "grapheme cluster", can be composed of multiple Unicode code points,
* such as letters with diacritical marks (e.g. `'\u0065\u0301'`, letter e with acute)
* or emojis with modifiers (e.g. `'\uD83E\uDDD1\u200D\uD83D\uDCBB'`, technologist).
* The new `Intl.Segmenter` API in ES2022 can split the string into grapheme clusters correctly. If it is not available,
* PixiJS will fallback to use the iterator of String, which can only spilt the string into code points.
* If you want to get full functionality in environments that don't support `Intl.Segmenter` (such as Firefox),
* you can use other libraries such as [grapheme-splitter]{@link https://www.npmjs.com/package/grapheme-splitter}
* or [graphemer]{@link https://www.npmjs.com/package/graphemer} to create a polyfill. Since these libraries can be
* relatively large in size to handle various Unicode grapheme clusters properly, PixiJS won't use them directly.
*/oH.graphemeSegmenter=(()=>{if("function"==typeof Intl?.Segmenter){let t=new Intl.Segmenter;return e=>[...t.segment(e)].map(t=>t.segment)}return t=>[...t]})(),/**
* New rendering behavior for letter-spacing which uses Chrome's new native API. This will
* lead to more accurate letter-spacing results because it does not try to manually draw
* each character. However, this Chrome API is experimental and may not serve all cases yet.
* @see PIXI.TextMetrics.experimentalLetterSpacingSupported
*/oH.experimentalLetterSpacing=!1,/** Cache of {@see PIXI.TextMetrics.FontMetrics} objects. */oH._fonts={},/** Cache of new line chars. */oH._newlines=[10,// line feed
13],/** Cache of breaking spaces. */oH._breakingSpaces=[9,// character tabulation
32,// space
8192,// en quad
8193,// em quad
8194,// en space
8195,// em space
8196,// three-per-em space
8197,// four-per-em space
8198,// six-per-em space
8200,// punctuation space
8201,// thin space
8202,// hair space
8287,// medium mathematical space
12288];let oj=oH;const oz=["serif","sans-serif","monospace","cursive","fantasy","system-ui"],oV=class t{/**
   * @param style - TextStyle properties to be set on the text. See {@link PIXI.TextStyle.defaultStyle}
   *       for the default values.
   */constructor(t){this.styleID=0,this.reset(),o$(this,t,t)}/**
   * Creates a new TextStyle object with the same values as this one.
   * Note that the only the properties of the object are cloned.
   *
   * @return New cloned TextStyle object
   */clone(){let e={};return o$(e,this,t.defaultStyle),new t(e)}/** Resets all properties to the defaults specified in TextStyle.prototype._default */reset(){o$(this,t.defaultStyle,t.defaultStyle)}/**
   * Alignment for multiline text, does not affect single line text.
   *
   * @member {'left'|'center'|'right'|'justify'}
   */get align(){return this._align}set align(t){this._align!==t&&(this._align=t,this.styleID++)}/** Indicates if lines can be wrapped within words, it needs wordWrap to be set to true. */get breakWords(){return this._breakWords}set breakWords(t){this._breakWords!==t&&(this._breakWords=t,this.styleID++)}/** Set a drop shadow for the text. */get dropShadow(){return this._dropShadow}set dropShadow(t){this._dropShadow!==t&&(this._dropShadow=t,this.styleID++)}/** Set alpha for the drop shadow. */get dropShadowAlpha(){return this._dropShadowAlpha}set dropShadowAlpha(t){this._dropShadowAlpha!==t&&(this._dropShadowAlpha=t,this.styleID++)}/** Set a angle of the drop shadow. */get dropShadowAngle(){return this._dropShadowAngle}set dropShadowAngle(t){this._dropShadowAngle!==t&&(this._dropShadowAngle=t,this.styleID++)}/** Set a shadow blur radius. */get dropShadowBlur(){return this._dropShadowBlur}set dropShadowBlur(t){this._dropShadowBlur!==t&&(this._dropShadowBlur=t,this.styleID++)}/** A fill style to be used on the dropshadow e.g., 'red', '#00FF00'. */get dropShadowColor(){return this._dropShadowColor}set dropShadowColor(t){let e=oX(t);this._dropShadowColor!==e&&(this._dropShadowColor=e,this.styleID++)}/** Set a distance of the drop shadow. */get dropShadowDistance(){return this._dropShadowDistance}set dropShadowDistance(t){this._dropShadowDistance!==t&&(this._dropShadowDistance=t,this.styleID++)}/**
   * A canvas fillstyle that will be used on the text e.g., 'red', '#00FF00'.
   *
   * Can be an array to create a gradient e.g., `['#000000','#FFFFFF']`
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle|MDN}
   *
   * @member {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
   */get fill(){return this._fill}set fill(t){let e=oX(t);this._fill!==e&&(this._fill=e,this.styleID++)}/**
   * If fill is an array of colours to create a gradient, this can change the type/direction of the gradient.
   *
   * @type {PIXI.TEXT_GRADIENT}
   */get fillGradientType(){return this._fillGradientType}set fillGradientType(t){this._fillGradientType!==t&&(this._fillGradientType=t,this.styleID++)}/**
   * If fill is an array of colours to create a gradient, this array can set the stop points
   * (numbers between 0 and 1) for the color, overriding the default behaviour of evenly spacing them.
   */get fillGradientStops(){return this._fillGradientStops}set fillGradientStops(t){(function(t,e){if(!Array.isArray(t)||!Array.isArray(e)||t.length!==e.length)return!1;for(let r=0;r<t.length;++r)if(t[r]!==e[r])return!1;return!0})(this._fillGradientStops,t)||(this._fillGradientStops=t,this.styleID++)}/**
   * The font family, can be a single font name, or a list of names where the first
   * is the preferred font.
   */get fontFamily(){return this._fontFamily}set fontFamily(t){this.fontFamily!==t&&(this._fontFamily=t,this.styleID++)}/**
   * The font size
   * (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em')
   */get fontSize(){return this._fontSize}set fontSize(t){this._fontSize!==t&&(this._fontSize=t,this.styleID++)}/**
   * The font style.
   *
   * @member {'normal'|'italic'|'oblique'}
   */get fontStyle(){return this._fontStyle}set fontStyle(t){this._fontStyle!==t&&(this._fontStyle=t,this.styleID++)}/**
   * The font variant.
   *
   * @member {'normal'|'small-caps'}
   */get fontVariant(){return this._fontVariant}set fontVariant(t){this._fontVariant!==t&&(this._fontVariant=t,this.styleID++)}/**
   * The font weight.
   *
   * @member {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
   */get fontWeight(){return this._fontWeight}set fontWeight(t){this._fontWeight!==t&&(this._fontWeight=t,this.styleID++)}/** The amount of spacing between letters, default is 0. */get letterSpacing(){return this._letterSpacing}set letterSpacing(t){this._letterSpacing!==t&&(this._letterSpacing=t,this.styleID++)}/** The line height, a number that represents the vertical space that a letter uses. */get lineHeight(){return this._lineHeight}set lineHeight(t){this._lineHeight!==t&&(this._lineHeight=t,this.styleID++)}/** The space between lines. */get leading(){return this._leading}set leading(t){this._leading!==t&&(this._leading=t,this.styleID++)}/**
   * The lineJoin property sets the type of corner created, it can resolve spiked text issues.
   * Default is 'miter' (creates a sharp corner).
   *
   * @member {'miter'|'round'|'bevel'}
   */get lineJoin(){return this._lineJoin}set lineJoin(t){this._lineJoin!==t&&(this._lineJoin=t,this.styleID++)}/**
   * The miter limit to use when using the 'miter' lineJoin mode.
   *
   * This can reduce or increase the spikiness of rendered text.
   */get miterLimit(){return this._miterLimit}set miterLimit(t){this._miterLimit!==t&&(this._miterLimit=t,this.styleID++)}/**
   * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
   * by adding padding to all sides of the text.
   */get padding(){return this._padding}set padding(t){this._padding!==t&&(this._padding=t,this.styleID++)}/**
   * A canvas fillstyle that will be used on the text stroke, e.g., 'blue', '#FCFF00'
   */get stroke(){return this._stroke}set stroke(t){let e=oX(t);this._stroke!==e&&(this._stroke=e,this.styleID++)}/**
   * A number that represents the thickness of the stroke.
   *
   * @default 0
   */get strokeThickness(){return this._strokeThickness}set strokeThickness(t){this._strokeThickness!==t&&(this._strokeThickness=t,this.styleID++)}/**
   * The baseline of the text that is rendered.
   *
   * @member {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
   */get textBaseline(){return this._textBaseline}set textBaseline(t){this._textBaseline!==t&&(this._textBaseline=t,this.styleID++)}/** Trim transparent borders. */get trim(){return this._trim}set trim(t){this._trim!==t&&(this._trim=t,this.styleID++)}/**
   * How newlines and spaces should be handled.
   * Default is 'pre' (preserve, preserve).
   *
   *  value       | New lines     |   Spaces
   *  ---         | ---           |   ---
   * 'normal'     | Collapse      |   Collapse
   * 'pre'        | Preserve      |   Preserve
   * 'pre-line'   | Preserve      |   Collapse
   *
   * @member {'normal'|'pre'|'pre-line'}
   */get whiteSpace(){return this._whiteSpace}set whiteSpace(t){this._whiteSpace!==t&&(this._whiteSpace=t,this.styleID++)}/** Indicates if word wrap should be used. */get wordWrap(){return this._wordWrap}set wordWrap(t){this._wordWrap!==t&&(this._wordWrap=t,this.styleID++)}/** The width at which text will wrap, it needs wordWrap to be set to true. */get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(t){this._wordWrapWidth!==t&&(this._wordWrapWidth=t,this.styleID++)}/**
   * Generates a font style string to use for `TextMetrics.measureFont()`.
   *
   * @return Font style string, for passing to `TextMetrics.measureFont()`
   */toFontString(){let t="number"==typeof this.fontSize?`${this.fontSize}px`:this.fontSize,e=this.fontFamily;Array.isArray(this.fontFamily)||(e=this.fontFamily.split(","));for(let t=e.length-1;t>=0;t--){let r=e[t].trim();/([\"\'])[^\'\"]+\1/.test(r)||oz.includes(r)||(r=`"${r}"`),e[t]=r}return`${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${t} ${e.join(",")}`}};oV.defaultStyle={/**
   * See {@link PIXI.TextStyle.align}
   * @type {'left'|'center'|'right'|'justify'}
   */align:"left",/** See {@link PIXI.TextStyle.breakWords} */breakWords:!1,/** See {@link PIXI.TextStyle.dropShadow} */dropShadow:!1,/** See {@link PIXI.TextStyle.dropShadowAlpha} */dropShadowAlpha:1,/**
   * See {@link PIXI.TextStyle.dropShadowAngle}
   * @type {number}
   * @default Math.PI / 6
   */dropShadowAngle:Math.PI/6,/** See {@link PIXI.TextStyle.dropShadowBlur} */dropShadowBlur:0,/**
   * See {@link PIXI.TextStyle.dropShadowColor}
   * @type {string|number}
   */dropShadowColor:"black",/** See {@link PIXI.TextStyle.dropShadowDistance} */dropShadowDistance:5,/**
   * See {@link PIXI.TextStyle.fill}
   * @type {string|string[]|number|number[]|CanvasGradient|CanvasPattern}
   */fill:"black",/**
   * See {@link PIXI.TextStyle.fillGradientType}
   * @type {PIXI.TEXT_GRADIENT}
   * @default PIXI.TEXT_GRADIENT.LINEAR_VERTICAL
   */fillGradientType:oU.LINEAR_VERTICAL,/**
   * See {@link PIXI.TextStyle.fillGradientStops}
   * @type {number[]}
   * @default []
   */fillGradientStops:[],/**
   * See {@link PIXI.TextStyle.fontFamily}
   * @type {string|string[]}
   */fontFamily:"Arial",/**
   * See {@link PIXI.TextStyle.fontSize}
   * @type {number|string} 
   */fontSize:26,/**
   * See {@link PIXI.TextStyle.fontStyle}
   * @type {'normal'|'italic'|'oblique'}
   */fontStyle:"normal",/**
   * See {@link PIXI.TextStyle.fontVariant}
   * @type {'normal'|'small-caps'}
   */fontVariant:"normal",/**
   * See {@link PIXI.TextStyle.fontWeight}
   * @type {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
   */fontWeight:"normal",/** See {@link PIXI.TextStyle.leading} */leading:0,/** See {@link PIXI.TextStyle.letterSpacing} */letterSpacing:0,/** See {@link PIXI.TextStyle.lineHeight} */lineHeight:0,/**
   * See {@link PIXI.TextStyle.lineJoin}
   * @type {'miter'|'round'|'bevel'}
   */lineJoin:"miter",/** See {@link PIXI.TextStyle.miterLimit} */miterLimit:10,/** See {@link PIXI.TextStyle.padding} */padding:0,/**
   * See {@link PIXI.TextStyle.stroke}
   * @type {string|number}
   */stroke:"black",/** See {@link PIXI.TextStyle.strokeThickness} */strokeThickness:0,/**
   * See {@link PIXI.TextStyle.textBaseline} 
   * @type {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
   */textBaseline:"alphabetic",/** See {@link PIXI.TextStyle.trim} */trim:!1,/**
   * See {@link PIXI.TextStyle.whiteSpace}
   * @type {'normal'|'pre'|'pre-line'}
   */whiteSpace:"pre",/** See {@link PIXI.TextStyle.wordWrap} */wordWrap:!1,/** See {@link PIXI.TextStyle.wordWrapWidth} */wordWrapWidth:100};let oW=oV;function oX(t){let e=el.shared,r=t=>{let r=e.setValue(t);return 1===r.alpha?r.toHex():r.toRgbaString()};return Array.isArray(t)?t.map(r):r(t)}function o$(t,e,r){for(let i in r)Array.isArray(e[i])?t[i]=e[i].slice():t[i]=e[i]}const oY={texture:!0,children:!1,baseTexture:!0},oq=class t extends sJ{/**
   * @param text - The string that you would like the text to display
   * @param style - The style parameters
   * @param canvas - The canvas element for drawing text
   */constructor(e,r,i){let s=!1;i||(i=G.ADAPTER.createCanvas(),s=!0),i.width=3,i.height=3;let n=iv.from(i);n.orig=new r_,n.trim=new r_,super(n),this._ownCanvas=s,this.canvas=i,this.context=i.getContext("2d",{// required for trimming to work without warnings
willReadFrequently:!0}),this._resolution=t.defaultResolution??G.RESOLUTION,this._autoResolution=t.defaultAutoResolution,this._text=null,this._style=null,this._styleListener=null,this._font="",this.text=e,this.style=r,this.localStyleID=-1}/**
   * @see PIXI.TextMetrics.experimentalLetterSpacing
   * @deprecated since 7.1.0
   */static get experimentalLetterSpacing(){return oj.experimentalLetterSpacing}static set experimentalLetterSpacing(t){ta.deprecation("7.1.0","Text.experimentalLetterSpacing is deprecated, use TextMetrics.experimentalLetterSpacing"),oj.experimentalLetterSpacing=t}/**
   * Renders text to its canvas, and updates its texture.
   *
   * By default this is used internally to ensure the texture is correct before rendering,
   * but it can be used called externally, for example from this class to 'pre-generate' the texture from a piece of text,
   * and then shared across multiple Sprites.
   * @param respectDirty - Whether to abort updating the text if the Text isn't dirty and the function is called.
   */updateText(t){let e,r;let i=this._style;if(this.localStyleID!==i.styleID&&(this.dirty=!0,this.localStyleID=i.styleID),!this.dirty&&t)return;this._font=this._style.toFontString();let s=this.context,n=oj.measureText(this._text||" ",this._style,this._style.wordWrap,this.canvas),a=n.width,o=n.height,h=n.lines,l=n.lineHeight,u=n.lineWidths,d=n.maxLineWidth,c=n.fontProperties;this.canvas.width=Math.ceil(Math.ceil(Math.max(1,a)+2*i.padding)*this._resolution),this.canvas.height=Math.ceil(Math.ceil(Math.max(1,o)+2*i.padding)*this._resolution),s.scale(this._resolution,this._resolution),s.clearRect(0,0,this.canvas.width,this.canvas.height),s.font=this._font,s.lineWidth=i.strokeThickness,s.textBaseline=i.textBaseline,s.lineJoin=i.lineJoin,s.miterLimit=i.miterLimit;let p=i.dropShadow?2:1;for(let t=0;t<p;++t){let a=i.dropShadow&&0===t,p=a?Math.ceil(Math.max(1,o)+2*i.padding):0,f=p*this._resolution;if(a){s.fillStyle="black",s.strokeStyle="black";let t=i.dropShadowColor,e=i.dropShadowBlur*this._resolution,r=i.dropShadowDistance*this._resolution;s.shadowColor=el.shared.setValue(t).setAlpha(i.dropShadowAlpha).toRgbaString(),s.shadowBlur=e,s.shadowOffsetX=Math.cos(i.dropShadowAngle)*r,s.shadowOffsetY=Math.sin(i.dropShadowAngle)*r+f}else s.fillStyle=this._generateFillStyle(i,h,n),s.strokeStyle=i.stroke,s.shadowColor="black",s.shadowBlur=0,s.shadowOffsetX=0,s.shadowOffsetY=0;let m=(l-c.fontSize)/2;l-c.fontSize<0&&(m=0);for(let t=0;t<h.length;t++)e=i.strokeThickness/2,r=i.strokeThickness/2+t*l+c.ascent+m,"right"===i.align?e+=d-u[t]:"center"===i.align&&(e+=(d-u[t])/2),i.stroke&&i.strokeThickness&&this.drawLetterSpacing(h[t],e+i.padding,r+i.padding-p,!0),i.fill&&this.drawLetterSpacing(h[t],e+i.padding,r+i.padding-p)}this.updateTexture()}/**
   * Render the text with letter-spacing.
   * @param text - The text to draw
   * @param x - Horizontal position to draw the text
   * @param y - Vertical position to draw the text
   * @param isStroke - Is this drawing for the outside stroke of the
   *  text? If not, it's for the inside fill
   */drawLetterSpacing(t,e,r,i=!1){let s=this._style.letterSpacing,n=!1;if(oj.experimentalLetterSpacingSupported&&(oj.experimentalLetterSpacing?(this.context.letterSpacing=`${s}px`,this.context.textLetterSpacing=`${s}px`,n=!0):(this.context.letterSpacing="0px",this.context.textLetterSpacing="0px")),0===s||n){i?this.context.strokeText(t,e,r):this.context.fillText(t,e,r);return}let a=e,o=oj.graphemeSegmenter(t),h=this.context.measureText(t).width,l=0;for(let t=0;t<o.length;++t){let e=o[t];i?this.context.strokeText(e,a,r):this.context.fillText(e,a,r);let n="";for(let e=t+1;e<o.length;++e)n+=o[e];a+=h-(l=this.context.measureText(n).width)+s,h=l}}/** Updates texture size based on canvas size. */updateTexture(){let t=this.canvas;if(this._style.trim){let e=ta.trimCanvas(t);e.data&&(t.width=e.width,t.height=e.height,this.context.putImageData(e.data,0,0))}let e=this._texture,r=this._style,i=r.trim?0:r.padding,s=e.baseTexture;e.trim.width=e._frame.width=t.width/this._resolution,e.trim.height=e._frame.height=t.height/this._resolution,e.trim.x=-i,e.trim.y=-i,e.orig.width=e._frame.width-2*i,e.orig.height=e._frame.height-2*i,this._onTextureUpdate(),s.setRealSize(t.width,t.height,this._resolution),e.updateUvs(),this.dirty=!1}/**
   * Renders the object using the WebGL renderer
   * @param renderer - The renderer
   */_render(t){this._autoResolution&&this._resolution!==t.resolution&&(this._resolution=t.resolution,this.dirty=!0),this.updateText(!0),super._render(t)}/** Updates the transform on all children of this container for rendering. */updateTransform(){this.updateText(!0),super.updateTransform()}getBounds(t,e){return this.updateText(!0),-1===this._textureID&&(t=!1),super.getBounds(t,e)}/**
   * Gets the local bounds of the text object.
   * @param rect - The output rectangle.
   * @returns The bounds.
   */getLocalBounds(t){return this.updateText(!0),super.getLocalBounds.call(this,t)}/** Calculates the bounds of the Text as a rectangle. The bounds calculation takes the worldTransform into account. */_calculateBounds(){this.calculateVertices(),this._bounds.addQuad(this.vertexData)}/**
   * Generates the fill style. Can automatically generate a gradient based on the fill style being an array
   * @param style - The style.
   * @param lines - The lines of text.
   * @param metrics
   * @returns The fill style
   */_generateFillStyle(t,e,r){let i;let s=t.fill;if(!Array.isArray(s))return s;if(1===s.length)return s[0];let n=t.dropShadow?t.dropShadowDistance:0,a=t.padding||0,o=this.canvas.width/this._resolution-n-2*a,h=this.canvas.height/this._resolution-n-2*a,l=s.slice(),u=t.fillGradientStops.slice();if(!u.length){let t=l.length+1;for(let e=1;e<t;++e)u.push(e/t)}if(l.unshift(s[0]),u.unshift(0),l.push(s[s.length-1]),u.push(1),t.fillGradientType===oU.LINEAR_VERTICAL){i=this.context.createLinearGradient(o/2,a,o/2,h+a);let s=r.fontProperties.fontSize+t.strokeThickness;for(let t=0;t<e.length;t++){let n=r.lineHeight*(t-1)+s,a=r.lineHeight*t,o=a;t>0&&n>a&&(o=(a+n)/2);let d=a+s,c=r.lineHeight*(t+1),p=d;t+1<e.length&&c<d&&(p=(d+c)/2);let f=(p-o)/h;for(let t=0;t<l.length;t++){let e=Math.min(1,Math.max(0,o/h+("number"==typeof u[t]?u[t]:t/l.length)*f));e=Number(e.toFixed(5)),i.addColorStop(e,l[t])}}}else{i=this.context.createLinearGradient(a,h/2,o+a,h/2);let t=l.length+1,e=1;for(let r=0;r<l.length;r++){let s;s="number"==typeof u[r]?u[r]:e/t,i.addColorStop(s,l[r]),e++}}return i}/**
   * Destroys this text object.
   *
   * Note* Unlike a Sprite, a Text object will automatically destroy its baseTexture and texture as
   * the majority of the time the texture will not be shared with any other Sprites.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have their
   *  destroy method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=true] - Should it destroy the current texture of the sprite as well
   * @param {boolean} [options.baseTexture=true] - Should it destroy the base texture of the sprite as well
   */destroy(t){"boolean"==typeof t&&(t={children:t}),t=Object.assign({},oY,t),super.destroy(t),this._ownCanvas&&(this.canvas.height=this.canvas.width=0),this.context=null,this.canvas=null,this._style=null}/** The width of the Text, setting this will actually modify the scale to achieve the value set. */get width(){return this.updateText(!0),Math.abs(this.scale.x)*this._texture.orig.width}set width(t){this.updateText(!0);let e=ta.sign(this.scale.x)||1;this.scale.x=e*t/this._texture.orig.width,this._width=t}/** The height of the Text, setting this will actually modify the scale to achieve the value set. */get height(){return this.updateText(!0),Math.abs(this.scale.y)*this._texture.orig.height}set height(t){this.updateText(!0);let e=ta.sign(this.scale.y)||1;this.scale.y=e*t/this._texture.orig.height,this._height=t}/**
   * Set the style of the text.
   *
   * Set up an event listener to listen for changes on the style object and mark the text as dirty.
   *
   * If setting the `style` can also be partial {@link PIXI.ITextStyle}.
   */get style(){return this._style}set style(t){(t=t||{})instanceof oW?this._style=t:this._style=new oW(t),this.localStyleID=-1,this.dirty=!0}/** Set the copy for the text object. To split a line you can use '\n'. */get text(){return this._text}set text(t){t=String(t??""),this._text!==t&&(this._text=t,this.dirty=!0)}/**
   * The resolution / device pixel ratio of the canvas.
   *
   * This is set to automatically match the renderer resolution by default, but can be overridden by setting manually.
   * @default 1
   */get resolution(){return this._resolution}set resolution(t){this._autoResolution=!1,this._resolution!==t&&(this._resolution=t,this.dirty=!0)}};oq.defaultAutoResolution=!0;let oK=oq;class oZ{/**
   * @param maxItemsPerFrame - The maximum number of items that can be prepared each frame.
   */constructor(t){this.maxItemsPerFrame=t,this.itemsLeft=0}/** Resets any counting properties to start fresh on a new frame. */beginFrame(){this.itemsLeft=this.maxItemsPerFrame}/**
   * Checks to see if another item can be uploaded. This should only be called once per item.
   * @returns If the item is allowed to be uploaded.
   */allowedToUpload(){return this.itemsLeft-- >0}}function oQ(t,e){let r=!1;if(t?._textures?.length){for(let i=0;i<t._textures.length;i++)if(t._textures[i]instanceof iv){let s=t._textures[i].baseTexture;e.includes(s)||(e.push(s),r=!0)}}return r}function oJ(t,e){if(t.baseTexture instanceof e9){let r=t.baseTexture;return e.includes(r)||e.push(r),!0}return!1}function o0(t,e){if(t._texture&&t._texture instanceof iv){let r=t._texture.baseTexture;return e.includes(r)||e.push(r),!0}return!1}function o1(t,e){return e instanceof oK&&(e.updateText(!0),!0)}function o2(t,e){if(e instanceof oW){let t=e.toFontString();return oj.measureFont(t),!0}return!1}function o3(t,e){if(t instanceof oK){e.includes(t.style)||e.push(t.style),e.includes(t)||e.push(t);let r=t._texture.baseTexture;return e.includes(r)||e.push(r),!0}return!1}function o4(t,e){return t instanceof oW&&(e.includes(t)||e.push(t),!0)}const o5=class t{/**
   * @param {PIXI.IRenderer} renderer - A reference to the current renderer
   */constructor(e){this.limiter=new oZ(t.uploadsPerFrame),this.renderer=e,this.uploadHookHelper=null,this.queue=[],this.addHooks=[],this.uploadHooks=[],this.completes=[],this.ticking=!1,this.delayedTick=()=>{this.queue&&this.prepareItems()},this.registerFindHook(o3),this.registerFindHook(o4),this.registerFindHook(oQ),this.registerFindHook(oJ),this.registerFindHook(o0),this.registerUploadHook(o1),this.registerUploadHook(o2)}/**
   * Upload all the textures and graphics to the GPU.
   * @method PIXI.BasePrepare#upload
   * @param {PIXI.DisplayObject|PIXI.Container|PIXI.BaseTexture|PIXI.Texture|PIXI.Graphics|PIXI.Text} [item] -
   *        Container or display object to search for items to upload or the items to upload themselves,
   *        or optionally ommitted, if items have been added using {@link PIXI.BasePrepare#add `prepare.add`}.
   */upload(t){return new Promise(e=>{t&&this.add(t),this.queue.length?(this.completes.push(e),this.ticking||(this.ticking=!0,sg.system.addOnce(this.tick,this,sp.UTILITY))):e()})}/**
   * Handle tick update
   * @private
   */tick(){setTimeout(this.delayedTick,0)}/**
   * Actually prepare items. This is handled outside of the tick because it will take a while
   * and we do NOT want to block the current animation frame from rendering.
   * @private
   */prepareItems(){for(this.limiter.beginFrame();this.queue.length&&this.limiter.allowedToUpload();){let t=this.queue[0],e=!1;if(t&&!t._destroyed){for(let r=0,i=this.uploadHooks.length;r<i;r++)if(this.uploadHooks[r](this.uploadHookHelper,t)){this.queue.shift(),e=!0;break}}e||this.queue.shift()}if(this.queue.length)sg.system.addOnce(this.tick,this,sp.UTILITY);else{this.ticking=!1;let t=this.completes.slice(0);this.completes.length=0;for(let e=0,r=t.length;e<r;e++)t[e]()}}/**
   * Adds hooks for finding items.
   * @param {Function} addHook - Function call that takes two parameters: `item:*, queue:Array`
   *          function must return `true` if it was able to add item to the queue.
   * @returns Instance of plugin for chaining.
   */registerFindHook(t){return t&&this.addHooks.push(t),this}/**
   * Adds hooks for uploading items.
   * @param {Function} uploadHook - Function call that takes two parameters: `prepare:CanvasPrepare, item:*` and
   *          function must return `true` if it was able to handle upload of item.
   * @returns Instance of plugin for chaining.
   */registerUploadHook(t){return t&&this.uploadHooks.push(t),this}/**
   * Manually add an item to the uploading queue.
   * @param {PIXI.DisplayObject|PIXI.Container|PIXI.BaseTexture|PIXI.Texture|PIXI.Graphics|PIXI.Text|*} item - Object to
   *        add to the queue
   * @returns Instance of plugin for chaining.
   */add(t){for(let e=0,r=this.addHooks.length;e<r&&!this.addHooks[e](t,this.queue);e++);if(t instanceof sq)for(let e=t.children.length-1;e>=0;e--)this.add(t.children[e]);return this}/** Destroys the plugin, don't use after this. */destroy(){this.ticking&&sg.system.remove(this.tick,this),this.ticking=!1,this.addHooks=null,this.uploadHooks=null,this.renderer=null,this.completes=null,this.queue=null,this.limiter=null,this.uploadHookHelper=null}};o5.uploadsPerFrame=4;let o6=o5;function o8(t,e){return e instanceof e9&&(e._glTextures[t.CONTEXT_UID]||t.texture.bind(e),!0)}function o7(t,e){if(!(e instanceof oc))return!1;let{geometry:r}=e;e.finishPoly(),r.updateBatches();let{batches:i}=r;for(let e=0;e<i.length;e++){let{texture:r}=i[e].style;r&&o8(t,r.baseTexture)}return r.batchable||t.geometry.bind(r,e._resolveDirectShader(t)),!0}function o9(t,e){return t instanceof oc&&(e.push(t),!0)}Object.defineProperties(G,{/**
   * Default number of uploads per frame using prepare plugin.
   * @static
   * @memberof PIXI.settings
   * @name UPLOADS_PER_FRAME
   * @deprecated since 7.1.0
   * @see PIXI.BasePrepare.uploadsPerFrame
   * @type {number}
   */UPLOADS_PER_FRAME:{get:()=>o6.uploadsPerFrame,set(t){ta.deprecation("7.1.0","settings.UPLOADS_PER_FRAME is deprecated, use prepare.BasePrepare.uploadsPerFrame"),o6.uploadsPerFrame=t}}});class ht extends o6{/**
   * @param {PIXI.Renderer} renderer - A reference to the current renderer
   */constructor(t){super(t),this.uploadHookHelper=this.renderer,this.registerFindHook(o9),this.registerUploadHook(o8),this.registerUploadHook(o7)}}ht.extension={name:"prepare",type:e$.RendererSystem},eK.add(ht);class he{/** @param maxMilliseconds - The maximum milliseconds that can be spent preparing items each frame. */constructor(t){this.maxMilliseconds=t,this.frameStart=0}/** Resets any counting properties to start fresh on a new frame. */beginFrame(){this.frameStart=Date.now()}/**
   * Checks to see if another item can be uploaded. This should only be called once per item.
   * @returns - If the item is allowed to be uploaded.
   */allowedToUpload(){return Date.now()-this.frameStart<this.maxMilliseconds}}var hr={};h(hr,"AnimatedSprite",()=>hi);class hi extends sJ{/**
   * @param textures - An array of {@link PIXI.Texture} or frame
   *  objects that make up the animation.
   * @param {boolean} [autoUpdate=true] - Whether to use Ticker.shared to auto update animation time.
   */constructor(t,e=!0){super(t[0]instanceof iv?t[0]:t[0].texture),this._textures=null,this._durations=null,this._autoUpdate=e,this._isConnectedToTicker=!1,this.animationSpeed=1,this.loop=!0,this.updateAnchor=!1,this.onComplete=null,this.onFrameChange=null,this.onLoop=null,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=t}/** Stops the AnimatedSprite. */stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(sg.shared.remove(this.update,this),this._isConnectedToTicker=!1))}/** Plays the AnimatedSprite. */play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(sg.shared.add(this.update,this,sp.HIGH),this._isConnectedToTicker=!0))}/**
   * Stops the AnimatedSprite and goes to a specific frame.
   * @param frameNumber - Frame index to stop at.
   */gotoAndStop(t){this.stop(),this.currentFrame=t}/**
   * Goes to a specific frame and begins playing the AnimatedSprite.
   * @param frameNumber - Frame index to start at.
   */gotoAndPlay(t){this.currentFrame=t,this.play()}/**
   * Updates the object transform for rendering.
   * @param deltaTime - Time since last tick.
   */update(t){if(!this._playing)return;let e=this.animationSpeed*t,r=this.currentFrame;if(null!==this._durations){let r=this._currentTime%1*this._durations[this.currentFrame];for(r+=e/60*1e3;r<0;)this._currentTime--,r+=this._durations[this.currentFrame];let i=Math.sign(this.animationSpeed*t);for(this._currentTime=Math.floor(this._currentTime);r>=this._durations[this.currentFrame];)r-=this._durations[this.currentFrame]*i,this._currentTime+=i;this._currentTime+=r/this._durations[this.currentFrame]}else this._currentTime+=e;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):r!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<r||this.animationSpeed<0&&this.currentFrame>r)&&this.onLoop(),this.updateTexture())}/** Updates the displayed texture to match the current frame index. */updateTexture(){let t=this.currentFrame;this._previousFrame!==t&&(this._previousFrame=t,this._texture=this._textures[t],this._textureID=-1,this._textureTrimmedID=-1,this._cachedTint=16777215,this.uvs=this._texture._uvs.uvsFloat32,this.updateAnchor&&this._anchor.copyFrom(this._texture.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}/**
   * Stops the AnimatedSprite and destroys it.
   * @param {object|boolean} [options] - Options parameter. A boolean will act as if all options
   *  have been set to that value.
   * @param {boolean} [options.children=false] - If set to true, all the children will have their destroy
   *      method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the sprite as well.
   * @param {boolean} [options.baseTexture=false] - Should it destroy the base texture of the sprite as well.
   */destroy(t){this.stop(),super.destroy(t),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}/**
   * A short hand way of creating an AnimatedSprite from an array of frame ids.
   * @param frames - The array of frames ids the AnimatedSprite will use as its texture frames.
   * @returns - The new animated sprite with the specified frames.
   */static fromFrames(t){let e=[];for(let r=0;r<t.length;++r)e.push(iv.from(t[r]));return new hi(e)}/**
   * A short hand way of creating an AnimatedSprite from an array of image ids.
   * @param images - The array of image urls the AnimatedSprite will use as its texture frames.
   * @returns The new animate sprite with the specified images as frames.
   */static fromImages(t){let e=[];for(let r=0;r<t.length;++r)e.push(iv.from(t[r]));return new hi(e)}/**
   * The total number of frames in the AnimatedSprite. This is the same as number of textures
   * assigned to the AnimatedSprite.
   * @readonly
   * @default 0
   */get totalFrames(){return this._textures.length}/** The array of textures used for this AnimatedSprite. */get textures(){return this._textures}set textures(t){if(t[0]instanceof iv)this._textures=t,this._durations=null;else{this._textures=[],this._durations=[];for(let e=0;e<t.length;e++)this._textures.push(t[e].texture),this._durations.push(t[e].time)}this._previousFrame=null,this.gotoAndStop(0),this.updateTexture()}/** The AnimatedSprite's current frame index. */get currentFrame(){let t=Math.floor(this._currentTime)%this._textures.length;return t<0&&(t+=this._textures.length),t}set currentFrame(t){if(t<0||t>this.totalFrames-1)throw Error(`[AnimatedSprite]: Invalid frame index value ${t}, expected to be between 0 and totalFrames ${this.totalFrames}.`);let e=this.currentFrame;this._currentTime=t,e!==this.currentFrame&&this.updateTexture()}/**
   * Indicates if the AnimatedSprite is currently playing.
   * @readonly
   */get playing(){return this._playing}/** Whether to use Ticker.shared to auto update animation time. */get autoUpdate(){return this._autoUpdate}set autoUpdate(t){t!==this._autoUpdate&&(this._autoUpdate=t,!this._autoUpdate&&this._isConnectedToTicker?(sg.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(sg.shared.add(this.update,this),this._isConnectedToTicker=!0))}}var hs={};h(hs,"TilingSprite",()=>ha),h(hs,"TilingSpriteRenderer",()=>hp);const hn=new rm;class ha extends sJ{/**
   * Note: The wrap mode of the texture is forced to REPEAT on render if the size of the texture
   * is a power of two, the texture's wrap mode is CLAMP, and the texture hasn't been bound yet.
   * @param texture - The texture of the tiling sprite.
   * @param width - The width of the tiling sprite.
   * @param height - The height of the tiling sprite.
   */constructor(t,e=100,r=100){super(t),this.tileTransform=new rO,this._width=e,this._height=r,this.uvMatrix=this.texture.uvMatrix||new iB(t),this.pluginName="tilingSprite",this.uvRespectAnchor=!1}/**
   * Changes frame clamping in corresponding textureTransform, shortcut
   * Change to -0.5 to add a pixel to the edge, recommended for transparent trimmed textures in atlas
   * @default 0.5
   * @member {number}
   */get clampMargin(){return this.uvMatrix.clampMargin}set clampMargin(t){this.uvMatrix.clampMargin=t,this.uvMatrix.update(!0)}/** The scaling of the image that is being tiled. */get tileScale(){return this.tileTransform.scale}set tileScale(t){this.tileTransform.scale.copyFrom(t)}/** The offset of the image that is being tiled. */get tilePosition(){return this.tileTransform.position}set tilePosition(t){this.tileTransform.position.copyFrom(t)}/**
   * @protected
   */_onTextureUpdate(){this.uvMatrix&&(this.uvMatrix.texture=this._texture),this._cachedTint=16777215}/**
   * Renders the object using the WebGL renderer
   * @param renderer - The renderer
   */_render(t){let e=this._texture;e&&e.valid&&(this.tileTransform.updateLocalTransform(),this.uvMatrix.update(),t.batch.setObjectRenderer(t.plugins[this.pluginName]),t.plugins[this.pluginName].render(this))}/** Updates the bounds of the tiling sprite. */_calculateBounds(){let t=-(this._width*this._anchor._x),e=-(this._height*this._anchor._y),r=this._width*(1-this._anchor._x),i=this._height*(1-this._anchor._y);this._bounds.addFrame(this.transform,t,e,r,i)}/**
   * Gets the local bounds of the sprite object.
   * @param rect - Optional output rectangle.
   * @returns The bounds.
   */getLocalBounds(t){return 0===this.children.length?(this._bounds.minX=-(this._width*this._anchor._x),this._bounds.minY=-(this._height*this._anchor._y),this._bounds.maxX=this._width*(1-this._anchor._x),this._bounds.maxY=this._height*(1-this._anchor._y),t||(this._localBoundsRect||(this._localBoundsRect=new r_),t=this._localBoundsRect),this._bounds.getRectangle(t)):super.getLocalBounds.call(this,t)}/**
   * Checks if a point is inside this tiling sprite.
   * @param point - The point to check.
   * @returns Whether or not the sprite contains the point.
   */containsPoint(t){this.worldTransform.applyInverse(t,hn);let e=this._width,r=this._height,i=-e*this.anchor._x;if(hn.x>=i&&hn.x<i+e){let t=-r*this.anchor._y;if(hn.y>=t&&hn.y<t+r)return!0}return!1}/**
   * Destroys this sprite and optionally its texture and children
   * @param {object|boolean} [options] - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have their destroy
   *      method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the sprite as well
   * @param {boolean} [options.baseTexture=false] - Should it destroy the base texture of the sprite as well
   */destroy(t){super.destroy(t),this.tileTransform=null,this.uvMatrix=null}/**
   * Helper function that creates a new tiling sprite based on the source you provide.
   * The source can be - frame id, image url, video url, canvas element, video element, base texture
   * @static
   * @param {string|PIXI.Texture|HTMLCanvasElement|HTMLVideoElement} source - Source to create texture from
   * @param {object} options - See {@link PIXI.BaseTexture}'s constructor for options.
   * @param {number} options.width - required width of the tiling sprite
   * @param {number} options.height - required height of the tiling sprite
   * @returns {PIXI.TilingSprite} The newly created texture
   */static from(t,e){let r=t instanceof iv?t:iv.from(t,e);return new ha(r,e.width,e.height)}/** The width of the sprite, setting this will actually modify the scale to achieve the value set. */get width(){return this._width}set width(t){this._width=t}/** The height of the TilingSprite, setting this will actually modify the scale to achieve the value set. */get height(){return this._height}set height(t){this._height=t}}var ho=`#version 300 es
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

in vec2 vTextureCoord;

out vec4 fragmentColor;

uniform sampler2D uSampler;
uniform vec4 uColor;
uniform mat3 uMapCoord;
uniform vec4 uClampFrame;
uniform vec2 uClampOffset;

void main(void)
{
    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);
    coord = (uMapCoord * vec3(coord, 1.0)).xy;
    vec2 unclamped = coord;
    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

    vec4 texSample = texture(uSampler, coord, unclamped == coord ? 0.0f : -32.0f);// lod-bias very negative to force lod 0

    fragmentColor = texSample * uColor;
}
`,hh=`#version 300 es
#define SHADER_NAME Tiling-Sprite-300

precision lowp float;

in vec2 aVertexPosition;
in vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTransform;

out vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;
}
`,hl=`#version 100
#ifdef GL_EXT_shader_texture_lod
    #extension GL_EXT_shader_texture_lod : enable
#endif
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 uColor;
uniform mat3 uMapCoord;
uniform vec4 uClampFrame;
uniform vec2 uClampOffset;

void main(void)
{
    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);
    coord = (uMapCoord * vec3(coord, 1.0)).xy;
    vec2 unclamped = coord;
    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

    #ifdef GL_EXT_shader_texture_lod
        vec4 texSample = unclamped == coord
            ? texture2D(uSampler, coord) 
            : texture2DLodEXT(uSampler, coord, 0);
    #else
        vec4 texSample = texture2D(uSampler, coord);
    #endif

    gl_FragColor = texSample * uColor;
}
`,hu=`#version 100
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTransform;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;
}
`,hd=`#version 100
#define SHADER_NAME Tiling-Sprite-Simple-100

precision lowp float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 uColor;

void main(void)
{
    vec4 texSample = texture2D(uSampler, vTextureCoord);
    gl_FragColor = texSample * uColor;
}
`;const hc=new rT;class hp extends r8{/**
   * constructor for renderer
   * @param {PIXI.Renderer} renderer - The renderer this tiling awesomeness works for.
   */constructor(t){super(t),t.runners.contextChange.add(this),this.quad=new iE,this.state=e0.for2d()}/** Creates shaders when context is initialized. */contextChange(){let t=this.renderer,e={globals:t.globalUniforms};this.simpleShader=r4.from(hu,hd,e),this.shader=t.context.webGLVersion>1?r4.from(hh,ho,e):r4.from(hu,hl,e)}/**
   * @param {PIXI.TilingSprite} ts - tilingSprite to be rendered
   */render(t){let e=this.renderer,r=this.quad,i=r.vertices;i[0]=i[6]=-(t._width*t.anchor.x),i[1]=i[3]=-(t._height*t.anchor.y),i[2]=i[4]=t._width*(1-t.anchor.x),i[5]=i[7]=t._height*(1-t.anchor.y);let s=t.uvRespectAnchor?t.anchor.x:0,n=t.uvRespectAnchor?t.anchor.y:0;(i=r.uvs)[0]=i[6]=-s,i[1]=i[3]=-n,i[2]=i[4]=1-s,i[5]=i[7]=1-n,r.invalidate();let a=t._texture,o=a.baseTexture,h=o.alphaMode>0,l=t.tileTransform.localTransform,u=t.uvMatrix,d=o.isPowerOfTwo&&a.frame.width===o.width&&a.frame.height===o.height;d&&(o._glTextures[e.CONTEXT_UID]?d=o.wrapMode!==I.CLAMP:o.wrapMode===I.CLAMP&&(o.wrapMode=I.REPEAT));let c=d?this.simpleShader:this.shader,p=a.width,f=a.height,m=t._width,g=t._height;hc.set(l.a*p/m,l.b*p/g,l.c*f/m,l.d*f/g,l.tx/m,l.ty/g),hc.invert(),d?hc.prepend(u.mapCoord):(c.uniforms.uMapCoord=u.mapCoord.toArray(!0),c.uniforms.uClampFrame=u.uClampFrame,c.uniforms.uClampOffset=u.uClampOffset),c.uniforms.uTransform=hc.toArray(!0),c.uniforms.uColor=el.shared.setValue(t.tint).premultiply(t.worldAlpha,h).toArray(c.uniforms.uColor),c.uniforms.translationMatrix=t.transform.worldTransform.toArray(!0),c.uniforms.uSampler=a,e.shader.bind(c),e.geometry.bind(r),this.state.blendMode=ta.correctBlendMode(t.blendMode,h),e.state.set(this.state),e.geometry.draw(this.renderer.gl.TRIANGLES,6,0)}}hp.extension={name:"tilingSprite",type:e$.RendererPlugin},eK.add(hp);var hf={};h(hf,"Spritesheet",()=>hg),h(hf,"spritesheetAsset",()=>hy);const hm=class t{/**
   * @param texture - Reference to the source BaseTexture object.
   * @param {object} data - Spritesheet image data.
   * @param resolutionFilename - The filename to consider when determining
   *        the resolution of the spritesheet. If not provided, the imageUrl will
   *        be used on the BaseTexture.
   */constructor(t,e,r=null){this.linkedSheets=[],this._texture=t instanceof iv?t:null,this.baseTexture=t instanceof e9?t:this._texture.baseTexture,this.textures={},this.animations={},this.data=e;let i=this.baseTexture.resource;this.resolution=this._updateResolution(r||(i?i.url:null)),this._frames=this.data.frames,this._frameKeys=Object.keys(this._frames),this._batchIndex=0,this._callback=null}/**
   * Generate the resolution from the filename or fallback
   * to the meta.scale field of the JSON data.
   * @param resolutionFilename - The filename to use for resolving
   *        the default resolution.
   * @returns Resolution to use for spritesheet.
   */_updateResolution(t=null){let{scale:e}=this.data.meta,r=ta.getResolutionOfUrl(t,null);return null===r&&(r=parseFloat(e??"1")),1!==r&&this.baseTexture.setResolution(r),r}/**
   * Parser spritesheet from loaded data. This is done asynchronously
   * to prevent creating too many Texture within a single process.
   * @method PIXI.Spritesheet#parse
   */parse(){return new Promise(e=>{this._callback=e,this._batchIndex=0,this._frameKeys.length<=t.BATCH_SIZE?(this._processFrames(0),this._processAnimations(),this._parseComplete()):this._nextBatch()})}/**
   * Process a batch of frames
   * @param initialFrameIndex - The index of frame to start.
   */_processFrames(e){let r=e,i=t.BATCH_SIZE;for(;r-e<i&&r<this._frameKeys.length;){let t=this._frameKeys[r],e=this._frames[t],i=e.frame;if(i){let r=null,s=null,n=!1!==e.trimmed&&e.sourceSize?e.sourceSize:e.frame,a=new r_(0,0,Math.floor(n.w)/this.resolution,Math.floor(n.h)/this.resolution);r=e.rotated?new r_(Math.floor(i.x)/this.resolution,Math.floor(i.y)/this.resolution,Math.floor(i.h)/this.resolution,Math.floor(i.w)/this.resolution):new r_(Math.floor(i.x)/this.resolution,Math.floor(i.y)/this.resolution,Math.floor(i.w)/this.resolution,Math.floor(i.h)/this.resolution),!1!==e.trimmed&&e.spriteSourceSize&&(s=new r_(Math.floor(e.spriteSourceSize.x)/this.resolution,Math.floor(e.spriteSourceSize.y)/this.resolution,Math.floor(i.w)/this.resolution,Math.floor(i.h)/this.resolution)),this.textures[t]=new iv(this.baseTexture,r,a,s,e.rotated?2:0,e.anchor,e.borders),iv.addToCache(this.textures[t],t.toString())}r++}}/** Parse animations config. */_processAnimations(){let t=this.data.animations||{};for(let e in t){this.animations[e]=[];for(let r=0;r<t[e].length;r++){let i=t[e][r];this.animations[e].push(this.textures[i])}}}/** The parse has completed. */_parseComplete(){let t=this._callback;this._callback=null,this._batchIndex=0,t.call(this,this.textures)}/** Begin the next batch of textures. */_nextBatch(){this._processFrames(this._batchIndex*t.BATCH_SIZE),this._batchIndex++,setTimeout(()=>{this._batchIndex*t.BATCH_SIZE<this._frameKeys.length?this._nextBatch():(this._processAnimations(),this._parseComplete())},0)}/**
   * Destroy Spritesheet and don't use after this.
   * @param {boolean} [destroyBase=false] - Whether to destroy the base texture as well
   */destroy(t=!1){for(let t in this.textures)this.textures[t].destroy();this._frames=null,this._frameKeys=null,this.data=null,this.textures=null,t&&(this._texture?.destroy(),this.baseTexture.destroy()),this._texture=null,this.baseTexture=null,this.linkedSheets=[]}};hm.BATCH_SIZE=1e3;let hg=hm;const h_=["jpg","png","jpeg","avif","webp"],hy={extension:e$.Asset,/** Handle the caching of the related Spritesheet Textures */cache:{test:t=>t instanceof hg,getCacheableAssets:(t,e)=>(function t(e,r,i){let s={};if(e.forEach(t=>{s[t]=r}),Object.keys(r.textures).forEach(t=>{s[t]=r.textures[t]}),!i){let i=ta.path.dirname(e[0]);r.linkedSheets.forEach((e,n)=>{let a=t([`${i}/${r.data.meta.related_multi_packs[n]}`],e,!0);Object.assign(s,a)})}return s})(t,e,!1)},/** Resolve the the resolution of the asset. */resolver:{test:t=>{let e=t.split("?")[0].split("."),r=e.pop(),i=e.pop();return"json"===r&&h_.includes(i)},parse:t=>{let e=t.split(".");return{resolution:parseFloat(G.RETINA_PREFIX.exec(t)?.[1]??"1"),format:e[e.length-2],src:t}}},/**
   * Loader plugin that parses sprite sheets!
   * once the JSON has been loaded this checks to see if the JSON is spritesheet data.
   * If it is, we load the spritesheets image and parse the data into PIXI.Spritesheet
   * All textures in the sprite sheet are then added to the cache
   * @ignore
   */loader:{name:"spritesheetLoader",extension:{type:e$.LoadParser,priority:nY.Normal},testParse:async(t,e)=>".json"===ta.path.extname(e.src).toLowerCase()&&!!t.frames,async parse(t,e,r){let i=ta.path.dirname(e.src);i&&i.lastIndexOf("/")!==i.length-1&&(i+="/");let s=i+t.meta.image;s=nz(s,e.src);let n=(await r.load([s]))[s],a=new hg(n.baseTexture,t,e.src);await a.parse();let o=t?.meta?.related_multi_packs;if(Array.isArray(o)){let t=[];for(let s of o){if("string"!=typeof s)continue;let n=i+s;e.data?.ignoreMultiPack||(n=nz(n,e.src),t.push(r.load({src:n,data:{ignoreMultiPack:!0}})))}let s=await Promise.all(t);a.linkedSheets=s,s.forEach(t=>{t.linkedSheets=[a].concat(a.linkedSheets.filter(e=>e!==t))})}return a},unload(t){t.destroy(!0)}}};eK.add(hy);var hv={};h(hv,"BitmapFont",()=>hC),h(hv,"BitmapFontData",()=>hx),h(hv,"BitmapText",()=>hN),h(hv,"TextFormat",()=>hb),h(hv,"XMLFormat",()=>hT),h(hv,"XMLStringFormat",()=>hE),h(hv,"autoDetectFormat",()=>hw),h(hv,"loadBitmapFont",()=>hk);class hx{constructor(){this.info=[],this.common=[],this.page=[],this.char=[],this.kerning=[],this.distanceField=[]}}class hb{/**
   * Check if resource refers to txt font data.
   * @param data
   * @returns - True if resource could be treated as font data, false otherwise.
   */static test(t){return"string"==typeof t&&t.startsWith("info face=")}/**
   * Convert text font data to a javascript object.
   * @param txt - Raw string data to be converted
   * @returns - Parsed font data
   */static parse(t){let e=t.match(/^[a-z]+\s+.+$/gm),r={info:[],common:[],page:[],char:[],chars:[],kerning:[],kernings:[],distanceField:[]};for(let t in e){let i=e[t].match(/^[a-z]+/gm)[0],s=e[t].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),n={};for(let t in s){let e=s[t].split("="),r=e[0],i=e[1].replace(/"/gm,""),a=parseFloat(i),o=isNaN(a)?i:a;n[r]=o}r[i].push(n)}let i=new hx;return r.info.forEach(t=>i.info.push({face:t.face,size:parseInt(t.size,10)})),r.common.forEach(t=>i.common.push({lineHeight:parseInt(t.lineHeight,10)})),r.page.forEach(t=>i.page.push({id:parseInt(t.id,10),file:t.file})),r.char.forEach(t=>i.char.push({id:parseInt(t.id,10),page:parseInt(t.page,10),x:parseInt(t.x,10),y:parseInt(t.y,10),width:parseInt(t.width,10),height:parseInt(t.height,10),xoffset:parseInt(t.xoffset,10),yoffset:parseInt(t.yoffset,10),xadvance:parseInt(t.xadvance,10)})),r.kerning.forEach(t=>i.kerning.push({first:parseInt(t.first,10),second:parseInt(t.second,10),amount:parseInt(t.amount,10)})),r.distanceField.forEach(t=>i.distanceField.push({distanceRange:parseInt(t.distanceRange,10),fieldType:t.fieldType})),i}}class hT{/**
   * Check if resource refers to xml font data.
   * @param data
   * @returns - True if resource could be treated as font data, false otherwise.
   */static test(t){return"string"!=typeof t&&"getElementsByTagName"in t&&t.getElementsByTagName("page").length&&null!==t.getElementsByTagName("info")[0].getAttribute("face")}/**
   * Convert the XML into BitmapFontData that we can use.
   * @param xml
   * @returns - Data to use for BitmapFont
   */static parse(t){let e=new hx,r=t.getElementsByTagName("info"),i=t.getElementsByTagName("common"),s=t.getElementsByTagName("page"),n=t.getElementsByTagName("char"),a=t.getElementsByTagName("kerning"),o=t.getElementsByTagName("distanceField");for(let t=0;t<r.length;t++)e.info.push({face:r[t].getAttribute("face"),size:parseInt(r[t].getAttribute("size"),10)});for(let t=0;t<i.length;t++)e.common.push({lineHeight:parseInt(i[t].getAttribute("lineHeight"),10)});for(let t=0;t<s.length;t++)e.page.push({id:parseInt(s[t].getAttribute("id"),10)||0,file:s[t].getAttribute("file")});for(let t=0;t<n.length;t++){let r=n[t];e.char.push({id:parseInt(r.getAttribute("id"),10),page:parseInt(r.getAttribute("page"),10)||0,x:parseInt(r.getAttribute("x"),10),y:parseInt(r.getAttribute("y"),10),width:parseInt(r.getAttribute("width"),10),height:parseInt(r.getAttribute("height"),10),xoffset:parseInt(r.getAttribute("xoffset"),10),yoffset:parseInt(r.getAttribute("yoffset"),10),xadvance:parseInt(r.getAttribute("xadvance"),10)})}for(let t=0;t<a.length;t++)e.kerning.push({first:parseInt(a[t].getAttribute("first"),10),second:parseInt(a[t].getAttribute("second"),10),amount:parseInt(a[t].getAttribute("amount"),10)});for(let t=0;t<o.length;t++)e.distanceField.push({fieldType:o[t].getAttribute("fieldType"),distanceRange:parseInt(o[t].getAttribute("distanceRange"),10)});return e}}class hE{/**
   * Check if resource refers to text xml font data.
   * @param data
   * @returns - True if resource could be treated as font data, false otherwise.
   */static test(t){return!!("string"==typeof t&&t.includes("<font>"))&&hT.test(G.ADAPTER.parseXML(t))}/**
   * Convert the text XML into BitmapFontData that we can use.
   * @param xmlTxt
   * @returns - Data to use for BitmapFont
   */static parse(t){return hT.parse(G.ADAPTER.parseXML(t))}}const hA=[hb,hT,hE];function hw(t){for(let e=0;e<hA.length;e++)if(hA[e].test(t))return hA[e];return null}function hS(t){return t.codePointAt?t.codePointAt(0):t.charCodeAt(0)}function hR(t){return Array.from?Array.from(t):t.split("")}const hI=class t{/**
   * @param data
   * @param textures
   * @param ownsTextures - Setting to `true` will destroy page textures
   *        when the font is uninstalled.
   */constructor(t,e,r){let[i]=t.info,[s]=t.common,[n]=t.page,[a]=t.distanceField,o=ta.getResolutionOfUrl(n.file),h={};this._ownsTextures=r,this.font=i.face,this.size=i.size,this.lineHeight=s.lineHeight/o,this.chars={},this.pageTextures=h;for(let r=0;r<t.page.length;r++){let{id:i,file:s}=t.page[r];h[i]=e instanceof Array?e[r]:e[s],a?.fieldType&&"none"!==a.fieldType&&(h[i].baseTexture.alphaMode=M.NO_PREMULTIPLIED_ALPHA,h[i].baseTexture.mipmap=C.OFF)}for(let e=0;e<t.char.length;e++){let{id:r,page:i}=t.char[e],{x:s,y:n,width:a,height:l,xoffset:u,yoffset:d,xadvance:c}=t.char[e];s/=o,n/=o,a/=o,l/=o,u/=o,d/=o,c/=o;let p=new r_(s+h[i].frame.x/o,n+h[i].frame.y/o,a,l);this.chars[r]={xOffset:u,yOffset:d,xAdvance:c,kerning:{},texture:new iv(h[i].baseTexture,p),page:i}}for(let e=0;e<t.kerning.length;e++){let{first:r,second:i,amount:s}=t.kerning[e];r/=o,i/=o,s/=o,this.chars[i]&&(this.chars[i].kerning[r]=s)}this.distanceFieldRange=a?.distanceRange,this.distanceFieldType=a?.fieldType?.toLowerCase()??"none"}/** Remove references to created glyph textures. */destroy(){for(let t in this.chars)this.chars[t].texture.destroy(),this.chars[t].texture=null;for(let t in this.pageTextures)this._ownsTextures&&this.pageTextures[t].destroy(!0),this.pageTextures[t]=null;this.chars=null,this.pageTextures=null}/**
   * Register a new bitmap font.
   * @param data - The
   *        characters map that could be provided as xml or raw string.
   * @param textures - List of textures for each page.
   * @param ownsTextures - Set to `true` to destroy page textures
   *        when the font is uninstalled. By default fonts created with
   *        `BitmapFont.from` or from the `BitmapFontLoader` are `true`.
   * @returns {PIXI.BitmapFont} Result font object with font, size, lineHeight
   *         and char fields.
   */static install(e,r,i){let s;if(e instanceof hx)s=e;else{let t=hw(e);if(!t)throw Error("Unrecognized data format for font.");s=t.parse(e)}r instanceof iv&&(r=[r]);let n=new t(s,r,i);return t.available[n.font]=n,n}/**
   * Remove bitmap font by name.
   * @param name - Name of the font to uninstall.
   */static uninstall(e){let r=t.available[e];if(!r)throw Error(`No font found named '${e}'`);r.destroy(),delete t.available[e]}/**
   * Generates a bitmap-font for the given style and character set. This does not support
   * kernings yet. With `style` properties, only the following non-layout properties are used:
   *
   * - {@link PIXI.TextStyle#dropShadow|dropShadow}
   * - {@link PIXI.TextStyle#dropShadowDistance|dropShadowDistance}
   * - {@link PIXI.TextStyle#dropShadowColor|dropShadowColor}
   * - {@link PIXI.TextStyle#dropShadowBlur|dropShadowBlur}
   * - {@link PIXI.TextStyle#dropShadowAngle|dropShadowAngle}
   * - {@link PIXI.TextStyle#fill|fill}
   * - {@link PIXI.TextStyle#fillGradientStops|fillGradientStops}
   * - {@link PIXI.TextStyle#fillGradientType|fillGradientType}
   * - {@link PIXI.TextStyle#fontFamily|fontFamily}
   * - {@link PIXI.TextStyle#fontSize|fontSize}
   * - {@link PIXI.TextStyle#fontVariant|fontVariant}
   * - {@link PIXI.TextStyle#fontWeight|fontWeight}
   * - {@link PIXI.TextStyle#lineJoin|lineJoin}
   * - {@link PIXI.TextStyle#miterLimit|miterLimit}
   * - {@link PIXI.TextStyle#stroke|stroke}
   * - {@link PIXI.TextStyle#strokeThickness|strokeThickness}
   * - {@link PIXI.TextStyle#textBaseline|textBaseline}
   * @param name - The name of the custom font to use with BitmapText.
   * @param textStyle - Style options to render with BitmapFont.
   * @param options - Setup options for font or name of the font.
   * @returns Font generated by style options.
   * @example
   * import { BitmapFont, BitmapText } from 'pixi.js';
   *
   * BitmapFont.from('TitleFont', {
   *     fontFamily: 'Arial',
   *     fontSize: 12,
   *     strokeThickness: 2,
   *     fill: 'purple',
   * });
   *
   * const title = new BitmapText('This is the title', { fontName: 'TitleFont' });
   */static from(e,r,i){if(!e)throw Error("[BitmapFont] Property `name` is required.");let{chars:s,padding:n,resolution:a,textureWidth:o,textureHeight:h,...l}=Object.assign({},t.defaultOptions,i),u=function(t){"string"==typeof t&&(t=[t]);let e=[];for(let r=0,i=t.length;r<i;r++){let i=t[r];if(Array.isArray(i)){if(2!==i.length)throw Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${i.length}.`);let t=i[0].charCodeAt(0),r=i[1].charCodeAt(0);if(r<t)throw Error("[BitmapFont]: Invalid character range.");for(let i=t;i<=r;i++)e.push(String.fromCharCode(i))}else e.push(...hR(i))}if(0===e.length)throw Error("[BitmapFont]: Empty set when resolving characters.");return e}(s),d=r instanceof oW?r:new oW(r),c=new hx;c.info[0]={face:d.fontFamily,size:d.fontSize},c.common[0]={lineHeight:d.fontSize};let p=0,f=0,m,g,_,y=0,v=[],x=[];for(let t=0;t<u.length;t++){m||((m=G.ADAPTER.createCanvas()).width=o,m.height=h,g=m.getContext("2d"),_=new e9(m,{resolution:a,...l}),v.push(_),x.push(new iv(_)),c.page.push({id:x.length-1,file:""}));let e=u[t],r=oj.measureText(e,d,!1,m),i=r.width,s=Math.ceil(r.height),b=Math.ceil(("italic"===d.fontStyle?2:1)*i);if(f>=h-s*a){if(0===f)throw Error(`[BitmapFont] textureHeight ${h}px is too small (fontFamily: '${d.fontFamily}', fontSize: ${d.fontSize}px, char: '${e}')`);--t,m=null,g=null,_=null,f=0,p=0,y=0;continue}if(y=Math.max(s+r.fontProperties.descent,y),b*a+p>=o){if(0===p)throw Error(`[BitmapFont] textureWidth ${o}px is too small (fontFamily: '${d.fontFamily}', fontSize: ${d.fontSize}px, char: '${e}')`);--t,f+=y*a,f=Math.ceil(f),p=0,y=0;continue}!function(t,e,r,i,s,n,a){let o=r.text,h=r.fontProperties;e.translate(i,s),e.scale(n,n);let l=a.strokeThickness/2,u=-(a.strokeThickness/2);if(e.font=a.toFontString(),e.lineWidth=a.strokeThickness,e.textBaseline=a.textBaseline,e.lineJoin=a.lineJoin,e.miterLimit=a.miterLimit,e.fillStyle=function(t,e,r,i,s,n){let a;let o=r.fill;if(!Array.isArray(o))return o;if(1===o.length)return o[0];let h=r.dropShadow?r.dropShadowDistance:0,l=r.padding||0,u=t.width/i-h-2*l,d=t.height/i-h-2*l,c=o.slice(),p=r.fillGradientStops.slice();if(!p.length){let t=c.length+1;for(let e=1;e<t;++e)p.push(e/t)}if(c.unshift(o[0]),p.unshift(0),c.push(o[o.length-1]),p.push(1),r.fillGradientType===oU.LINEAR_VERTICAL){a=e.createLinearGradient(u/2,l,u/2,d+l);let t=0,i=(n.fontProperties.fontSize+r.strokeThickness)/d;for(let e=0;e<s.length;e++){let r=n.lineHeight*e;for(let e=0;e<c.length;e++){let s=0;s="number"==typeof p[e]?p[e]:e/c.length;let n=r/d+s*i,o=Math.max(t,n);o=Math.min(o,1),a.addColorStop(o,c[e]),t=o}}}else{a=e.createLinearGradient(l,d/2,u+l,d/2);let t=c.length+1,r=1;for(let e=0;e<c.length;e++){let i;i="number"==typeof p[e]?p[e]:r/t,a.addColorStop(i,c[e]),r++}}return a}(t,e,a,n,[o],r),e.strokeStyle=a.stroke,a.dropShadow){let t=a.dropShadowColor,r=a.dropShadowBlur*n,i=a.dropShadowDistance*n;e.shadowColor=el.shared.setValue(t).setAlpha(a.dropShadowAlpha).toRgbaString(),e.shadowBlur=r,e.shadowOffsetX=Math.cos(a.dropShadowAngle)*i,e.shadowOffsetY=Math.sin(a.dropShadowAngle)*i}else e.shadowColor="black",e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0;a.stroke&&a.strokeThickness&&e.strokeText(o,l,u+r.lineHeight-h.descent),a.fill&&e.fillText(o,l,u+r.lineHeight-h.descent),e.setTransform(1,0,0,1,0,0),e.fillStyle="rgba(0, 0, 0, 0)"}(m,g,r,p,f,a,d);let T=hS(r.text);c.char.push({id:T,page:x.length-1,x:p/a,y:f/a,width:b,height:s,xoffset:0,yoffset:0,xadvance:i-(d.dropShadow?d.dropShadowDistance:0)-(d.stroke?d.strokeThickness:0)}),p+=(b+2*n)*a,p=Math.ceil(p)}if(!i?.skipKerning)for(let t=0,e=u.length;t<e;t++){let r=u[t];for(let t=0;t<e;t++){let e=u[t],i=g.measureText(r).width,s=g.measureText(e).width,n=g.measureText(r+e).width-(i+s);n&&c.kerning.push({first:hS(r),second:hS(e),amount:n})}}let b=new t(c,x,!0);return void 0!==t.available[e]&&t.uninstall(e),t.available[e]=b,b}};hI.ALPHA=[["a","z"],["A","Z"]," "],/**
* This character set includes all decimal digits (from 0 to 9).
* @type {string[][]}
* @example
* BitmapFont.from('ExampleFont', style, { chars: BitmapFont.NUMERIC })
*/hI.NUMERIC=[["0","9"]],/**
* This character set is the union of `BitmapFont.ALPHA` and `BitmapFont.NUMERIC`.
* @type {string[][]}
*/hI.ALPHANUMERIC=[["a","z"],["A","Z"],["0","9"]," "],/**
* This character set consists of all the ASCII table.
* @member {string[][]}
* @see http://www.asciitable.com/
*/hI.ASCII=[[" ","~"]],/**
* Collection of default options when using `BitmapFont.from`.
* @property {number} [resolution=1] -
* @property {number} [textureWidth=512] -
* @property {number} [textureHeight=512] -
* @property {number} [padding=4] -
* @property {string|string[]|string[][]} chars = PIXI.BitmapFont.ALPHANUMERIC
*/hI.defaultOptions={resolution:1,textureWidth:512,textureHeight:512,padding:4,chars:hI.ALPHANUMERIC},/** Collection of available/installed fonts. */hI.available={};let hC=hI;var hM=`// Pixi texture info\r
varying vec2 vTextureCoord;\r
uniform sampler2D uSampler;\r
\r
// Tint\r
uniform vec4 uColor;\r
\r
// on 2D applications fwidth is screenScale / glyphAtlasScale * distanceFieldRange\r
uniform float uFWidth;\r
\r
void main(void) {\r
\r
  // To stack MSDF and SDF we need a non-pre-multiplied-alpha texture.\r
  vec4 texColor = texture2D(uSampler, vTextureCoord);\r
\r
  // MSDF\r
  float median = texColor.r + texColor.g + texColor.b -\r
                  min(texColor.r, min(texColor.g, texColor.b)) -\r
                  max(texColor.r, max(texColor.g, texColor.b));\r
  // SDF\r
  median = min(median, texColor.a);\r
\r
  float screenPxDistance = uFWidth * (median - 0.5);\r
  float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);\r
  if (median < 0.01) {\r
    alpha = 0.0;\r
  } else if (median > 0.99) {\r
    alpha = 1.0;\r
  }\r
\r
  // Gamma correction for coverage-like alpha\r
  float luma = dot(uColor.rgb, vec3(0.299, 0.587, 0.114));\r
  float gamma = mix(1.0, 1.0 / 2.2, luma);\r
  float coverage = pow(uColor.a * alpha, gamma);  \r
\r
  // NPM Textures, NPM outputs\r
  gl_FragColor = vec4(uColor.rgb, coverage);\r
}\r
`,hP=`// Mesh material default fragment\r
attribute vec2 aVertexPosition;\r
attribute vec2 aTextureCoord;\r
\r
uniform mat3 projectionMatrix;\r
uniform mat3 translationMatrix;\r
uniform mat3 uTextureMatrix;\r
\r
varying vec2 vTextureCoord;\r
\r
void main(void)\r
{\r
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r
\r
    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;\r
}\r
`;const hD=[],hO=[],hB=[],hF=class t extends sq{/**
   * @param text - A string that you would like the text to display.
   * @param style - The style parameters.
   * @param {string} style.fontName - The installed BitmapFont name.
   * @param {number} [style.fontSize] - The size of the font in pixels, e.g. 24. If undefined,
   *.     this will default to the BitmapFont size.
   * @param {string} [style.align='left'] - Alignment for multiline text ('left', 'center', 'right' or 'justify'),
   *      does not affect single line text.
   * @param {PIXI.ColorSource} [style.tint=0xFFFFFF] - The tint color.
   * @param {number} [style.letterSpacing=0] - The amount of spacing between letters.
   * @param {number} [style.maxWidth=0] - The max width of the text before line wrapping.
   */constructor(e,r={}){super();let{align:i,tint:s,maxWidth:n,letterSpacing:a,fontName:o,fontSize:h}=Object.assign({},t.styleDefaults,r);if(!hC.available[o])throw Error(`Missing BitmapFont "${o}"`);this._activePagesMeshData=[],this._textWidth=0,this._textHeight=0,this._align=i,this._tintColor=new el(s),this._font=void 0,this._fontName=o,this._fontSize=h,this.text=e,this._maxWidth=n,this._maxLineHeight=0,this._letterSpacing=a,this._anchor=new rP(()=>{this.dirty=!0},this,0,0),this._roundPixels=G.ROUND_PIXELS,this.dirty=!0,this._resolution=G.RESOLUTION,this._autoResolution=!0,this._textureCache={}}/** Renders text and updates it when needed. This should only be called if the BitmapFont is regenerated. */updateText(){let t=hC.available[this._fontName],e=this.fontSize,r=e/t.size,i=new rm,s=[],n=[],a=[],o=this._text.replace(/(?:\r\n|\r)/g,`
`)||" ",h=hR(o),l=this._maxWidth*t.size/e,u="none"===t.distanceFieldType?hD:hO,d=null,c=0,p=0,f=0,m=-1,g=0,_=0,y=0,v=0;for(let e=0;e<h.length;e++){let r=h[e],o=hS(r);if(/(?:\s)/.test(r)&&(m=e,g=c,v++),"\r"===r||r===`
`){n.push(c),a.push(-1),p=Math.max(p,c),++f,++_,i.x=0,i.y+=t.lineHeight,d=null,v=0;continue}let u=t.chars[o];if(!u)continue;d&&u.kerning[d]&&(i.x+=u.kerning[d]);let x=hB.pop()||{texture:iv.EMPTY,line:0,charCode:0,prevSpaces:0,position:new rm};x.texture=u.texture,x.line=f,x.charCode=o,x.position.x=Math.round(i.x+u.xOffset+this._letterSpacing/2),x.position.y=Math.round(i.y+u.yOffset),x.prevSpaces=v,s.push(x),c=x.position.x+Math.max(u.xAdvance-u.xOffset,u.texture.orig.width),i.x+=u.xAdvance+this._letterSpacing,y=Math.max(y,u.yOffset+u.texture.height),d=o,-1!==m&&l>0&&i.x>l&&(++_,ta.removeItems(s,1+m-_,1+e-m),e=m,m=-1,n.push(g),a.push(s.length>0?s[s.length-1].prevSpaces:0),p=Math.max(p,g),f++,i.x=0,i.y+=t.lineHeight,d=null,v=0)}let x=h[h.length-1];"\r"!==x&&x!==`
`&&(/(?:\s)/.test(x)&&(c=g),n.push(c),p=Math.max(p,c),a.push(-1));let T=[];for(let t=0;t<=f;t++){let e=0;"right"===this._align?e=p-n[t]:"center"===this._align?e=(p-n[t])/2:"justify"===this._align&&(e=a[t]<0?0:(p-n[t])/a[t]),T.push(e)}let E=s.length,A={},w=[],S=this._activePagesMeshData;u.push(...S);for(let e=0;e<E;e++){let r=s[e].texture,i=r.baseTexture.uid;if(!A[i]){let e=u.pop();if(!e){let r,i;let s=new ox;"none"===t.distanceFieldType?(r=new oE(iv.EMPTY),i=b.NORMAL):(r=new oE(iv.EMPTY,{program:r1.from(hP,hM),uniforms:{uFWidth:0}}),i=b.NORMAL_NPM);let n=new ov(s,r);n.blendMode=i,e={index:0,indexCount:0,vertexCount:0,uvsCount:0,total:0,mesh:n,vertices:null,uvs:null,indices:null}}e.index=0,e.indexCount=0,e.vertexCount=0,e.uvsCount=0,e.total=0;let{_textureCache:s}=this;s[i]=s[i]||new iv(r.baseTexture),e.mesh.texture=s[i],e.mesh.tint=this._tintColor.value,w.push(e),A[i]=e}A[i].total++}for(let t=0;t<S.length;t++)w.includes(S[t])||this.removeChild(S[t].mesh);for(let t=0;t<w.length;t++)w[t].mesh.parent!==this&&this.addChild(w[t].mesh);for(let t in this._activePagesMeshData=w,A){let e=A[t],r=e.total;if(!(e.indices?.length>6*r)||e.vertices.length<2*ov.BATCHABLE_SIZE)e.vertices=new Float32Array(8*r),e.uvs=new Float32Array(8*r),e.indices=new Uint16Array(6*r);else{let t=e.total,r=e.vertices;for(let e=8*t;e<r.length;e++)r[e]=0}e.mesh.size=6*r}for(let t=0;t<E;t++){let e=s[t],i=e.position.x+T[e.line]*("justify"===this._align?e.prevSpaces:1);this._roundPixels&&(i=Math.round(i));let n=i*r,a=e.position.y*r,o=e.texture,h=A[o.baseTexture.uid],l=o.frame,u=o._uvs,d=h.index++;h.indices[6*d+0]=0+4*d,h.indices[6*d+1]=1+4*d,h.indices[6*d+2]=2+4*d,h.indices[6*d+3]=0+4*d,h.indices[6*d+4]=2+4*d,h.indices[6*d+5]=3+4*d,h.vertices[8*d+0]=n,h.vertices[8*d+1]=a,h.vertices[8*d+2]=n+l.width*r,h.vertices[8*d+3]=a,h.vertices[8*d+4]=n+l.width*r,h.vertices[8*d+5]=a+l.height*r,h.vertices[8*d+6]=n,h.vertices[8*d+7]=a+l.height*r,h.uvs[8*d+0]=u.x0,h.uvs[8*d+1]=u.y0,h.uvs[8*d+2]=u.x1,h.uvs[8*d+3]=u.y1,h.uvs[8*d+4]=u.x2,h.uvs[8*d+5]=u.y2,h.uvs[8*d+6]=u.x3,h.uvs[8*d+7]=u.y3}for(let e in this._textWidth=p*r,this._textHeight=(i.y+t.lineHeight)*r,A){let t=A[e];if(0!==this.anchor.x||0!==this.anchor.y){let e=0,r=this._textWidth*this.anchor.x,i=this._textHeight*this.anchor.y;for(let s=0;s<t.total;s++)t.vertices[e++]-=r,t.vertices[e++]-=i,t.vertices[e++]-=r,t.vertices[e++]-=i,t.vertices[e++]-=r,t.vertices[e++]-=i,t.vertices[e++]-=r,t.vertices[e++]-=i}this._maxLineHeight=y*r;let i=t.mesh.geometry.getBuffer("aVertexPosition"),s=t.mesh.geometry.getBuffer("aTextureCoord"),n=t.mesh.geometry.getIndex();i.data=t.vertices,s.data=t.uvs,n.data=t.indices,i.update(),s.update(),n.update()}for(let t=0;t<s.length;t++)hB.push(s[t]);this._font=t,this.dirty=!1}updateTransform(){this.validate(),this.containerUpdateTransform()}_render(t){this._autoResolution&&this._resolution!==t.resolution&&(this._resolution=t.resolution,this.dirty=!0);let{distanceFieldRange:e,distanceFieldType:r,size:i}=hC.available[this._fontName];if("none"!==r){let{a:r,b:s,c:n,d:a}=this.worldTransform,o=(Math.abs(Math.sqrt(r*r+s*s))+Math.abs(Math.sqrt(n*n+a*a)))/2,h=this.fontSize/i,l=t._view.resolution;for(let t of this._activePagesMeshData)t.mesh.shader.uniforms.uFWidth=o*e*h*l}super._render(t)}/**
   * Validates text before calling parent's getLocalBounds
   * @returns - The rectangular bounding area
   */getLocalBounds(){return this.validate(),super.getLocalBounds()}/**
   * Updates text when needed
   * @private
   */validate(){let t=hC.available[this._fontName];if(!t)throw Error(`Missing BitmapFont "${this._fontName}"`);this._font!==t&&(this.dirty=!0),this.dirty&&this.updateText()}/**
   * The tint of the BitmapText object.
   * @default 0xffffff
   */get tint(){return this._tintColor.value}set tint(t){if(this.tint!==t){this._tintColor.setValue(t);for(let e=0;e<this._activePagesMeshData.length;e++)this._activePagesMeshData[e].mesh.tint=t}}/**
   * The alignment of the BitmapText object.
   * @member {string}
   * @default 'left'
   */get align(){return this._align}set align(t){this._align!==t&&(this._align=t,this.dirty=!0)}/** The name of the BitmapFont. */get fontName(){return this._fontName}set fontName(t){if(!hC.available[t])throw Error(`Missing BitmapFont "${t}"`);this._fontName!==t&&(this._fontName=t,this.dirty=!0)}/** The size of the font to display. */get fontSize(){return this._fontSize??hC.available[this._fontName].size}set fontSize(t){this._fontSize!==t&&(this._fontSize=t,this.dirty=!0)}/**
   * The anchor sets the origin point of the text.
   *
   * The default is `(0,0)`, this means the text's origin is the top left.
   *
   * Setting the anchor to `(0.5,0.5)` means the text's origin is centered.
   *
   * Setting the anchor to `(1,1)` would mean the text's origin point will be the bottom right corner.
   */get anchor(){return this._anchor}set anchor(t){"number"==typeof t?this._anchor.set(t):this._anchor.copyFrom(t)}/** The text of the BitmapText object. */get text(){return this._text}set text(t){t=String(t??""),this._text!==t&&(this._text=t,this.dirty=!0)}/**
   * The max width of this bitmap text in pixels. If the text provided is longer than the
   * value provided, line breaks will be automatically inserted in the last whitespace.
   * Disable by setting the value to 0.
   */get maxWidth(){return this._maxWidth}set maxWidth(t){this._maxWidth!==t&&(this._maxWidth=t,this.dirty=!0)}/**
   * The max line height. This is useful when trying to use the total height of the Text,
   * i.e. when trying to vertically align.
   * @readonly
   */get maxLineHeight(){return this.validate(),this._maxLineHeight}/**
   * The width of the overall text, different from fontSize,
   * which is defined in the style object.
   * @readonly
   */get textWidth(){return this.validate(),this._textWidth}/** Additional space between characters. */get letterSpacing(){return this._letterSpacing}set letterSpacing(t){this._letterSpacing!==t&&(this._letterSpacing=t,this.dirty=!0)}/**
   * If true PixiJS will Math.floor() x/y values when rendering, stopping pixel interpolation.
   * Advantages can include sharper image quality (like text) and faster rendering on canvas.
   * The main disadvantage is movement of objects may appear less smooth.
   * To set the global default, change {@link PIXI.settings.ROUND_PIXELS}
   * @default PIXI.settings.ROUND_PIXELS
   */get roundPixels(){return this._roundPixels}set roundPixels(t){t!==this._roundPixels&&(this._roundPixels=t,this.dirty=!0)}/**
   * The height of the overall text, different from fontSize,
   * which is defined in the style object.
   * @readonly
   */get textHeight(){return this.validate(),this._textHeight}/**
   * The resolution / device pixel ratio of the canvas.
   *
   * This is set to automatically match the renderer resolution by default, but can be overridden by setting manually.
   * @default 1
   */get resolution(){return this._resolution}set resolution(t){this._autoResolution=!1,this._resolution!==t&&(this._resolution=t,this.dirty=!0)}destroy(t){let{_textureCache:e}=this,r="none"===hC.available[this._fontName].distanceFieldType?hD:hO;for(let t of(r.push(...this._activePagesMeshData),this._activePagesMeshData))this.removeChild(t.mesh);for(let t in this._activePagesMeshData=[],r.filter(t=>e[t.mesh.texture.baseTexture.uid]).forEach(t=>{t.mesh.texture=iv.EMPTY}),e)e[t].destroy(),delete e[t];this._font=null,this._tintColor=null,this._textureCache=null,super.destroy(t)}};hF.styleDefaults={align:"left",tint:16777215,maxWidth:0,letterSpacing:0};let hN=hF;const hL=[".xml",".fnt"],hk={extension:{type:e$.LoadParser,priority:nY.Normal},name:"loadBitmapFont",test:t=>hL.includes(ta.path.extname(t).toLowerCase()),testParse:async t=>hb.test(t)||hE.test(t),async parse(t,e,r){let i=hb.test(t)?hb.parse(t):hE.parse(t),{src:s}=e,{page:n}=i,a=[];for(let t=0;t<n.length;++t){let e=n[t].file,r=ta.path.join(ta.path.dirname(s),e);r=nz(r,s),a.push(r)}let o=await r.load(a),h=a.map(t=>o[t]);return hC.install(i,h,!0)},load:async(t,e)=>(await G.ADAPTER.fetch(t)).text(),unload(t){t.destroy()}};eK.add(hk);var hU={};h(hU,"HTMLText",()=>hz),h(hU,"HTMLTextStyle",()=>hH);const hG=class t extends oW{constructor(){super(...arguments),this._fonts=[],this._overrides=[],this._stylesheet="",this.fontsDirty=!1}/**
   * Convert a TextStyle to HTMLTextStyle
   * @param originalStyle
   * @example
   * import {TextStyle } from 'pixi.js';
   * import {HTMLTextStyle} from '@pixi/text-html';
   * const style = new TextStyle();
   * const htmlStyle = HTMLTextStyle.from(style);
   */static from(e){return new t(Object.keys(t.defaultOptions).reduce((t,r)=>({...t,[r]:e[r]}),{}))}/** Clear the current font */cleanFonts(){this._fonts.length>0&&(this._fonts.forEach(e=>{URL.revokeObjectURL(e.src),e.refs--,0===e.refs&&(e.fontFace&&document.fonts.delete(e.fontFace),delete t.availableFonts[e.originalUrl])}),this.fontFamily="Arial",this._fonts.length=0,this.styleID++,this.fontsDirty=!0)}/**
   * Because of how HTMLText renders, fonts need to be imported
   * @param url
   * @param options
   */loadFont(e,r={}){let{availableFonts:i}=t;if(i[e]){let t=i[e];return this._fonts.push(t),t.refs++,this.styleID++,this.fontsDirty=!0,Promise.resolve()}return G.ADAPTER.fetch(e).then(t=>t.blob()).then(async t=>new Promise((e,r)=>{let i=URL.createObjectURL(t),s=new FileReader;s.onload=()=>e([i,s.result]),s.onerror=r,s.readAsDataURL(t)})).then(async([t,s])=>{let n=Object.assign({family:ta.path.basename(e,ta.path.extname(e)),weight:"normal",style:"normal",display:"auto",src:t,dataSrc:s,refs:1,originalUrl:e,fontFace:null},r);i[e]=n,this._fonts.push(n),this.styleID++;let a=new FontFace(n.family,`url(${n.src})`,{weight:n.weight,style:n.style,display:n.display});n.fontFace=a,await a.load(),document.fonts.add(a),await document.fonts.ready,this.styleID++,this.fontsDirty=!0})}/**
   * Add a style override, this can be any CSS property
   * it will override any built-in style. This is the
   * property and the value as a string (e.g., `color: red`).
   * This will override any other internal style.
   * @param {string} value - CSS style(s) to add.
   * @example
   * style.addOverride('background-color: red');
   */addOverride(...t){let e=t.filter(t=>!this._overrides.includes(t));e.length>0&&(this._overrides.push(...e),this.styleID++)}/**
   * Remove any overrides that match the value.
   * @param {string} value - CSS style to remove.
   * @example
   * style.removeOverride('background-color: red');
   */removeOverride(...t){let e=t.filter(t=>this._overrides.includes(t));e.length>0&&(this._overrides=this._overrides.filter(t=>!e.includes(t)),this.styleID++)}/**
   * Internally converts all of the style properties into CSS equivalents.
   * @param scale
   * @returns The CSS style string, for setting `style` property of root HTMLElement.
   */toCSS(t){return[`transform: scale(${t})`,"transform-origin: top left","display: inline-block",`color: ${this.normalizeColor(this.fill)}`,`font-size: ${this.fontSize}px`,`font-family: ${this.fontFamily}`,`font-weight: ${this.fontWeight}`,`font-style: ${this.fontStyle}`,`font-variant: ${this.fontVariant}`,`letter-spacing: ${this.letterSpacing}px`,`text-align: ${this.align}`,`padding: ${this.padding}px`,`white-space: ${this.whiteSpace}`,...this.lineHeight?[`line-height: ${this.lineHeight}px`]:[],...this.wordWrap?[`word-wrap: ${this.breakWords?"break-all":"break-word"}`,`max-width: ${this.wordWrapWidth}px`]:[],...this.strokeThickness?[`-webkit-text-stroke-width: ${this.strokeThickness}px`,`-webkit-text-stroke-color: ${this.normalizeColor(this.stroke)}`,`text-stroke-width: ${this.strokeThickness}px`,`text-stroke-color: ${this.normalizeColor(this.stroke)}`,"paint-order: stroke"]:[],...this.dropShadow?[this.dropShadowToCSS()]:[],...this._overrides].join(";")}/** Get the font CSS styles from the loaded font, If available. */toGlobalCSS(){return this._fonts.reduce((t,e)=>`${t}
            @font-face {
                font-family: "${e.family}";
                src: url('${e.dataSrc}');
                font-weight: ${e.weight};
                font-style: ${e.style};
                font-display: ${e.display};
            }`,this._stylesheet)}/** Internal stylesheet contents, useful for creating rules for rendering */get stylesheet(){return this._stylesheet}set stylesheet(t){this._stylesheet!==t&&(this._stylesheet=t,this.styleID++)}/**
   * Convert numerical colors into hex-strings
   * @param color
   */normalizeColor(t){return Array.isArray(t)&&(t=ta.rgb2hex(t)),"number"==typeof t?ta.hex2string(t):t}/** Convert the internal drop-shadow settings to CSS text-shadow */dropShadowToCSS(){let t=this.normalizeColor(this.dropShadowColor),e=this.dropShadowAlpha,r=Math.round(Math.cos(this.dropShadowAngle)*this.dropShadowDistance),i=Math.round(Math.sin(this.dropShadowAngle)*this.dropShadowDistance);t.startsWith("#")&&e<1&&(t+=(255*e|0).toString(16).padStart(2,"0"));let s=`${r}px ${i}px`;return this.dropShadowBlur>0?`text-shadow: ${s} ${this.dropShadowBlur}px ${t}`:`text-shadow: ${s} ${t}`}/** Resets all properties to the defaults specified in TextStyle.prototype._default */reset(){Object.assign(this,t.defaultOptions)}/**
   * Called after the image is loaded but before drawing to the canvas.
   * Mostly used to handle Safari's font loading bug.
   * @ignore
   */onBeforeDraw(){let{fontsDirty:t}=this;return this.fontsDirty=!1,this.isSafari&&this._fonts.length>0&&t?new Promise(t=>setTimeout(t,100)):Promise.resolve()}/**
   * Proving that Safari is the new IE
   * @ignore
   */get isSafari(){let{userAgent:t}=G.ADAPTER.getNavigator();return/^((?!chrome|android).)*safari/i.test(t)}set fillGradientStops(t){console.warn("[HTMLTextStyle] fillGradientStops is not supported by HTMLText")}get fillGradientStops(){return super.fillGradientStops}set fillGradientType(t){console.warn("[HTMLTextStyle] fillGradientType is not supported by HTMLText")}get fillGradientType(){return super.fillGradientType}set miterLimit(t){console.warn("[HTMLTextStyle] miterLimit is not supported by HTMLText")}get miterLimit(){return super.miterLimit}set trim(t){console.warn("[HTMLTextStyle] trim is not supported by HTMLText")}get trim(){return super.trim}set textBaseline(t){console.warn("[HTMLTextStyle] textBaseline is not supported by HTMLText")}get textBaseline(){return super.textBaseline}set leading(t){console.warn("[HTMLTextStyle] leading is not supported by HTMLText")}get leading(){return super.leading}set lineJoin(t){console.warn("[HTMLTextStyle] lineJoin is not supported by HTMLText")}get lineJoin(){return super.lineJoin}};hG.availableFonts={},/**
* List of default options, these are largely the same as TextStyle,
* with the exception of whiteSpace, which is set to 'normal' by default.
*/hG.defaultOptions={/** Align */align:"left",/** Break words */breakWords:!1,/** Drop shadow */dropShadow:!1,/** Drop shadow alpha */dropShadowAlpha:1,/**
   * Drop shadow angle
   * @type {number}
   * @default Math.PI / 6
   */dropShadowAngle:Math.PI/6,/** Drop shadow blur */dropShadowBlur:0,/** Drop shadow color */dropShadowColor:"black",/** Drop shadow distance */dropShadowDistance:5,/** Fill */fill:"black",/** Font family */fontFamily:"Arial",/** Font size */fontSize:26,/** Font style */fontStyle:"normal",/** Font variant */fontVariant:"normal",/** Font weight */fontWeight:"normal",/** Letter spacing */letterSpacing:0,/** Line height */lineHeight:0,/** Padding */padding:0,/** Stroke */stroke:"black",/** Stroke thickness */strokeThickness:0,/** White space */whiteSpace:"normal",/** Word wrap */wordWrap:!1,/** Word wrap width */wordWrapWidth:100};let hH=hG;const hj=class t extends sJ{/**
   * @param {string} [text] - Text contents
   * @param {PIXI.HTMLTextStyle|PIXI.TextStyle|PIXI.ITextStyle} [style] - Style setting to use.
   *        Strongly recommend using an HTMLTextStyle object. Providing a PIXI.TextStyle
   *        will convert the TextStyle to an HTMLTextStyle and will no longer be linked.
   */constructor(e="",r={}){super(iv.EMPTY),this._text=null,this._style=null,this._autoResolution=!0,this.localStyleID=-1,this.dirty=!1,this._updateID=0,this.ownsStyle=!1;let i=new Image,s=iv.from(i,{scaleMode:G.SCALE_MODE,resourceOptions:{autoLoad:!1}});s.orig=new r_,s.trim=new r_,this.texture=s;let n="http://www.w3.org/2000/svg",a="http://www.w3.org/1999/xhtml",o=document.createElementNS(n,"svg"),h=document.createElementNS(n,"foreignObject"),l=document.createElementNS(a,"div"),u=document.createElementNS(a,"style");h.setAttribute("width","10000"),h.setAttribute("height","10000"),h.style.overflow="hidden",o.appendChild(h),this.maxWidth=t.defaultMaxWidth,this.maxHeight=t.defaultMaxHeight,this._domElement=l,this._styleElement=u,this._svgRoot=o,this._foreignObject=h,this._foreignObject.appendChild(u),this._foreignObject.appendChild(l),this._image=i,this._loadImage=new Image,this._autoResolution=t.defaultAutoResolution,this._resolution=t.defaultResolution??G.RESOLUTION,this.text=e,this.style=r}/**
   * Calculate the size of the output text without actually drawing it.
   * This includes the `padding` in the `style` object.
   * This can be used as a fast-pass to do things like text-fitting.
   * @param {object} [overrides] - Overrides for the text, style, and resolution.
   * @param {string} [overrides.text] - The text to measure, if not specified, the current text is used.
   * @param {PIXI.HTMLTextStyle} [overrides.style] - The style to measure, if not specified, the current style is used.
   * @param {number} [overrides.resolution] - The resolution to measure, if not specified, the current resolution is used.
   * @returns {PIXI.ISize} Width and height of the measured text.
   */measureText(t){let{text:e,style:r,resolution:i}=Object.assign({text:this._text,style:this._style,resolution:this._resolution},t);Object.assign(this._domElement,{innerHTML:e,style:r.toCSS(i)}),this._styleElement.textContent=r.toGlobalCSS(),document.body.appendChild(this._svgRoot);let s=this._domElement.getBoundingClientRect();this._svgRoot.remove();let{width:n,height:a}=s;(n>this.maxWidth||a>this.maxHeight)&&console.warn("[HTMLText] Large expanse of text, increase HTMLText.maxWidth or HTMLText.maxHeight property.");let o=Math.min(this.maxWidth,Math.ceil(n)),h=Math.min(this.maxHeight,Math.ceil(a));return this._svgRoot.setAttribute("width",o.toString()),this._svgRoot.setAttribute("height",h.toString()),e!==this._text&&(this._domElement.innerHTML=this._text),r!==this._style&&(Object.assign(this._domElement,{style:this._style?.toCSS(i)}),this._styleElement.textContent=this._style?.toGlobalCSS()),{width:o+2*r.padding,height:h+2*r.padding}}/**
   * Manually refresh the text.
   * @public
   * @param {boolean} respectDirty - Whether to abort updating the
   *        text if the Text isn't dirty and the function is called.
   */async updateText(t=!0){let{style:e,_image:r,_loadImage:i}=this;if(this.localStyleID!==e.styleID&&(this.dirty=!0,this.localStyleID=e.styleID),!this.dirty&&t)return;let{width:s,height:n}=this.measureText();r.width=i.width=Math.ceil(Math.max(1,s)),r.height=i.height=Math.ceil(Math.max(1,n)),this._updateID++;let a=this._updateID;await new Promise(t=>{i.onload=async()=>{if(a<this._updateID){t();return}await e.onBeforeDraw(),r.src=i.src,i.onload=null,i.src="",this.updateTexture(),t()};let s=new XMLSerializer().serializeToString(this._svgRoot);i.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(s)}`})}/** The raw image element that is rendered under-the-hood. */get source(){return this._image}/**
   * Update the texture resource.
   * @private
   */updateTexture(){let{style:t,texture:e,_image:r,resolution:i}=this,{padding:s}=t,{baseTexture:n}=e;e.trim.width=e._frame.width=r.width/i,e.trim.height=e._frame.height=r.height/i,e.trim.x=-s,e.trim.y=-s,e.orig.width=e._frame.width-2*s,e.orig.height=e._frame.height-2*s,this._onTextureUpdate(),n.setRealSize(r.width,r.height,i),this.dirty=!1}/**
   * Renders the object using the WebGL renderer
   * @param {PIXI.Renderer} renderer - The renderer
   * @private
   */_render(t){this._autoResolution&&this._resolution!==t.resolution&&(this._resolution=t.resolution,this.dirty=!0),this.updateText(!0),super._render(t)}/**
   * Renders the object using the Canvas Renderer.
   * @private
   * @param {PIXI.CanvasRenderer} renderer - The renderer
   */_renderCanvas(t){this._autoResolution&&this._resolution!==t.resolution&&(this._resolution=t.resolution,this.dirty=!0),this.updateText(!0),super._renderCanvas(t)}/**
   * Get the local bounds.
   * @param {PIXI.Rectangle} rect - Input rectangle.
   * @returns {PIXI.Rectangle} Local bounds
   */getLocalBounds(t){return this.updateText(!0),super.getLocalBounds(t)}_calculateBounds(){this.updateText(!0),this.calculateVertices(),this._bounds.addQuad(this.vertexData)}/**
   * Handle dirty style changes
   * @private
   */_onStyleChange(){this.dirty=!0}/**
   * Destroy this Text object. Don't use after calling.
   * @param {boolean|object} options - Same as Sprite destroy options.
   */destroy(e){"boolean"==typeof e&&(e={children:e}),e=Object.assign({},t.defaultDestroyOptions,e),super.destroy(e),this.ownsStyle&&this._style?.cleanFonts(),this._style=null,this._svgRoot?.remove(),this._svgRoot=null,this._domElement?.remove(),this._domElement=null,this._foreignObject?.remove(),this._foreignObject=null,this._styleElement?.remove(),this._styleElement=null,this._loadImage.src="",this._loadImage.onload=null,this._loadImage=null,this._image.src="",this._image=null}/**
   * Get the width in pixels.
   * @member {number}
   */get width(){return this.updateText(!0),Math.abs(this.scale.x)*this._image.width/this.resolution}set width(t){this.updateText(!0);let e=ta.sign(this.scale.x)||1;this.scale.x=e*t/this._image.width/this.resolution,this._width=t}/**
   * Get the height in pixels.
   * @member {number}
   */get height(){return this.updateText(!0),Math.abs(this.scale.y)*this._image.height/this.resolution}set height(t){this.updateText(!0);let e=ta.sign(this.scale.y)||1;this.scale.y=e*t/this._image.height/this.resolution,this._height=t}/** The base style to render with text. */get style(){return this._style}set style(t){this._style!==t&&((t=t||{})instanceof hH?(this.ownsStyle=!1,this._style=t):t instanceof oW?(console.warn("[HTMLText] Cloning TextStyle, if this is not what you want, use HTMLTextStyle"),this.ownsStyle=!0,this._style=hH.from(t)):(this.ownsStyle=!0,this._style=new hH(t)),this.localStyleID=-1,this.dirty=!0)}/**
   * Contents of text. This can be HTML text and include tags.
   * @example
   * const text = new HTMLText('This is a <em>styled</em> text!');
   * @member {string}
   */get text(){return this._text}set text(t){t=String(""===t||null==t?" ":t),t=this.sanitiseText(t),this._text!==t&&(this._text=t,this.dirty=!0)}/**
   * The resolution / device pixel ratio of the canvas.
   * This is set to automatically match the renderer resolution by default, but can be overridden by setting manually.
   * @member {number}
   * @default 1
   */get resolution(){return this._resolution}set resolution(t){this._autoResolution=!1,this._resolution!==t&&(this._resolution=t,this.dirty=!0)}/**
   * Sanitise text - replace `<br>` with `<br/>`, `&nbsp;` with `&#160;`
   * @param text
   * @see https://www.sitepoint.com/community/t/xhtml-1-0-transitional-xml-parsing-error-entity-nbsp-not-defined/3392/3
   */sanitiseText(t){return t.replace(/<br>/gi,"<br/>").replace(/<hr>/gi,"<hr/>").replace(/&nbsp;/gi,"&#160;")}};hj.defaultDestroyOptions={texture:!0,children:!1,baseTexture:!0},/** Default maxWidth, set at construction */hj.defaultMaxWidth=2024,/** Default maxHeight, set at construction */hj.defaultMaxHeight=2024,/** Default autoResolution for all HTMLText objects */hj.defaultAutoResolution=!0;let hz=hj;u(m,ng),u(m,nO),u(m,nL),u(m,aE),u(m,g),u(m,sj),u(m,n_),u(m,aV),u(m,s2),u(m,s5),u(m,ne),u(m,ns),u(m,nh),u(m,nc),u(m,aY),u(m,of),u(m,oA),u(m,oP),u(m,oL),u(m,sK),u(m,hr),u(m,hs),u(m,hf),u(m,ok),u(m,hv),u(m,hU);var hV={};!/* Font Face Observer v2.3.0 - © Bram Stein. License: BSD-3-Clause */function(){function t(t,e){document.addEventListener?t.addEventListener("scroll",e,!1):t.attachEvent("scroll",e)}function e(t){this.g=document.createElement("div"),this.g.setAttribute("aria-hidden","true"),this.g.appendChild(document.createTextNode(t)),this.h=document.createElement("span"),this.i=document.createElement("span"),this.m=document.createElement("span"),this.j=document.createElement("span"),this.l=-1,this.h.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.i.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.j.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;",this.m.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;",this.h.appendChild(this.m),this.i.appendChild(this.j),this.g.appendChild(this.h),this.g.appendChild(this.i)}function r(t,e){t.g.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+e+";"}function i(t){var e=t.g.offsetWidth,r=e+100;return t.j.style.width=r+"px",t.i.scrollLeft=r,t.h.scrollLeft=t.h.scrollWidth+100,t.l!==e&&(t.l=e,!0)}function s(e,r){function s(){i(n)&&null!==n.g.parentNode&&r(n.l)}var n=e;t(e.h,s),t(e.i,s),i(e)}function n(t,e,r){e=e||{},r=r||window,this.family=t,this.style=e.style||"normal",this.weight=e.weight||"normal",this.stretch=e.stretch||"normal",this.context=r}var a=null,o=null,h=null,l=null;function u(t){return null===l&&(l=!!t.document.fonts),l}function d(t,e){var r=t.style,i=t.weight;if(null===h){var s=document.createElement("div");try{s.style.font="condensed 100px sans-serif"}catch(t){}h=""!==s.style.font}return[r,i,h?t.stretch:"","100px",e].join(" ")}n.prototype.load=function(t,i){var n=this,h=t||"BESbswy",l=0,c=i||3e3,p=(new Date).getTime();return new Promise(function(t,i){if(u(n.context)&&(f=n.context,null===o&&(o=!!(u(f)&&/Apple/.test(window.navigator.vendor))&&!!(f=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent))&&603>parseInt(f[1],10)),!o)){var f,m,g=new Promise(function(t,e){!function r(){(new Date).getTime()-p>=c?e(Error(""+c+"ms timeout exceeded")):n.context.document.fonts.load(d(n,'"'+n.family+'"'),h).then(function(e){1<=e.length?t():setTimeout(r,25)},e)}()});Promise.race([new Promise(function(t,e){l=setTimeout(function(){e(Error(""+c+"ms timeout exceeded"))},c)}),g]).then(function(){clearTimeout(l),t(n)},i)}else m=function(){function o(){var e;(e=-1!=g&&-1!=_||-1!=g&&-1!=y||-1!=_&&-1!=y)&&((e=g!=_&&g!=y&&_!=y)||(null===a&&(a=!!(e=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent))&&(536>parseInt(e[1],10)||536===parseInt(e[1],10)&&11>=parseInt(e[2],10))),e=a&&(g==v&&_==v&&y==v||g==x&&_==x&&y==x||g==b&&_==b&&y==b)),e=!e),e&&(null!==T.parentNode&&T.parentNode.removeChild(T),clearTimeout(l),t(n))}var u=new e(h),f=new e(h),m=new e(h),g=-1,_=-1,y=-1,v=-1,x=-1,b=-1,T=document.createElement("div");T.dir="ltr",r(u,d(n,"sans-serif")),r(f,d(n,"serif")),r(m,d(n,"monospace")),T.appendChild(u.g),T.appendChild(f.g),T.appendChild(m.g),n.context.document.body.appendChild(T),v=u.g.offsetWidth,x=f.g.offsetWidth,b=m.g.offsetWidth,function t(){if((new Date).getTime()-p>=c)null!==T.parentNode&&T.parentNode.removeChild(T),i(Error(""+c+"ms timeout exceeded"));else{var e=n.context.document.hidden;(!0===e||void 0===e)&&(g=u.g.offsetWidth,_=f.g.offsetWidth,y=m.g.offsetWidth,o()),l=setTimeout(t,50)}}(),s(u,function(t){g=t,o()}),r(u,d(n,'"'+n.family+'",sans-serif')),s(f,function(t){_=t,o()}),r(f,d(n,'"'+n.family+'",serif')),s(m,function(t){y=t,o()}),r(m,d(n,'"'+n.family+'",monospace'))},document.body?m():document.addEventListener?document.addEventListener("DOMContentLoaded",function t(){document.removeEventListener("DOMContentLoaded",t),m()}):document.attachEvent("onreadystatechange",function t(){("interactive"==document.readyState||"complete"==document.readyState)&&(document.detachEvent("onreadystatechange",t),m())})})},hV=n}();/*!
 * CSSPlugin 3.12.2
 * https://greensock.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*//* eslint-disable */var hW,hX,h$,hY,hq,hK,hZ,hQ,hJ,h0,h1,h2,h3,h4,h5,h6,h8,h7,h9,lt,le,lr,li,ls,ln,la,lo,lh,ll,lu,ld,lc,lp,lf,lm,lg=(p("2Tywo"),p("2Tywo")),l_={},ly=180/Math.PI,lv=Math.PI/180,lx=Math.atan2,lb=/([A-Z])/g,lT=/(left|right|width|margin|padding|x)/i,lE=/[\s,\(]\S/,lA={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},lw=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},lS=function(t,e){return e.set(e.t,e.p,1===t?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},lR=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},lI=function(t,e){var r=e.s+e.c*t;e.set(e.t,e.p,~~(r+(r<0?-.5:.5))+e.u,e)},lC=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},lM=function(t,e){return e.set(e.t,e.p,1!==t?e.b:e.e,e)},lP=function(t,e,r){return t.style[e]=r},lD=function(t,e,r){return t.style.setProperty(e,r)},lO=function(t,e,r){return t._gsap[e]=r},lB=function(t,e,r){return t._gsap.scaleX=t._gsap.scaleY=r},lF=function(t,e,r,i,s){var n=t._gsap;n.scaleX=n.scaleY=r,n.renderTransform(s,n)},lN=function(t,e,r,i,s){var n=t._gsap;n[e]=r,n.renderTransform(s,n)},lL="transform",lk=lL+"Origin",lU=function t(e,r){var i=this,s=this.target,n=s.style;if(e in l_&&n){if(this.tfm=this.tfm||{},"transform"===e)return lA.transform.split(",").forEach(function(e){return t.call(i,e,r)});if(~(e=lA[e]||e).indexOf(",")?e.split(",").forEach(function(t){return i.tfm[t]=l3(s,t)}):this.tfm[e]=s._gsap.x?s._gsap[e]:l3(s,e),this.props.indexOf(lL)>=0)return;s._gsap.svg&&(this.svgo=s.getAttribute("data-svg-origin"),this.props.push(lk,r,"")),e=lL}(n||r)&&this.props.push(e,r,n[e])},lG=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},lH=function(){var t,e,r=this.props,i=this.target,s=i.style,n=i._gsap;for(t=0;t<r.length;t+=3)r[t+1]?i[r[t]]=r[t+2]:r[t+2]?s[r[t]]=r[t+2]:s.removeProperty("--"===r[t].substr(0,2)?r[t]:r[t].replace(lb,"-$1").toLowerCase());if(this.tfm){for(e in this.tfm)n[e]=this.tfm[e];n.svg&&(n.renderTransform(),i.setAttribute("data-svg-origin",this.svgo||"")),(t=lf())&&t.isStart||s[lL]||(lG(s),n.uncache=1)}},lj=function(t,e){var r={target:t,props:[],revert:lH,save:lU};return t._gsap||(0,lg.gsap).core.getCache(t),e&&e.split(",").forEach(function(t){return r.save(t)}),r},lz=function(t,e){var r=ll.createElementNS?ll.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):ll.createElement(t);//some servers swap in https for http in the namespace which can break things, making "style" inaccessible.
return r.style?r:ll.createElement(t);//some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
},lV=function t(e,r,i){var s=getComputedStyle(e);return s[r]||s.getPropertyValue(r.replace(lb,"-$1").toLowerCase())||s.getPropertyValue(r)||!i&&t(e,lX(r)||r,1)||"";//css variables may not need caps swapped out for dashes and lowercase.
},lW="O,Moz,ms,Ms,Webkit".split(","),lX=function(t,e,r){var i=(e||lc).style,s=5;if(t in i&&!r)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);s--&&!(lW[s]+t in i););return s<0?null:(3===s?"ms":s>=0?lW[s]:"")+t},l$=function(){"undefined"!=typeof window&&window.document&&(lu=(ll=window.document).documentElement,lc=lz("div")||{style:{}},lz("div"),lk=(lL=lX(lL))+"Origin",lc.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",lm=!!lX("perspective"),lf=lg.gsap.core.reverting,ld=1)},lY=function t(e){//works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
var r,i=lz("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),s=this.parentNode,n=this.nextSibling,a=this.style.cssText;if(lu.appendChild(i),i.appendChild(this),this.style.display="block",e)try{r=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=t}catch(t){}else this._gsapBBox&&(r=this._gsapBBox());return s&&(n?s.insertBefore(this,n):s.appendChild(this)),lu.removeChild(i),this.style.cssText=a,r},lq=function(t,e){for(var r=e.length;r--;)if(t.hasAttribute(e[r]))return t.getAttribute(e[r])},lK=function(t){var e;try{e=t.getBBox();//Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
}catch(r){e=lY.call(t,!0)}return e&&(e.width||e.height)||t.getBBox===lY||(e=lY.call(t,!0)),!e||e.width||e.x||e.y?e:{x:+lq(t,["x","cx","x1"])||0,y:+lq(t,["y","cy","y1"])||0,width:0,height:0}},lZ=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&lK(t))},lQ=function(t,e){if(e){var r=t.style;e in l_&&e!==lk&&(e=lL),r.removeProperty?(("ms"===e.substr(0,2)||"webkit"===e.substr(0,6))&&(e="-"+e),r.removeProperty(e.replace(lb,"-$1").toLowerCase())):r.removeAttribute(e)}},lJ=function(t,e,r,i,s,n){var a=new lg.PropTween(t._pt,e,r,0,1,n?lM:lC);return t._pt=a,a.b=i,a.e=s,t._props.push(r),a},l0={deg:1,rad:1,turn:1},l1={grid:1,flex:1},l2=function t(e,r,i,s){var n,a,o,h,l=parseFloat(i)||0,u=(i+"").trim().substr((l+"").length)||"px",d=lc.style,c=lT.test(r),p="svg"===e.tagName.toLowerCase(),f=(p?"client":"offset")+(c?"Width":"Height"),m="px"===s,g="%"===s;return s===u||!l||l0[s]||l0[u]?l:("px"===u||m||(l=t(e,r,i,"px")),h=e.getCTM&&lZ(e),(g||"%"===u)&&(l_[r]||~r.indexOf("adius")))?(n=h?e.getBBox()[c?"width":"height"]:e[f],(0,lg._round)(g?l/n*100:l/100*n)):(d[c?"width":"height"]=100+(m?u:s),a=~r.indexOf("adius")||"em"===s&&e.appendChild&&!p?e:e.parentNode,h&&(a=(e.ownerSVGElement||{}).parentNode),a&&a!==ll&&a.appendChild||(a=ll.body),(o=a._gsap)&&g&&o.width&&c&&o.time===lg._ticker.time&&!o.uncache)?(0,lg._round)(l/o.width*100):((g||"%"===u)&&!l1[lV(a,"display")]&&(d.position=lV(e,"position")),a===e&&(d.position="static"),a.appendChild(lc),n=lc[f],a.removeChild(lc),d.position="absolute",c&&g&&((o=(0,lg._getCache)(a)).time=lg._ticker.time,o.width=a[f]),(0,lg._round)(m?n*l/100:n&&l?100/n*l:0))},l3=function(t,e,r,i){var s;return ld||l$(),e in lA&&"transform"!==e&&~(e=lA[e]).indexOf(",")&&(e=e.split(",")[0]),l_[e]&&"transform"!==e?(s=un(t,i),s="transformOrigin"!==e?s[e]:s.svg?s.origin:ua(lV(t,lk))+" "+s.zOrigin+"px"):(!(s=t.style[e])||"auto"===s||i||~(s+"").indexOf("calc("))&&(s=l7[e]&&l7[e](t,e,r)||lV(t,e)||(0,lg._getProperty)(t,e)||("opacity"===e?1:0)),r&&!~(s+"").trim().indexOf(" ")?l2(t,e,s,r)+r:s},l4=function(t,e,r,i){// note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
if(!r||"none"===r){// some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
var s=lX(e,t,1),n=s&&lV(t,s,1);n&&n!==r?(e=s,r=n):"borderColor"===e&&(r=lV(t,"borderTopColor"));// Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
}var a,o,h,l,u,d,c,p,f,m,g,_=new lg.PropTween(this._pt,t.style,e,0,1,lg._renderComplexString),y=0,v=0;if(_.b=r,_.e=i,r+="","auto"==(i+="")&&(t.style[e]=i,i=lV(t,e)||i,t.style[e]=r),a=[r,i],(0,lg._colorStringFilter)(a),r=a[0],i=a[1],h=r.match(lg._numWithUnitExp)||[],(i.match(lg._numWithUnitExp)||[]).length){for(;o=(0,lg._numWithUnitExp).exec(i);)c=o[0],f=i.substring(y,o.index),u?u=(u+1)%5:("rgba("===f.substr(-5)||"hsla("===f.substr(-5))&&(u=1),c!==(d=h[v++]||"")&&(l=parseFloat(d)||0,g=d.substr((l+"").length),"="===c.charAt(1)&&(c=(0,lg._parseRelative)(l,c)+g),p=parseFloat(c),m=c.substr((p+"").length),y=lg._numWithUnitExp.lastIndex-m.length,m||(//if something like "perspective:300" is passed in and we must add a unit to the end
m=m||lg._config.units[e]||g,y!==i.length||(i+=m,_.e+=m)),g!==m&&(l=l2(t,e,d,m)||0),// these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.
_._pt={_next:_._pt,p:f||1===v?f:",",//note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
s:l,c:p-l,m:u&&u<4||"zIndex"===e?Math.round:0});_.c=y<i.length?i.substring(y,i.length):"";//we use the "c" of the PropTween to store the final part of the string (after the last number)
}else _.r="display"===e&&"none"===i?lM:lC;return(0,lg._relExp).test(i)&&(_.e=0),this._pt=_,_},l5={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},l6=function(t){var e=t.split(" "),r=e[0],i=e[1]||"50%";return("top"===r||"bottom"===r||"left"===i||"right"===i)&&(//the user provided them in the wrong order, so flip them
t=r,r=i,i=t),e[0]=l5[r]||r,e[1]=l5[i]||i,e.join(" ")},l8=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var r,i,s,n=e.t,a=n.style,o=e.u,h=n._gsap;if("all"===o||!0===o)a.cssText="",i=1;else for(s=(o=o.split(",")).length;--s>-1;)l_[r=o[s]]&&(i=1,r="transformOrigin"===r?lk:lL),lQ(n,r);i&&(lQ(n,lL),h&&(h.svg&&n.removeAttribute("transform"),un(n,1),h.uncache=1,lG(a)))}},l7={clearProps:function(t,e,r,i,s){if("isFromStart"!==s.data){var n=t._pt=new lg.PropTween(t._pt,e,r,0,0,l8);return n.u=i,n.pr=-10,n.tween=s,t._props.push(r),1}}},/*
 * --------------------------------------------------------------------------------------
 * TRANSFORMS
 * --------------------------------------------------------------------------------------
 */l9=[1,0,0,1,0,0],ut={},ue=function(t){return"matrix(1, 0, 0, 1, 0, 0)"===t||"none"===t||!t},ur=function(t){var e=lV(t,lL);return ue(e)?l9:e.substr(7).match(lg._numExp).map(lg._round)},ui=function(t,e){var r,i,s,n,a=t._gsap||(0,lg._getCache)(t),o=t.style,h=ur(t);return a.svg&&t.getAttribute("transform")?"1,0,0,1,0,0"===(h=[(s=t.transform.baseVal.consolidate().matrix).a,s.b,s.c,s.d,s.e,s.f]).join(",")?l9:h:(h!==l9||t.offsetParent||t===lu||a.svg||(//note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
//browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
s=o.display,o.display="block",(r=t.parentNode)&&t.offsetParent||(// note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
n=1,i=t.nextElementSibling,lu.appendChild(t)),h=ur(t),s?o.display=s:lQ(t,"display"),n&&(i?r.insertBefore(t,i):r?r.appendChild(t):lu.removeChild(t))),e&&h.length>6?[h[0],h[1],h[4],h[5],h[12],h[13]]:h)},us=function(t,e,r,i,s,n){var a,o,h,l,u=t._gsap,d=s||ui(t,!0),c=u.xOrigin||0,p=u.yOrigin||0,f=u.xOffset||0,m=u.yOffset||0,g=d[0],_=d[1],y=d[2],v=d[3],x=d[4],b=d[5],T=e.split(" "),E=parseFloat(T[0])||0,A=parseFloat(T[1])||0;r?d!==l9&&(o=g*v-_*y)&&(//if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
h=E*(v/o)+A*(-y/o)+(y*b-v*x)/o,l=E*(-_/o)+A*(g/o)-(g*b-_*x)/o,E=h,A=l):(E=(a=lK(t)).x+(~T[0].indexOf("%")?E/100*a.width:E),A=a.y+(~(T[1]||T[0]).indexOf("%")?A/100*a.height:A)),i||!1!==i&&u.smooth?(x=E-c,b=A-p,u.xOffset=f+(x*g+b*y)-x,u.yOffset=m+(x*_+b*v)-b):u.xOffset=u.yOffset=0,u.xOrigin=E,u.yOrigin=A,u.smooth=!!i,u.origin=e,u.originIsAbsolute=!!r,t.style[lk]="0px 0px",n&&(lJ(n,u,"xOrigin",c,E),lJ(n,u,"yOrigin",p,A),lJ(n,u,"xOffset",f,u.xOffset),lJ(n,u,"yOffset",m,u.yOffset)),t.setAttribute("data-svg-origin",E+" "+A)},un=function(t,e){var r=t._gsap||new lg.GSCache(t);if("x"in r&&!e&&!r.uncache)return r;var i,s,n,a,o,h,l,u,d,c,p,f,m,g,_,y,v,x,b,T,E,A,w,S,R,I,C,M,P,D,O,B,F=t.style,N=r.scaleX<0,L=getComputedStyle(t),k=lV(t,lk)||"0";return i=s=n=h=l=u=d=c=p=0,a=o=1,r.svg=!!(t.getCTM&&lZ(t)),L.translate&&(("none"!==L.translate||"none"!==L.scale||"none"!==L.rotate)&&(F[lL]=("none"!==L.translate?"translate3d("+(L.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+("none"!==L.rotate?"rotate("+L.rotate+") ":"")+("none"!==L.scale?"scale("+L.scale.split(" ").join(",")+") ":"")+("none"!==L[lL]?L[lL]:"")),F.scale=F.rotate=F.translate="none"),g=ui(t,r.svg),r.svg&&(r.uncache?(// if cache.uncache is true (and maybe if origin is 0,0), we need to set element.style.transformOrigin = (cache.xOrigin - bbox.x) + "px " + (cache.yOrigin - bbox.y) + "px". Previously we let the data-svg-origin stay instead, but when introducing revert(), it complicated things.
R=t.getBBox(),k=r.xOrigin-R.x+"px "+(r.yOrigin-R.y)+"px",S=""):S=!e&&t.getAttribute("data-svg-origin"),us(t,S||k,!!S||r.originIsAbsolute,!1!==r.smooth,g)),f=r.xOrigin||0,m=r.yOrigin||0,g!==l9&&(x=g[0],b=g[1],T=g[2],E=g[3],i=A=g[4],s=w=g[5],6===g.length?(a=Math.sqrt(x*x+b*b),o=Math.sqrt(E*E+T*T),h=x||b?lx(b,x)*ly:0,(d=T||E?lx(T,E)*ly+h:0)&&(o*=Math.abs(Math.cos(d*lv))),r.svg&&(i-=f-(f*x+m*T),s-=m-(f*b+m*E))):(B=g[6],D=g[7],C=g[8],M=g[9],P=g[10],O=g[11],i=g[12],s=g[13],n=g[14],l=(_=lx(B,P))*ly,_&&(S=A*(y=Math.cos(-_))+C*(v=Math.sin(-_)),R=w*y+M*v,I=B*y+P*v,C=-(A*v)+C*y,M=-(w*v)+M*y,P=-(B*v)+P*y,O=-(D*v)+O*y,A=S,w=R,B=I),u=(_=lx(-T,P))*ly,_&&(S=x*(y=Math.cos(-_))-C*(v=Math.sin(-_)),R=b*y-M*v,I=T*y-P*v,O=E*v+O*y,x=S,b=R,T=I),h=(_=lx(b,x))*ly,_&&(S=x*(y=Math.cos(_))+b*(v=Math.sin(_)),R=A*y+w*v,b=b*y-x*v,w=w*y-A*v,x=S,A=R),l&&Math.abs(l)+Math.abs(h)>359.9&&(//when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
l=h=0,u=180-u),a=(0,lg._round)(Math.sqrt(x*x+b*b+T*T)),o=(0,lg._round)(Math.sqrt(w*w+B*B)),d=Math.abs(_=lx(A,w))>2e-4?_*ly:0,p=O?1/(O<0?-O:O):0),r.svg&&(//sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
S=t.getAttribute("transform"),r.forceCSS=t.setAttribute("transform","")||!ue(lV(t,lL)),S&&t.setAttribute("transform",S))),Math.abs(d)>90&&270>Math.abs(d)&&(N?(a*=-1,d+=h<=0?180:-180,h+=h<=0?180:-180):(o*=-1,d+=d<=0?180:-180)),e=e||r.uncache,r.x=i-((r.xPercent=i&&(!e&&r.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-i)?-50:0)))?t.offsetWidth*r.xPercent/100:0)+"px",r.y=s-((r.yPercent=s&&(!e&&r.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-s)?-50:0)))?t.offsetHeight*r.yPercent/100:0)+"px",r.z=n+"px",r.scaleX=(0,lg._round)(a),r.scaleY=(0,lg._round)(o),r.rotation=(0,lg._round)(h)+"deg",r.rotationX=(0,lg._round)(l)+"deg",r.rotationY=(0,lg._round)(u)+"deg",r.skewX=d+"deg",r.skewY=c+"deg",r.transformPerspective=p+"px",(r.zOrigin=parseFloat(k.split(" ")[2])||0)&&(F[lk]=ua(k)),r.xOffset=r.yOffset=0,r.force3D=lg._config.force3D,r.renderTransform=r.svg?ud:lm?uu:uh,r.uncache=0,r},ua=function(t){return(t=t.split(" "))[0]+" "+t[1]},uo=function(t,e,r){var i=(0,lg.getUnit)(e);return(0,lg._round)(parseFloat(e)+parseFloat(l2(t,"x",r+"px",i)))+i},uh=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,uu(t,e)},ul="0deg",uu=function(t,e){var r=e||this,i=r.xPercent,s=r.yPercent,n=r.x,a=r.y,o=r.z,h=r.rotation,l=r.rotationY,u=r.rotationX,d=r.skewX,c=r.skewY,p=r.scaleX,f=r.scaleY,m=r.transformPerspective,g=r.force3D,_=r.target,y=r.zOrigin,v="",x="auto"===g&&t&&1!==t||!0===g;// Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)
if(y&&(u!==ul||l!==ul)){var b,T=parseFloat(l)*lv,E=Math.sin(T),A=Math.cos(T);n=uo(_,n,-(E*(b=Math.cos(T=parseFloat(u)*lv))*y)),a=uo(_,a,-(-Math.sin(T)*y)),o=uo(_,o,-(A*b*y)+y)}"0px"!==m&&(v+="perspective("+m+") "),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(x||"0px"!==n||"0px"!==a||"0px"!==o)&&(v+="0px"!==o||x?"translate3d("+n+", "+a+", "+o+") ":"translate("+n+", "+a+") "),h!==ul&&(v+="rotate("+h+") "),l!==ul&&(v+="rotateY("+l+") "),u!==ul&&(v+="rotateX("+u+") "),(d!==ul||c!==ul)&&(v+="skew("+d+", "+c+") "),(1!==p||1!==f)&&(v+="scale("+p+", "+f+") "),_.style[lL]=v||"translate(0, 0)"},ud=function(t,e){var r,i,s,n,a,o=e||this,h=o.xPercent,l=o.yPercent,u=o.x,d=o.y,c=o.rotation,p=o.skewX,f=o.skewY,m=o.scaleX,g=o.scaleY,_=o.target,y=o.xOrigin,v=o.yOrigin,x=o.xOffset,b=o.yOffset,T=o.forceCSS,E=parseFloat(u),A=parseFloat(d);c=parseFloat(c),p=parseFloat(p),(f=parseFloat(f))&&(p+=//for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
f=parseFloat(f),c+=f),c||p?(c*=lv,p*=lv,r=Math.cos(c)*m,i=Math.sin(c)*m,s=-(Math.sin(c-p)*g),n=Math.cos(c-p)*g,p&&(f*=lv,s*=a=Math.sqrt(1+(a=Math.tan(p-f))*a),n*=a,f&&(r*=a=Math.sqrt(1+(a=Math.tan(f))*a),i*=a)),r=(0,lg._round)(r),i=(0,lg._round)(i),s=(0,lg._round)(s),n=(0,lg._round)(n)):(r=m,n=g,i=s=0),(E&&!~(u+"").indexOf("px")||A&&!~(d+"").indexOf("px"))&&(E=l2(_,"x",u,"px"),A=l2(_,"y",d,"px")),(y||v||x||b)&&(E=(0,lg._round)(E+y-(y*r+v*s)+x),A=(0,lg._round)(A+v-(y*i+v*n)+b)),(h||l)&&(//The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
a=_.getBBox(),E=(0,lg._round)(E+h/100*a.width),A=(0,lg._round)(A+l/100*a.height)),a="matrix("+r+","+i+","+s+","+n+","+E+","+A+")",_.setAttribute("transform",a),T&&(_.style[lL]=a)},uc=function(t,e,r,i,s){var n,a,o=(0,lg._isString)(s),h=parseFloat(s)*(o&&~s.indexOf("rad")?ly:1)-i,l=i+h+"deg";return o&&("short"===(n=s.split("_")[1])&&(h%=360)!=h%180&&(h+=h<0?360:-360),"cw"===n&&h<0?h=(h+36e9)%360-360*~~(h/360):"ccw"===n&&h>0&&(h=(h-36e9)%360-360*~~(h/360))),t._pt=a=new lg.PropTween(t._pt,e,r,i,h,lS),a.e=l,a.u="deg",t._props.push(r),a},up=function(t,e){// Internet Explorer doesn't have Object.assign(), so we recreate it here.
for(var r in e)t[r]=e[r];return t},uf=function(t,e,r){//for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
var i,s,n,a,o,h,l,u=up({},r._gsap),d=r.style;for(s in u.svg?(n=r.getAttribute("transform"),r.setAttribute("transform",""),d[lL]=e,i=un(r,1),lQ(r,lL),r.setAttribute("transform",n)):(n=getComputedStyle(r)[lL],d[lL]=e,i=un(r,1),d[lL]=n),l_)(n=u[s])!==(a=i[s])&&0>"perspective,force3D,transformOrigin,svgOrigin".indexOf(s)&&(o=(0,lg.getUnit)(n)!==(l=(0,lg.getUnit)(a))?l2(r,s,n,l):parseFloat(n),h=parseFloat(a),t._pt=new lg.PropTween(t._pt,i,s,o,h-o,lw),t._pt.u=l||0,t._props.push(s));up(i,u)};(0,lg._forEachName)("padding,margin,Width,Radius",function(t,e){var r="Right",i="Bottom",s="Left",n=(e<3?["Top",r,i,s]:["Top"+s,"Top"+r,i+r,i+s]).map(function(r){return e<2?t+r:"border"+r+t});l7[e>1?"border"+t:t]=function(t,e,r,i,s){var a,o;if(arguments.length<4)return 5===(o=// getter, passed target, property, and unit (from _get())
(a=n.map(function(e){return l3(t,e,r)})).join(" ")).split(a[0]).length?a[0]:o;a=(i+"").split(" "),o={},n.forEach(function(t,e){return o[t]=a[e]=a[e]||a[(e-1)/2|0]}),t.init(e,o,s)}});var um={name:"css",register:l$,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,r,i,s){var n,a,o,h,l,u,d,c,p,f,m,g,_,y,v,x,b=this._props,T=t.style,E=r.vars.startAt;for(d in ld||l$(),this.styles=this.styles||lj(t),x=this.styles.props,this.tween=r,e)if("autoRound"!==d&&(a=e[d],!(lg._plugins[d]&&(0,lg._checkPlugin)(d,e,r,i,t,s)))){if(l=typeof a,u=l7[d],"function"===l&&(l=typeof(a=a.call(r,i,t,s))),"string"===l&&~a.indexOf("random(")&&(a=(0,lg._replaceRandom)(a)),u)u(this,t,d,a,r)&&(v=1);else if("--"===d.substr(0,2))//CSS variable
n=(getComputedStyle(t).getPropertyValue(d)+"").trim(),a+="",lg._colorExp.lastIndex=0,(0,lg._colorExp).test(n)||(// colors don't have units
c=(0,lg.getUnit)(n),p=(0,lg.getUnit)(a)),p?c!==p&&(n=l2(t,d,n,p)+p):c&&(a+=c),this.add(T,"setProperty",n,a,i,s,0,0,d),b.push(d),x.push(d,0,T[d]);else if("undefined"!==l){if(E&&d in E?(// in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
n="function"==typeof E[d]?E[d].call(r,i,t,s):E[d],(0,lg._isString)(n)&&~n.indexOf("random(")&&(n=(0,lg._replaceRandom)(n)),(0,lg.getUnit)(n+"")||(n+=lg._config.units[d]||(0,lg.getUnit)(l3(t,d))||""),"="===(n+"").charAt(1)&&(n=l3(t,d))):n=l3(t,d),h=parseFloat(n),(f="string"===l&&"="===a.charAt(1)&&a.substr(0,2))&&(a=a.substr(2)),o=parseFloat(a),d in lA&&("autoAlpha"===d&&(1===h&&"hidden"===l3(t,"visibility")&&o&&(h=0),x.push("visibility",0,T.visibility),lJ(this,T,"visibility",h?"inherit":"hidden",o?"inherit":"hidden",!o)),"scale"!==d&&"transform"!==d&&~(d=lA[d]).indexOf(",")&&(d=d.split(",")[0])),m=d in l_){if(this.styles.save(d),g||((_=t._gsap).renderTransform&&!e.parseTransform||un(t,e.parseTransform),y=!1!==e.smoothOrigin&&_.smooth,(g=this._pt=new lg.PropTween(this._pt,T,lL,0,1,_.renderTransform,_,0,-1)).dep=1),"scale"===d)this._pt=new lg.PropTween(this._pt,_,"scaleY",_.scaleY,(f?(0,lg._parseRelative)(_.scaleY,f+o):o)-_.scaleY||0,lw),this._pt.u=0,b.push("scaleY",d),d+="X";else if("transformOrigin"===d){x.push(lk,0,T[lk]),a=l6(a),_.svg?us(t,a,0,y,0,this):((p=parseFloat(a.split(" ")[2])||0)!==_.zOrigin&&lJ(this,_,"zOrigin",_.zOrigin,p),lJ(this,T,d,ua(n),ua(a)));continue}else if("svgOrigin"===d){us(t,a,1,y,0,this);continue}else if(d in ut){uc(this,_,d,h,f?(0,lg._parseRelative)(h,f+a):a);continue}else if("smoothOrigin"===d){lJ(this,_,"smooth",_.smooth,a);continue}else if("force3D"===d){_[d]=a;continue}else if("transform"===d){uf(this,a,t);continue}}else d in T||(d=lX(d)||d);if(m||(o||0===o)&&(h||0===h)&&!lE.test(a)&&d in T)c=(n+"").substr((h+"").length),o||(o=0),p=(0,lg.getUnit)(a)||(d in lg._config.units?lg._config.units[d]:c),c!==p&&(h=l2(t,d,n,p)),this._pt=new lg.PropTween(this._pt,m?_:T,d,h,(f?(0,lg._parseRelative)(h,f+o):o)-h,m||"px"!==p&&"zIndex"!==d||!1===e.autoRound?lw:lI),this._pt.u=p||0,c!==p&&"%"!==p&&(//when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
this._pt.b=n,this._pt.r=lR);else if(d in T)l4.call(this,t,d,n,f?f+a:a);else if(d in t)this.add(t,d,n||t[d],f?f+a:a,i,s);else if("parseTransform"!==d){(0,lg._missingPlugin)(d,a);continue}m||(d in T?x.push(d,0,T[d]):x.push(d,1,n||t[d])),b.push(d)}}v&&(0,lg._sortPropTweensByPriority)(this)},render:function(t,e){if(e.tween._time||!lf())for(var r=e._pt;r;)r.r(t,r.d),r=r._next;else e.styles.revert()},get:l3,aliases:lA,getSetter:function(t,e,r){//returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
var i=lA[e];return i&&0>i.indexOf(",")&&(e=i),e in l_&&e!==lk&&(t._gsap.x||l3(t,"x"))?r&&lp===r?"scale"===e?lB:lO:(lp=r||{},"scale"===e?lF:lN):t.style&&!(0,lg._isUndefined)(t.style[e])?lP:~e.indexOf("-")?lD:(0,lg._getSetter)(t,e)},core:{_removeProperty:lQ,_getMatrix:ui}};lg.gsap.utils.checkPrefix=lX,lg.gsap.core.getStyleSaver=lj,u_="x,y,z,scale,scaleX,scaleY,xPercent,yPercent",uy="rotation,rotationX,rotationY,skewX,skewY",uv=(0,lg._forEachName)(u_+","+uy+",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",function(t){l_[t]=1}),(0,lg._forEachName)(uy,function(t){lg._config.units[t]="deg",ut[t]=1}),lA[uv[13]]=u_+","+uy,(0,lg._forEachName)("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",function(t){var e=t.split(":");lA[e[1]]=uv[e[0]]}),(0,lg._forEachName)("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(t){lg._config.units[t]="px"}),(0,lg.gsap).registerPlugin(um);var ug=(0,lg.gsap).registerPlugin(um)||lg.gsap;ug.core.Tween;/*!
 * PixiPlugin 3.12.2
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*//* eslint-disable */var u_,uy,uv,ux,ub,uT,uE,uA,uw,uS,uR,uI,uC=function(){return"undefined"!=typeof window},uM=function(){return ux||uC()&&(ux=window.gsap)&&ux.registerPlugin&&ux},uP=function(t){return"function"==typeof t},uD=function(t){return console.warn(t)},uO=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],uB=function(t){return uP(uE[t])?uE[t]:uE.filters[t]},uF=function(t,e){var r,i,s=[],n=0,a=0;for(r=0;r<4;r++){for(i=0;i<5;i++)a=4===i?t[n+4]:0,s[n+i]=t[n]*e[i]+t[n+1]*e[i+5]+t[n+2]*e[i+10]+t[n+3]*e[i+15]+a;n+=5}return s},uN=function(t,e){var r=1-e,i=.212671*r,s=.71516*r,n=.072169*r;return uF([i+e,s,n,0,0,i,s+e,n,0,0,i,s,n+e,0,0,0,0,0,1,0],t)},uL=function(t,e,r){var i=uT(e),s=i[0]/255,n=i[1]/255,a=i[2]/255,o=1-r;return uF([o+r*s*.212671,r*s*.71516,r*s*.072169,0,0,r*n*.212671,o+r*n*.71516,r*n*.072169,0,0,r*a*.212671,r*a*.71516,o+r*a*.072169,0,0,0,0,0,1,0],t)},uk=function(t,e){var r=Math.cos(e*=Math.PI/180),i=Math.sin(e);return uF([.212671+.787329*r+-(.212671*i),.71516+-(.71516*r)+-(.71516*i),.072169+-(.072169*r)+.927831*i,0,0,.212671+-(.212671*r)+.143*i,.71516+.28484*r+.14*i,.072169+-(.072169*r)+-.283*i,0,0,.212671+-(.212671*r)+-(.787329*i),.71516+-(.71516*r)+.71516*i,.072169+.927831*r+.072169*i,0,0,0,0,0,1,0,0,0,0,0,1],t)},uU=function(t,e){return uF([e,0,0,0,.5*(1-e),0,e,0,0,.5*(1-e),0,0,e,0,.5*(1-e),0,0,0,1,0],t)},uG=function(t,e){var r,i=uB(e),s=t.filters||[],n=s.length;for(i||uD(e+" not found. PixiPlugin.registerPIXI(PIXI)");--n>-1;)if(s[n]instanceof i)return s[n];return r=new i,"BlurFilter"===e&&(r.blur=0),s.push(r),t.filters=s,r},uH=function(t,e,r,i){//we cache the ColorMatrixFilter components in a _gsColorMatrixFilter object attached to the target object so that it's easy to grab the current value at any time.
e.add(r,t,r[t],i[t]),e._props.push(t)},uj=function(t,e){var r=new(uB("ColorMatrixFilter"));return r.matrix=e,r.brightness(t,!0),r.matrix},uz=function(t){var e,r={};for(e in t)r[e]=t[e];return r},uV={contrast:1,saturation:1,colorizeAmount:0,colorize:"rgb(255,255,255)",hue:0,brightness:1},uW=function(t,e,r){var i,s,n,a=uG(t,"ColorMatrixFilter"),o=t._gsColorMatrixFilter=t._gsColorMatrixFilter||uz(uV),h=e.combineCMF&&!("colorMatrixFilter"in e&&!e.colorMatrixFilter);for(n=a.matrix,e.resolution&&(a.resolution=e.resolution),e.matrix&&e.matrix.length===n.length?(s=e.matrix,1!==o.contrast&&uH("contrast",r,o,uV),o.hue&&uH("hue",r,o,uV),1!==o.brightness&&uH("brightness",r,o,uV),o.colorizeAmount&&(uH("colorize",r,o,uV),uH("colorizeAmount",r,o,uV)),1!==o.saturation&&uH("saturation",r,o,uV)):(s=uO.slice(),null!=e.contrast?(s=uU(s,+e.contrast),uH("contrast",r,o,e)):1!==o.contrast&&(h?s=uU(s,o.contrast):uH("contrast",r,o,uV)),null!=e.hue?(s=uk(s,+e.hue),uH("hue",r,o,e)):o.hue&&(h?s=uk(s,o.hue):uH("hue",r,o,uV)),null!=e.brightness?(s=uj(+e.brightness,s),uH("brightness",r,o,e)):1!==o.brightness&&(h?s=uj(o.brightness,s):uH("brightness",r,o,uV)),null!=e.colorize?(e.colorizeAmount=("colorizeAmount"in e)?+e.colorizeAmount:1,s=uL(s,e.colorize,e.colorizeAmount),uH("colorize",r,o,e),uH("colorizeAmount",r,o,e)):o.colorizeAmount&&(h?s=uL(s,o.colorize,o.colorizeAmount):(uH("colorize",r,o,uV),uH("colorizeAmount",r,o,uV))),null!=e.saturation?(s=uN(s,+e.saturation),uH("saturation",r,o,e)):1!==o.saturation&&(h?s=uN(s,o.saturation):uH("saturation",r,o,uV))),i=s.length;--i>-1;)s[i]!==n[i]&&r.add(n,i,n[i],s[i],"colorMatrixFilter");r._props.push("colorMatrixFilter")},uX=function(t,e){var r=e.t,i=e.p,s=e.color;(0,e.set)(r,i,s[0]<<16|s[1]<<8|s[2])},u$=function(t,e){var r=e.g;r&&(//in order for PixiJS to actually redraw GraphicsData, we've gotta increment the "dirty" and "clearDirty" values. If we don't do this, the values will be tween properly, but not rendered.
r.dirty++,r.clearDirty++)},uY=function(t,e){e.t.visible=!!e.t.alpha},uq=function(t,e,r,i){var s=t[e],n=uT(uP(s)?t[e.indexOf("set")||!uP(t["get"+e.substr(3)])?e:"get"+e.substr(3)]():s),a=uT(r);i._pt=new uA(i._pt,t,e,0,0,uX,{t:t,p:e,color:n,set:uw(t,e)}),i.add(n,0,n[0],a[0]),i.add(n,1,n[1],a[1]),i.add(n,2,n[2],a[2])},uK={tint:1,lineColor:1,fillColor:1},uZ="position,scale,skew,pivot,anchor,tilePosition,tileScale".split(","),uQ={x:"position",y:"position",tileX:"tilePosition",tileY:"tilePosition"},uJ={colorMatrixFilter:1,saturation:1,contrast:1,hue:1,colorize:1,colorizeAmount:1,brightness:1,combineCMF:1},u0=Math.PI/180,u1=function(t){return"string"==typeof t},u2=function(t,e){return e.set(e.t,e.p,1===t?e.e:Math.round((e.s+e.c*t)*1e5)/1e5,e)},u3=function(t,e,r,i,s,n){var a,o,h=360*(n?u0:1),l=u1(s),u=l&&"="===s.charAt(1)?+(s.charAt(0)+"1"):0,d=parseFloat(u?s.substr(2):s)*(n?u0:1),c=u?d*u:d-i,p=i+c;return l&&("short"===(a=s.split("_")[1])&&(c%=h)!=c%(h/2)&&(c+=c<0?h:-h),"cw"===a&&c<0?c=(c+1e10*h)%h-~~(c/h)*h:"ccw"===a&&c>0&&(c=(c-1e10*h)%h-~~(c/h)*h)),t._pt=o=new uA(t._pt,e,r,i,c,u2),o.e=p,o},u4=function(){uC()&&(ub=window,ux=uM(),uS=(uE=uE||ub.PIXI)&&uE.VERSION&&"4"===uE.VERSION.charAt(0),uT=function(t){return ux.utils.splitColor("0x"===(t+"").substr(0,2)?"#"+t.substr(2):t)})};//context setup...
for(uR=0;uR<uZ.length;uR++)uQ[(uI=uZ[uR])+"X"]=uI,uQ[uI+"Y"]=uI;var u5={version:"3.12.2",name:"pixi",register:function(t,Plugin,e){ux=t,uA=e,uw=Plugin.getSetter,u4()},registerPIXI:function(t){uE=t},init:function(t,e,r,i,s){var n,a,o,h,l,u,d,c,p;if(uE||u4(),!uE||!(t instanceof uE.DisplayObject))return uD(t,"is not a DisplayObject or PIXI was not found. PixiPlugin.registerPIXI(PIXI);"),!1;for(u in e){if(n=uQ[u],o=e[u],n)a=~u.charAt(u.length-1).toLowerCase().indexOf("x")?"x":"y",this.add(t[n],a,t[n][a],"skew"===n?u1(o)&&"="===o.charAt(1)?o.substr(0,2)+parseFloat(o.substr(2))*u0:o*u0:o,0,0,0,0,0,1);else if("scale"===u||"anchor"===u||"pivot"===u||"tileScale"===u)this.add(t[u],"x",t[u].x,o),this.add(t[u],"y",t[u].y,o);else if("rotation"===u||"angle"===u)u3(this,t,u,t[u],o,"rotation"===u);else if(uJ[u])h||(uW(t,e.colorMatrixFilter||e,this),h=!0);else if("blur"===u||"blurX"===u||"blurY"===u||"blurPadding"===u){if(l=uG(t,"BlurFilter"),this.add(l,u,l[u],o),0!==e.blurPadding)for(d=e.blurPadding||2*Math.max(l[u],o),c=t.filters.length;--c>-1;)t.filters[c].padding=Math.max(t.filters[c].padding,d);//if we don't expand the padding on all the filters, it can look clipped.
}else if(uK[u]){if(("lineColor"===u||"fillColor"===u)&&t instanceof uE.Graphics)for(p=(t.geometry||t).graphicsData,this._pt=new uA(this._pt,t,u,0,0,u$,{g:t.geometry||t}),c=p.length;--c>-1;)uq(uS?p[c]:p[c][u.substr(0,4)+"Style"],uS?u:"color",o,this);else uq(t,u,o,this)}else"autoAlpha"===u?(this._pt=new uA(this._pt,t,"visible",0,0,uY),this.add(t,"alpha",t.alpha,o),this._props.push("alpha","visible")):"resolution"!==u&&this.add(t,u,"get",o);this._props.push(u)}}};uM()&&ux.registerPlugin(u5);var u6={};u6={"corporate-mincho":{}};class u8{get(t){return new oW({dropShadow:!0,dropShadowAlpha:.8,dropShadowAngle:0,dropShadowBlur:10,dropShadowDistance:0,fill:["#ffffff"],fillGradientType:1,fillGradientStops:[0],lineJoin:"round",miterLimit:6,padding:10,strokeThickness:4,fontFamily:"corporate-mincho",...t})}getWithColor(t,e){return e={...e,dropShadowColor:t,stroke:t},this.get(e)}}class u7 extends sq{constructor(){return super(),new Proxy(this,{get:function(t,e,r){let i=Object.getOwnPropertyDescriptor(t,e);return i?.value?.bottle?i.value():Reflect.get(t,e,r)},set:function(t,e,r,i){return"object"==typeof r&&null!==r&&r.setView&&r.setView(t),Reflect.set(t,e,r,i)}})}init(){console.log("init view")}initBackground(){this.size&&(this.backgroundSprite=new sJ(this.background._texture),this.backgroundSprite.width=this.size.width,this.backgroundSprite.height=this.size.height,this.backgroundSprite.tint=this.background._tint,this.addChild(this.backgroundSprite))}}class u9{constructor(t,e){this.width=0,this.height=0,this.width=t,this.height=e}}var dt=new class{constructor(){this.map=new Map}setObject(t,e){if("Function"===t.constructor.name)throw Error("Argument is not a object");// console.log('[bottle] set object ' + obj.constructor.name)
this.set(e||t.constructor.name,t)}getObject(t,e){if("string"==typeof t)return this.get(t);if(t&&!t.name)throw Error("Argument is not a class");// console.log('[bottle] get object ' + obj.name)
return this.get(e||t.name)}set(t,e){// console.log('[bottle] set ' + key);
this.map.set(t,e)}get(t){// console.log('[bottle] get ' + key);
if(!this.map.has(t))throw Error(`Could not find ${t}`);return this.map.get(t)}inject(t){let e=()=>this.getObject(t);return e.bottle=!0,e}singleton(t,e){let{key:r,args:i=[]}=e||{};if(!t.name)throw Error("Argument is not a class");if(this.map.has(r||t.name))return this.get(r||t.name);// @ts-ignore
let s=new t(...i);return s.initBottle&&s.initBottle(),// console.log('[bottle] set singleton ' + obj.constructor.name);
this.set(r||t.name,s),s}};class de{set texture(t){this._texture=t,this.render()}set tint(t){this._tint=t,this.render()}constructor(t,e){this._texture=iv.WHITE,this._tint=16777215,this._texture=t,this._tint=e}setView(t){this.view=t,this.sprite&&this.view!==t&&this.view.removeChild(this.sprite),this.render()}render(){this.view.size&&(this.sprite||(this.sprite=new sJ(this._texture),this.view.addChild(this.sprite)),this.sprite.width=this.view.size.width,this.sprite.height=this.view.size.height,this.sprite.tint=this._tint)}}class dr{constructor(){}init(){}}class di extends dr{constructor(...t){super(...t),this.pages=[]}}var ds=new ta.EventEmitter;const dn="EVENT_NEXT_PAGE";class da extends u7{constructor(){super(),this.bookModel=dt.inject(di),this.textStyle=dt.inject(u8)}setAssets(t){this.title=new oK(t,this.textStyle.getWithColor(this.bookModel.fontColor,{fontSize:70})),this.title.x=(this.width-this.title.width)/2,this.title.y=180,this.title.alpha=1,this.addChild(this.title),this.nextBtn=new oK("次へ",this.textStyle.getWithColor(this.bookModel.fontColor)),this.nextBtn.x=(this.width-this.nextBtn.width)/2,this.nextBtn.y=420,this.nextBtn.alpha=1,this.nextBtn.interactive=!0,this.nextBtn.on("pointerdown",()=>ds.emit(dn)),this.addChild(this.nextBtn)}fadeIn(t){t.to(this,{alpha:1,duration:1})}fadeOut(t){t.to(this,{alpha:0,duration:1})}}const dh="BOTTLE_AUDIO_CONTEXT";class dl{static #t=this.WIDTH=500;static #e=this.HEIGHT=50;static #r=this.GRADIENT_WIDTH=50;get(){if(this.sprite)return this.sprite;let t=document.createElement("canvas");t.width=dl.WIDTH,t.height=dl.HEIGHT;let e=t.getContext("2d");e.fillStyle="white",e.fillRect(0,0,dl.WIDTH-dl.GRADIENT_WIDTH,dl.HEIGHT);let r=e.createLinearGradient(dl.WIDTH-dl.GRADIENT_WIDTH,0,dl.WIDTH,0);r.addColorStop(0,"white"),r.addColorStop(1,"black"),e.fillStyle=r,e.fillRect(dl.GRADIENT_WIDTH,0,dl.WIDTH,dl.HEIGHT);let i=iv.from(t);return this.sprite=new sJ(i),this.sprite}}class du extends u7{constructor(t,e){super(),this.bookModel=dt.inject(di),this.textStyle=dt.inject(u8),this.audioContext=dt.inject(dh),this.text=t,this.voice=e}init(){let t=this.textStyle.getWithColor(this.bookModel.fontColor);this.textSprite=new oK(this.text,t),this.maskSprite=new dl().get(),this.maskSprite.x=-dl.WIDTH,this.maskSprite.y=(this.textSprite.height-this.maskSprite.height)/2,this.textSprite.mask=this.maskSprite,this.addChild(this.maskSprite),this.addChild(this.textSprite)}play(t){console.log(this.textSprite.x+this.textSprite.width-dl.WIDTH+dl.GRADIENT_WIDTH),t.to(this.maskSprite,{x:this.textSprite.x+this.textSprite.width-dl.WIDTH+dl.GRADIENT_WIDTH,duration:this.voice.duration,onStart:async function(t,e){let r=e.createBufferSource();r.buffer=t,r.connect(e.destination),r.start(0)},onStartParams:[this.voice,this.audioContext]})}}class dd extends u7{constructor(t){super(),this.sentenceViews=[],this.articleModel=t}init(){super.init();let t=0;for(let e=0;e<this.articleModel.sentences.length;e++){let r=new du(this.articleModel.sentences[e].text,this.articleModel.sentences[e].voice);r.init(),r.x=0,r.y=t,t+=r.height,this.addChild(r),this.sentenceViews.push(r)}}play(t){for(let e=0;e<this.articleModel.sentences.length;e++)this.sentenceViews[e].play(t)}}class dc extends u7{constructor(){super(),this.bookModel=dt.inject(di),this.textStyle=dt.inject(u8)}async init(){}fadeInIllustration(t){t.to(this.illustration,{alpha:1,duration:1})}fadeInNextBtn(t){t.to(this.nextBtn,{alpha:1,duration:1})}setAssets(t,e){null!=this.illustration&&this.removeChild(this.illustration),null!=this.articleView&&this.removeChild(this.articleView),null!=this.nextBtn&&this.removeChild(this.nextBtn),this.illustration=e,this.illustration.alpha=0,this.illustration.x=(this.width-this.illustration.width)/2,this.illustration.y=230,this.addChild(e),this.articleView=new dd(t),this.articleView.init(),this.articleView.x=50,this.articleView.y=50,this.addChild(this.articleView);let r=this.textStyle.getWithColor(this.bookModel.fontColor);this.nextBtn=new oK("次へ",r),this.nextBtn.x=this.width-this.nextBtn.width-50,this.nextBtn.y=this.height-this.nextBtn.height-20,this.nextBtn.alpha=0,this.nextBtn.interactive=!0,this.nextBtn.on("pointerdown",()=>ds.emit(dn)),this.addChild(this.nextBtn)}play(t,e){this.fadeIn(t),this.fadeInIllustration(t),this.articleView.play(t),e||this.fadeInNextBtn(t)}fadeIn(t){t.to(this,{alpha:1,duration:1})}fadeOut(t){t.to(this,{alpha:0,duration:1})}}class dp extends u7{constructor(){super(),this.bookModel=dt.inject(di)}init(){this.background=new de(iv.WHITE,this.bookModel.backgroundColor),this.coverView=dt.singleton(da),this.coverView.size=new u9(this.size.width,700),this.coverView.background=new de(iv.WHITE,this.bookModel.backgroundColor),this.coverView.y=(this.size.height-700)/2,this.coverView.init(),this.addChild(this.coverView),this.pageView=dt.singleton(dc),this.pageView.size=new u9(this.size.width,700),this.pageView.background=new de(iv.WHITE,this.bookModel.backgroundColor),this.pageView.y=(this.size.height-700)/2,this.pageView.alpha=0,this.pageView.init(),this.addChild(this.pageView);// this.touchSprite = bottle.singleton(TouchSprite);
// this.touchSprite.width = this.width;
// this.touchSprite.height = this.height;
// this.touchSprite.interactive = true;
// this.addChild(this.touchSprite);
// this.touchSprite.setBaseView(this.flickerView);
}}class df extends nF{}class dm{constructor(){}init(){}}class dg{constructor(){return new Proxy(this,{get:function(t,e,r){let i=Object.getOwnPropertyDescriptor(t,e);return i?.value?.bottle?i.value():Reflect.get(t,e,r)}})}}var d_={};d_=JSON.parse('{"version":"1.0","book":{"backgroundColor":"0xffffff","fontColor":" 0x9DCCE0","cover":{"title":"夏祭り"},"pages":[{"article":{"sentences":[{"text":"今日は待ちに待った夏祭り！","voice":"test"},{"text":"色とりどりの浴衣を着た子どもたちが","voice":"test"},{"text":"笑顔いっぱいで会場に向かいます。","voice":"test"}]},"illustration":"illustration1"},{"article":{"sentences":[{"text":"家族みんなでブルーシートを広げて、","voice":"test"},{"text":"最高の場所をゲット！","voice":"test"},{"text":"みんなでワクワクしながら花火を待ちます。","voice":"test"}]},"illustration":"illustration2"},{"article":{"sentences":[{"text":"公園で線香花火を楽しんでいます。","voice":"test"},{"text":"小さな火花がキラキラと舞い上がり、","voice":"test"},{"text":"まるで星が降ってくるみたい！","voice":"test"}]},"illustration":"illustration3"},{"article":{"sentences":[{"text":"伝統的な手筒花火が始まります。","voice":"test"},{"text":"大人たちが勇敢に手筒を持ち上げ、","voice":"test"},{"text":"みんなの心がドキドキ！","voice":"test"}]},"illustration":"illustration4"},{"article":{"sentences":[{"text":"地面に置かれたねずみ花火。","voice":"test"},{"text":"これからどんな動きを見せるのか、","voice":"test"},{"text":"みんなの目がキラキラと輝いています。","voice":"test"}]},"illustration":"illustration5"},{"article":{"sentences":[{"text":"ねずみ花火に火がつけられ、","voice":"test"},{"text":"勢いよく回転しながら火花を散らします。","voice":"test"},{"text":"子どもたちの歓声が夜空に響き渡ります！","voice":"test"}]},"illustration":"illustration6"},{"article":{"sentences":[{"text":"夜空に大きな花火が打ち上がり、","voice":"test"},{"text":"色とりどりの光が広がります。","voice":"test"},{"text":"『わぁー！』とみんなの目が輝いています。","voice":"test"}]},"illustration":"illustration7"},{"article":{"sentences":[{"text":"ゴミを持ち帰るように呼びかける看板。","voice":"test"},{"text":"子どもたちも協力して、","voice":"test"},{"text":"きれいな会場を保ちます。","voice":"test"},{"text":"みんなで楽しい思い出を大切に！","voice":"test"}]},"illustration":"illustration8"}]}}');var dy={},dv={};dv=new URL("illustration1.b4b4fdeb.png",import.meta.url).toString();var dx={};dx=new URL("illustration2.7165c6d5.png",import.meta.url).toString();var db={};db=new URL("illustration3.a8a575e9.png",import.meta.url).toString();var dT={};dT=new URL("illustration4.da4bbfd4.png",import.meta.url).toString();var dE={};dE=new URL("illustration5.1fccfbc4.png",import.meta.url).toString();var dA={};dA=new URL("illustration6.8d89274b.png",import.meta.url).toString();var dw={};dw=new URL("illustration7.93cd4e36.png",import.meta.url).toString();var dS={};dS=new URL("illustration8.643c5df3.png",import.meta.url).toString();dy={illustration1:dv,illustration2:dx,illustration3:db,illustration4:dT,illustration5:dE,illustration6:dA,illustration7:dw,illustration8:dS,img:new URL("img.c11920c4.png",import.meta.url).toString()};var dR={};dR={test:new URL("test.63005f98.wav",import.meta.url).toString()};class dI extends dr{constructor(...t){super(...t),this.sentences=[]}}class dC extends dr{}class dM extends dr{}class dP extends dr{}class dD extends Map{}class dO extends Map{}class dB extends dg{constructor(){super(),this.illustrationResource=dt.inject(dD),this.voiceResource=dt.inject(dO)}async load(){await this.loadVoices(),await this.loadIllustrations(),this.initBook()}async loadVoices(){// @ts-ignore
let t=new(window.AudioContext||window.webkitAudioContext);for(let e in dt.set(dh,t),/*@__PURE__*/l(dR)){if(!/*@__PURE__*/l(dR).hasOwnProperty(e))continue;console.log(e+" -> "+/*@__PURE__*/l(dR)[e]);// @ts-ignore
let r=new URL(/*@__PURE__*/l(dR)[e],"file:///src/app/controller/resource-controller.ts"),i=await fetch(r.href),s=await i.arrayBuffer(),n=await t.decodeAudioData(s);this.voiceResource.set(e,n)}}async loadIllustrations(){for(let t in /*@__PURE__*/l(dy))if(/*@__PURE__*/l(dy).hasOwnProperty(t)){console.log(t+" -> "+/*@__PURE__*/l(dy)[t]);// @ts-ignore
let e=new URL(/*@__PURE__*/l(dy)[t],"file:///src/app/controller/resource-controller.ts"),r=sJ.from(e.href);this.illustrationResource.set(t,r)}}initBook(){this.bookModel=new di,this.bookModel.backgroundColor=parseInt(/*@__PURE__*/l(d_).book.backgroundColor,16),this.bookModel.fontColor=parseInt(/*@__PURE__*/l(d_).book.fontColor,16);let t=new dC;t.title=/*@__PURE__*/l(d_).book.cover.title,this.bookModel.cover=t;for(let t=0;t</*@__PURE__*/l(d_).book.pages.length;t++){let e=new dM;e.illustration=this.illustrationResource.get(/*@__PURE__*/l(d_).book.pages[t].illustration);let r=new dI;for(let e=0;e</*@__PURE__*/l(d_).book.pages[t].article.sentences.length;e++){let i=new dP;i.text=/*@__PURE__*/l(d_).book.pages[t].article.sentences[e].text,i.voice=this.voiceResource.get(/*@__PURE__*/l(d_).book.pages[t].article.sentences[e].voice),r.sentences.push(i)}e.article=r,this.bookModel.pages.push(e)}dt.setObject(this.bookModel)}}class dF extends dg{async main(){this.tl=new ug.core.Timeline,await this.initEvent(),await this.initBook(),this.nextPage()}async initEvent(){ds.on(dn,async()=>{this.nextPage()})}async initBook(){this.pageIdx=-2}nextPage(){if(this.pageIdx++,!(this.pageIdx>=this.bookModel.pages.length)){if(-1===this.pageIdx){this.coverView.setAssets(this.bookModel.cover.title),this.coverView.fadeIn(this.tl);return}0===this.pageIdx?this.coverView.fadeOut(this.tl):this.pageView.fadeOut(this.tl),this.pageView.fadeOut(this.tl),this.pageView.setAssets(this.bookModel.pages[this.pageIdx].article,this.bookModel.pages[this.pageIdx].illustration),this.pageView.fadeIn(this.tl),this.pageView.play(this.tl,this.pageIdx===this.bookModel.pages.length-1)}}constructor(...t){super(...t),this.resourceController=dt.inject(dB),this.bookModel=dt.inject(di),this.coverView=dt.inject(da),this.pageView=dt.inject(dc),this.pageIdx=0}}class dN extends u7{init(){this.background=new de(iv.WHITE,0)}}class dL extends df{constructor(t){super(t),this.initLoading()}async initLoading(){dt.setObject(this.renderer),this.textStyle=dt.singleton(u8),this.voiceResource=dt.singleton(dO),this.illustrateResource=dt.singleton(dD),this.storage=dt.singleton(dm);let t=this.getViewHeight(480);this.loadingView=dt.singleton(dN),this.loadingView.size=new u9(480,t),this.loadingView.init(),this.stage.addChild(this.loadingView),this.resizeView(this.loadingView),this.resourceController=dt.singleton(dB),await this.resourceController.load(),await this.initScene()}async initScene(){let t=this.getViewHeight(480);this.gameView=dt.singleton(dp),this.gameView.size=new u9(480,t),this.gameView.init(),this.stage.addChild(this.gameView),this.resizeView(this.gameView),this.mainController=dt.singleton(dF),await this.mainController.main()}getViewHeight(t){return this.renderer.width>this.renderer.height?900:Math.floor(t*this.renderer.height/this.renderer.width)}resizeView(t){if(this.renderer.width>this.renderer.height){let e=Math.min(this.renderer.width/t.size.width,this.renderer.height/t.size.height)/this.renderer.resolution;t.scale.x=e,t.scale.y=e,t.x=(this.renderer.width-t.size.width*e*this.renderer.resolution)/2/this.renderer.resolution,t.y=(this.renderer.height-t.size.height*e*this.renderer.resolution)/2/this.renderer.resolution}else{let e=this.renderer.width/t.size.width/this.renderer.resolution;t.scale.x=e,t.scale.y=e,t.x=0,t.y=(this.renderer.height-t.size.height*e*this.renderer.resolution)/2/this.renderer.resolution}}}var dk={};dk=JSON.parse('{"name":"flick-quest","version":"1.0.0","description":"","scripts":{"test":"jest","start":"npm run clean && parcel src/index.html","build":"npm run clean && parcel build src/index.html --public-url ./","build_serve":"npm run build && http-server ./dist","clean":"rimraf ./dist ./.cache ./.parcel-cache","deploy":"gh-pages -d dist"},"author":"markkong318","license":"MIT","dependencies":{"@pixi/math":"^7.3.2","fontfaceobserver":"^2.3.0","gsap":"^3.12.2","lodash":"^4.17.21","pixi.js":"^7.3.2","typescript-plugin-css-modules":"^5.0.2"},"devDependencies":{"@parcel/resolver-glob":"^2.12.0","@types/jest":"^29.5.9","babel-preset-es2015":"~6.24.1","gh-pages":"^6.1.0","http-server":"~14.1.1","jest":"~29.7.0","parcel":"^2.12.0","parcel-reporter-static-files-copy":"^1.5.3","punycode":"^1.4.1","querystring-es3":"^0.2.1","rimraf":"~5.0.5","ts-jest":"~29.1.1","typescript":"~5.3.2"}}'),document.title=dk.name,console.log(/*@__PURE__*/l(u6)),(async t=>{for(let e in t)console.log(`loading font: ${e}`),await new/*@__PURE__*/(l(hV))(e).load();window.PIXI=m,m.settings.SCALE_MODE=m.SCALE_MODES.LINEAR,u5.registerPIXI(m),ug.registerPlugin(u5);let e=new dL({width:window.innerWidth,height:window.innerHeight,resizeTo:window,antialias:!0,resolution:window.devicePixelRatio||1,autoDensity:!0});// @ts-ignore
document.body.appendChild(e.view),window.onresize=()=>{// app.renderer.resize(window.innerWidth, window.innerHeight);
// app.resizeView();
},globalThis.__PIXI_APP__=e})(/*@__PURE__*/l(u6));// var font = new FontFaceObserver('jackeyfont')
// font.load()
//   .then(() => {
//     window.PIXI = PIXI;
//
//     PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
//
//     PixiPlugin.registerPIXI(PIXI);
//     gsap.registerPlugin(PixiPlugin);
//
//     const app = new GameApplication({
//       width: window.innerWidth,
//       height: window.innerHeight,
//       resizeTo: window,
//       antialias: true,
//       resolution: window.devicePixelRatio || 1,
//       autoDensity: true,
//     });
//
//     // @ts-ignore
//     document.body.appendChild(app.view);
//
//     window.onresize = () => {
//       // app.renderer.resize(window.innerWidth, window.innerHeight);
//       // app.resizeView();
//     };
//
//     globalThis.__PIXI_APP__ = app;
//   });
//# sourceMappingURL=index.5d85832d.js.map

//# sourceMappingURL=index.5d85832d.js.map
