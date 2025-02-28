window.addEventListener('load', () => {
    const generate = document.querySelector('#generate');
    const download = document.querySelector('#download');
    const toggleBackground = document.querySelector('#toggleBackground');

    const backgroundImages = [
        '1.png',
        '1_3SS.png'
    ]

    backgroundImage = backgroundImages[0]; // 本当は良くないけど頭が悪いのでグローバルスコープで宣言

    main(getStationNameValues('placeholder'));

    generate.addEventListener('click', () => {
        main(getStationNameValues('value'));
    });

    toggleBackground.addEventListener('click', () => {
        const currentBackgroundImageIndex = backgroundImages.indexOf(backgroundImage);
        backgroundImage = backgroundImages[(currentBackgroundImageIndex + 1) % backgroundImages.length];
    });

    download.addEventListener('click', () => {
        const canvas = document.querySelector('#main');
        const a = document.createElement('a');
        a.href = canvas.toDataURL();
        a.download = 'station-name.png';
        a.click();
    });
});

function main(names) {

    const canvas = document.querySelector('#main');
    const background = new Image();

    background.src = backgroundImage;
    background.onload = () => {
        canvas.width = background.width;
        canvas.height = background.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(background, 0, 0);

        ctx.font = 'normal 900 85px "sans-serif"';
        ctx.fillStyle = '#121111';
        ctx.textAlign = 'center';
        ctx.fillText(names.stationNames.main.value, canvas.width / 2, 132);

        ctx.font = 'normal 900 30px "sans-serif"';
        ctx.fillText(names.stationNames.main.hiragana, canvas.width / 2, 186);

        ctx.font = 'normal 900 40px "sans-serif"';
        ctx.fillText(names.stationNames.main.eng, canvas.width / 2, 306);

        ctx.font = 'normal 500 40px "sans-serif"';
        ctx.fillStyle = '#dedfe2';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';
        ctx.fillText(names.stationNames.next.value, 150, 231, 310);

        ctx.font = 'normal 500 40px "sans-serif"';
        ctx.fillStyle = '#121111';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(names.stationNames.next.eng, 150, 306, 270);
    };
}

/**
 * 駅名の入力フォームから値を取得
 * @param {string} type 取得するプロパティの種類
 * @returns {object} 駅名のオブジェクト
 */
function getStationNameValues(type) {
    const names = {
        stationNames: {
            main: {
                value: document.querySelector('#station-name')[type],
                hiragana: document.querySelector('#station-name-hiragana')[type],
                eng: document.querySelector('#station-name-english')[type]
            },
            next: {
                value: document.querySelector('#next-station-name')[type],
                eng: document.querySelector('#next-station-name-english')[type]
            },
            prev: {
                value: document.querySelector('#prev-station-name')[type],
                eng: document.querySelector('#prev-station-name-english')[type]
            }
        }
    };

    return names;
}

// async function getGoogleFonts(fontFamilyName) {
//     const urlFamilyName = fontFamilyName.replace(/ /g, "+"); // URLでは空白を+に置き換える
//     const googleApiUrl = `https://fonts.googleapis.com/css?family=${urlFamilyName}`;

//     const response = await fetch(googleApiUrl);
//     if (!response.ok) {
//         throw new Error("Google Fontsの取得に失敗しました");
//     }

//     const cssFontFace = await response.text();

//     // url() の中のフォントURLを抽出
//     const matchUrls = [...cssFontFace.matchAll(/url\(([^)]+)\)/g)];
//     if (matchUrls.length === 0) {
//         throw new Error("フォントURLが見つかりませんでした");
//     }

//     // 最初のフォントURLを使用
//     const fontUrl = matchUrls[0][1].replace(/['"]/g, ''); // 引用符を削除

//     // FontFaceオブジェクトを作成してフォントを読み込む
//     const font = new FontFace(fontFamilyName, `url(${fontUrl})`);
//     await font.load();
//     document.fonts.add(font);

//     return document.fonts.ready;
// }