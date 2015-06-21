(function () {

    const
        _           = require('lodash'),
        React       = require('react'),
        createView  = require('omniscient'),
        PlayerView  = require('./PlayerView.jsx'),
        Overlay     = require('./Overlay.jsx').jsx;

    var GameView;

    GameView = createView('GameView', function (props) {

        var { state, settings } = props,
            { players, round, nextShape, winner } = state,
            playerView = [];

        _.forEach(players, function (player) {
            playerView.push(_.assign({ 
                "settings": settings,
                "nextShape": nextShape
            }, player));
        });

        /**
         * Data should have the following structure:
         * {
         *     round: Integer,
         *     playerView: [
         *         Object,
         *         Object
         *     ],
         *     winner: [unset | string]
         * }
         */

        return (
            <g className="TetrisGame">
                <defs>
                    <symbol id='shape-I' width="99" height="132" viewBox='0 0 99 132' dangerouslySetInnerHTML={{
                        __html: '<image width="99" height="132" xlink:href="/img/shape_I.png" />'
                    }} />
                    <symbol id='shape-J' width="99" height="132" viewBox='0 0 99 132' dangerouslySetInnerHTML={{
                        __html: '<image width="99" height="132" xlink:href="/img/shape_J.png" />'
                    }} />
                    <symbol id='shape-L' width="99" height="132" viewBox='0 0 99 132' dangerouslySetInnerHTML={{
                        __html: '<image width="99" height="132" xlink:href="/img/shape_L.png" />'
                    }} />
                    <symbol id='shape-O' width="99" height="132" viewBox='0 0 99 132' dangerouslySetInnerHTML={{
                        __html: '<image width="99" height="132" xlink:href="/img/shape_O.png" />'
                    }} />
                    <symbol id='shape-S' width="99" height="132" viewBox='0 0 99 132' dangerouslySetInnerHTML={{
                        __html: '<image width="99" height="132" xlink:href="/img/shape_S.png" />'
                    }} />
                    <symbol id='shape-T' width="99" height="132" viewBox='0 0 99 132' dangerouslySetInnerHTML={{
                        __html: '<image width="99" height="132" xlink:href="/img/shape_T.png" />'
                    }} />
                    <symbol id='shape-Z' width="99" height="132" viewBox='0 0 99 132' dangerouslySetInnerHTML={{
                        __html: '<image width="99" height="132" xlink:href="/img/shape_Z.png" />'
                    }} />
                    <symbol id='block-I' width="33" height="33" viewBox='0 0 33 33' dangerouslySetInnerHTML={{
                        __html: '<image width="33" height="33" xlink:href="/img/block_I.jpg" />'
                    }} />
                    <symbol id='block-J' width="33" height="33" viewBox='0 0 33 33' dangerouslySetInnerHTML={{
                        __html: '<image width="33" height="33" xlink:href="/img/block_J.jpg" />'
                    }} />
                    <symbol id='block-L' width="33" height="33" viewBox='0 0 33 33' dangerouslySetInnerHTML={{
                        __html: '<image width="33" height="33" xlink:href="/img/block_L.jpg" />'
                    }} />
                    <symbol id='block-O' width="33" height="33" viewBox='0 0 33 33' dangerouslySetInnerHTML={{
                        __html: '<image width="33" height="33" xlink:href="/img/block_O.jpg" />'
                    }} />
                    <symbol id='block-S' width="33" height="33" viewBox='0 0 33 33' dangerouslySetInnerHTML={{
                        __html: '<image width="33" height="33" xlink:href="/img/block_S.jpg" />'
                    }} />
                    <symbol id='block-T' width="33" height="33" viewBox='0 0 33 33' dangerouslySetInnerHTML={{
                        __html: '<image width="33" height="33" xlink:href="/img/block_T.jpg" />'
                    }} />
                    <symbol id='block-Z' width="33" height="33" viewBox='0 0 33 33' dangerouslySetInnerHTML={{
                        __html: '<image width="33" height="33" xlink:href="/img/block_Z.jpg" />'
                    }} />
                </defs>
                <text x="50%" y="5%" className="TetrisGame-currentRound">{ 'Round ' + round }</text>
                { _.map(playerView, PlayerView) }
                <Overlay winner={ winner } />
            </g>
        );
    });

    module.exports = GameView;
}());
