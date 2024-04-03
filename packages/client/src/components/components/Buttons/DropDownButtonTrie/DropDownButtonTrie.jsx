/*
 * ----------------------------------------------------------------------
 *                          Components & Functions                      |
 * ----------------------------------------------------------------------
 */
import React, { useState } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
/*
 * ----------------------------------------------------------------------
 *                              Services & Models                       |
 * ----------------------------------------------------------------------
 */

/*
 * ----------------------------------------------------------------------
 *                                Styles                                |
 * ----------------------------------------------------------------------
 */
import "./DropDownButtonTrie.scss";
/*
 * ----------------------------------------------------------------------
 *                                Images                                |
 * ----------------------------------------------------------------------
 */

function DropDownButtonTrie(props) {
  /* --------------------------------------------------------------------
   *                               Props                                |
   * --------------------------------------------------------------------
   */
  const { title,onSelectFilter } = props;

  /* --------------------------------------------------------------------
   *                              States                                |
   * --------------------------------------------------------------------
   */

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const filter = ["Sans Trie","date de création", "date de fin", "taille", "delai de modification"];

  /* --------------------------------------------------------------------
   *                             Functions                              |
   * --------------------------------------------------------------------
   */
  /* --------------------------------------------------------------------
   *                            Effect Hooks                            |
   * --------------------------------------------------------------------
   */


  /* --------------------------------------------------------------------
   *                                 JSX                                |
   * --------------------------------------------------------------------
   */

  return (
    <UncontrolledDropdown isOpen={dropdownOpen} toggle={toggle} >
    <DropdownToggle caret>
    {title}
    </DropdownToggle>
    <DropdownMenu>
      {filter.map((f) => (
        <DropdownItem key={f} onClick={() => onSelectFilter(f)}>
          {f}
        </DropdownItem>
      ))}
    </DropdownMenu>
  </UncontrolledDropdown>
  );
}

export default DropDownButtonTrie;
