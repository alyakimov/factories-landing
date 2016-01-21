$(window).load(function() {

    $(".modal-specialist").fancybox({
        maxWidth: 960,
        maxHeight: 1024,
        width: '70%',
        height: '70%',
        fitToView: false,
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none',
        helpers: {
            overlay: {
                locked: false
            }
        }
    });

    $(".modal-program").fancybox({
        maxWidth: 1000,
        maxHeight: 768,
        width: '70%',
        height: '70%',
        fitToView: false,
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none',
        helpers: {
            overlay: {
                locked: false
            }
        }
    });

    $('#rewiews-slider').carouFredSel({
        width: 960,
        height: 'variable',
        responsive: true,
        scroll: {
            items: 1,
            pauseOnHover: true
        },
        swipe: {
            onTouch: true,
            onMouse: true
        },
        items: {
            visible: {
                min: 2,
                max: 2
            },
            height: 'variable',
            width: 460
        },
        prev: '#rewiews-slider-prev',
        next: '#rewiews-slider-next',
        auto: 5000
    }).trigger('resize');

    $('#specialists-slider').carouFredSel({
        width: 960,
        height: 'variable',
        responsive: true,
        scroll: {
            items: 1
        },
        swipe: {
            onTouch: true,
            onMouse: true
        },
        items: {
            visible: {
                min: 4,
                max: 4
            },
            height: 'variable',
            width: 220
        },
        prev: '#specialists-slider-prev',
        next: '#specialists-slider-next',
        auto: false
    }).trigger('resize');

    $('#calculate-submit').click(function(event) {

        event.preventDefault();

        var height = parseInt($('#calculate_height').val());
        var weight = parseInt($('#calculate_weight').val());

        if (isNaN(height) || isNaN(weight)) {
            $('#calculate-result').html('<div class="formula-calculate-result"><div class="formula-calculate-result-title">Неверный формат данных</div></div>');
        } else {

            var imt = Math.round(weight / Math.pow(height / 100, 2));
            var imt_comment = "";
            var imt_smile = ":-)";

            if (imt < 18.5) {
                imt_comment = "Дефицит массы тела. Низкий  риск возникновения сердечно-сосудистых заболеваний, сахарного диабета 2 типа, онкозаболеваний (повышен риск других заболеваний).";
                imt_smile = ":-(";
            }
            if (imt >= 18.5 && imt <= 24.9) {
                imt_comment = "Нормальная масса тела. Обычный риск возниковения сердечно-сосудистых заболеваний, сахарного диабета 2 типа, онкозаболеваний.";
                imt_smile = ":-)";
            }
            if (imt >= 25 && imt <= 29.9) {
                imt_comment = "Избыточная масса тела (предожирение). Повышенный риск возникновения сердечно-сосудистых заболеваний, сахарного диабета 2 типа, онкозаболеваний.";
                imt_smile = ":-(";
            }
            if (imt >= 30 && imt <= 34.9) {
                imt_comment = "Ожирение I степени. Высокий риск возникновения сердечно-сосудистых заболеваний, сахарного диабета 2 типа, онкозаболеваний.";
                imt_smile = ":-(";
            }
            if (imt >= 35 && imt <= 39.9) {
                imt_comment = "Ожирение II степени. Очень высокий риск возникновения сердечно-сосудистых заболеваний, сахарного диабета 2 типа, онкозаболеваний.";
                imt_smile = ":-(";
            }
            if (imt >= 40) {
                imt_comment = "Ожирение III степени. Чрезвычайно высокий  риск возникновения сердечно-сосудистых заболеваний, сахарного диабета 2 типа, онкозаболеваний.";
                imt_smile = ":-(";
            }

            $('#calculate_height').val(height);
            $('#calculate_weight').val(weight);
            $('#calculate-result').html('<div class="formula-calculate-result"><div class="formula-calculate-result-title"><p>Результат: <span class="text-orange">' + imt_smile + '</span> Ваш ИМТ = <span class="text-orange">' + imt + '</span></p></div><div class="formula-calculate-result-description"><p>' + imt_comment + '</p></div></div>');
        }
    });

    $('[id^=question-]').click(function(event) {

        event.preventDefault();

        var question = this.id.split("-");
        var questionId = question[1];

        var answerId = "answer-" + questionId;

        $('#' + answerId).toggle();
    });

    $(".feedback-form-action").click(function(event) {

        event.preventDefault();
        
        var form = $(this).closest('form');
        var form_data = form.serialize();
        var message = form.find(".feedback-form-message");

        message.text("");

        $.ajax({
            type: "POST",
            url: "http://www.factorvesa.ru/ajax.mail.php",
            dataType:"json",
            data: form_data,
            success: function(data) {

                if (data.status == "success") {
                    message.text(data.message);
                } else {
                    message.text(data.message);
                }
            }
        });
    });
});