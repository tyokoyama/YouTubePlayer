function searchCtrl($scope) {
	$scope.search = function() {
		$scope.items = [];

		var request = gapi.client.youtube.search.list({
		q: $scope.searchText,
		part: 'snippet'
		});

		request.execute(function(response) {
			$scope.$apply(function() {
				$scope.searchResult = response.result;
				$scope.items = response.result.items;

				var VIDEO_ID = $scope.searchResult.items[0].id.videoId;

				// Youtubeのコントロールで動画の切り替えができないので
				// 毎回要素を削除して追加しないといけない…？
				var wrapper = document.getElementById('ytapiplayer-wrapper');
				var oldplayer = document.getElementById('ytapiplayer');
				wrapper.removeChild(oldplayer);

				var player = document.createElement('div');
				player.id = 'ytapiplayer';
				wrapper.appendChild(player);

				var params = { allowScriptAccess: "always"};
				var atts = {id: "ytapiplayer"};
				swfobject.embedSWF("http://www.youtube.com/v/" + VIDEO_ID + "?enablejsapi=1&playerapiid=ytplayer&version=3",
								   "ytapiplayer", "425", "356", "8", null, null, params, atts);

				$scope.$digest();
			});
		});

	};
}