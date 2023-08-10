import { DrawingUtils } from "@mediapipe/tasks-vision";
import { drawFaceLandmarks } from "./faceLandmarks.js";
// import { displayFaceDetections } from "./faceDetector.js";
import { drawHandLandmarks } from "./handTracking.js";
import { drawHandGestures } from "./handGestures.js";
import { drawPoseLandmarks } from "./poseTracking.js";
import { drawObjects } from "./objectDetection.js";

let poseModelTypes = {
  'lite': './mediapipe/pose_landmarker_lite.task',
  'full': './mediapipe/pose_landmarker_full.task',
  'heavy': './mediapipe/pose_landmarker_heavy.task',
}

let objectModelTypes = {
  'fast': './mediapipe/pose_landmarker_lite.task',
  'full': './mediapipe/efficientdet_lite0.tflite.task',
  'accurate': './mediapipe/efficientdet_lite2.tflite.task',
}

let faceDetectorModelTypes = {
  'shortrange': './mediapipe/blaze_face_short_range.tflite',
}

export let faceLandmarkState = {
  detect: true,
  detector: undefined,
  results: undefined,
  resultsName: "faceLandmarkResults",
  numFaces: 1,
  minDetectionConfidence: 0.5,
  minPresenceConfidence: 0.5,
  minTrackingConfidence: 0.5,
  outputBlendshapes: true,
  outputTransformationMatrixes: true,
  draw: (state, canvas) => drawFaceLandmarks(state, canvas),
};

export let faceDetectorState = {
  modelTypes: faceDetectorModelTypes,
  modelPath: faceDetectorModelTypes['shortrange'],
  detect: true,
  landmarker: undefined,
  results: undefined,
  resultsName: "faceDetectorResults",
  minDetectionConfidence: 0.5,
  minSuppressionThreshold: 0.3,
  draw: (state, canvas) => drawFaceDetectors(state, canvas),
};

export let handState = {
  detect: false,
  landmarker: undefined,
  results: undefined,
  resultsName: "handResults",
  numHands: 2,
  minDetectionConfidence: 0.5,
  minPresenceConfidence: 0.5,
  minTrackingConfidence: 0.5,
  draw: (state, canvas) => drawHandLandmarks(state, canvas),
};

export let gestureState = {
  detect: true,
  landmarker: undefined,
  results: undefined,
  resultsName: "gestureResults",
  maxResults: -1,
  scoreThreshold: 0.5,
  draw: (state, canvas) => drawHandGestures(state, canvas),
};

export let poseState = {
  modelTypes: poseModelTypes,
  detect: true,
  modelPath: poseModelTypes['full'],
  landmarker: undefined,
  results: undefined,
  resultsName: "poseResults",
  numPoses: 2,
  minDetectionConfidence: 0.5,
  minPresenceConfidence: 0.5,
  minTrackingConfidence: 0.5,
  draw: (state, canvas) => drawPoseLandmarks(state, canvas),
};

export let objectState = {
  modelTypes: objectModelTypes,
  detect: false,
  modelPath: objectModelTypes['full'],
  detector: undefined,
  results: undefined,
  objectsDiv: "",
  children: [],
  resultsName: "objectResults",
  maxResults: -1,
  scoreThreshold: 0.5,
  draw: (result, children, objectsDiv) => drawObjects(result, children, objectsDiv),
};

const canvasElement = document.getElementById("output_canvas");
const canvasCtx = canvasElement.getContext("2d");

export let webcamState = {
    webcamRunning: false,
    webcamDevices: [],
    webcamId: 'default',
    lastVideoTime: -1,
    drawingUtils: new DrawingUtils(canvasCtx),
};
  
export let socketState = {
    adddress: 'ws://localhost',
    port: '9980',
    ws: undefined,
};

export let overlayState = {
  show: true,
}