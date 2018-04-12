'use strict';

module.exports = app => {
    app.get(
        '/getAllTemplates',
        '/blocks/get_all_templates',
        app.controller.blockController.getAllTemplates
    );
};
