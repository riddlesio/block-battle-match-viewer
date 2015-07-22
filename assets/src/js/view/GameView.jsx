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
            { player, field } = settings,
            playerView = [],
            cell = field.cell,
            canvas = player.canvas,
            fieldWidth = field.width * cell.width,
            fieldHeight = field.height * cell.height;
            

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
            <svg className="TetrisGame" viewBox={ "0 0 " + canvas.width + " " + canvas.height } preserveAspectRatio="xMidYMid meet">
                <defs>
                    <symbol id="background-playername-left" dangerouslySetInnerHTML={{
                        __html: `<image width="328" height="71" xlink:href="./img/background-playername-red.svg" />`
                    }} />
                    <symbol id="background-playername-right" dangerouslySetInnerHTML={{
                        __html: `<image width="328" height="71" xlink:href="./img/background-playername-blue.svg" />`
                    }} />
                    <symbol id="next-block-left" dangerouslySetInnerHTML={{
                        __html: `<image width="85" height="184" xlink:href="./img/next-block-left.svg" />`
                    }} />
                    <symbol id="next-block-right" dangerouslySetInnerHTML={{
                        __html: `<image width="85" height="184" xlink:href="./img/next-block-right.svg" />`
                    }} />
                    <symbol id="grid-background" dangerouslySetInnerHTML={{
                        __html: `<image width="${ fieldWidth + 18 }" height="${ fieldHeight + 18 }" xlink:href="./img/field-background.svg" />`
                    }} />
                    <symbol id="block-0-light" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/grid-block-light.svg" />`
                    }} />
                    <symbol id="block-0-dark" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/grid-block-dark.svg" />`
                    }} />
                    <symbol id="block-I" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-I.svg" />`
                    }} />
                    <symbol id="block-J" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-J.svg" />`
                    }} />
                    <symbol id="block-L" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-L.svg" />`
                    }} />
                    <symbol id="block-O" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-O.svg" />`
                    }} />
                    <symbol id="block-S" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-S.svg" />`
                    }} />
                    <symbol id="block-T" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-T.svg" />`
                    }} />
                    <symbol id="block-Z" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-Z.svg" />`
                    }} />
                    <symbol id="block-I-nobkg" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-I-nobkg.svg" />`
                    }} />
                    <symbol id="block-J-nobkg" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-J-nobkg.svg" />`
                    }} />
                    <symbol id="block-L-nobkg" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-L-nobkg.svg" />`
                    }} />
                    <symbol id="block-O-nobkg" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-O-nobkg.svg" />`
                    }} />
                    <symbol id="block-S-nobkg" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-S-nobkg.svg" />`
                    }} />
                    <symbol id="block-T-nobkg" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-T-nobkg.svg" />`
                    }} />
                    <symbol id="block-Z-nobkg" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-Z-nobkg.svg" />`
                    }} />
                    <symbol id="block-3" dangerouslySetInnerHTML={{
                        __html: `<image width="${ cell.width }" height="${ cell.height }" xlink:href="./img/block-3.svg" />`
                    }} />
                    <symbol id='shape-I' viewBox={ "0 0 " + (cell.width * 3) + " " + (cell.height * 4) }>
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width }" y="0" xlink:href="#block-I-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width }" y="${ cell.height }" xlink:href="#block-I-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width }" y="${ cell.height*2 }" xlink:href="#block-I-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width }" y="${ cell.height*3 }" xlink:href="#block-I-nobkg" />` }} />
                    </symbol>
                    <symbol id='shape-J' viewBox={ "0 0 " + (cell.width * 3) + " " + (cell.height * 4) }>
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*1.5 }" y="${ cell.height*0.5 }" xlink:href="#block-J-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*1.5 }" y="${ cell.height*1.5 }" xlink:href="#block-J-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*1.5 }" y="${ cell.height*2.5 }" xlink:href="#block-J-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*0.5 }" y="${ cell.height*2.5 }" xlink:href="#block-J-nobkg" />` }} />
                    </symbol>
                    <symbol id='shape-L' viewBox={ "0 0 " + (cell.width * 3) + " " + (cell.height * 4) }>
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*0.5 }" y="${ cell.height*0.5 }" xlink:href="#block-L-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*0.5 }" y="${ cell.height*1.5 }" xlink:href="#block-L-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*0.5 }" y="${ cell.height*2.5 }" xlink:href="#block-L-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*1.5 }" y="${ cell.height*2.5 }" xlink:href="#block-L-nobkg" />` }} />
                    </symbol>
                    <symbol id='shape-O' viewBox={ "0 0 " + (cell.width * 3) + " " + (cell.height * 4) }>
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*0.5 }" y="${ cell.height }" xlink:href="#block-O-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*0.5 }" y="${ cell.height*2 }" xlink:href="#block-O-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*1.5 }" y="${ cell.height }" xlink:href="#block-O-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*1.5 }" y="${ cell.height*2 }" xlink:href="#block-O-nobkg" />` }} />
                    </symbol>
                    <symbol id='shape-S' viewBox={ "0 0 " + (cell.width * 3) + " " + (cell.height * 4) }>
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*0.5 }" y="${ cell.height*0.5 }" xlink:href="#block-S-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*0.5 }" y="${ cell.height*1.5 }" xlink:href="#block-S-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*1.5 }" y="${ cell.height*1.5 }" xlink:href="#block-S-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*1.5 }" y="${ cell.height*2.5 }" xlink:href="#block-S-nobkg" />` }} />
                    </symbol>
                    <symbol id='shape-T' viewBox={ "0 0 " + (cell.width * 3) + " " + (cell.height * 4) }>
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*0.5 }" y="${ cell.height*0.5 }" xlink:href="#block-T-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*0.5 }" y="${ cell.height*1.5 }" xlink:href="#block-T-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*0.5 }" y="${ cell.height*2.5 }" xlink:href="#block-T-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*1.5 }" y="${ cell.height*1.5 }" xlink:href="#block-T-nobkg" />` }} />
                    </symbol>
                    <symbol id='shape-Z' viewBox={ "0 0 " + (cell.width * 3) + " " + (cell.height * 4) }>
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*1.5 }" y="${ cell.height*0.5 }" xlink:href="#block-Z-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*1.5 }" y="${ cell.height*1.5 }" xlink:href="#block-Z-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*0.5 }" y="${ cell.height*1.5 }" xlink:href="#block-Z-nobkg" />` }} />
                        <g dangerouslySetInnerHTML={{ __html: `<use x="${ cell.width*0.5 }" y="${ cell.height*2.5 }" xlink:href="#block-Z-nobkg" />` }} />
                    </symbol>
                </defs>
                <text x="50%" y="75" className="TetrisGame-currentRound">{ 'Round ' + round }</text>
                { _.map(playerView, PlayerView) }
                <Overlay winner={ winner } />
            </svg>
        );
    });

    module.exports = GameView;
}());
