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
// 배열을 아울러 타입지정하는 것보다 세밀하게 지정이 가능. 그러나 길이가 고정되어 있어서 유연성이 떨어짐
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
  // array.push("hello"); // 빈 배열을 변경시 에러
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

// rest 파라미터
// rest는 함수의 인자를 배열로 받아올 수 있음
let arr5: string[] = [];
let arr6: Array<string> = [];
function rest(...args: string[]) {} // 인자에 타입 지정
function rest2(a, ...args: string[]) {
  console.log(a, args); // 1, ["2", "3"]
} // 첫 번째 인자는 제외하고 배열로 받아옴

// rest(1, 2, 3); // 앞서 string으로 타입지정했기 때문에 에러가 난다
rest2("1", "2", "3");

// 튜플 tuple
const tuple: [string, number] = ["1", 1];
// 튜플로 지정되지 않은 요소를 추가하면 에러가 나야 하는 게 원칙이지만
// 배열 메서드를 사용해 추가하면 에러가 나지 않음에 주의!
// tuple[2] = "hello"; // 에러
tuple.push("hello"); // 에러가 나지 않음
// 위의 경우 타입스크립트는 튜플의 지정을 string | number로 인식

// enum, keyof, typeof ----------------------------------------------------------

// enum 타입
// 열거형 변수로 변수들을 하나의 그룹으로 묶고 싶을 때 사용
// 임의의 숫자나 문자열을 할당하여 하나의 유형으로 사용할 수 있다

// 아무것도 지정하지 않은 경우에는 0부터 숫자를 매긴다
const enum EDirection {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}
console.log(EDirection.Up); // 0

// 일반 객체를 사용해서 대체할 수 있으므로 그렇게 빈번히 사용되지는 않는 듯...
// 자바스크립트로 변환했을 때 enum은 사라지고 객체는 사라지지 않으므로
// 코드에 남기고 싶다면 객체를 사용하는 쪽을 권장
const EDirection2 = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
};

// as const (const assertion)
// 타입스크립트는 const로 선언할 경우 자동적으로 리터럴 자체로 타입을 추론하지만
// let으로 선언할 경우에는 상위 타입으로 추론 범위가 확장된다
// as const를 사용하면 let을 사용해 선언해도 const로 선언한 것처럼 타입이 지정된다
const greeting1 = "hello"; // "hello"로 타입 추론
let greeting2 = "hello"; // string으로 타입 추론
const greeting3 = "hello" as const; // "hello"로 타입 추론

// 객체와 같은 참조 타입에 as const를 사용하면
// const로만 선언된 객체의 내부 프로퍼티가 자유롭게 변경이 되는 것과 달리
// 모든 내부 프로퍼티의 값이 리터럴 값 자체로 추론되며 readonly로 고정되어 변경할 수 없다!
// 원시 타입이든 참조 타입이든 값의 재할당을 막아버리므로 보다 안전한 사용이 가능
const ODirection = {
  Up: 0, // 0으로 타입 추론되며 readonly 프로퍼티로 변경
  Down: 1,
  Left: 2,
  Right: 3,
} as const;
console.log(ODirection.Up); // 0

// enum을 파라미터 타입으로 지정
function walk(dir: EDirection) {}

// enum 없이 같은 기능을 하는 코드 구현 예시
type Direction = typeof ODirection[keyof typeof ODirection];
function run(dir: Direction) {}

walk(EDirection.Left);
run(ODirection.Right);

// type alias 타입 정의
// 간단하게 쓰고 싶으면 type alias를 사용
type A1 = { a: string };
const a6: A1 = { a: "hello" };

// interface 타입 정의
// 보다 복잡한 기능들을 사용해 객체지향 프로그래밍을 하고 싶으면 interface 사용
interface B1 {
  a: string;
}
const b6: B1 = { a: "hello" };

// union(|)과 intersection(&) ------------------------------------------------
// union(|)은 두 타입 중 하나만 있어도 됨
// union은 신중히 사용하기
function add6(x: string | number, y: string | number): string | number {
  // @ts-ignore
  return x + y;
}
const result: string | number = add6(1, 2); // number인데 string으로 타입 추론이 잘못될 수 있음

add6("1", "2");
add6(1, "2");

// intersection(&)은 두 타입을 모두 가지는 것. 참조 타입에서 가능
// 모든 속성이 다 있어야 함. 모두 만족해야 함
type A = {
  a: string;
};
type B = {
  b: string;
};

// |와 &를 둘 다 만족하는 것도 가능
const aaa: A | B = { a: "hello", b: "world" };
const bbb: A & B = { a: "hello", b: "world" };

// type alias와 interface의 차이점 --------------------------------------------
// type alias는 기본적으로 새로운 타입 값을 하나 생성하는 것이고
// interface는 기존 타입 값에 새로운 속성을 추가하는 것
// type alias는 새로운 타입 값을 생성하므로 유니온, 인터섹션 등의 타입 조합이 가능

// type 상속
// 비교적 간단하게 사용 가능
type Animal = { breathe: true };
type Cat = Animal & { cute: true };
type Human = Cat & { think: true };

const sak: Human = { breathe: true, cute: true, think: true };

// interface 확장
// extends 키워드가 있어서 명확하다
// 여타 라이브러리들에서는 대부분 interface를 사용하고 있음
interface Animal2 {
  breathe: true;
}
interface Cat2 extends Animal2 {
  cute: true;
}

// interface와 type의 혼용도 가능. 명확하게 둘이 구분되어 있는 개념은 아님
interface Human2 extends Human {
  think: true;
}

// interface는 중복 선언이 가능
// 중복 선언을 하면 기존 속성에 새로운 속성을 추가할 수 있음
// 이렇게 다른 라이브러리의 속성을 수정해서 사용할 수 있다
interface AA {
  talk: () => void;
}
interface AA {
  walk: () => void;
}
interface AA {
  eat: () => void;
}
const aaaa: AA = {
  talk() {},
  walk() {},
  eat() {},
  sleep() {}, // 아래처럼 새로 중복 선언을 하면 타입에 자동으로 추가됨
};
interface AA {
  sleep: () => void;
}

// naming convention
// 과거에는 interface는 I, type은 T, enum은 E로 시작하는 관례가 있었으나 요새는 안하는 추세
interface Props {}
type Type = string | number;
enum Hello {
  Left,
  Right,
}
