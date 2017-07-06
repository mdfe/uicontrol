(function($, p) {
    $.fn.plupload = function(settings) {
        $(this).each(function() {
//                if($(this).find("div[id*='_flash_container']"))
//                    $(this).find("div[id*='_flash_container']").remove();
            var isBind = true;
            if ($(this).attr("pluploadID")) {
                if ($(this).find("div[id*='_flash_container']").length == 0)
                    isBind = false;
                else
                {
                    $(this).find("#" + $(this).attr("pluploadID") + "_flash_container").remove();
                }

            }
            if (isBind) {
                var uploader = new $plupload($(this)[0], settings);
                $(this).attr("pluploadID", uploader.id);
                $(this).data("plupload", uploader);
            }
        });
        return $(this);
    }

    function $plupload(el, settings) {
        var options = $.extend({
            runtimes: 'html5,flash,silverlight',
            max_file_size: '1000mb',
            file_data_name: 'Filedata',
            multi_selection: false, //默认不可以上传多个文件
            browse_button: el.id,
            drop_element: el.id + "_drop",
            paste_element: el.id + "_paste",
            autoUpload: true,
            'flash_swf_url': '/modules/vendor/plupload/Moxie.swf',
            'silverlight_xap_url': '/modules/vendor/plupload/Moxie.xap',
        }, settings);
        if (options.browse_button) {
            var uploader = new plupload.Uploader(options);
            if (options.autoUpload) {
                var QueueChanged = function(up) {
                    if (up.state == plupload.STOPPED) {
                        up.start();
                    }
                }
                if (options.method) {
                    options.method.QueueChanged = QueueChanged;
                } else {
                    options.method = { QueueChanged: QueueChanged }
                }
            }
            if (options.method) {
                var tempError;
                if (options.method.Error)
                    tempError = options.method.Error;
                options.method.Error = function(up, error) {
                    if (error && error.file) up.removeFile(error.file);
                    if (tempError) tempError(up, error);
                }
                for (var attr in options.method) {
                    uploader.bind(attr, options.method[attr]);
                }
            }
            uploader.bind('PostInit', function bindPluploadPaste(up) {
                var paste = document.getElementById(up.settings.paste_element);
                if (paste) {
                    $(paste).on('paste', function(e) {
                        var items = e.originalEvent.clipboardData && e.originalEvent.clipboardData.items;
                        var data = { files: [] };
                        if (items && items.length) {
                            $.each(items, function(index, item) {
                                var file = item.getAsFile && item.getAsFile();
                                if (file) {
                                    file.name = "剪切板贴图.png";
                                    file.isFromClipBoard = true;
                                    data.files.push(file);
                                }
                            });
                            if (data.files.length > 0) {
                                up.addFile(data.files);
                            }
                        }
                    });
                }
            });
            uploader.init();
            return uploader;
        }
        return null;
    }

})(jQuery, plupload);
