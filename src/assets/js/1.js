
$('.fb-list').owlCarousel2({
    nav: true,
    dots: false,
    slideBy: 1,
    margin: 5,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    responsive: {
        0: { items: 2 },
        600: { items: 3 },
        1000: { items: 4 }
    }
});
$(".feedback .caption a").on("click", function (event) {
    event.stopPropagation();
});

$(".feedback .caption").on("click", function (event) {
    var items = [];
    $(".feedback .item").each(function () {
        items.push({
            src: $(this).find("a").first().attr("href"),
            titleSrc: $(this).find('.caption').html()
        });
    });

    var index = $(this).parent().parent().index();

    $.magnificPopup.open({
        type: 'image',
        gallery: {
            enabled: true
        },
        items: items,
        mainClass: 'mfp-feedback',
        image: {
            titleSrc: function (item) {
                return item.data.titleSrc;
            }
        }
    }, index);
});
