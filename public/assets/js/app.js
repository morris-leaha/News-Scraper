$(function () {

    var articleDiv = $(".container");

    // RENDER HOMEPAGE BLANK
    articleDiv.hide();

    // HANDLE ARTICLE SCRAPE
    $(".scrape-newArticles").on("click", displayArticles);

    // HANDLE ARTICLE CLEAR
    $(".clear-articles").on("click", clearArticles);

    // HANDLE ARTICLE SAVE
    // $(document).on("click", ".save-article-btn", saveArticle);


    function displayArticles () {
        articleDiv.show();
    };

    function clearArticles () {
        articleDiv.hide();
    };

});