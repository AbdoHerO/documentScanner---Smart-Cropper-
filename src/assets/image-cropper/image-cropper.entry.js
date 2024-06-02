import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host } from './index-a60b5f1f.js';

const imageCropperCss = ":host{--active-color:green;--inactive-color:gray;--active-stroke:2;--inactive-stroke:4;display:block;position:relative;top:0;left:0;width:100%;height:100%}*{user-select:none;-webkit-user-select:none;-moz-user-select:none}.container{display:flex;justify-content:center;background:black;overflow:hidden}.absolute{position:absolute;top:0;left:0;width:100%;height:100%}.cropper-controls{stroke:var(--active-color)}.footer{position:absolute;left:0;bottom:0;height:100px;width:100%;pointer-events:none}.items{box-sizing:border-box;display:flex;width:100%;height:100%;align-items:center;justify-content:center;padding:2.0em}.items .item{flex:1;text-align:center}.items .item:first-child{text-align:left}.items .item:last-child{text-align:right}.accept-use img{width:2.5em;height:2.5em;pointer-events:all;cursor:pointer}.accept-cancel img{width:2.5em;height:2.5em;pointer-events:all;cursor:pointer}.cropper-svg{align-self:center;touch-action:none;cursor:grab}.cropper-svg polygon{cursor:move}.cropper-svg rect{cursor:grab}.hidden-canvas{display:none}.cropper-svg .inactive-selection{stroke:var(--inactive-color);cursor:pointer}.dashed{stroke-dasharray:10,10}";
const ImageCropperStyle0 = imageCropperCss;

