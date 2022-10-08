// 타입스크립트는 변수, 매개변수, return 값에 타입을 붙이는 것
// 모든 타입스크립트는 자바스크립트로 변환되어야 한다. 그러므로 자바스크립트에 어긋나는 코드일 수 없다
const a: string = "5";
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;

// 타입 자리에 아예 고정된 원시값을 넣을 수 있음.
// 상수는 바뀔 일이 없기 때문에 최대한 타입을 정확하게 지정하는 것
const f: 5 = 5;

// 함수 선언식의 반환값에 타입을 지정하는 자리는 매개변수 뒤
function add(x: number, y: number): number {
  return x + y;
}

// 화살표 함수의 경우
// 헷갈릴 떄는 :를 찾아 그 뒤를 없애본다. 지웠을 때 자바스크립트 문법에 맞아야 함
// : (x: number, y: number) => number 부분이 타입 지정 부분임을 알 수 있음
// 화살표 함수일 때는 타입 지정에 =>가 들어가 있음. 헷갈리지 않도록 하기
const add2: (x: number, y: number) => number = (x, y) => x + y;

// type
// 화살표 함수의 반환값 타입 지정은 별도로 type 키워드를 사용할 수도 있다
// 타입 지정한 부분이 그대로 빠져서 type에 할당되고, 원래 자리에 타입 변수를 적으면 됨!
type Add3 = (x: number, y: number) => number;
const add3: Add3 = (x, y) => x + y;

// interface
// type과 비슷하지만 비교적 어려운 개념. 사용 빈도는 좀 떨어지는 편
interface Add4 {
  (x: number, y: number): number;
}
const add4: Add4 = (x, y) => x + y;

// 객체의 경우 변수에 타입을 붙인다
const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };

// 배열의 경우
const arr: string[] = ["123", "456"];
const arr2: number[] = [123, 456];

// 배열은 제네릭을 사용해서 표기할 수 있다
const arr3: Array<number> = [123, 456];

// 튜플(tuple): 길이가 고정된 배열. 요소마다 타입을 지정한다
const arr4: [number, number, string] = [123, 456, "hello"];
