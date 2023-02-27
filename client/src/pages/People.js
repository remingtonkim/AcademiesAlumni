import * as React from 'react';
// import { NestedMenuItem } from 'mui-nested-menu';
import { TextInput } from 'flowbite-react/lib/cjs/components/TextInput';
import List from "../components/SearchBar";
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import FormGroup from '@mui/material/FormGroup';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
import { Label } from 'flowbite-react/lib/cjs/components/Label';

function People() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e = React.MouseEvent) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  //search bar filtering 
  const [inputText, setInputText] = React.useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };


  return (
    <div className="container-fluid">

      <div className="columns-2 gap-8 block divide-x-8">
        <h2 className="py-3">Directory</h2>
        <div className="overflow-auto">
          <div className="search">
            <input type="search" onChange={inputHandler} placeholder="Text" class="input input-bordered input-info w-full max-w-xs focus:border-sky-400 focus:ring-0"></input>
            <br className="space-y-8"></br>
            <br className="space-y-1"></br>
            <div className="grid flex gaps-2 grid-cols-3">
              <div>
                <ul className="block menu menu-horizontal bg-base-100 w-30">
                  <li tabindex="0">
                    <span className="text-xs">Graduation Year</span>
                    <ul>
                      <div className="bg-base-100">
                        <form >
                          <input type="text" placeholder="2023" class="text-xs input input-bordered input-warning w-full max-w-xs focus:border-amber-400 focus:ring-0"></input>
                          <div>
                            <br></br>
                            <button className="drop-shadow-md text-xs hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 bg-amber-100 border  rounded py-2 px-2 border-amber-100 hover:border-amber-400">
                              Add
                            </button>
                          </div>
                        </form>
                      </div>

                    </ul>
                  </li>
                </ul>
              </div>
              <br className="space-x-4"></br>
              <div>
                <ul className="block menu menu-horizontal bg-base-100 w-30 align-self-left">
                  <li tabindex="0">
                    <span className="text-sm">Academy</span>
                    <ul className="menu bg-base-100 w-30">
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-6 ">
                            <p className="text-xs">AAST</p>
                            <input type="checkbox" class="focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-5 ">
                            <p className="text-xs">AMST</p>
                            <input type="checkbox" class="focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-6 ">
                            <p className="text-xs">AVPA</p>
                            <input type="checkbox" class="focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-8 ">
                            <p className="text-xs">ABF</p>
                            <input type="checkbox" class="focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-7 ">
                            <p className="text-xs">ATCS</p>
                            <input type="checkbox" class="focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-4 ">
                            <p className="text-xs">ACAHA</p>
                            <input type="checkbox" class="focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <button class="drop-shadow-lg border-2 text-xs border rounded py-2 px-2 bg-red-300 hover:bg-red-400 border-red-300 hover:text-white hover:border-red-400">Add</button>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <br className="space-y-8"></br>
            <List input={inputText} />
          </div>
          {/* <div>
            {/* <div className="py-1"> */}
          {/* <button
              id="align-left"
              className="focus:outline-none bg-defaultblue inline-block block border border-defaultblue rounded py-2 px-4  text-cream hover:bg-hover-defaultblue "
              onClick={handleClick}
            >
              Filters:
            </button>
            </div>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <NestedMenuItem
                label="Academy"
                parentMenuOpen={open}
              >
                <MenuItem>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="AAST" />
                    <FormControlLabel control={<Checkbox />} label="AMST" />
                    <FormControlLabel control={<Checkbox />} label="AVPA" />
                    <FormControlLabel control={<Checkbox />} label="ABF" />
                    <FormControlLabel control={<Checkbox />} label="ATCS" />
                    <FormControlLabel control={<Checkbox />} label="ACAHA" />
                    <button className=" focus:outline-none bg-defaultblue inline-block block border border-defaultblue rounded border-r-4 text-base text-cream hover:bg-hover-defaultblue py-1 px-2">Apply</button>
                  </FormGroup>
                </MenuItem>
              </NestedMenuItem>


              <NestedMenuItem
                label="Year"
                parentMenuOpen={open}
              >
                <MenuItem className=" ">
                  <form>
                    <div>
                      <div className="mb-2 block">
                        <Label
                          value="Graduation Year:"
                        />
                      </div>
                      <TextInput
                        type="search"
                        placeholder="2023"
                        className="bg-defaultblueborder border-defaultblue placeholder-defaultblue rounded-lg focus:ring-defaultblue focus:border-defaultblue block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <br></br>
                      <button className="focus:outline-none bg-defaultblue inline-block block border text-base border-defaultblue rounded text-cream hover:bg-hover-defaultblue py-1 px-4">
                        Apply
                      </button>
                    </div>
                  </form>
                </MenuItem>
              </NestedMenuItem>
            </Menu> */}
          {/* </div> */}
        </div>


        {/* where the rest of directory will be implemented */}
        <h2 className="py-3">Information</h2>
        <div className="">

        </div>
      </div>
    </div>


  );
}


export default People;