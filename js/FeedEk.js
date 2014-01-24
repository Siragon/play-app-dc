/*
* FeedEk jQuery RSS/ATOM Feed Plugin v2.0
* http://jquery-plugins.net/FeedEk/FeedEk.html  https://github.com/enginkizil/FeedEk
* Author : Engin KIZIL http://www.enginkizil.com   
*/

(function ($) {
    $.fn.FeedEk = function (opt) {
        var def = $.extend({
            FeedUrl: "http://rss.cnn.com/rss/edition.rss",
            MaxCount: 5,
            ShowDesc: true,
            ShowPubDate: true,
            CharacterLimit: 0,
            TitleLinkTarget: "_blank",
            DateFormat: "",
            DateFormatLang:"en"
        }, opt);

        var id = $(this).attr("id"), i, s = "",dt;
        $("#" + id).empty().append('<img src="loader.gif" />');

        $.ajax({
            url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" + def.MaxCount + "&output=json&q=" + encodeURIComponent(def.FeedUrl) + "&hl=en&callback=?",
            dataType: "json",
            success: function (data) {
                $("#" + id).empty();
                $.each(data.responseData.feed.entries, function (e, item) {
					 s += '<li>'
                    if (def.ShowPubDate){
                        dt= new Date(item.publishedDate);
                        if ($.trim(def.DateFormat).length > 0) {
                            try {
                                moment.lang(def.DateFormatLang);
                                s += '<time class="cbp_tmtime"><span>' + moment(dt).format(def.DateFormat) + "</span> <span>18:30</span></time>";
                            }
                            catch (e){s += '<time class="cbp_tmtime"><span>' + dt.toLocaleDateString() + "</span> <span>18:30</span></time>";}                            
                        }
                        else {
                            s += '<time class="cbp_tmtime"><span>' + dt.toLocaleDateString() + "</span> <span>" + dt.getHours() +":"+ dt.getMinutes()  + "</span></time>";
                        }                        
                    }
					var $xml = $( $.parseXML(item.content) ),
						$span = $xml.find( "span" )[1].textContent;
					if($span == "forked"){
						s+= '<div class="cbp_tmicon cbp_tmicon-forked"></div>';
					}
					if($span == "created"){
						s+= '<div class="cbp_tmicon cbp_tmicon-created "></div>';
					}
                    if (def.ShowDesc) {
                        if (def.DescCharacterLimit > 0 && item.content.length > def.DescCharacterLimit) {
							s += '<div class="cbp_tmlabel"><h2><a href="' + item.link + '" target="' + def.TitleLinkTarget + '" >' + item.title + "</a></h2>";
                            s += '<p>' + item.content.substr(0, def.DescCharacterLimit) + "...</p>";
                        }
                        else {
							s += '<div class="cbp_tmlabel"><h2 class="itemTitle"><a href="' + item.link + '" target="' + def.TitleLinkTarget + '" >' + item.title + "</a></h2>";
                            s += '<p>' + item.content + "</p></div></li>";
                        }
                    }
					
					

					var $xml = $( $.parseXML(item.content) ),
						$span = $xml.find( "span" )[1].textContent;
					console.log($span);
                });
                $("#" + id).append('<ul class="cbp_tmtimeline">' + s + "</ul>");
            }
        });
    };
})(jQuery);

/* 					<li>
						<time class="cbp_tmtime" datetime="2013-04-10 18:30"><span>4/10/13</span> <span>18:30</span></time>
						<div class="cbp_tmicon cbp_tmicon-phone"></div>
						<div class="cbp_tmlabel">
							<h2>Ricebean black-eyed pea</h2>
							<p>Winter purslane courgette pumpkin quandong komatsuna fennel green bean cucumber watercress. Pea sprouts wattle seed rutabaga okra yarrow cress avocado grape radish bush tomato ricebean black-eyed pea maize eggplant. Cabbage lentil cucumber chickpea sorrel gram garbanzo plantain lotus root bok choy squash cress potato summer purslane salsify fennel horseradish dulse. Winter purslane garbanzo artichoke broccoli lentil corn okra silver beet celery quandong. Plantain salad beetroot bunya nuts black-eyed pea collard greens radish water spinach gourd chicory prairie turnip avocado sierra leone bologi.</p>
						</div>
					</li> */