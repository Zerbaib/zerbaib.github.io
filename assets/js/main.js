/* Zerbaib portfolio — language & theme switching.
   English text lives in index.html; French translations live below. */
(function () {
    'use strict';

    var FR = {
        'nav.projects': 'Projets',
        'nav.network': 'Réseau',
        'nav.skills': 'Compétences',
        'nav.contact': 'Contact',

        'hero.tagline': '<span class="accent">Développeur</span> Python, expert en bots Discord et passionné de <span class="accent">réseau &amp; serveurs</span>.',
        'hero.lead': 'Développeur français qui aime construire de A à Z : des librairies Python et des bots Discord jusqu’aux routeurs, aux hyperviseurs et à mon propre système autonome sur DN42.',
        'hero.cta': 'Voir mes projets',
        'hero.stat1': 'ans de bots Discord',
        'hero.stat2': 'opérateur sur DN42',
        'hero.stat3': 'basé en France',

        'projects.title': 'Projets phares',
        'projects.sub': 'Les projets dont je suis le plus fier.',
        'projects.flagship': 'Projet phare',
        'projects.others': 'Autres projets',
        'common.repo': 'Voir le dépôt',
        'common.discord': 'Rejoindre le Discord',

        'volta.desc': 'La librairie Python officielle de l’API publique de Volta Music. Un client léger avec une interface claire <code>client.get</code> / <code>post</code> / <code>put</code> / <code>delete</code> pour gérer sa bibliothèque, ses playlists et le catalogue global.',
        'volta.f1': 'Gestion automatique du token : récupération, rafraîchissement et sauvegarde sur disque',
        'volta.f2': 'Nouvelle tentative silencieuse sur une 401 et thread de rafraîchissement en arrière-plan',
        'volta.f3': 'Exceptions typées (NotFoundError, RateLimitError…)',
        'volta.f4': 'Context manager pour un arrêt propre, helpers de recherche côté client',

        'tdb.desc': 'Mon bot Discord tout-en-un écrit en Python avec disnake. Le fruit de plus de 6 ans d’expérience dans la création de bots pour des serveurs communautaires.',
        'tdb.f1': 'Architecture modulaire : commandes chargées automatiquement sous forme d’extensions',
        'tdb.f2': 'Base de données MariaDB / MySQL pour les données persistantes',
        'tdb.f3': 'Fichier de configuration généré au premier lancement, logger maison',
        'tdb.f4': 'Génération d’images avec Pillow, tableaux formatés avec tabulate',
        'tdb.embedTitle': 'Niveau 42 · 13 370 XP',

        'other.cdb': 'Bot Discord en Python avec disnake : modération, classement, économie et plus.',
        'other.atl': 'Quatre feux tricolores entièrement automatiques réalisés avec Arduino pour un projet scolaire.',
        'other.lg': 'Association loi 1901 fondée par quatre étudiants en informatique pour rendre l’informatique simple et accessible.',
        'other.calc': 'Une calculatrice réalisée en Python avec la librairie BetterTkinter.',

        'network.title': 'Réseau &amp; serveurs',
        'network.sub': 'Au-delà du code, je monte et j’administre ma propre infrastructure.',
        'dn42.title': 'J’opère mon propre AS sur DN42',
        'dn42.desc': 'DN42 est un réseau décentralisé géré par des passionnés qui reproduit les technologies d’Internet : BGP, systèmes autonomes, allocations IP, DNS et registre. J’y possède un système autonome : je gère mon propre espace d’adressage, j’établis des sessions de peering avec d’autres opérateurs et je route le trafic en BGP — exactement comme un FAI, à l’échelle de chez moi.',
        'net.mikrotik': 'Configuration RouterOS : routage, pare-feu, NAT, VLANs et sessions BGP.',
        'net.cisco': 'Switchs et routeurs Cisco IOS : VLANs, trunks, routage et administration en CLI.',
        'net.proxmox': 'Virtualisation de mes serveurs : VMs, conteneurs LXC, stockage et sauvegardes.',
        'net.dns': 'Mise en place de serveurs DNS faisant autorité et récursifs, gestion des zones et des enregistrements.',
        'net.proxy': 'Reverse proxies (Nginx) pour exposer des services de façon sécurisée en HTTPS.',
        'net.routingTitle': 'Routage &amp; BGP',
        'net.routing': 'Système autonome, peering, préfixes et annonces de routes sur DN42.',

        'skills.title': 'Compétences',
        'skills.sub': 'Les langages, systèmes et outils que j’utilise au quotidien.',
        'skills.lang': 'Langages',
        'skills.os': 'Systèmes d’exploitation',
        'skills.tools': 'Outils, serveurs &amp; bases de données',
        'skills.libs': 'Librairies Python que je maîtrise',
        'skills.learning': 'En cours d’apprentissage',
        'lib.disnake': 'Bots Discord : slash commands, cogs, événements, embeds, views.',
        'lib.requests': 'Clients HTTP et wrappers d’API REST (Volta.py).',
        'lib.mysql': 'Accès MariaDB / MySQL depuis mes bots.',
        'lib.pillow': 'Génération et manipulation d’images (cartes de rang…).',
        'lib.tabulate': 'Tableaux texte propres pour les logs et les réponses du bot.',
        'lib.tk': 'Applications de bureau avec interface graphique (CalculaPy).',

        'contact.title': 'Discutons',
        'contact.sub': 'Un projet, un bot, un peering sur DN42 ? Contactez-moi !',
        'footer.legal': 'Ce site est hébergé sur GitHub Pages et respecte les lois européennes et américaines.'
    };

    var root = document.documentElement;
    var nodes = document.querySelectorAll('[data-i18n],[data-i18n-html]');
    var EN = {};
    nodes.forEach(function (el) {
        var key = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
        if (!(key in EN)) EN[key] = el.innerHTML;
    });

    function store(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
    function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

    /* ---------- Language ---------- */
    function setLang(lang) {
        var dict = lang === 'fr' ? FR : EN;
        nodes.forEach(function (el) {
            var key = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
            if (dict[key] != null) el.innerHTML = dict[key];
        });
        root.lang = lang;
        document.getElementById('lang-label').textContent = lang === 'fr' ? 'EN' : 'FR';
        document.getElementById('lang-toggle').setAttribute('aria-label',
            lang === 'fr' ? 'Switch to English' : 'Passer en français');
        store('lang', lang);
    }

    var params = new URLSearchParams(location.search);
    var initial = params.get('lang') || read('lang') ||
        ((navigator.language || 'en').toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en');
    setLang(initial === 'fr' ? 'fr' : 'en');

    document.getElementById('lang-toggle').addEventListener('click', function () {
        setLang(root.lang === 'fr' ? 'en' : 'fr');
    });

    /* ---------- Theme ---------- */
    document.getElementById('theme-toggle').addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        store('theme', next);
    });

    /* ---------- Mobile menu ---------- */
    var links = document.getElementById('nav-links');
    document.getElementById('menu-toggle').addEventListener('click', function () {
        links.classList.toggle('open');
    });
    links.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') links.classList.remove('open');
    });
})();
