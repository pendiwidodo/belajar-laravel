// const {forEach} = require("lodash");
$(window).on("load", function () {
    $(".owl-carousel-dual").owlCarousel({
        loop: true,
        center: true,
        margin: 10,
        nav: true,
        dots: true,
        autoHeight: true,
        autoWidth: false,
        stagePadding: 120,
        lazyLoad: true,
        lazyLoadEager: 3,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        navText: [$(".next-dual"), $(".prev-dual")],
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: false,
                stagePadding: 30,
                center: false,
            },
            640: {
                items: 1,
                nav: false,
                dots: false,
            },
            1024: {
                items: 3,
            },
        },
    });

    $(".owl-carousel-multi").owlCarousel({
        center: true,
        loop: true,
        margin: 20,
        nav: true,
        lazyLoad: true,
        lazyLoadEager: 3,
        autoHeight: true,
        autoWidth: true,
        navContainer: $(".nav-multi"),
        navElement: "div",
        navText: [$(".next-multi"), $(".prev-multi")],
        responsive: {
            0: {
                items: 1,
            },
            640: {
                items: 3,
            },
            1024: {
                items: 3,
            },
        },
    });
});

//berfungsi untuk memparsing dan menampilkan data content
displayJson = (end) => {
    //mengambil data dari json
    fetch("js/data.json")
        .then((response) => response.json())
        .then((data) => {
            const containerCard = document.querySelector(".container_card");
            const cardTemplate = document.getElementById("card_template");
            containerCard.innerHTML = "";
            //memotong dan menampilkan data
            function parsingData(end) {
                let start = 0;
                if (end <= data.length) {
                    //memotong data dari json
                    let dataSlice = data.slice(start, end);
                    //mentampilkan data hasil potongan data
                    dataSlice.forEach((dataSlice) => {
                        const div = cardTemplate.content.cloneNode(true);
                        div.getElementById("judul_content").textContent =
                            dataSlice.title;
                        containerCard.append(div);
                    });
                } else {
                    const dataLength = data.length;
                    end = dataLength;
                    parsingData(end);
                }
            }
            parsingData(end);

            // data.forEach((data) => {
            //     const div = cardTemplate.content.cloneNode(true);
            //     div.getElementById("judul_content").textContent = data.title;
            //     div.getElementById("gambar_content").setAttribute(
            //         "data-src",
            //         `` + data.coverImage + ``
            //     );
            // div.getElementById("gambar_content").src = data.coverImage;
            // div.getElementById("link_content").href = data.link;
            // div.getElementById("creator_content").textContent = data.creator;
            // div.getElementById("created_at").textContent = data.details;
            // containerCard.append(div);
            // window.addEventListener("load", () => {
            //     renderCard();
            // })
            // setTimeout(function () {
            //     renderCard();
            // }, 3000);
            // });
        });
};
renderCard = () => {
    const skeletons_animasi = document.querySelectorAll(".skeleton_animasi");
    skeletons_animasi.forEach((skeleton_animasi) => {
        skeleton_animasi.classList.remove("animate-pulse");
        const skeletons_remover = skeleton_animasi.querySelectorAll(
            ".hidden,.bg-gray-300"
        );
        skeletons_remover.forEach((skeletons_remover) => {
            skeletons_remover.classList.remove("hidden");
            skeletons_remover.classList.remove("bg-gray-300");
        });
    });
};

$(window).on("load", function () {
    const targets = document.querySelectorAll(".skeleton_gambar");
    targets.forEach((target) => {
        const targetimg = target.querySelectorAll("img");
        const lazyLoad = (target) => {
            const io = new IntersectionObserver((entries, observer) => {
                // var end = 0;
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // console.log(entry);
                        const img = entry.target;
                        const src = img.getAttribute("data-src");
                        img.setAttribute("src", src);
                        observer.disconnect();
                    }
                });
            });
            io.observe(target);
        };
        targetimg.forEach(lazyLoad);
    });
});

setInterval(() => {
    renderCard();
}, "1000");
