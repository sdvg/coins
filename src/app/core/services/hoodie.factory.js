import Hoodie from '@hoodie/client';

function hoodieFactory () {
    const hoodie = new Hoodie({
        url: `//${location.hostname}:2048`
    });

    window.hoodie = hoodie;

    return hoodie;
}

export default function (app) {
    app.factory('hoodie', hoodieFactory);
}