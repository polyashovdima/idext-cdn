/**
 * Lightbox v2.7.1
 * by Lokesh Dhakar - http://lokeshdhakar.com/projects/lightbox2/
 *
 * @license http://creativecommons.org/licenses/by/2.5/
 * - Free for use in both personal and commercial projects
 * - Attribution requires leaving author name, author link, and the license info intact
 */

/* WeBi.Ru - Модернизация
 adm@webi.ru
 Документация по этому файлу на моем сайте
 http://webi.ru/webi.ru/webi_files/javascript/image/lightbox.html

 модернизировал Lightbox, добавил кнопку загрузки картинки в оригинальном размере
 
 А так же чтобы исключались дубли картинок, когда картинки показываются как галерея.
 Дубли ищутся по url картинки.
 !!! ИСКЛЮЧЕНИЕ ДУБЛЕЙ МОЖНО ИСПОЛЬЗОВАТЬ ТОЛЬКО ПРИ ИСПОЛЬЗОВАНИИ ОДНОЙ ССЫЛКИ ДЛЯ КЛИКА. ТО ЕСТЬ ПО КОТОРОЙ КЛИКНУЛ И ЛИСТАЕШЬ ГАЛЕРЕЮ, 
 !!! И НЕЛЬЗЯ ИСПОЛЬЗОВАТЬ ПРИ КЛИКАХ НА КАЖДОЙ КАРТИНКЕ, ИНАЧЕ ДУБЛИРУЮЩИЕ КАРТИНКИ ОСТАНУТСЯ БЕЗ КЛИКОВОГО ЭФФЕКТА И БУДЕТ ПРОСТО ПЕРЕХОД НА КАРТИНКУ.
 !!! НАПРИМЕР ЕСТЬ 100 СКРЫТЫХ ССЫЛОК НА КАРТИНКИ И ОДНА ТОЛЬКО ВИДНА, НА НЕЕ КЛИНУЛ И ЛИСТАЕШЬ. В ЭТОМ СЛУЧАЕ МОЖНО ИСКЛЮЧАТЬ ДУБЛИ.     
 */

/* Для начала функция поиска в массиве */

// Проверяем, поддерживает ли браузер встроенную функцию поиска по массиву.
// С помощью пустого массива
if ([].indexOf) { // Если поддерживает то создаем функцию find_webi и сразу возвращаем результат поиска через эту функцию
    var find_webi = function(array, value) {
        return array.indexOf(value);
    };
} else { // а если встроенной функции поиска по массиву нет, то сделаем свою, с помощью перебора каждого элемента
    var find_webi = function(array, value) {
        for (var i = 0; i<array.length; i++) {
            if (array[i]===value)
                return i; // если найдено, возвращается номер элемента, может быть первый элемент - 0
        }
        return -1; // ну а если ничего не было найдено, возвращается -1
    };
}






