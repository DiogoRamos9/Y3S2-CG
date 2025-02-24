var T2trans = [
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      -1.0, 0.5, 0.0, 1.0,
    ]

    this.pushMatrix();
    this.multMatrix(T2trans);
    this.triangle.display();
    this.popMatrix();

    var T3trans = [
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      1.5, -0.5, 0.0, 1.0,
    ]

    var T3sca = [
      0.75, 0.0, 0.0, 0.0,
      0.0, 0.75, 0.0, 0.0,
      0.0, 0.0, 0.75, 0.0,
      0.0, 0.0, 0.0, 1.0,
    ]

    this.pushMatrix();
    this.multMatrix(T3trans);
    this.multMatrix(T3sca);
    this.triangleBig.display();
    this.popMatrix();