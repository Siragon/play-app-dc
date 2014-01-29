global.$ = $;

require('nw.gui').Window.get().showDevTools();
/* var abar = require('address_bar');
var folder_view = require('folder_view');
var path = require('path'); */
var shell = require('nw.gui').Shell;
//var Twitter = require('twitter').Twitter;
var Github = require('github');


$(document).ready(function() {


/*   var folder = new folder_view.Folder($('#files'));
  var addressbar = new abar.AddressBar($('#addressbar'));

  folder.open(process.cwd());
  addressbar.set(process.cwd());

  folder.on('navigate', function(dir, mime) {
    if (mime.type == 'folder') {
      addressbar.enter(mime);
    } else {
      shell.openItem(mime.path);
    }
  });

  addressbar.on('navigate', function(dir) {
    folder.open(dir);
  }); */

/* (function ($) {
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
							s += '<div class="cbp_tmlabel"><h2><a href="' + item.link + '" target="' + def.TitleLinkTarget + '" >' + item.title.replace("Siragon","") + "</a></h2>";
                            s += '<p>' + item.content.substr(0, def.DescCharacterLimit) + "...</p>";
                        }
                        else {
							s += '<div class="cbp_tmlabel"><h2 class="itemTitle"><a href="' + item.link + '" target="' + def.TitleLinkTarget + '" >' + item.title.replace("Siragon","") + "</a></h2>";
                            s += '<p>' + item.content + "</p></div></li>";
                        }
                    }
                });
                $("#" + id).append('<ul class="cbp_tmtimeline">' + s + "</ul>");
            }
        });
    };
})(jQuery); */
/* 
var error = function (err, response, body) {
    //console.log('ERROR [%s]', err);
};
var success = function (data) {
    //console.log('Data [%s]', data);
}; */

/* var twitter = new Twitter({
    "consumerKey": "",
    "consumerSecret": "",
    "accessToken": "",
    "accessTokenSecret": "",
    "callBackUrl": "http://www.siragon.com"
});

//twitter.getUserTimeline({ screen_name: 'siragon_dev', count: '10'}, error, success);
twitter.getTweet({ id: '412939686286749696'}, error, success);
twitter.getTweet({ id: '408322882134372352'}, error, success); */

var github = new Github({
  username: "Siragon-Committer",
  password: "",
  auth: "basic"
});

var orgname = "Siragon";

var user = github.getUser();
var username = "Siragon-Committer"

/* user.subscribers(username, function(err, subscribers) {
	console.log(subscribers);
});
 */
/* user.orgRepos(orgname, function(err, repos) {
	console.log(repos);
}); */

user.orgEvents(username, orgname, function(err, events) {
	console.log(JSON.stringify(events));
	var id = "main";
	var s = "";
                $("#" + id).empty();
                $.each(events, function (e, item) {
					console.log(e);
					console.log(item);
					dt= new Date(item.created_at);
					switch (item.type) {
					  case 'CreateEvent':
						s += '<li>';
						s += '	<ul id="messages">';
						s += '		<li>';
						s += '			<div class="infos flip-container" ontouchstart="this.classList.toggle(\'hover\');">';
						s += '					<div class="flipper">';
						s += '						<div class="front">';
						s += '						<img src="'+item.actor.avatar_url+'" alt="" title="'+item.actor.gravatar+'" />';
						s += '						</div>';
						s += '						<div class="back">';
						s += '						<time class="cbp_tmtime" datetime="2013-04-10 18:30"><span>' + dt.toLocaleDateString() + '</span> <span>' + dt.getHours() +':'+ dt.getMinutes()  + '</span></time>';
						s += '						</div>';
						s += '					</div>';
						s += '				<a href="http://twitter.com/webodream" class="sprite twitter">@webodream</a>';
						s += '				<a href="http://www.facebook.com/groups/115089745169149" class="sprite facebook">depot.webdesigner</a>';
						s += '				<a href="https://github.com/'+item.actor.login+'" class="sprite github">'+item.actor.login+'</a>';
						s += '			</div>';
						s += '		</li>';
						s += '	</ul>';
						s += '	<div class="cbp_tmicon cbp_tmicon-phone"></div>';
						s += '	<div class="cbp_tmlabel">';
						s += '		<h2>'+ item.type +'</h2>';
						s += '		<p>'+ item.payload.description +'</p>';
						s += '	</div>';
						s += '</li>';
						break;
					  default:
						break;
					}

					/*
					[
					  {
						"type": "Event",
						"public": true,
						"payload": {
						},
						"repo": {
						  "id": 3,
						  "name": "octocat/Hello-World",
						  "url": "https://api.github.com/repos/octocat/Hello-World"
						},
						"actor": {
						  "id": 1,
						  "login": "octocat",
						  "gravatar_id": "somehexcode",
						  "avatar_url": "https://github.com/images/error/octocat_happy.gif",
						  "url": "https://api.github.com/users/octocat"
						},
						"org": {
						  "id": 1,
						  "login": "github",
						  "gravatar_id": "somehexcode",
						  "url": "https://api.github.com/orgs/github",
						  "avatar_url": "https://github.com/images/error/octocat_happy.gif"
						},
						"created_at": "2011-09-06T17:26:27Z",
						"id": "12345"
					  }
					]
					
					*/
                });
                $("#" + id).append('<ul class="grid effect-2 cbp_tmtimeline" id="grid">' + s + "</ul>");
			new AnimOnScroll( document.getElementById( 'grid' ), {
				minDuration : 0.4,
				maxDuration : 0.7,
				viewportFactor : 0.2
			} );
            
});


/* var foo = {};
foo.bar = "new property";
foo.baz = 3;
var JSONfoo = JSON.stringify(foo);

//JSON Activity Streams 2.0

   {
     "verb": "post",
     "published": "2011-02-10T15:04:55Z",
     "language": "en",
     "actor": {
       "objectType": "person",
       "id": "urn:siragon:person:martin",
       "displayName": "Martin Smith",
       "url": "http://siragon.org/martin",
       "image": {
         "url": "http://siragon.org/martin/image.jpg",
         "mediaType": "image/jpeg",
         "width": 250,
         "height": 250
       }
     },
     "object" : {
       "objectType": "fork",
       "id": "urn:siragon:repo:abc123/xyz",
       "url": "http://siragon.org/blog/2011/02/entry",
       "displayName": "Why I love Activity Streams"
     },
     "target" : {
       "objectType": "repo",
       "id": "urn:siragon:repo:abc123",
       "displayName": "Martin's Blog",
       "url": "http://siragon.org/blog/"
     }
   }
   
   //Twitter
   
{
   "created_at":"Wed Dec 04 19:52:16 +0000 2013",
   "id":408322882134372352,
   "id_str":"408322882134372352",
   "text":"[exdroid-app-sop] https:\/\/t.co\/9sS24Sfa3y Jc-Rod - Review 4 sop &amp; new doc\n\nNew document Lista de materiales",
   "source":"\u003ca href=\"http:\/\/github.com\" rel=\"nofollow\"\u003eGitHub Service Hooks\u003c\/a\u003e",
   "truncated":false,
   "in_reply_to_status_id":null,
   "in_reply_to_status_id_str":null,
   "in_reply_to_user_id":null,
   "in_reply_to_user_id_str":null,
   "in_reply_to_screen_name":null,
   "user":{
      "id":2227138873,
      "id_str":"2227138873",
      "name":"S\u00edragon R&D",
      "screen_name":"Siragon_Dev",
      "location":"San Diego, Venezuela",
      "description":"Service Hook",
      "url":"http:\/\/t.co\/W9jRNefvTd",
      "entities":{
         "url":{
            "urls":[
               {
                  "url":"http:\/\/t.co\/W9jRNefvTd",
                  "expanded_url":"http:\/\/siragon.com\/",
                  "display_url":"siragon.com",
                  "indices":[
                     0,
                     22
                  ]
               }
            ]
         },
         "description":{
            "urls":[

            ]
         }
      },
      "protected":false,
      "followers_count":13,
      "friends_count":49,
      "listed_count":0,
      "created_at":"Mon Dec 02 19:05:58 +0000 2013",
      "favourites_count":0,
      "utc_offset":null,
      "time_zone":null,
      "geo_enabled":false,
      "verified":false,
      "statuses_count":37,
      "lang":"en",
      "contributors_enabled":false,
      "is_translator":false,
      "is_translation_enabled":false,
      "profile_background_color":"131516",
      "profile_background_image_url":"http:\/\/abs.twimg.com\/images\/themes\/theme14\/bg.gif",
      "profile_background_image_url_https":"https:\/\/abs.twimg.com\/images\/themes\/theme14\/bg.gif",
      "profile_background_tile":false,
      "profile_image_url":"http:\/\/pbs.twimg.com\/profile_images\/378800000821506678\/23d4ae980f4736fea38bdd949ee4a7d2_normal.png",
      "profile_image_url_https":"https:\/\/pbs.twimg.com\/profile_images\/378800000821506678\/23d4ae980f4736fea38bdd949ee4a7d2_normal.png",
      "profile_banner_url":"https:\/\/pbs.twimg.com\/profile_banners\/2227138873\/1386013929",
      "profile_link_color":"000000",
      "profile_sidebar_border_color":"000000",
      "profile_sidebar_fill_color":"EFEFEF",
      "profile_text_color":"333333",
      "profile_use_background_image":false,
      "default_profile":false,
      "default_profile_image":false,
      "following":false,
      "follow_request_sent":false,
      "notifications":false
   },
   "geo":null,
   "coordinates":null,
   "place":null,
   "contributors":null,
   "retweet_count":0,
   "favorite_count":0,
   "entities":{
      "hashtags":[

      ],
      "symbols":[

      ],
      "urls":[
         {
            "url":"https:\/\/t.co\/9sS24Sfa3y",
            "expanded_url":"https:\/\/github.com\/Siragon\/exdroid-app-sop\/commit\/0f27696260c27739a12bb4c557690cb1b5a585f3",
            "display_url":"github.com\/Siragon\/exdroi\u2026",
            "indices":[
               18,
               41
            ]
         }
      ],
      "user_mentions":[

      ]
   },
   "favorited":false,
   "retweeted":false,
   "possibly_sensitive":false,
   "lang":"en"
}


Tareas
Añada tareas e indique la persona responsable
Tiempo récord de tareas
Siga las tareas usando Calendario

Hitos
Marque las fases principales de su proyecto
Seleccione el hito clave
Siga hitos usando Calendario

Documentos
Cree documentos, hojas de cálculo, presentaciones
Edítelos directo en el portal
Hágalos automáticamente disponibles para el equipo del proyecto

Discusiones
Inicie discusión relacionada con el proyecto
Invite a los usuarios del proyecto
Obtenga feedback de los comentarios de los usuarios

Informes
Genere informes generales y detallados
Expórtelos al archivo CSV o imprima
Reciba informes automáticos por email
 */



/* 					<li>
						<time class="cbp_tmtime" datetime="2013-04-10 18:30"><span>4/10/13</span> <span>18:30</span></time>
						<div class="cbp_tmicon cbp_tmicon-phone"></div>
						<div class="cbp_tmlabel">
							<h2>Ricebean black-eyed pea</h2>
							<p>Winter purslane courgette pumpkin quandong komatsuna fennel green bean cucumber watercress. Pea sprouts wattle seed rutabaga okra yarrow cress avocado grape radish bush tomato ricebean black-eyed pea maize eggplant. Cabbage lentil cucumber chickpea sorrel gram garbanzo plantain lotus root bok choy squash cress potato summer purslane salsify fennel horseradish dulse. Winter purslane garbanzo artichoke broccoli lentil corn okra silver beet celery quandong. Plantain salad beetroot bunya nuts black-eyed pea collard greens radish water spinach gourd chicory prairie turnip avocado sierra leone bologi.</p>
						</div>
					</li> */
});
