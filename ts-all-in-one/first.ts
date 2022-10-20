// 타입스크립트는 변수, 매개변수, return 값에 타입을 붙이는 것
// 모든 타입스크립트는 자바스크립트로 변환되어야 한다. 그러므로 자바스크립트에 어긋나는 코드일 수 없다
// 타입 추론: 타입스크립트가 정확하게 추론했다면 굳이 타입을 쓰는 게 오히려 비효율적
// 최대한 타입 추론을 활용해라!
const a: string = "5"; // 굳이 string을 쓰지 않아도 상수이며 추론 가능하므로 타입을 뺴는 게 낫다
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;

// 타입 자리에 아예 고정된 원시값을 넣을 수 있음.
// 상수는 바뀔 일이 없기 때문에 최대한 타입을 정확하게 지정하는 것
const f: 5 = 5;

// 함수 선언식의 반환값에 타입을 지정하는 자리는 매개변수 뒤 -----------------------
// 타입 추론: 매개변수 둘을 더해서 숫자가 나오는 건 너무 명확하므로 굳이 타입을 리턴값까진 부여하지 않아도 됨
function add(x: number, y: number): number {
  return x + y;
}
// 이렇게도 쓸 수 있다
function add0(x: number, y: number): number; // 타입 선언부를 따로 뺀다
// 자바스크립트 코드
function add0(x, y) {
  return x + y;
}

// 화살표 함수의 경우 ----------------------------------------------------------
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

// 객체의 경우 변수에 타입을 붙인다 ----------------------------------------------
const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };

// 배열의 경우
const arr: string[] = ["123", "456"];
const arr2: number[] = [123, 456];

// 배열은 제네릭을 사용해서 표기할 수 있다
const arr3: Array<number> = [123, 456];

// 튜플(tuple): 길이가 고정된 배열. 요소마다 타입을 지정한다
const arr4: [number, number, string] = [123, 456, "hello"];

// 자바스크립트 변환 시 사라지는 부분을 파악하자 -----------------------------------
// 다음의 코드는 타입스크립트로서 자스 변환 시 사라진다
const bool: true = true; // : true 부분
type ABC = () => number;
interface DEF {}
Array<string>;

// as
// 앞의 타입을 강제로 다른 걸로 바꿔주는 키워드
let aa = 123;
aa = "hello" as unknown as number;

// 추후 배우는 enum, declare도 사라짐

// never 타입과 느낌표(non-null assertion) ------------------------------------------
// tsconfig에서 noImplicitAny: false일 때 빈 배열은 never[] 타입으로 타입 추론 된다
// 이 경우 빈 배열을 변경하려고 하면 타입 에러가 난다
// 빈 배열을 사용하기 위해서는 반드시 사전에 타입 지정을 해줄 것
try {
  const array = [];
  // array[0];
  array.push("hello");
} catch (error) {
  error;
}

// 느낌표(non-null assertion)
const head: Element = document.querySelector("#head")!;
// head의 값은 querySelector로 선택한 Element 타입이거나, null이다
// 이 때 맨 뒤에 !를 붙이면 이 값이 null이나 undefined가 아니라는 것을 명시하는 것을 의미
// 하지만 !를 사용하면 타입스크립트가 타입을 추론하지 못하게 되므로 사용하지 않는 것을 권장

// 꼭 사용해야 한다면 if로 조건문을 사용하는 편이 안전
if (head) {
  head.innerHTML = "hello";
}

// 원시 래퍼 타입, 템플릿 리터럴 타입, rest, 튜플 --------------------------------------
// string과 String은 다름
const a1: string = "hello";
const b1: String = "hell"; // 래퍼 개체

new String(); // 존재는 하지만 실제로 사용하지 않음

// type
// type으로 커스텀 타입을 선언할 수 있음. 자동완성 가능. 식별자는 uppercase로 입력

type World = "world" | "hell"; // World 타입을 선언
const a2: World = "world"; // World 타입을 지정했으므로 앞서 선언해준 대로만 입력 가능

// 템플릿 리터럴 타입
// 템플릿 리터럴 타입은 문자열 타입을 조합하여 새로운 문자열 타입을 만들 수 있음
// 나중에 타입을 정교하게 만들 일이 있으면 사용
const b2 = `hello ${a}`;
type Greeting = `hello ${World}`;
const c2: Greeting = "hello world"; // 사전에 world와 hell로 지정한 타입을 정교하게 추천해준다
