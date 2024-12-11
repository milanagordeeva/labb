// jQuery код
$(document).ready(function () {
    // изменение стиля шапки при наведении
    $(".welcome").hover(
        function () {
            $(this).css("background-color", "#0B2B26");
        },
        function () {
            $(this).css("background-color", "");
        }
    );

    $("#detailed-features").click(function () {
        // Проверяем, есть ли уже элемент с текстом "Новая функция!"
        if ($("ol li:contains('Новая функция!')").length === 0) {
            // Если элемента нет, добавляем новый
            $("ol").append("<li>Контроль параметров тела</li>");
        } 
    });
    
    
    // плавный скролл по навигационным ссылкам
    $(".nav-link").click(function (event) {
        event.preventDefault();
        const target = $(this).attr("href");
        $("html, body").animate(
            {
                scrollTop: $(target).offset().top,
            },
            1000
        );
    });


    $('#sign-in').click(function(event) {
        // Изменяем текст в заголовке на "Вы вошли!"
        $(".welcome h1").text("Вы вошли!").fadeIn(1000);
    
        // Через 3 секунды скрываем текст
        setTimeout(function () {
            $(".welcome h1").fadeOut(1000);
        }, 3000);
    });

    $("#sign-up").click(function () {
        // Изменяем текст в заголовке на "Вы зарегистрировались!"
        $(".welcome h1").text("Вы зарегистрировались!").fadeIn(1000);
    
        // Через 3 секунды скрываем текст
        setTimeout(function () {
            $(".welcome h1").fadeOut(1000);
        }, 3000);
    });
    
});



