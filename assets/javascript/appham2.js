(function() {
    "use strict";
    var carouselWrapper = $("#carouselWrapper");
    var current_carousel = 0;
    var carousels = $(".carousel");
    var carousels_height = $(window).height();
    var carousels_count = carousels.length;
    var current_pane = [];
    var paneCounts = [];
    var lockx = false;
    var locky = false;
    var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
    var map;
    var wheelLock = false;
    var isLoaded = false;
    var indexName = [];
    var pageNames = {};
    var tweets = '';
    var carouselsControls;
    var width;
    var height;
    var MAIN_URL = "http://localhost:1337"
    var tempLock = false;
    var startScroll = $('#menu').css('top');
    var MC
    window.linkify = (function() {
        var k = "[a-z\\d.-]+://",
            h = "(?:(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])",
            c = "(?:(?:[^\\s!@#$%^&*()_=+[\\]{}\\\\|;:'\",.<>/?]+)\\.)+",
            n = "(?:ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)",
            f = "(?:" + c + n + "|" + h + ")",
            o = "(?:[;/][^#?<>\\s]*)?",
            e = "(?:\\?[^#<>\\s]*)?(?:#[^<>\\s]*)?",
            d = "\\b" + k + "[^<>\\s]+",
            a = "\\b" + f + o + e + "(?!\\w)",
            m = "mailto:",
            j = "(?:" + m + ")?[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@" + f + e + "(?!\\w)",
            l = new RegExp("(?:" + d + "|" + a + "|" + j + ")", "ig"),
            g = new RegExp("^" + k, "i"),
            b = {
                "'": "`",
                ">": "<",
                ")": "(",
                "]": "[",
                "}": "{",
                "B;": "B+",
                "b�:": "b�9"
            },
            i = {
                callback: function(q, p) {
                    return p ? '<a href="' + p + '" title="' + p + '" target="_blank">' + q + "</a>" : q
                },
                punct_regexp: /(?:[!?.,:;'"]|(?:&|&amp;)(?:lt|gt|quot|apos|raquo|laquo|rsaquo|lsaquo);)$/
            };
        return function(u, z) {
            z = z || {};
            var w, v, A, p, x = "",
                t = [],
                s, E, C, y, q, D, B, r;
            for (v in i) {
                if (z[v] === undefined) {
                    z[v] = i[v]
                }
            }
            while (w = l.exec(u)) {
                A = w[0];
                E = l.lastIndex;
                C = E - A.length;
                if (/[\/:]/.test(u.charAt(C - 1))) {
                    continue
                }
                do {
                    y = A;
                    r = A.substr(-1);
                    B = b[r];
                    if (B) {
                        q = A.match(new RegExp("\\" + B + "(?!$)", "g"));
                        D = A.match(new RegExp("\\" + r, "g"));
                        if ((q ? q.length : 0) < (D ? D.length : 0)) {
                            A = A.substr(0, A.length - 1);
                            E--
                        }
                    }
                    if (z.punct_regexp) {
                        A = A.replace(z.punct_regexp, function(F) {
                            E -= F.length;
                            return ""
                        })
                    }
                } while (A.length && A !== y);
                p = A;
                if (!g.test(p)) {
                    p = (p.indexOf("@") !== -1 ? (!p.indexOf(m) ? "" : m) : !p.indexOf("irc.") ? "irc://" : !p.indexOf("ftp.") ? "ftp://" : "http://") + p
                }
                if (s != C) {
                    t.push([u.slice(s, C)]);
                    s = E
                }
                t.push([A, p])
            }
            t.push([u.substr(s)]);
            for (v = 0; v < t.length; v++) {
                x += z.callback.apply(window, t[v])
            }
            return x || u
        }
    })();




    function Carousel(element) {
        var self = this;



        var panes = $(">ul>li", element);
        var pane_count = panes.length;
        this.pane_count = panes.length;

        this.current_pane = function() {

            return current_pane[current_carousel]
        }


        /**
         * initial
         */
        this.init = function() {
            this.setPaneDimensions();
            //updateLocationUi();

        };



        this.showPane = function(index) {
            // between the bounds

            index = Math.max(0, Math.min(index, paneCounts[current_carousel] - 1));


            current_pane[current_carousel] = index;

            var offset = -(width * current_pane[current_carousel]);
            console.log(offset + 'off')

            setContainerOffset(offset, true);

            var newHash = '#' + indexName[current_carousel] + '/' + pageNames[current_carousel][current_pane[current_carousel]];
            if (newHash != window.location.hash) {
                history.pushState(null, document.title, newHash);
                updateLocationUi();
            }





            isLoaded = true;
        };




        this.showCarousel = function(index) {
            // between the bounds
            index = Math.max(0, Math.min(index, carousels_count - 1));
            current_carousel = index;


            var offset = -index * carousels_height;

            setCarouselOffset(offset, true);





            var newHash = '#' + indexName[current_carousel] + '/' + pageNames[current_carousel][current_pane[current_carousel]]
            if (newHash != window.location.hash) {
                history.pushState(null, document.title, newHash);
                updateLocationUi();

            }

        };

        function setContainerOffset(percent, animate) {
            console.log(tempLock)
            if (tempLock) {
                return
            }
            var element = $('#' + indexName[current_carousel]);
            var container = $(">ul", element);
            container.removeClass("animate");

            if (animate) {
                tempLock = true;
                container.addClass("animate");
                setTimeout(function() {
                    tempLock = false;
                }, 500)
            }

            if (Modernizr.csstransforms3d && !iOS) {
                // container.css("transform", "translate3d(" + percent + "%,0,0) scale3d(1,1,1)");
                container.css("transform", "translate3d(" + percent + "px,0,0) scale3d(1,1,1)");
            } else

            if (Modernizr.csstransforms && !iOS) {
                container.css("transform", "translate(" + percent + "px,0)");
            } else {
                //var px = ((pane_width * pane_count) / 100) * percent;
                container.css("left", percent + "px");
            }
            //  updateLocationUi();
        }

        function setCarouselOffset(percent, animate) {
            if (tempLock) {
                return
            }


            carouselWrapper.removeClass("animate");


            if (animate) {
                tempLock = true;

                carouselWrapper.addClass("animate");
                setTimeout(function() {
                    tempLock = false;
                }, 500)

            }

            if (Modernizr.csstransforms3d && !iOS) {
                carouselWrapper.css("transform", "translate3d(0," + percent + "px,0) scale3d(1,1,1)");
            } else if (Modernizr.csstransforms && !iOS) {
                carouselWrapper.css("transform", "translate(0," + percent + "px)");
            } else {
                //var px = ((carousels_height * carousels_count) / 100) * percent;
                carouselWrapper.css("top", percent + "px");
            }

            // updateLocationUi();
        }



        this.next = function() {
            return this.showPane(current_pane[current_carousel] + 1, true);

        };
        this.prev = function() {
            console.log('prev')
            return this.showPane(current_pane[current_carousel] - 1, true);

        };

        this.up = function() {

            return this.showCarousel(current_carousel + 1, true);

        }

        this.down = function() {
            return this.showCarousel(current_carousel - 1, true);

        }

        function handleScroll(ev) {
            // ev.gesture.preventDefault();
            switch (ev.type) {

                case 'dragup':
                case 'dragdown':

                    // $('#menuScroll').scrollTop(startScroll+(-ev.gesture.deltaY) *1.25)

                    startScroll = parseFloat(startScroll)
                    var amount = startScroll + (ev.gesture.deltaY);
                    console.log(amount)
                    $('#menu').css("top", amount + "px");
                    console.log(-ev.gesture.deltaY);
                    break
            }
        }

        function handleHammer(ev) {
            console.log(ev)


            //  ev.gesture.preventDefault();
            ev.preventDefault();
            carouselWrapper.removeClass("animate");

            // disable browser scrolling
            if (wheelLock) {

                handleScroll(ev);

                return
            }


            switch (ev.type) {
                // case 'tap':
                //         var url = ev.target.getAttribute("data-url");
                //         console.log(ev)
                //         if (url){
                //         window.open(url)
                //         }
                //
                //
                //         break;

                case 'panup':
                case 'pandown':
                    // stick to the finger
                    console.log(lockx)
                    if (lockx) {
                        break;
                    }
                    locky = true;
                    console.log('up')

                    var drag_offset = -((current_carousel) * carousels_height) + (ev.deltaY);
                    console.log(drag_offset)
                    setCarouselOffset(drag_offset);


                    //updateLocationUi();

                    break;

                case 'panright':
                case 'panleft':
                    // stick to the finger
                    if (locky) {
                        break;
                    }
                    lockx = true;
                    //  console.log(ev)

                    var drag_offset = -((current_pane[current_carousel]) * width) + (ev.deltaX);


                    setContainerOffset(drag_offset);
                    break;


                case 'swipedown':

                    self.down();
                    MC.stop()
                    //  ev.stopDetect();
                    break;

                case 'swipeup':

                    self.up();
                    MC.stop()

                    //    ev.gesture.stopDetect();
                    break;
                case 'swipeleft':
                    self.next();
                    MC.stop()

                    console.log(ev)

                    break;

                case 'swiperight':
                    self.prev();
                    MC.stop()

                    console.log(ev)

                    break;

                case 'panend':
                    // more then 50% moved, navigate
                    console.log('end')
                    console.log(lockx)
                    console.log(locky)


                    startScroll = $('#menu').css('top');
                    if (lockx) {
                        //  console.log(Math.abs(ev.deltaX))
                        // console.log(width / 5)
                        // console.log(ev.direction)
                        if (Math.abs(ev.deltaX) > (width / 5)) {

                            if (ev.direction == 4) {
                                self.prev();
                                //  carouselsControls.prev();
                                //    console.log('right')

                            } else {
                                //  console.log('left')
                                self.next();
                                //  carouselsControls.next();
                            }
                        } else {
                            carouselsControls.showPane(current_pane[current_carousel], true);
                        }
                    }

                    if (locky) {
                        console.log('up down')
                        if (Math.abs(ev.deltaY) > carousels_height / 10) {
                            if (ev.direction == 4) {
                                self.up();
                            } else {
                                self.down();
                            }
                        } else {
                            self.showCarousel(current_carousel, true);
                        }
                    }

                    lockx = false;
                    locky = false;

                    break;
            }
        }

        var myElement = document.getElementById(element);
        MC = Hammer(myElement, {})

        MC.on("panend press tap panleft panright panup pandown  swipeleft swiperight swipeup swipedown", handleHammer);


    }

    function goToHashPage() {

        var hash = window.location.hash
        if (hash) {

            var page = hash.substr(1).split('/');

            goToPage(page[0]);
            goToPanel(page[1])

        }

    }

    function toggleMenu() {
        wheelLock = !wheelLock

        $('#menuOpenButton').toggleClass('hideMe');
        $('#menuWrapper').toggleClass('menuWrapperClosed');
        $('#menu').toggleClass('menuClosed');

        var tweet = tweets[Math.floor((Math.random() * tweets.length))]
        var data = tweet.created_at.split(" ").slice(0, 3).join(" ");
        var msg = '<img src="https://pbs.twimg.com/profile_images/28608172/preview.jpg">' +
            '<div id="twitterMsg"><p>' + linkify(tweet.text) + '</p>' +
            '<h1>@Lizardpro</h1><p id="twitterData"> ' + data + ' </p></div>'
        $("#tweet").html("")
        setTimeout(function() {
            $("#tweet").html(msg)
        }, 500)

    }

    function toggleMenu_OLD() {


        $('#menuOpenButton').toggleClass('hideMe');
        $('#menuWrapper').toggleClass('menuWrapperClosed');
        $('#menu').toggleClass('menuClosed');
        $("#tweet").html("")
        wheelLock = !wheelLock
    }

    function closeAll() {

        $('#menuOpenButton').removeClass('hideMe');
        $('#menuWrapper').addClass('menuWrapperClosed');
        $('#menu').addClass('menuClosed');
        closeInfo();
    }

    function goToPage(page) {

        carouselsControls.showCarousel(indexName.indexOf(page), true);
    }

    function goToPanel(panel) {
        console.log(panel)
        carouselsControls.showPane(pageNames[current_carousel].indexOf(panel), true);
    }

    function calculateDistance(elem, mouseX, mouseY) {
        return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 2)));
    }

    function infoLink(infoBox) {

        $('#' + infoBox).removeClass("hideMe");

        $('#menuOpenButton').addClass('zBehind');
        $('.logo').addClass('zBehind');


        t = ""
        wheelLock = true;

    }

    function closeInfo(ev) {
        // console.log(ev.currentTarget.id)
        setTimeout(function() {

            wheelLock = false;
            $('#blackout').addClass("hideMe");
            $('.zBehind').removeClass('zBehind');
        }, 100)
    }
    $(".infoBox").click(function(ev) {
        // console.log(ev.currentTarget.dataset['link'].split('/'))
        closeInfo(ev)



    });
    var landop = 1;
    $("#fullscreen").click(function(ev) {
        console.log("ok")
        $('.panel').toggleClass('imageFit');
        //  $('.landingsizer').toggleClass('hideInfoBox');
        landop = -landop;
        $('.landingsizer').fadeTo(1250, landop);

    });


    function MouseWheelHandler(e) {

        // cross-browser wheel delta
        var e = window.event || e; // old IE support
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));


        if (!wheelLock) {



            wheelLock = true;
            if (delta > 0) {
                carouselsControls.down();

            } else {
                carouselsControls.up();

            }



            var t = setTimeout(function() {
                wheelLock = false;
            }, 1250)
        }
    }

    function updateLocationUi() {
        //return;
        $('.activeArrow').removeClass('activeArrow');
        $('.inactiveArrow').removeClass('inactiveArrow');


        //Up Arrow
        (current_carousel == 0) ? $('#arrowUpWrapper').addClass('inactiveArrow') : $('#arrowUpWrapper').addClass('activeArrow');

        //Down Arrow
        (current_carousel + 1 == carousels_count) ? $('#arrowDownWrapper').addClass('inactiveArrow') : $('#arrowDownWrapper').addClass('activeArrow');

        //Rigth Arrow
        (carouselsControls.current_pane() + 1 == paneCounts[current_carousel]) ? $('#arrowRightWrapper').addClass('inactiveArrow') : $('#arrowRightWrapper').addClass('activeArrow');

        //Left Arrow
        (carouselsControls.current_pane() == 0) ? $('#arrowLeftWrapper').addClass('inactiveArrow') : $('#arrowLeftWrapper').addClass('activeArrow');

        var dots = "";
        var count = paneCounts[current_carousel];
        var current = carouselsControls.current_pane();
        for (var i = 0; i < paneCounts[current_carousel]; i++) {

            dots += (current == i) ? "<div class='largeDot'></div>" : "<div class='smallDot'></div>"
        }

        setTimeout(function() {
            document.getElementById("locationDots").innerHTML = dots;
        }, 5);


    }


    function loadTwitter() {
        var url = 'http://www.helixten.com/api/twitter/'
        $.getJSON(url, {
            username: "lizardpro"
        }).done(function(json) {

            tweets = json;
        });


    }


    function setPaneDimensions() {

        width = document.documentElement.clientWidth;
        height = document.documentElement.clientHeight;
        $('.panel').each(function() {

            this.style.width = width + 'px';
            this.style.height = height + 'px';

        });

        $('.carousel').each(function(i) {
            var panelCount = $(this).find('.panel').length;

            paneCounts[i] = panelCount;
            $(this).width(width * panelCount);

            $(this).height(height);

        });
        $('#carouselWrapper').height(carousels_height * carousels_count)

    }

    $(window).on("resize orientationchange", function() {

        carousels_height = document.documentElement.clientHeight;
        $('.carousel').height(carousels_height);
        $('#carouselWrapper').height(carousels_height * carousels_count);
        setPaneDimensions();
        goToHashPage();

    });




    window.onpopstate = function(event) {
        goToHashPage();

    };


    $(document).keydown(function(e) {
        switch (e.which) {


            case 27:
                closeAll()
                break;
            case 37:
                // left
                if (wheelLock) {
                    break
                }
                carouselsControls.prev();
                break;

            case 38:
                if (wheelLock) {
                    break
                }
                carouselsControls.down();
                break;

            case 39:
                // right
                if (wheelLock) {
                    break
                }
                carouselsControls.next();
                break;

            case 40:
                if (wheelLock) {
                    break
                }
                carouselsControls.up();
                break;



            default:
                return; // exit this handler for other keys
        }
        //    e.preventDefault(); // prevent the default action (scroll / move caret)
    });


    $(".menuToggle").click(function() {
        toggleMenu()
    });

    $(".menu-logo").click(function() {
        carouselsControls.showCarousel(0, true);
        carouselsControls.showPane(0, true);
    });

    $(".link").click(function(ev) {
        // console.log(ev.currentTarget.dataset.getAttribute('data-link'))
        console.log('click')
        console.log(ev.currentTarget)
        console.log('click2')

        var page = ev.currentTarget.getAttribute('data-link').split('/')
        console.log(page)
        toggleMenu();
        goToPage(page[0]);
        goToPanel(page[1]);
    });




    $(".contactInfo").hover(function(ev) {
        if (detectmob()) {
            return
        }
        console.log('hover')
        var id = ev.currentTarget.getAttribute("data-link");
        $('#' + id + 'Basic').addClass('hideMe');
        $('#' + id + 'Details').removeClass('hideMe');


    }, function(ev) {
        if (detectmob()) {
            return
        }
        var id = ev.currentTarget.getAttribute("data-link");
        $('#' + id + 'Basic').removeClass('hideMe');
        $('#' + id + 'Details').addClass('hideMe');
    });

    $(".infoLink").click(function(ev) {

        ev.stopPropagation();
        var infoBox = ev.currentTarget.getAttribute("data-link");
        var data = $('#' + infoBox + 'Info').html();
        $('#blackout').html(data);
        $('#blackout').removeClass("hideMe");
        t = "";
        wheelLock = true;
        $(".infoBox").click(function(ev) {
            closeInfo();
        });


    });

    $(".layer").click(function(ev) {

        ev.stopPropagation();
        carouselsControls[current_carousel].up();
    });

    $(".social").click(function(ev) {
        var page = ev.currentTarget.dataset['link'];

        switch (page) {

            case 'facebook':
                var link = 'https://www.facebook.com/zubair.lawrence';
                window.open(link);
                break
            case '500':
                var link = 'http://www.500px.com/lizardpros';
                window.open(link);
                break

            case 'twitter':
                var link = 'https://twitter.com/lizardpro';
                window.open(link);
                break
        }


    });

    function detectmob() {
        // var acc = event.hasOwnProperty("acceleration");
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i)
            //||  (!acc && navigator.userAgent.match(/iPad/i) )
            || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        } else {
            return false; //false
        }
    }

    carouselsControls = new Carousel("body");
    for (var i = 0; i < carousels_count; i++) {

        indexName[i] = carousels[i].id;

        current_pane[i] = 0;
        var names = $(carousels[i]).find("li").map(function() {
            return this.id;
        })
        names = $.map(names, function(k, v) {
            return [k];
        });


        pageNames[i] = names;

    }

    setPaneDimensions();
    updateLocationUi();
    goToHashPage();
    loadTwitter();

    if (document.addEventListener) {
        // IE9, Chrome, Safari, Opera
        document.addEventListener("mousewheel", MouseWheelHandler, false);
        // Firefox
        document.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    }
    // IE 6/7/8
    else document.attachEvent("onmousewheel", MouseWheelHandler);

    window.onscroll = function(oEvent) {
        $(window).scrollTop();
    }

    var countEle = document.getElementById('countDown');
    var countTime = 6
    for (i = 0; i < 7; i++) {

        console.log(i)

        setTimeout(function(index) {
            return function() {
                setTimer(index)
            }
        }(countTime), i * 1000);

        countTime--

    }

    $('.landingsizer').addClass('hideMe');

    function setTimer(i) {
        countEle.innerHTML = i

        if (i) {
            //document.getElementById('blackout').innerHTML = ''

            $("#blackout").addClass("hideMe");
            $("#blackout").removeClass("helpOverlay");
            $('.landingsizer').removeClass('hideMe');

        }

    }


    var order_id = null;
    $('.customButton').click(function(e) {
        var token = function(res) {

            console.log(res)
            console.log(e.currentTarget.id)
            res.photo_id = e.currentTarget.getAttribute('data-id');
            res.photo_price = e.currentTarget.getAttribute('data-price');

            $.post(MAIN_URL + "/photos/order", res).done(
                function(data) {

                    document.getElementById('blackout').innerHTML = 'Oredr Has been places';
                    $("#blackout").removeClass("hideMe");


                });

        };
        var price = e.currentTarget.getAttribute('data-price');
        var title = e.currentTarget.getAttribute('data-title')

        StripeCheckout.open({
            key: 'pk_test_dTG0HibCg8vzNizXPj8xbiyz',
            address: true,
            amount: price,
            currency: 'usd',
            name: title,
            description: 'A bag of Pistachios',
            panelLabel: 'Checkout',
            token: token
        });

        return false;
    });

})();