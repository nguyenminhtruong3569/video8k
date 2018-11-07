(function(angular) {
    youtubeApp.controller('trendingPageController', ['$rootScope', '$scope', '$state', 'searchService', '$stateParams',
        function($rootScope, $scope, $state, searchService, $stateParams) {
            $scope.init = function() {
                var categoryId;
                switch ($stateParams.category) {
                    case 'music':
						document.title = 'Video8k - Most Popular Music Videos';
                        $scope.title = 'Most Popular Music Videos';
                        categoryId = 10;
                        break;
                    case 'sports':
						document.title = 'Video8k - Most Popular Sports Videos';
                        $scope.title = 'Most Popular in Sports';
                        categoryId = 17;
                        break;
                    case 'technology':
						document.title = 'Video8k - Most Popular Technology Videos';
                        $scope.title = 'Most Popular Technology Videos';
                        categoryId = 28;
                        break;
                    case 'movies':
						document.title = 'Video8k - Most Popular Movies Videos';
                        $scope.title = 'Most Popular Movies Videos';
                        categoryId = 1;
                        break;
                    case 'comedy':
						document.title = 'Video8k - Most Popular Comedy Videos';
                        $scope.title = 'Most Popular Comedy Video';
                        categoryId = 23;
                        break;
                    case 'People & Blogs':
						document.title = 'Video8k - Most Popular People & Blogs Videos';
                        $scope.title = 'Most Popular People & Blogs Videos';
                        categoryId = 15;
                        break;
                    default:
						document.title = 'Video8k - Most Popular Videos';
                        $scope.title = 'Most Popular Videos';
                        categoryId = null;
                }

                $scope.loader = true;
                parameters = {
                    'videoCategoryId': categoryId,
                    'part': 'snippet,statistics,contentDetails',
                    'maxResults': 12,
                    'chart': 'mostPopular',
                    'pageToken' : $stateParams.pageToken
                }
                searchService.getVideos(parameters).then(function(data) {
                    for (var i = 0; i < data.items.length; i++) {
                        var id = data.items[i].id;
                        data.items[i].id = {};
                        data.items[i].id.videoId = id;
                    }
                    $scope.nextPageToken = data.nextPageToken;
                    $scope.prevPageToken = data.prevPageToken;
                    $scope.videos = data.items;
                    $scope.loader = false;
                })
            }

            $scope.nextOrPrev = function(pageToken) {
                $state.go('home.trending', { category: $stateParams.category, pageToken: pageToken });
            }
        }
    ]);
})(window.angular);
