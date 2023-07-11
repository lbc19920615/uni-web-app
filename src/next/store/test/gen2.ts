
    import { injectStore } from "@/frame/storeMan";

    
@injectStore('state')
class def{
 a = 1;
 b = 2;
get c() {
  return this.a+this.b
}
s() {
  this.a = this.a + 1
}

}

        