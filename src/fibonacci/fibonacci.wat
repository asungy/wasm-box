(module
  (func (export "Fibonacci") (param $n i32) (result i32) 
    ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
    ;; Define variables

    ;; For-loop variables
    (local $s1 i32)
    (local $s2 i32)
    (local $i i32)
    (local $tmp i32)
    ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

    ;; Error case
    ;; n < 0
    (i32.lt_s (local.get $n) (i32.const 0))
    if 
      (return (local.get $n))
    end

    ;; Base case 1
    ;; n == 0
    (i32.eq (local.get $n) (i32.const 0))
    if 
      (return (i32.const 0))
    end

    ;; Base case 2
    ;; n == 1
    (i32.eq (local.get $n) (i32.const 1))
    if 
      (return (i32.const 1))
    end

    ;; Instantiate for-loop variables
    (local.set $s1 (i32.const 0))
    (local.set $s2 (i32.const 1))
    (local.set $i (i32.const 1))

    (loop $continue (block $break
      ;; if i == n then break
      (br_if $break (i32.eq (local.get $i) (local.get $n)))

      ;; tmp = s1 + s2
      (local.set $tmp (i32.add (local.get $s1) (local.get $s2)))

      ;; s1 = s2
      (local.set $s1 (local.get $s2))

      ;; s2 = tmp
      (local.set $s2 (local.get $tmp))

      ;; i++
      (local.set $i (i32.add (local.get $i) (i32.const 1)))

      br $continue
    ))

    local.get $s2
  )
)