(function() {
    // Use local alias
    var $ = jQuery;

    var optionWebi =
            {
                'duble_off': false, // исключать дубли картинок. Не рекомендуется включать, только после прочтения документации (http://webi.ru/webi.ru/webi_files/javascript/image/lightbox.html)
                'full_size_button': false, // показывать кнопку увеличения картинки до оригинального размера
                'fitImages_next_button': false // после нажатия на кнопку вперед или назад переводить в режим подгона по экрану. В противном случае после увеличения все последующие фото будут показываться в реальном масштабе, пока еще раз не нажать на кнопку увеличения.
            };


    var LightboxOptions = (function() {
        function LightboxOptions() {

            this.fadeDuration = 500;
            this.fitImagesInViewport = false; // подгоняет размер под экран
            this.resizeDuration = 700;
            this.positionFromTop = 50;
            this.showImageNumberLabel = true;
            this.alwaysShowNavOnTouchDevices = true;
            this.wrapAround = true;
        }

        // Change to localize to non-english language
        LightboxOptions.prototype.albumLabel = function(curImageNum, albumSize) {
            return "Изображение "+curImageNum+" из "+albumSize;
        };

        return LightboxOptions;
    })();


    var Lightbox = (function() {
        function Lightbox(options) {
            this.options = options;
            this.album = [];
            this.test_webi_mass = []; // массив для хранения url-ов картинок, чтобы исключить дубли
            this.currentImageIndex = void 0;
            this.init();
        }

        Lightbox.prototype.init = function() {
            this.enable();
            this.build();
        };

        // Loop through anchors and areamaps looking for either data-lightbox attributes or rel attributes
        // that contain 'lightbox'. When these are clicked, start lightbox.
        Lightbox.prototype.enable = function() {
            var self = this;
            $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function(event) {
                self.start($(event.currentTarget));
                return false;
            });
        };

        // Build html for the lightbox and the overlay.
        // Attach event handlers to the new DOM elements. click click click
        Lightbox.prototype.build = function() {
            var self = this;
            var full_size_button = '';
            // если нужно выводить кнопку полного размера фото
            if (optionWebi['full_size_button']) {
                full_size_button = "<a title='Полный размер' class='lb-fullsize' href='' ></a>";
            }
            $("<div id='lightboxOverlay' class='lightboxOverlay'></div><div id='lightbox' class='lightbox'><div class='lb-outerContainer'><div class='lb-container'><img class='lb-image' src='' /><div class='lb-nav'><a class='lb-prev' href='' ></a><a class='lb-next' href='' ></a></div><div class='lb-loader'><a class='lb-cancel'></a></div></div></div><div class='lb-dataContainer'><div class='lb-data'><div class='lb-details'><span class='lb-caption'></span><span class='lb-number'></span></div><div class='lb-closeContainer'><a title='Закрыть' class='lb-close'></a>"+full_size_button+"</div></div></div></div>").appendTo($('body'));

            // Cache jQuery objects
            this.$lightbox = $('#lightbox');
            this.$overlay = $('#lightboxOverlay');
            this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
            this.$container = this.$lightbox.find('.lb-container');

            // Store css values for future lookup
            this.containerTopPadding = parseInt(this.$container.css('padding-top'), 10);
            this.containerRightPadding = parseInt(this.$container.css('padding-right'), 10);
            this.containerBottomPadding = parseInt(this.$container.css('padding-bottom'), 10);
            this.containerLeftPadding = parseInt(this.$container.css('padding-left'), 10);

            // Attach event handlers to the newly minted DOM elements
            this.$overlay.hide().on('click', function() {
                // если при листании фото нужно скидывать масштаб до подгона по экрану, сбросим его и при закрытии иначе при открытии новой картинки не будет сброшен масштаб          
                    if (optionWebi['fitImages_next_button'])
                    {
                        self.options.fitImagesInViewport = true; //сброс увеличения при листаии вперед
                    }
                self.end();
                return false;
            });

            this.$lightbox.hide().on('click', function(event) {
                if ($(event.target).attr('id')==='lightbox') {
                    // если при листании фото нужно скидывать масштаб до подгона по экрану, сбросим его и при закрытии иначе при открытии новой картинки не будет сброшен масштаб          
                    if (optionWebi['fitImages_next_button'])
                    {
                        self.options.fitImagesInViewport = true; //сброс увеличения при листаии вперед
                    }
                    self.end();
                }
                return false;
            });

            this.$outerContainer.on('click', function(event) {
                if ($(event.target).attr('id')==='lightbox') {
                    
                    self.end();
                }
                return false;
            });

            this.$lightbox.find('.lb-prev').on('click', function() {
                // если при листании фото нужно скидывать масштаб до подгона по экрану, сбросим
                if (optionWebi['fitImages_next_button'])
                {
                    self.options.fitImagesInViewport = true;
                }
                if (self.currentImageIndex===0) {
                    self.changeImage(self.album.length-1);
                } else {
                    self.changeImage(self.currentImageIndex-1);
                }
                return false;
            });

            this.$lightbox.find('.lb-next').on('click', function() {

                // если при листании фото нужно скидывать масштаб до подгона по экрану, сбросим          
                if (optionWebi['fitImages_next_button'])
                {
                    self.options.fitImagesInViewport = true; //сброс увеличения при листаии вперед
                }
                if (self.currentImageIndex===self.album.length-1) {
                    self.changeImage(0);
                } else {
                    self.changeImage(self.currentImageIndex+1);
                }
                return false;
            });


            this.$lightbox.find('.lb-fullsize').on('click', function() {
                // нажатие на кнопку полного просмотра фото
                // в зависимости от того, что было включено, переключаем размер.
                // если было полное фото, то ставим масштабирование по эрану, либо наоборот
                // получится кнопка увеличения работает либо уменьшает, либо увеличивает
                if (self.options.fitImagesInViewport) {
                    self.options.fitImagesInViewport = false;
                }
                else {
                    self.options.fitImagesInViewport = true;
                }

                self.changeImage(self.currentImageIndex);// меняем размер текущей картинки

            });

            this.$lightbox.find('.lb-close').on('click', function() {
                // если при листании фото нужно скидывать масштаб до подгона по экрану, сбросим его и при нажатии на кнопку закрытия иначе при открытии новой картинки не будет сброшен масштаб          
                if (optionWebi['fitImages_next_button'])
                {
                    self.options.fitImagesInViewport = true; //сброс увеличения при листаии вперед
                }
                self.end();
                return false;
            });

            this.$lightbox.find('.lb-loader').on('click', function() {
                self.end();
                return false;
            });
        };

        // Show overlay and lightbox. If the image is part of a set, add siblings to album array.
        Lightbox.prototype.start = function($link) {
            var self = this;
            var $window = $(window);

            $window.on('resize', $.proxy(this.sizeOverlay, this));

            $('select, object, embed').css({
                visibility: "hidden"
            });

            this.sizeOverlay();

            this.album = [];
            this.test_webi_mass = [];
            var imageNumber = 0;

            function addToAlbum($link) {
                // здесь происходит добавление новой картинки в массив
                // поэтому проверим, не была ли добавлена такая картинка ранее      
                if (optionWebi['duble_off']) // если нужно удаление дублей
                {
                    // если URL был найден, выходим из функции       
                    if (find_webi(self.test_webi_mass, $link.attr('href'))!=-1)
                    {
                        return false;
                    }

                    // ну а если url картинки не был найден, то пошло добавление
                    // сначала добавим URL в тестовый массив, который хранит только URLы картинок для поиска дублей      
                    self.test_webi_mass.push($link.attr('href'));
                }


                // а дальше пошло добавление как и должно быть, никаких именений дальше нет
                self.album.push({
                    link: $link.attr('href'),
                    title: $link.attr('data-title')||$link.attr('title')
                });

            }

            // Support both data-lightbox attribute and rel attribute implementations
            var dataLightboxValue = $link.attr('data-lightbox');
            var $links;

            if (dataLightboxValue) {
                $links = $($link.prop("tagName")+'[data-lightbox="'+dataLightboxValue+'"]');
                for (var i = 0; i<$links.length; i = ++i) {
                    addToAlbum($($links[i]));
                    if ($links[i]===$link[0]) {
                        imageNumber = i;
                    }
                }
            } else {
                if ($link.attr('rel')==='lightbox') {
                    // If image is not part of a set
                    addToAlbum($link);
                } else {
                    // If image is part of a set
                    $links = $($link.prop("tagName")+'[rel="'+$link.attr('rel')+'"]');
                    for (var j = 0; j<$links.length; j = ++j) {
                        addToAlbum($($links[j]));
                        if ($links[j]===$link[0]) {
                            imageNumber = j;
                        }
                    }
                }
            }

            // Position Lightbox
            var top = $window.scrollTop()+this.options.positionFromTop;
            var left = $window.scrollLeft();
            this.$lightbox.css({
                top: top+'px',
                left: left+'px'
            }).fadeIn(this.options.fadeDuration);

            this.changeImage(imageNumber);
        };

        // Hide most UI elements in preparation for the animated resizing of the lightbox.
        Lightbox.prototype.changeImage = function(imageNumber) {
            var self = this;

            this.disableKeyboardNav();
            var $image = this.$lightbox.find('.lb-image');

            this.$overlay.fadeIn(this.options.fadeDuration);

            $('.lb-loader').fadeIn('slow');
            this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();

            this.$outerContainer.addClass('animating');

            // When image to show is preloaded, we send the width and height to sizeContainer()
            var preloader = new Image();
            preloader.onload = function() {
                var $preloader, imageHeight, imageWidth, maxImageHeight, maxImageWidth, windowHeight, windowWidth;
                $image.attr('src', self.album[imageNumber].link);

                $preloader = $(preloader);

                $image.width(preloader.width);
                $image.height(preloader.height);

                if (self.options.fitImagesInViewport) {
                    // Fit image inside the viewport.
                    // Take into account the border around the image and an additional 10px gutter on each side.

                    windowWidth = $(window).width();
                    windowHeight = $(window).height();
                    maxImageWidth = windowWidth-self.containerLeftPadding-self.containerRightPadding-20;
                    maxImageHeight = windowHeight-self.containerTopPadding-self.containerBottomPadding-120;

                    // Is there a fitting issue?
                    if ((preloader.width>maxImageWidth)||(preloader.height>maxImageHeight)) {
                        if ((preloader.width/maxImageWidth)>(preloader.height/maxImageHeight)) {
                            imageWidth = maxImageWidth;
                            imageHeight = parseInt(preloader.height/(preloader.width/imageWidth), 10);
                            $image.width(imageWidth);
                            $image.height(imageHeight);
                        } else {
                            imageHeight = maxImageHeight;
                            imageWidth = parseInt(preloader.width/(preloader.height/imageHeight), 10);
                            $image.width(imageWidth);
                            $image.height(imageHeight);
                        }
                    }
                }
                self.sizeContainer($image.width(), $image.height());
            };

            preloader.src = this.album[imageNumber].link;
            this.currentImageIndex = imageNumber;
        };

        // Stretch overlay to fit the viewport
        Lightbox.prototype.sizeOverlay = function() {
            this.$overlay
                    .width($(window).width())
                    .height($(document).height());
        };

        // Animate the size of the lightbox to fit the image we are showing
        Lightbox.prototype.sizeContainer = function(imageWidth, imageHeight) {
            var self = this;

            var oldWidth = this.$outerContainer.outerWidth();
            var oldHeight = this.$outerContainer.outerHeight();
            var newWidth = imageWidth+this.containerLeftPadding+this.containerRightPadding;
            var newHeight = imageHeight+this.containerTopPadding+this.containerBottomPadding;

            function postResize() {
                self.$lightbox.find('.lb-dataContainer').width(newWidth);
                self.$lightbox.find('.lb-prevLink').height(newHeight);
                self.$lightbox.find('.lb-nextLink').height(newHeight);
                self.showImage();
            }

            if (oldWidth!==newWidth||oldHeight!==newHeight) {
                this.$outerContainer.animate({
                    width: newWidth,
                    height: newHeight
                }, this.options.resizeDuration, 'swing', function() {
                    postResize();
                });
            } else {
                postResize();
            }
        };

        // Display the image and it's details and begin preload neighboring images.
        Lightbox.prototype.showImage = function() {
            this.$lightbox.find('.lb-loader').hide();
            this.$lightbox.find('.lb-image').fadeIn('slow');

            this.updateNav();
            this.updateDetails();
            this.preloadNeighboringImages();
            this.enableKeyboardNav();
        };

        // Display previous and next navigation if appropriate.
        Lightbox.prototype.updateNav = function() {
            // Check to see if the browser supports touch events. If so, we take the conservative approach
            // and assume that mouse hover events are not supported and always show prev/next navigation
            // arrows in image sets.
            var alwaysShowNav = false;
            try {
                document.createEvent("TouchEvent");
                alwaysShowNav = (this.options.alwaysShowNavOnTouchDevices) ? true : false;
            } catch (e) {
            }

            this.$lightbox.find('.lb-nav').show();

            if (this.album.length>1) {
                if (this.options.wrapAround) {
                    if (alwaysShowNav) {
                        this.$lightbox.find('.lb-prev, .lb-next').css('opacity', '1');
                    }
                    this.$lightbox.find('.lb-prev, .lb-next').show();
                } else {
                    if (this.currentImageIndex>0) {
                        this.$lightbox.find('.lb-prev').show();
                        if (alwaysShowNav) {
                            this.$lightbox.find('.lb-prev').css('opacity', '1');
                        }
                    }
                    if (this.currentImageIndex<this.album.length-1) {
                        this.$lightbox.find('.lb-next').show();
                        if (alwaysShowNav) {
                            this.$lightbox.find('.lb-next').css('opacity', '1');
                        }
                    }
                }
            }
        };

        // Display caption, image number, and closing button.
        Lightbox.prototype.updateDetails = function() {
            var self = this;

            // Enable anchor clicks in the injected caption html.
            // Thanks Nate Wright for the fix. @https://github.com/NateWr
            if (typeof this.album[this.currentImageIndex].title!=='undefined'&&this.album[this.currentImageIndex].title!=="") {
                this.$lightbox.find('.lb-caption')
                        .html(this.album[this.currentImageIndex].title)
                        .fadeIn('fast')
                        .find('a').on('click', function(event) {
                    location.href = $(this).attr('href');
                });
            }

            if (this.album.length>1&&this.options.showImageNumberLabel) {
                this.$lightbox.find('.lb-number').text(this.options.albumLabel(this.currentImageIndex+1, this.album.length)).fadeIn('fast');
            } else {
                this.$lightbox.find('.lb-number').hide();
            }

            this.$outerContainer.removeClass('animating');

            this.$lightbox.find('.lb-dataContainer').fadeIn(this.options.resizeDuration, function() {
                return self.sizeOverlay();
            });
        };

        // Preload previous and next images in set.
        Lightbox.prototype.preloadNeighboringImages = function() {
            if (this.album.length>this.currentImageIndex+1) {
                var preloadNext = new Image();
                preloadNext.src = this.album[this.currentImageIndex+1].link;
            }
            if (this.currentImageIndex>0) {
                var preloadPrev = new Image();
                preloadPrev.src = this.album[this.currentImageIndex-1].link;
            }
        };

        Lightbox.prototype.enableKeyboardNav = function() {
            $(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
        };

        Lightbox.prototype.disableKeyboardNav = function() {
            $(document).off('.keyboard');
        };

        Lightbox.prototype.keyboardAction = function(event) {
            var KEYCODE_ESC = 27;
            var KEYCODE_LEFTARROW = 37;
            var KEYCODE_RIGHTARROW = 39;

            var keycode = event.keyCode;
            var key = String.fromCharCode(keycode).toLowerCase();
            if (keycode===KEYCODE_ESC||key.match(/x|o|c/)) {
                this.end();
            } else if (key==='p'||keycode===KEYCODE_LEFTARROW) {
                if (this.currentImageIndex!==0) {
                    this.changeImage(this.currentImageIndex-1);
                } else if (this.options.wrapAround&&this.album.length>1) {
                    this.changeImage(this.album.length-1);
                }
            } else if (key==='n'||keycode===KEYCODE_RIGHTARROW) {
                if (this.currentImageIndex!==this.album.length-1) {
                    this.changeImage(this.currentImageIndex+1);
                } else if (this.options.wrapAround&&this.album.length>1) {
                    this.changeImage(0);
                }
            }
        };

        // Closing time. :-(
        Lightbox.prototype.end = function() {
            this.disableKeyboardNav();
            $(window).off("resize", this.sizeOverlay);
            this.$lightbox.fadeOut(this.options.fadeDuration);
            this.$overlay.fadeOut(this.options.fadeDuration);
            $('select, object, embed').css({
                visibility: "visible"
            });
        };

        return Lightbox;

    })();

    $(function() {
        var options = new LightboxOptions();
        var lightbox = new Lightbox(options);
    });

}).call(this);
