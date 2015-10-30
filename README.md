# Abstraction
WebGL Abstraction model: attempt to classify WebGL concepts.

# Overview
WebGL is a relatively low-level API, which allows for users to access different capabilities -- while also perhaps complicating things a bit.
My objective is to put logically related concepts together -- for instance, any resource acquired by an object would be
managed by the object -- so that not everything is gl.DOSOMETHING.

#Breakdown
currently, there are six major classes:

- Scene
- Camera
- Lights
- Entity
- Surface
- Texture

The syntax is simple : create a scene on the context,
and add camera, lights, and entities to the scene.
(Surface and Texture are properties of the entity, which is natural.)
Context(GL) and shader programs are directly managed by the window.

The construction was partially inspired by Three.js, although I hadn't delved
very deeply in using it. I am building everything from scratch using WebGL APIs.

# Helper functions/scripts
- DataObj
- Orientation
- WebGLCommons (manages buffers, initializing, etc.)
