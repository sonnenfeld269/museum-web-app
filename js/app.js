var app = angular.module('medienbank', ['ui.bootstrap', 'angular-virtual-keyboard']);

app.controller('TabController', function TabController($scope) {
    this.tab = 1;
    this.setTab = function(value) {
        this.tab = value;
    };
    this.isSet = function(checkTab) {
        return this.tab == checkTab;
    }

});

app.controller('DataController', function DataController($scope) {

    $scope.tab = 1;
    $scope.setTab = function(value) {
        $scope.tab = value;
    };
    $scope.isSet = function(checkTab) {
        return $scope.tab == checkTab;
    }


    $scope.personen = data_gefangen;
    $scope.lagerorte = data_lager;
    $scope.lagerFull = {};
    $scope.listText = "Gesamtliste anzeigen";
    $scope.letter = "";
    $scope.data_letters = data_letters;

    $scope.giveToModal = function(lager) {
        //if lager is tashkent send lager.tashkent.object to scope
        console.log("param: " + lager);
        for (var x = 0; x < data_lager.length; x++) {
            console.log("name inside list: " + data_lager[x].Ortsname);
            if (lager == data_lager[x].Ortsname) {
                console.log("name found");
                $scope.lagerFull = data_lager[x];
            }
        }

    };

    $scope.isInsideLager = function(lagerName) {
        for (var x = 0; x < data_lager.length; x++) {
            if (lagerName == data_lager[x].Ortsname) {
                return true;
            }
        }
        return false;
    }


    $scope.showOnClick = function() {
        $scope.show = true;
        $scope.reset();
    }

    $scope.setLetter = function(value) {
        $scope.searchText = "";
        $scope.letter = value;
    };

    $scope.isLetter = function(value) {
        return $scope.letter == value;
    };

    $scope.startsWith = function(actual, expected) {
        $scope.lowerStr = (actual + "").toLowerCase();
        return $scope.lowerStr.indexOf(expected.toLowerCase()) === 0;
    }

    $scope.reset = function() {
        $scope.searchText = "";
        $scope.letter = "";
    }
}).filter('startsWithLetter', function() {
    console.log("Inside startsWithLetter");

    return function(items, letters) {
        if (!letters || letters.length === 0) return items;

        console.log("Inside Filter: Starts with " + letters);
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var itemName = items[i].Name;
            //    console.log("itemName is: " + itemName);

            angular.forEach(letters, function(letter, key) {
                //      if (itemName.startsWith(itemName, letter)) {
                //          filtered.push(items[i]);
                //      }

                if (itemName.toLowerCase().indexOf(letter.toLowerCase()) === 0) {
                    console.log("YES!");
                    filtered.push(items[i]);
                }

            });
        }
        return filtered;
    };


});

app.config(['VKI_CONFIG', function(VKI_CONFIG) {
    VKI_CONFIG.layout['AT'] = {
        'name': "German",
        'keys': [
            [
                ["^", "\u00b0"],
                ["1", "!"],
                ["2", '"', "\u00b2"],
                ["3", "\u00a7", "\u00b3"],
                ["4", "$"],
                ["5", "%"],
                ["6", "&"],
                ["7", "/", "{"],
                ["8", "(", "["],
                ["9", ")", "]"],
                ["0", "=", "}"],
                ["\u00df", "?", "\\"],
                ["\u00b4", "`"],
                ["Löschen", "Bksp"]
            ],
            [
                ["Tab", "Tab"],
                ["q", "Q", "@"],
                ["w", "W"],
                ["e", "E", "\u20ac"],
                ["r", "R"],
                ["t", "T"],
                ["z", "Z"],
                ["u", "U"],
                ["i", "I"],
                ["o", "O"],
                ["p", "P"],
                ["\u00fc", "\u00dc"],
                ["+", "*", "~"],
                ["#", "'"]
            ],
            [
                ["Caps", "Caps"],
                ["a", "A"],
                ["s", "S"],
                ["d", "D"],
                ["f", "F"],
                ["g", "G"],
                ["h", "H"],
                ["j", "J"],
                ["k", "K"],
                ["l", "L"],
                ["\u00f6", "\u00d6"],
                ["\u00e4", "\u00c4"],
                ["Enter", "Enter"]
            ],
            [
                ["Shift", "Shift"],
                ["<", ">", "\u00a6"],
                ["y", "Y"],
                ["x", "X"],
                ["c", "C"],
                ["v", "V"],
                ["b", "B"],
                ["n", "N"],
                ["m", "M", "\u00b5"],
                [",", ";"],
                [".", ":"],
                ["-", "_"],
                ["Shift", "Shift"]
            ],
            [
                [" ", " ", " ", " "],
                ["AltGr", "AltGr"]
            ]
        ],
        'lang': ["de"]
    };
}]);;
