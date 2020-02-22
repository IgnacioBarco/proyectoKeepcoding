const locStorage = {
    setItem: (key, value) => localStorage.setItem(key, value),

    getItem: key => localStorage.getItem(key),

    isItem: key => {
        if (localStorage.getItem(key)) {
            return true;
        } else {
            return false;
        }
    },

    //mira si tiene datos en el localstorage, si es asi, los inserta en el contexto
    checkLocalStorage: (ctx) => {

        if (locStorage.isItem('name')) {
            ctx.name = locStorage.getItem('name');
        }

        if (locStorage.isItem('email')) {
            ctx.surname = locStorage.getItem('email');
        }

        if (locStorage.isItem('token')) {
            ctx.tag = locStorage.getItem('token');
        }

        if (locStorage.isItem('url')) {
            ctx.tags = locStorage.getItem('url');
        }
        
        if (locStorage.isItem('adStart')) {
            ctx.tags = locStorage.getItem('adStart');
        }

        return ctx;

    },

    checkIsNull: () => {
        if (!locStorage.isItem('name')
            || !locStorage.isItem('email')
            || !locStorage.isItem('token')
            || !locStorage.isItem('url')
        ) {
            alert('Faltan datos en localStorage, volvemos al registro!!!')
            return false
        }

        return true;
    }
};

export default locStorage;