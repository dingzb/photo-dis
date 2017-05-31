$(function() {

    var curSrc = 0;
    var curFolder = '';

    var thirdExplorDis = true;
    var agencyDis = false;
    var photoGroupDis = false;
    var photoDis = false;

    var ps = [];

    $.each(allPhotos, function(aphs) {
        $('#thirdExplor').append('<div id="third_' + aphs + '"></div>');
        var thirdLine = $('#third_' + aphs);
        $.each(allPhotos[aphs], function(aph) {
            thirdLine.append('<div class="thirdFolder"><div><span>' + aph + '</span><div><div></div></div>');
        });
    });

    // $.each(agencyPhotos, function(ag) {
    //     $('#explors').append('<div id="agencyGroup_' + ag + '"></div>');
    //     var agencyLine = $('#agencyGroup_' + ag);
    //     $.each(agencyPhotos[ag], function(a) {
    //         agencyLine.append('<div class="agency"><div><span>' + a + '</span><div><div></div></div>');
    //     });
    //     // $('#explors').append('<div class="folder"><div><span>' + i + '</span><div><div></div></div>');
    // });

    $('#screen').css({
        top: window.innerHeight
    });

    $('#explor').css({
        top: window.innerHeight
    });

    $('#explors').css({
        top: window.innerHeight
    });

    $(".thirdFolder").bind("click", function(e) {

        $('#thirdExplor').animate({
            top: window.innerHeight + 'px'
        }, 700);
        var whatName = $(this).text();
        $('#whatName').find('span').text(whatName);
        $('#explors').find('div[id^="thirdLine_"]').remove();

        var thirdLineIndex = $(this).parent().attr('id').split('_')[1];

        var thirdGroup = allPhotos[thirdLineIndex][whatName];

        $.each(thirdGroup, function(pg) {
            $('#explors').append('<div id="thirdLine_' + pg + '"></div>');
            var thirdLine = $('#thirdLine_' + pg);
            $.each(thirdGroup[pg], function(p) {
                thirdLine.append('<div id="thirdPhoto_' + thirdLineIndex + '_' + whatName + '_' + pg + '_' + p + '" class="agency"><div><span>' + p + '</span><div><div></div></div>');
            });
            agencyBind();
        });

        var tv = ($(window).height() - $('#explors').outerHeight()) / 2 - 50;
        $('#explors').animate({
            top: tv
        }, 700);

        $('#return-to-third').animate({
            marginTop: 5 - tv,
            paddingBottom: tv - 5
        }, 700);

        thirdExplorDis = false;
        agencyDis = true;
    });

    $('#return-to-third').bind('click', function(e) {
        $('#explors').animate({
            top: window.innerHeight
        }, 700);
        $('#return-to-third').animate({
            marginTop: 0,
            paddingBottom: 0
        }, 700);
        $('#thirdExplor').animate({
            top: ($(window).height() - $('#thirdExplor').outerHeight()) / 2 - 50
        }, 700);
        thirdExplorDis = false;
        agencyDis = false;
    });

    $('#return-to-agency').bind('click', function(e) {
        $('#explor').animate({
            top: window.innerHeight
        }, 700);
        $('#return-to-agency').animate({
            marginTop: 0,
            paddingBottom: 0
        }, 700);
        

        var tv = ($(window).height() - $('#explors').outerHeight()) / 2 - 50;

        $('#explors').animate({
            top: tv
        }, 700);

        $('#return-to-third').animate({
            marginTop: 5 - tv,
            paddingBottom: tv - 5
        }, 700);

        agencyDis = true;
        photoGroupDis = false;
    });

    function agencyBind() {
        $(".agency").bind("click", function(e) {

            $('#explors').animate({
                top: window.innerHeight + 'px'
            }, 700);
            var agencyName = $(this).text();
            $('#agencyName').find('span').text(agencyName);
            $('#explor').find('div[id^="photoGroup_"]').remove();

            // console.info(this);
            // console.info($(this).attr('id'))
            // console.info($(this).attr('id').split('_'))

            var indes = $(this).attr('id').split('_');

            var photoGroup = allPhotos[indes[1]][indes[2]][indes[3]][indes[4]];

            $.each(photoGroup, function(pg) {

                $('#explor').append('<div id="photoGroup_' + pg + '"></div>');
                var photoLine = $('#photoGroup_' + pg);
                $.each(photoGroup[pg], function(p) {
                    photoLine.append('<div id="photo_' + indes[1] + '_' + indes[2] + '_' + indes[3] + '_' + indes[4] + '_' + pg + '_' + p + '" class="folder"><div><span>' + p + '</span><div><div></div></div>');
                });
                folderBind();
            });

            var tv = ($(window).height() - $('#explor').outerHeight()) / 2 - 50;
            $('#explor').animate({
                top: tv
            }, 700);

            $('#return-to-agency').animate({
                marginTop: 5 - tv,
                paddingBottom: tv - 5
            }, 700);

            $('#return-to-third').animate({
                marginTop: 0,
                paddingBottom: 0
            }, 700);

            agencyDis = false;
            photoGroupDis = true;
        });
    }

    function folderBind() {
        $(".folder").bind("click", function(e) {

            $('#explor').animate({
                top: window.innerHeight + 'px'
            }, 700);

            $('#return-to-agency').animate({
                marginTop: 0,
                paddingBottom: 0
            }, 700);


            $('.header').animate({
                height: '50px'
            }, 700);

            $('#screen').animate({
                top: 0,
                height: window.innerHeight + 'px'
            }, 700, function() {
                $('.header').css({
                    height: '50px'
                });
                $('#return').css({
                    display: 'inline-block'
                });
                $('#title').css({
                    display: 'inline-block'
                });
                $('#show').css({
                    display: 'inline-block'
                });
            });

            curFolder = $(this).find('span').text();
            curSrc = 0;
            var ids = $(this).attr('id').split('_');
            // console.info(ids)
            ps = allPhotos[ids[1]][ids[2]][ids[3]][ids[4]][ids[5]][ids[6]];
            // console.info(ps);
            $.each(ps[0], function(src) {
                // console.info(src)
                showImgVide(src);
                setDesc(ps[0][src]);
            })


            $('#title').text(curFolder)

            photoGroupDis = false;
            photoDis = true
        });
    }

    $('#return').bind('click', function() {

        $('#img').attr('src', '');
        $('#video').attr('src', '');

        var tv = ($(window).height() - $('#explors').outerHeight()) / 2 - 50;
        $('#explor').animate({
            top: tv
        }, 700);

        $('#return-to-agency').animate({
            marginTop: 5 - tv,
            paddingBottom: tv - 5
        }, 700);

        $('.header').animate({
            height: '0'
        }, 700);

        $('#screen').animate({
            top: window.innerHeight + 'px',
            height: 0
        }, 700, function() {
            $('.header').css({
                height: 0
            });
            $('#return').css({
                display: 'none'
            });
            $('#title').css({
                display: 'none'
            });
            $('#show').css({
                display: 'none'
            });
        });

        curFolder = '';
        curSrc = 0;

        photoGroupDis = true;
        photoDis = false
    });



    $('#next').bind('click', next);

    $('#previous').bind('click', previous);

    $(document).keydown(function(event) {
        if (curFolder) {
            if (event.keyCode == 37) {
                previous();
            } else if (event.keyCode == 39) {
                next();
            }
        }
    });

    function previous() {
        // if (curSrc === 0) {
        //     curSrc = agencyPhotos[curFolder].length;
        // }
        // showImgVide(agencyPhotos[curFolder][--curSrc]);

        if (curSrc === 0) {
            curSrc = ps.length;
        }
        $.each(ps[--curSrc], function(s) {
            setDesc(ps[curSrc][s]);
            showImgVide(s);
        })

    }

    function next() {
        // if (++curSrc === agencyPhotos[curFolder].length) {
        //     curSrc = 0;
        // }
        // showImgVide(agencyPhotos[curFolder][curSrc]);

        if (++curSrc === ps.length) {
            curSrc = 0;
        }
        // console.info(ps)
        $.each(ps[curSrc], function(s) {
            setDesc(ps[curSrc][s]);
            showImgVide(s);

        })
    }

    function showImgVide(src) {
        var image = $('#img');
        var video = $('#video');

        if (src.endsWith('.mp4')) {
            image.animate({
                opacity: 0.2
            }, 450, function() {
                image.css('display', 'none');
                image.attr('src', '');
            });
            video.animate({
                opacity: 0.2
            }, 450, function() {
                video.attr('src', src);
                video.css({
                    display: 'inline-block',
                    opacity: 0.2
                });
                video.animate({
                    opacity: 1
                }, 450);
            });
            // $('#video').attr('src', src);
            // $('#video').css('display', 'inline-block');
            // $('#img').css('display', 'none');
            // $('#img').attr('src', '');
        } else {

            video.animate({
                opacity: 0.2
            }, 450, function() {
                $('#video').css('display', 'none');
                $('#video').attr('src', '');
            });

            image.animate({
                opacity: 0.2
            }, 450, function() {
                image.attr('src', src);
                image.css({
                    display: 'inline-block',
                    opacity: 0.2
                });
                image.animate({
                    opacity: 1
                }, 450);
            });
        }
    }

    function setDesc(desc) {
        $('#desc').text(desc);
    }

    $(window).resize(function() {

        if (thirdExplorDis) {
            $('#thirdExplor').css({
                top: ($(window).height() - $('#thirdExplor').outerHeight()) / 2 - 50
            });
        }

        if (agencyDis) {
            $('#explors').css({
                top: ($(window).height() - $('#explors').outerHeight()) / 2 - 50
            });
        }

        if (photoGroupDis) {
            var tv = ($(window).height() - $('#explors').outerHeight()) / 2 - 50;
            $('#explor').css({
                top: tv
            });
            $('#return-to-agency').css({
                marginTop: 10 - tv,
                paddingBottom: tv - 10
            });
        }

    });

    $(window).resize();
    $(".photo").on("swipeleft", function() {
        next();
    });
    $(".photo").on("swiperight", function() {
        previous();
    });
});
