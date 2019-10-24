import {
  R, H, React, useEffect, useState, useCallback, useRef, styled,
  Icon
} from 'common'
import Input_ from './input.sc'
import Label_ from './label.sc'
import Top_ from './top.sc'
import Dropdown from './dropdown'
import icon from './icon.sc'

const Input = ({
  label, results, name, type,
  onEnt, link, onClick, className, valid: isValid = false,
  placeholder = label, errors, loading,
  hasError = Boolean (errors?.[name]), ...rest
}, ref) => {
  const
  // @param e Event
  onKeyPress = R.when (R.propEq (`key`) (`Enter`)) (onEnt),

  [dropdown, setDropdown] = useState (true),
  [valid, setValid] = useState (false),

  [] = [!valid && isValid && (() => {
    setValid (isValid)
    setDropdown (!dropdown)
  })()],

  onBlur = () => console.log(`onBlur fired`) || setDropdown (false),

  onFocus= () => console.log(`onfocus fired`),

  _onClick = () => setDropdown (!dropdown)

  // window.keydown(function (e) {
  //   var code = (e.keyCode ? e.keyCode : e.which);
  //   if (code == 9) {
  //     alert('I was tabbed!');
  //   }
  // })

  const inputRef = useRef()

  const forwardRef = e => {
    ref (e)
    inputRef.current = e
  }

  const onHidden = e => {
    alert(`hi`)
    e.preventDefault()
    e.returnValue = `hello`
    console.log (`onUnload fired`)
    inputRef.current === document.activeElement
      && setDropdown (true)
  }

  H.useMount(() => {
    inputRef.current.focus()
    document.addEventListener(`webkitvisibilitychange`, onHidden)
  })

  H.useUnmount (() => {
    window.removeEventListener (`webkitvisibilitychange`, onHidden)
  })

  const [active, setActive] = useState (0)

  /* Using pattern described in
  https://stackoverflow.com/questions/55565444/how-to-register-event-with-useeffect-hooks */
  const handleUserKeyPress = useCallback (({key}) => {
    inputRef.current === document.activeElement |> console.log ('inputRef.current === document.activeElement', #)
    results |> console.log ('results', #)
    inputRef.current === document.activeElement && results && key === `ArrowUp`
      && (console.log (`arrowup`) || setActive (R.pipe (R.dec, R.max (0))))
    inputRef.current === document.activeElement && results && key === `ArrowDown`
      && (console.log (`arrowdown`) || setActive (R.pipe (R.inc, R.min (R.length (results) - 1))))
  }, [results])

  useEffect(() => {
    inputRef.current.addEventListener (`keyup`, handleUserKeyPress)

    return () => inputRef.current.removeEventListener (`keyup`, handleUserKeyPress)
  }, [handleUserKeyPress])

  active |> console.log ('active', #)

  return (
    <div className={className}>
      <Label_>{label}</Label_>
      <Input_ autoComplete='off' onClick={_onClick} ref={forwardRef}
        {...{placeholder, onBlur, onKeyPress,
          onFocus,
          name, type, hasError, ...rest}}
      />
      {isValid && <Icon src='checkmark' css={icon}/>}
      {dropdown && <Dropdown {...{results, onClick, active}}/>}
    </div>
  )
}

// export default H.styleAndForwardRef (Input) (Top_)
export default styled (React.forwardRef (Input)) ``
