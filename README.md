# Abstraction
WebGL Abstraction model: attempt to write a generic 3d Object.

# Overview
WebGL is a relatively low-level API, which allows for users to access different capabilities -- while also perhaps complicating things a bit.
My objective is to put logically related concepts together -- for instance, any resource acquired by an object would be
managed by the object -- so that not everything is gl.DOSOMETHING.