const ImageCropper = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.confirmed = createEvent(this, "confirmed", 7);
        this.canceled = createEvent(this, "canceled", 7);
        this.selectionClicked = createEvent(this, "selectionClicked", 7);
        this.imageCropped = createEvent(this, "imageCropped", 7);
        this.handlers = [0, 1, 2, 3, 4, 5, 6, 7];
        this.polygonMouseDown = false;
        this.polygonMouseDownPoint = { x: 0, y: 0 };
        this.previousDistance = undefined;
        this.svgMouseDownPoint = undefined;
        this.handlerMouseDownPoint = { x: 0, y: 0 };
        this.originalPoints = undefined;
        this.usingTouchEvent = false;
        this.usingQuad = false;
        this.img = undefined;
        this.rect = undefined;
        this.quad = undefined;
        this.license = undefined;
        this.hidefooter = undefined;
        this.handlersize = undefined;
        this.inactiveSelections = undefined;
        this.viewBox = "0 0 1280 720";
        this.activeStroke = 2;
        this.inActiveStroke = 4;
        this.selectedHandlerIndex = -1;
        this.points = undefined;
        this.offsetX = 0;
        this.offsetY = 0;
        this.scale = 1.0;
    }
    componentDidLoad() {
        this.containerElement.addEventListener("touchmove", (e) => {
            this.onContainerTouchMove(e);
        });
        this.containerElement.addEventListener("touchend", () => {
            this.previousDistance = undefined;
        });
    }
    watchImgPropHandler(newValue) {
        if (newValue) {
            this.resetStates();
            this.viewBox = "0 0 " + newValue.naturalWidth + " " + newValue.naturalHeight;
            if (this.root) {
                const inActiveStroke = parseInt(this.root.style.getPropertyValue("--inactive-stroke"));
                const activeStroke = parseInt(this.root.style.getPropertyValue("--active-stroke"));
                if (inActiveStroke) {
                    this.inActiveStroke = inActiveStroke;
                }
                if (activeStroke) {
                    this.activeStroke = activeStroke;
                }
            }
        }
    }
    watchRectPropHandler(newValue) {
        if (newValue) {
            this.usingQuad = false;
            let points = this.getPointsFromRect(newValue);
            if (this.img) {
                this.restrainPointsInBounds(points, this.img.naturalWidth, this.img.naturalHeight);
            }
            this.points = points;
        }
    }
    getPointsFromRect(rect) {
        const point1 = { x: rect.x, y: rect.y };
        const point2 = { x: rect.x + rect.width, y: rect.y };
        const point3 = { x: rect.x + rect.width, y: rect.y + rect.height };
        const point4 = { x: rect.x, y: rect.y + rect.height };
        return [point1, point2, point3, point4];
    }
    watchQuadPropHandler(newValue) {
        if (newValue) {
            this.usingQuad = true;
            let points = newValue.points;
            if (this.img) {
                this.restrainPointsInBounds(points, this.img.naturalWidth, this.img.naturalHeight);
            }
            this.points = newValue.points;
        }
    }
    onCanceled() {
        if (this.canceled) {
            this.canceled.emit();
        }
    }
    async cropAndEmitImage() {
        const croppedImage = await this.getCroppedImage({
            perspectiveTransform: true,
            colorMode: "color"
        });
        this.imageCropped.emit(croppedImage);
    }
    onConfirmed() {
        if (this.confirmed) {
            this.confirmed.emit();
            console.log('confimeeed');
        }

        console.log('not confimeeed');

    }
    getPointsData() {
        if (this.points) {
            let pointsData = this.points[0].x + "," + this.points[0].y + " ";
            pointsData = pointsData + this.points[1].x + "," + this.points[1].y + " ";
            pointsData = pointsData + this.points[2].x + "," + this.points[2].y + " ";
            pointsData = pointsData + this.points[3].x + "," + this.points[3].y;
            return pointsData;
        }
        return "";
    }
    renderFooter() {
        if (this.hidefooter === "") {
            return "";
        }
        return (h("div", { class: "footer" }, h("section", { class: "items" }, h("div", { class: "item accept-cancel", onClick: () => this.onCanceled() }, h("img", { src: "data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' enable-background='new 0 0 512 512' xml:space='preserve'%3E%3Ccircle fill='%23727A87' cx='256' cy='256' r='256'/%3E%3Cg id='Icon_5_'%3E%3Cg%3E%3Cpath fill='%23FFFFFF' d='M394.2,142L370,117.8c-1.6-1.6-4.1-1.6-5.7,0L258.8,223.4c-1.6,1.6-4.1,1.6-5.7,0L147.6,117.8 c-1.6-1.6-4.1-1.6-5.7,0L117.8,142c-1.6,1.6-1.6,4.1,0,5.7l105.5,105.5c1.6,1.6,1.6,4.1,0,5.7L117.8,364.4c-1.6,1.6-1.6,4.1,0,5.7 l24.1,24.1c1.6,1.6,4.1,1.6,5.7,0l105.5-105.5c1.6-1.6,4.1-1.6,5.7,0l105.5,105.5c1.6,1.6,4.1,1.6,5.7,0l24.1-24.1 c1.6-1.6,1.6-4.1,0-5.7L288.6,258.8c-1.6-1.6-1.6-4.1,0-5.7l105.5-105.5C395.7,146.1,395.7,143.5,394.2,142z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E" })), h("div", { class: "item accept-use", onClick: () => this.onConfirmed() }, h("img", { src: "data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' enable-background='new 0 0 512 512' xml:space='preserve'%3E%3Ccircle fill='%232CD865' cx='256' cy='256' r='256'/%3E%3Cg id='Icon_1_'%3E%3Cg%3E%3Cg%3E%3Cpath fill='%23FFFFFF' d='M208,301.4l-55.4-55.5c-1.5-1.5-4-1.6-5.6-0.1l-23.4,22.3c-1.6,1.6-1.7,4.1-0.1,5.7l81.6,81.4 c3.1,3.1,8.2,3.1,11.3,0l171.8-171.7c1.6-1.6,1.6-4.2-0.1-5.7l-23.4-22.3c-1.6-1.5-4.1-1.5-5.6,0.1L213.7,301.4 C212.1,303,209.6,303,208,301.4z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E" })))));
    }
    rendenInactiveSelections() {
        if (!this.inactiveSelections) {
            return "";
        }
        return (h(Fragment, null, this.inactiveSelections.map((selection, index) => (h("polygon", { points: this.getPointsDataFromSelection(selection), class: "inactive-selection dashed", "stroke-width": this.inActiveStroke * this.getRatio(), fill: "transparent", onMouseUp: () => this.onSelectionClicked(index), onTouchStart: () => this.onSelectionClicked(index) })))));
    }
    onSelectionClicked(index) {
        if (this.selectionClicked) {
            this.selectionClicked.emit(index);
        }
    }
    getPointsDataFromSelection(selection) {
        let points = [];
        if ("width" in selection) { //is Rect
            points = this.getPointsFromRect(selection);
        }
        else {
            points = selection.points;
        }
        let pointsData = points[0].x + "," + points[0].y + " ";
        pointsData = pointsData + points[1].x + "," + points[1].y + " ";
        pointsData = pointsData + points[2].x + "," + points[2].y + " ";
        pointsData = pointsData + points[3].x + "," + points[3].y;
        return pointsData;
    }
    renderHandlers() {
        if (!this.points) {
            return (h("div", null));
        }
        return (h(Fragment, null, this.handlers.map(index => (h("rect", { x: this.getHandlerPos(index, "x"), y: this.getHandlerPos(index, "y"), width: this.getHandlerSize(), height: this.getHandlerSize(), class: "cropper-controls", "stroke-width": index === this.selectedHandlerIndex ? this.activeStroke * 2 * this.getRatio() : this.activeStroke * this.getRatio(), fill: "transparent", onMouseDown: (e) => this.onHandlerMouseDown(e, index), onMouseUp: (e) => this.onHandlerMouseUp(e), onTouchStart: (e) => this.onHandlerTouchStart(e, index), onPointerDown: (e) => this.onHandlerPointerDown(e, index) })))));
    }
    getHandlerPos(index, key) {
        let pos = 0;
        let size = this.getHandlerSize();
        if (index === 0) {
            pos = this.points[0][key];
        }
        else if (index === 1) {
            pos = this.points[0][key] + (this.points[1][key] - this.points[0][key]) / 2;
        }
        else if (index === 2) {
            pos = this.points[1][key];
        }
        else if (index === 3) {
            pos = this.points[1][key] + (this.points[2][key] - this.points[1][key]) / 2;
        }
        else if (index === 4) {
            pos = this.points[2][key];
        }
        else if (index === 5) {
            pos = this.points[3][key] + (this.points[2][key] - this.points[3][key]) / 2;
        }
        else if (index === 6) {
            pos = this.points[3][key];
        }
        else if (index === 7) {
            pos = this.points[0][key] + (this.points[3][key] - this.points[0][key]) / 2;
        }
        pos = pos - size / 2;
        return pos;
    }
    getHandlerSize() {
        let ratio = this.getRatio();
        let size = 20;
        if (this.handlersize) {
            try {
                size = parseInt(this.handlersize);
            }
            catch (error) {
                console.log(error);
            }
        }
        return Math.ceil(size * ratio);
    }
    onSVGTouchStart(e) {
        this.usingTouchEvent = true;
        this.svgMouseDownPoint = undefined;
        this.previousDistance = undefined;
        let coord = this.getMousePosition(e, this.svgElement);
        if (e.touches.length > 1) {
            this.selectedHandlerIndex = -1;
        }
        else {
            if (this.selectedHandlerIndex != -1) {
                this.originalPoints = JSON.parse(JSON.stringify(this.points)); //We need this info so that whether we start dragging the rectangular in the center or in the corner will not affect the result.
                this.handlerMouseDownPoint.x = coord.x;
                this.handlerMouseDownPoint.y = coord.y;
            }
            else {
                this.svgMouseDownPoint = { x: coord.x, y: coord.y };
            }
        }
    }
    onSVGTouchEnd() {
        this.svgMouseDownPoint = undefined;
    }
    onSVGTouchMove(e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.touches.length === 2) {
            this.pinchAndZoom(e);
        }
        else {
            if (this.svgMouseDownPoint) {
                this.panSVG(e);
            }
            else {
                this.handleMoveEvent(e);
            }
        }
    }
    //handle pinch and zoom
    pinchAndZoom(e) {
        const distance = this.getDistanceBetweenTwoTouches(e.touches[0], e.touches[1]);
        if (this.previousDistance) {
            if ((distance - this.previousDistance) > 0) { //zoom
                this.scale = Math.min(10, this.scale + 0.02);
            }
            else {
                this.scale = Math.max(0.1, this.scale - 0.02);
            }
            this.previousDistance = distance;
        }
        else {
            this.previousDistance = distance;
        }
    }
    getDistanceBetweenTwoTouches(touch1, touch2) {
        const offsetX = touch1.clientX - touch2.clientX;
        const offsetY = touch1.clientY - touch2.clientY;
        const distance = offsetX * offsetX + offsetY + offsetY;
        return distance;
    }
    onContainerMouseUp() {
        this.svgMouseDownPoint = undefined;
        if (!this.usingTouchEvent) {
            this.selectedHandlerIndex = -1;
            this.polygonMouseDown = false;
        }
    }
    onSVGMouseDown(e) {
        if (!this.usingTouchEvent) {
            let coord = this.getMousePosition(e, this.svgElement);
            this.svgMouseDownPoint = { x: coord.x, y: coord.y };
        }
    }
    onContainerWheel(e) {
        if (e.deltaY < 0) {
            this.scale = this.scale + 0.1;
        }
        else {
            this.scale = Math.max(0.1, this.scale - 0.1);
        }
        e.preventDefault();
    }
    onContainerTouchMove(e) {
        e.preventDefault();
        if (e.touches.length === 2) {
            this.pinchAndZoom(e);
        }
    }
    getPanAndZoomStyle() {
        if (this.img) {
            // const percentX = this.offsetX / this.img.naturalWidth * 100; 
            // const percentY = this.offsetY / this.img.naturalHeight * 100;
            return "scale(1.0)";
            // return "scale("+this.scale+") translateX("+percentX+"%)translateY("+percentY+"%)";
        }
        else {
            return "scale(1.0)";
        }
    }
    onSVGMouseMove(e) {
        if (this.svgMouseDownPoint) {
            this.panSVG(e);
        }
        else {
            this.handleMoveEvent(e);
        }
    }
    panSVG(e) {
        let coord = this.getMousePosition(e, this.svgElement);
        let offsetX = coord.x - this.svgMouseDownPoint.x;
        let offsetY = coord.y - this.svgMouseDownPoint.y;
        //console.log("coord");
        //console.log(coord);
        //console.log("svgMouseDownPoint");
        //console.log(this.svgMouseDownPoint);
        //console.log(offsetX)
        //console.log(offsetY)
        //e.g img width: 100, offsetX: -10, translateX: -10%
        this.offsetX = this.offsetX + offsetX;
        this.offsetY = this.offsetY + offsetY;
    }
    handleMoveEvent(e) {
        if (this.polygonMouseDown) {
            let coord = this.getMousePosition(e, this.svgElement);
            let offsetX = coord.x - this.polygonMouseDownPoint.x;
            let offsetY = coord.y - this.polygonMouseDownPoint.y;
            let newPoints = JSON.parse(JSON.stringify(this.originalPoints));
            for (const point of newPoints) {
                point.x = point.x + offsetX;
                point.y = point.y + offsetY;
                if (point.x < 0 || point.y < 0 || point.x > this.img.naturalWidth || point.y > this.img.naturalHeight) {
                    console.log("reach bounds");
                    return;
                }
            }
            this.points = newPoints;
        }
        if (this.selectedHandlerIndex >= 0) {
            let pointIndex = this.getPointIndexFromHandlerIndex(this.selectedHandlerIndex);
            let coord = this.getMousePosition(e, this.svgElement);
            let offsetX = coord.x - this.handlerMouseDownPoint.x;
            let offsetY = coord.y - this.handlerMouseDownPoint.y;
            let newPoints = JSON.parse(JSON.stringify(this.originalPoints));
            if (pointIndex != -1) {
                let selectedPoint = newPoints[pointIndex];
                selectedPoint.x = this.originalPoints[pointIndex].x + offsetX;
                selectedPoint.y = this.originalPoints[pointIndex].y + offsetY;
                if (this.usingQuad === false) { //rect mode
                    if (pointIndex === 0) {
                        newPoints[1].y = selectedPoint.y;
                        newPoints[3].x = selectedPoint.x;
                    }
                    else if (pointIndex === 1) {
                        newPoints[0].y = selectedPoint.y;
                        newPoints[2].x = selectedPoint.x;
                    }
                    else if (pointIndex === 2) {
                        newPoints[1].x = selectedPoint.x;
                        newPoints[3].y = selectedPoint.y;
                    }
                    else if (pointIndex === 3) {
                        newPoints[0].x = selectedPoint.x;
                        newPoints[2].y = selectedPoint.y;
                    }
                }
            }
            else { //mid-point handlers
                if (this.selectedHandlerIndex === 1) {
                    newPoints[0].y = this.originalPoints[0].y + offsetY;
                    newPoints[1].y = this.originalPoints[1].y + offsetY;
                }
                else if (this.selectedHandlerIndex === 3) {
                    newPoints[1].x = this.originalPoints[1].x + offsetX;
                    newPoints[2].x = this.originalPoints[2].x + offsetX;
                }
                else if (this.selectedHandlerIndex === 5) {
                    newPoints[2].y = this.originalPoints[2].y + offsetY;
                    newPoints[3].y = this.originalPoints[3].y + offsetY;
                }
                else if (this.selectedHandlerIndex === 7) {
                    newPoints[0].x = this.originalPoints[0].x + offsetX;
                    newPoints[3].x = this.originalPoints[3].x + offsetX;
                }
            }
            if (this.img) {
                this.restrainPointsInBounds(newPoints, this.img.naturalWidth, this.img.naturalHeight);
            }
            this.points = newPoints;
        }
    }
    restrainPointsInBounds(points, imgWidth, imgHeight) {
        for (let index = 0; index < points.length; index++) {
            const point = points[index];
            point.x = Math.max(0, point.x);
            point.x = Math.min(point.x, imgWidth);
            point.y = Math.max(0, point.y);
            point.y = Math.min(point.y, imgHeight);
        }
    }
    onPolygonMouseDown(e) {
        e.stopPropagation();
        this.originalPoints = JSON.parse(JSON.stringify(this.points));
        this.polygonMouseDown = true;
        let coord = this.getMousePosition(e, this.svgElement);
        this.polygonMouseDownPoint.x = coord.x;
        this.polygonMouseDownPoint.y = coord.y;
    }
    onPolygonMouseUp(e) {
        e.stopPropagation();
        if (!this.usingTouchEvent) {
            this.selectedHandlerIndex = -1;
            this.polygonMouseDown = false;
        }
    }
    onPolygonTouchStart(e) {
        this.usingTouchEvent = true;
        e.stopPropagation();
        this.selectedHandlerIndex = -1;
        this.polygonMouseDown = false;
        this.originalPoints = JSON.parse(JSON.stringify(this.points));
        this.polygonMouseDown = true;
        let coord = this.getMousePosition(e, this.svgElement);
        this.polygonMouseDownPoint.x = coord.x;
        this.polygonMouseDownPoint.y = coord.y;
    }
    onPolygonTouchEnd(e) {
        e.stopPropagation();
        this.selectedHandlerIndex = -1;
        this.polygonMouseDown = false;
    }
    onHandlerMouseDown(e, index) {
        e.stopPropagation();
        let coord = this.getMousePosition(e, this.svgElement);
        this.originalPoints = JSON.parse(JSON.stringify(this.points));
        this.handlerMouseDownPoint.x = coord.x;
        this.handlerMouseDownPoint.y = coord.y;
        this.selectedHandlerIndex = index;
    }
    onHandlerMouseUp(e) {
        e.stopPropagation();
        if (!this.usingTouchEvent) {
            this.selectedHandlerIndex = -1;
        }
    }
    onHandlerTouchStart(e, index) {
        this.usingTouchEvent = true; //Touch events are triggered before mouse events. We can use this to prevent executing mouse events.
        e.stopPropagation();
        this.polygonMouseDown = false;
        let coord = this.getMousePosition(e, this.svgElement);
        this.originalPoints = JSON.parse(JSON.stringify(this.points));
        this.handlerMouseDownPoint.x = coord.x;
        this.handlerMouseDownPoint.y = coord.y;
        this.selectedHandlerIndex = index;
    }
    onHandlerPointerDown(e, index) {
        if (e.pointerType != "mouse" && !this.usingTouchEvent) {
            this.onHandlerMouseDown(e, index);
            e.preventDefault();
        }
    }
    getPointIndexFromHandlerIndex(index) {
        if (index === 0) {
            return 0;
        }
        else if (index === 2) {
            return 1;
        }
        else if (index === 4) {
            return 2;
        }
        else if (index === 6) {
            return 3;
        }
        return -1;
    }
    //Convert the screen coordinates to the SVG's coordinates from https://www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/
    getMousePosition(event, svg) {
        let CTM = svg.getScreenCTM();
        if (event.targetTouches) { //if it is a touch event
            let x = event.targetTouches[0].clientX;
            let y = event.targetTouches[0].clientY;
            return {
                x: (x - CTM.e) / CTM.a,
                y: (y - CTM.f) / CTM.d
            };
        }
        else {
            return {
                x: (event.clientX - CTM.e) / CTM.a,
                y: (event.clientY - CTM.f) / CTM.d
            };
        }
    }
    getRatio() {
        if (this.img) {
            return this.img.naturalWidth / 750;
        }
        else {
            return 1;
        }
    }
    async resetStates() {
        this.scale = 1.0;
        this.offsetX = 0;
        this.offsetY = 0;
    }
    async getAllSelections(convertTo) {
        let all = [];
        for (let index = 0; index < this.inactiveSelections.length; index++) {
            let selection = this.inactiveSelections[index];
            if (convertTo) {
                if ("width" in selection && convertTo === "quad") {
                    selection = { points: this.getPointsFromRect(selection) };
                }
                else if (!("width" in selection) && convertTo === "rect") {
                    selection = this.getRectFromPoints(selection.points);
                }
            }
            all.push(selection);
        }
        let useQuad = true;
        if (convertTo) {
            if (convertTo === "rect") {
                useQuad = false;
            }
        }
        else {
            if (!this.usingQuad) {
                useQuad = false;
            }
        }
        if (useQuad) {
            const quad = await this.getQuad();
            all.push(quad);
        }
        else {
            const rect = await this.getRect();
            all.push(rect);
        }
        return all;
    }
    async getPoints() {
        return this.points;
    }
    async getQuad() {
        return { points: this.points };
    }
    async getRect() {
        return this.getRectFromPoints(this.points);
    }
    getRectFromPoints(points) {
        let minX;
        let minY;
        let maxX;
        let maxY;
        for (const point of points) {
            if (!minX) {
                minX = point.x;
                maxX = point.x;
                minY = point.y;
                maxY = point.y;
            }
            else {
                minX = Math.min(point.x, minX);
                minY = Math.min(point.y, minY);
                maxX = Math.max(point.x, maxX);
                maxY = Math.max(point.y, maxY);
            }
        }
        minX = Math.floor(minX);
        maxX = Math.floor(maxX);
        minY = Math.floor(minY);
        maxY = Math.floor(maxY);
        return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
    }
    async getCroppedImage(options) {
        let img = this.img;
        if (options.source) {
            img = options.source;
        }
        let isQuad = false;
        if (options.selection) {
            if (!("width" in options.selection)) {
                isQuad = true;
            }
        }
        else {
            if (this.usingQuad) {
                isQuad = true;
            }
        }
        if (options.perspectiveTransform && window["Dynamsoft"] && isQuad) {
            if (!this.cvr) {
                await this.initCVR();
            }
            let templateName = "NormalizeDocument_Color";
            if (options.colorMode) {
                if (options.colorMode === "binary") {
                    templateName = "NormalizeDocument_Binary";
                }
                else if (options.colorMode === "gray") {
                    templateName = "NormalizeDocument_Gray";
                }
                else {
                    templateName = "NormalizeDocument_Color";
                }
            }
            let quad;
            if (options.selection) {
                if ("width" in options.selection) {
                    quad = { points: this.getPointsFromRect(options.selection) };
                }
                else {
                    quad = options.selection;
                }
            }
            else {
                quad = await this.getQuad();
            }
            let settings = await this.cvr.getSimplifiedSettings(templateName);
            settings.roi = quad;
            settings.roiMeasuredInPercentage = false;
            await this.cvr.updateSettings(templateName, settings);
            this.cvr.maxCvsSideLength = 99999;
            let normalizedImagesResult = await this.cvr.capture(img, templateName, true);
            let normalizedImageResultItem = normalizedImagesResult.items[0];
            let dataURL = normalizedImageResultItem.toCanvas().toDataURL();
            return dataURL;
        }
        else {
            let ctx = this.canvasElement.getContext("2d");
            let rect;
            if (options.selection) {
                if ("width" in options.selection) {
                    rect = options.selection;
                }
                else {
                    rect = this.getRectFromPoints(options.selection.points);
                }
            }
            else {
                rect = await this.getRect();
            }
            if (typeof (img) === "string") {
                img = await this.getImageFromDataURL(img);
            }
            if (img instanceof Blob) {
                img = await this.getImageFromBlob(img);
            }
            this.canvasElement.width = rect.width;
            this.canvasElement.height = rect.height;
            ctx.drawImage(img, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
            return this.canvasElement.toDataURL();
        }
    }
    async getImageFromBlob(source) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(source);
            reader.onloadend = function () {
                let dataURL = reader.result;
                let img = document.createElement("img");
                img.onload = function () {
                    resolve(img);
                };
                img.onerror = function () {
                    reject();
                };
                img.src = dataURL;
            };
        });
    }
    async getImageFromDataURL(source) {
        return new Promise((resolve, reject) => {
            let img = document.createElement("img");
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function () {
                reject();
            };
            img.src = source;
        });
    }
    async detect(source) {
        if (window["Dynamsoft"]) {
            if (!this.cvr) {
                await this.initCVR();
            }
            this.cvr.maxCvsSideLength = 99999;
            let result = await this.cvr.capture(source, "DetectDocumentBoundaries_Default", true);
            let results = [];
            for (let index = 0; index < result.items.length; index++) {
                const item = result.items[index];
                results.push(item);
            }
            return results;
        }
        else {
            throw "Dynamsoft Document Normalizer not found";
        }
    }
    async initCVR() {
        window["Dynamsoft"]["License"]["LicenseManager"].initLicense(this.license);
        window["Dynamsoft"]["Core"]["CoreModule"].loadWasm(["DDN"]);
        this.cvr = await window["Dynamsoft"]["CVR"]["CaptureVisionRouter"].createInstance();
        await this.cvr.initSettings("{\"CaptureVisionTemplates\": [{\"Name\": \"Default\"},{\"Name\": \"DetectDocumentBoundaries_Default\",\"ImageROIProcessingNameArray\": [\"roi-detect-document-boundaries\"]},{\"Name\": \"DetectAndNormalizeDocument_Default\",\"ImageROIProcessingNameArray\": [\"roi-detect-and-normalize-document\"]},{\"Name\": \"NormalizeDocument_Binary\",\"ImageROIProcessingNameArray\": [\"roi-normalize-document-binary\"]},  {\"Name\": \"NormalizeDocument_Gray\",\"ImageROIProcessingNameArray\": [\"roi-normalize-document-gray\"]},  {\"Name\": \"NormalizeDocument_Color\",\"ImageROIProcessingNameArray\": [\"roi-normalize-document-color\"]}],\"TargetROIDefOptions\": [{\"Name\": \"roi-detect-document-boundaries\",\"TaskSettingNameArray\": [\"task-detect-document-boundaries\"]},{\"Name\": \"roi-detect-and-normalize-document\",\"TaskSettingNameArray\": [\"task-detect-and-normalize-document\"]},{\"Name\": \"roi-normalize-document-binary\",\"TaskSettingNameArray\": [\"task-normalize-document-binary\"]},  {\"Name\": \"roi-normalize-document-gray\",\"TaskSettingNameArray\": [\"task-normalize-document-gray\"]},  {\"Name\": \"roi-normalize-document-color\",\"TaskSettingNameArray\": [\"task-normalize-document-color\"]}],\"DocumentNormalizerTaskSettingOptions\": [{\"Name\": \"task-detect-and-normalize-document\",\"SectionImageParameterArray\": [{\"Section\": \"ST_REGION_PREDETECTION\",\"ImageParameterName\": \"ip-detect-and-normalize\"},{\"Section\": \"ST_DOCUMENT_DETECTION\",\"ImageParameterName\": \"ip-detect-and-normalize\"},{\"Section\": \"ST_DOCUMENT_NORMALIZATION\",\"ImageParameterName\": \"ip-detect-and-normalize\"}]},{\"Name\": \"task-detect-document-boundaries\",\"TerminateSetting\": {\"Section\": \"ST_DOCUMENT_DETECTION\"},\"SectionImageParameterArray\": [{\"Section\": \"ST_REGION_PREDETECTION\",\"ImageParameterName\": \"ip-detect\"},{\"Section\": \"ST_DOCUMENT_DETECTION\",\"ImageParameterName\": \"ip-detect\"},{\"Section\": \"ST_DOCUMENT_NORMALIZATION\",\"ImageParameterName\": \"ip-detect\"}]},{\"Name\": \"task-normalize-document-binary\",\"StartSection\": \"ST_DOCUMENT_NORMALIZATION\",   \"ColourMode\": \"ICM_BINARY\",\"SectionImageParameterArray\": [{\"Section\": \"ST_REGION_PREDETECTION\",\"ImageParameterName\": \"ip-normalize\"},{\"Section\": \"ST_DOCUMENT_DETECTION\",\"ImageParameterName\": \"ip-normalize\"},{\"Section\": \"ST_DOCUMENT_NORMALIZATION\",\"ImageParameterName\": \"ip-normalize\"}]},  {\"Name\": \"task-normalize-document-gray\",   \"ColourMode\": \"ICM_GRAYSCALE\",\"StartSection\": \"ST_DOCUMENT_NORMALIZATION\",\"SectionImageParameterArray\": [{\"Section\": \"ST_REGION_PREDETECTION\",\"ImageParameterName\": \"ip-normalize\"},{\"Section\": \"ST_DOCUMENT_DETECTION\",\"ImageParameterName\": \"ip-normalize\"},{\"Section\": \"ST_DOCUMENT_NORMALIZATION\",\"ImageParameterName\": \"ip-normalize\"}]},  {\"Name\": \"task-normalize-document-color\",   \"ColourMode\": \"ICM_COLOUR\",\"StartSection\": \"ST_DOCUMENT_NORMALIZATION\",\"SectionImageParameterArray\": [{\"Section\": \"ST_REGION_PREDETECTION\",\"ImageParameterName\": \"ip-normalize\"},{\"Section\": \"ST_DOCUMENT_DETECTION\",\"ImageParameterName\": \"ip-normalize\"},{\"Section\": \"ST_DOCUMENT_NORMALIZATION\",\"ImageParameterName\": \"ip-normalize\"}]}],\"ImageParameterOptions\": [{\"Name\": \"ip-detect-and-normalize\",\"BinarizationModes\": [{\"Mode\": \"BM_LOCAL_BLOCK\",\"BlockSizeX\": 0,\"BlockSizeY\": 0,\"EnableFillBinaryVacancy\": 0}],\"TextDetectionMode\": {\"Mode\": \"TTDM_WORD\",\"Direction\": \"HORIZONTAL\",\"Sensitivity\": 7}},{\"Name\": \"ip-detect\",\"BinarizationModes\": [{\"Mode\": \"BM_LOCAL_BLOCK\",\"BlockSizeX\": 0,\"BlockSizeY\": 0,\"EnableFillBinaryVacancy\": 0,\"ThresholdCompensation\" : 7}],\"TextDetectionMode\": {\"Mode\": \"TTDM_WORD\",\"Direction\": \"HORIZONTAL\",\"Sensitivity\": 7},\"ScaleDownThreshold\" : 512},{\"Name\": \"ip-normalize\",\"BinarizationModes\": [{\"Mode\": \"BM_LOCAL_BLOCK\",\"BlockSizeX\": 0,\"BlockSizeY\": 0,\"EnableFillBinaryVacancy\": 0}],\"TextDetectionMode\": {\"Mode\": \"TTDM_WORD\",\"Direction\": \"HORIZONTAL\",\"Sensitivity\": 7}}]}");
    }
    getSVGWidth() {
        if (this.img && this.svgElement) {
            this.svgElement.style.height = "100%";
            let imgRatio = this.img.naturalWidth / this.img.naturalHeight;
            let width = this.svgElement.clientHeight * imgRatio;
            if (width > this.svgElement.parentElement.clientWidth) {
                width = this.svgElement.parentElement.clientWidth;
                this.svgElement.style.height = width / imgRatio + "px";
            }
            return width;
        }
        return "100%";
    }
    onSVGPointerMove(e) {
        if (e.pointerType != "mouse" && !this.usingTouchEvent) {
            e.stopPropagation();
            e.preventDefault();
            this.onSVGMouseMove(e);
        }
    }
    onSVGPointerDown(e) {
        if (e.pointerType != "mouse" && !this.usingTouchEvent) {
            this.onSVGMouseDown(e);
        }
    }
    onSVGPointerUp(e) {
        if (e.pointerType != "mouse" && !this.usingTouchEvent) {
            this.svgMouseDownPoint = undefined;
            this.selectedHandlerIndex = -1;
        }
    }
    onPolygonPointerDown(e) {
        if (e.pointerType != "mouse" && !this.usingTouchEvent) {
            this.onPolygonMouseDown(e);
        }
    }
    onPolygonPointerUp(e) {
        e.stopPropagation();
        this.selectedHandlerIndex = -1;
        this.polygonMouseDown = false;
    }
    render() {
        return (h(Host, { key: 'a3f244fea50c901959a15eef61f5f1558e18b595', ref: (el) => this.root = el }, h("div", { key: '7f7ba626a468b40009a536fae978076d1f920289', class: "container absolute", ref: (el) => this.containerElement = el, onWheel: (e) => this.onContainerWheel(e), onMouseUp: () => this.onContainerMouseUp() }, h("canvas", { key: 'a6a41654ba8390f0fec3819166e5e17c49cf46b1', ref: (el) => this.canvasElement = el, class: "hidden-canvas" }), h("svg", { key: '159db0a6266024ba83e7f42e0486b7d08340ed8e', version: "1.1", ref: (el) => this.svgElement = el, class: "cropper-svg", xmlns: "http://www.w3.org/2000/svg", viewBox: this.viewBox, width: this.getSVGWidth(), style: { transform: this.getPanAndZoomStyle() }, onMouseMove: (e) => this.onSVGMouseMove(e), onMouseDown: (e) => this.onSVGMouseDown(e), onTouchStart: (e) => this.onSVGTouchStart(e), onTouchEnd: () => this.onSVGTouchEnd(), onTouchMove: (e) => this.onSVGTouchMove(e), onPointerMove: (e) => this.onSVGPointerMove(e), onPointerDown: (e) => this.onSVGPointerDown(e), onPointerUp: (e) => this.onSVGPointerUp(e) }, h("image", { key: 'dab784bb6eb50de1765c166abdca78bab0e00a99', href: this.img ? this.img.src : "" }), this.rendenInactiveSelections(), h("polygon", { key: '4242ade2478c7f3d0d0e6505023547dc835853cf', points: this.getPointsData(), class: "cropper-controls dashed", "stroke-width": this.activeStroke * this.getRatio(), fill: "transparent", onMouseDown: (e) => this.onPolygonMouseDown(e), onMouseUp: (e) => this.onPolygonMouseUp(e), onTouchStart: (e) => this.onPolygonTouchStart(e), onTouchEnd: (e) => this.onPolygonTouchEnd(e), onPointerDown: (e) => this.onPolygonPointerDown(e), onPointerUp: (e) => this.onPolygonPointerUp(e) }), this.renderHandlers()), this.renderFooter(), h("slot", { key: '1eb6ff94c6156f42b05c1101e637d5eef02fe51d' }))));
    }
    static get watchers() { return {
        "img": ["watchImgPropHandler"],
        "rect": ["watchRectPropHandler"],
        "quad": ["watchQuadPropHandler"]
    }; }
};
ImageCropper.style = ImageCropperStyle0;

export { ImageCropper as image_cropper };

//# sourceMappingURL=image-cropper.entry.js.map