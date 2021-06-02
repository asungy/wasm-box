(module
  (func (export "Fibonacci") (param $n i32) (result i32)
    local.get $n
    i32.const 1
    i32.add
  )
)
