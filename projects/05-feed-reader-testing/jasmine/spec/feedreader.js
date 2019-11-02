/*
--------------------------------------------------------------------------
Credits:
 - Base on: https://github.com/udacity/frontend-nanodegree-feedreader
--------------------------------------------------------------------------
*/

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

// Preset

    const menu = $('.menu-icon-link');
    const feed = $('.feed');

// --

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*
        1. DONE: Loops through each feed in the allFeeds object and:
            1.1. Checks it has a url defined and is not empty.
            1.2. Checks it has a name defined and is not empty.
        */

        allFeeds.forEach(function(feed) {

            it(`url ${feed.id} is defined and is not empty.`, function() {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });

            it(`name ${feed.id} is defined and is not empty.`, function() {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });

        });

    }); // END RSS Feeds

    /*
    2. DONE: Write a new test suite named "The menu"
        2.1. Checks that the menu element is hidden by default.
        2.2. Checks that the menu toggles On / Off.
    */

    describe('The menu', function() {

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('toggles On and Off', function() {
        // On
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
        // Off
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    }); // END The menu

    /*
    3. Write a new test suite named "Initial Entries"
        3.1. Checks if there is at least a single .entry element within the .feed container.
    */

    describe('Initial Entries', function() {

        let feedLength = 0;

        beforeEach(function(done) {
            loadFeed(0, function(){
                feedLength = $('.feed .entry').length;
                done();
            });
        });

        it('there is at least a single entry element.', function() {
            expect(feedLength > 0).toBe(true);
        });

    }); // END Initial Entries

    /*
    4. Write a new test suite named "New Feed Selection"
        4.1. Checks that a new feed is loaded and the content changes.
    */

    describe('New Feed Selection', function() {

        let oldFeed, newFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = $('.feed').text();
                loadFeed(1, function() {
                    newFeed = $('.feed').text();
                    done();
                });
            });
        });

        it('a new feed is loaded', function() {
            expect(newFeed).not.toBe(oldFeed);
        });

    }); // END New Feed Selection

// --
}());
