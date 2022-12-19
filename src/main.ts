class Vector {
  static fromAngle(angle: number) {
    return new Vector(Math.cos(angle), Math.sin(angle));
  }

  constructor(public x: number, public y: number) {
  }

  add(other: Vector) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  mul(scalar: number) {
    return new Vector(this.x * scalar, this.y * scalar);
  }
}

class Entity {
  update() {

  }

  render(context: CanvasRenderingContext2D) {

  }
}

class Portal extends Entity {
  constructor(public position: Vector, public angle: number, public length: number, public color: string) {
    super();
  }

  update() {

  }

  render(context: CanvasRenderingContext2D) {
    const endPosition = Vector.fromAngle(this.angle).mul(this.length).add(this.position);

    context.save();
    context.beginPath();
    context.moveTo(this.position.x, this.position.y);
    context.lineTo(endPosition.x, endPosition.y);
    context.strokeStyle = this.color;
    context.lineWidth = 3;
    context.stroke();
    context.restore();
  }
}

const bluePortal = new Portal(
  new Vector(100, 100),
  Math.PI * 0.5,
  100,
  '#0065ff'
);

const orangePortal = new Portal(
  new Vector(200, 100),
  Math.PI * 0.5,
  100,
  '#ff5d00'
);


const canvas = document.createElement('canvas');
const context = canvas.getContext('2d')!;
const entities: Array<Entity> = [
  bluePortal,
  orangePortal,
];

canvas.width = 800;
canvas.height = 600;

document.body.appendChild(canvas);


const render = () => {
  window.requestAnimationFrame(render);

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < entities.length; i++) {
    entities[i].update();
    entities[i].render(context);
  }
};

window.requestAnimationFrame(render);