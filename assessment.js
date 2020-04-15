'use strict'; //厳格モードを使う；宣言後の記述ミスをエラーとして表示してくれる機能を呼び出す
const userNameInput = document.getElementById ('user-name');
const assessmentButton = document.getElementById ('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        //子ども（Child）の要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
if (userName.length === 0) {
    //名前が空欄の時は処理を終了する
    return;
}

    //診断結果表示エリアの作成
    removeAllChildren(resultDivided)
    const header = document.createElement('h3')
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a')
    const hrefValue = 
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('あなたのいいところ') +
        '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);
    //.setAttribute(name=属性の名前を文字列で指定します, value=属性に設定したい値を指定します)
    //→ 指定した要素上に新しい属性を追加、または既存の属性の値を変更します。

    //widgets.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

// Enterキーをテキストフィールド上で押しても診断をしてくれるように改良
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick()
    }
}

const answers = [
    '{userName}のいいところは声です。',
    '{userName}のいいところは眼差しです。',
    '{userName}のいいところは情熱です。',
    '{userName}のいいところは厳しさです。',
    '{userName}のいいところは知識です。', 
    '{userName}のいいところはユニークさです。',
    '{userName}のいいところは用心さです。',
    '{userName}のいいところは見た目です。',
    '{userName}のいいところは決断力です。',
    '{userName}のいいところは思いやりです。',
    '{userName}のいいところは感受性です。',
    '{userName}のいいところは節度です。',
    '{userName}のいいところは好奇心です。',
    '{userName}のいいところは気配りです。',
    '{userName}のいいところはその全てです。',
    '{userName}のいいところは自制心です。',
];

/**　（ここで書いているコメントは JSDoc と呼ばれる形式のコメントの書き方）
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果 Stringは「その箱には文字列を入れていいよ」ということ（？）
 */
function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
        //ここでやっているのは、charCodeAtは添え字がi番目の数字をだす。userNameの１文字目(=添え字は0)から順にsumOfCharCodeに足しこんでいっている。
    }

    //文字のコード番号の合計を回答の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName);
    
    return result;
}
