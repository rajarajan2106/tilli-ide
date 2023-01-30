import React from 'react';
import MyConfig from '../../../../config/MyConfig';
import DropDown from '../../../../Component/DropDown';
import EditorContent from '../../Component/EditorContent';
import CheckedLayoutForm from './CheckedLayoutForm';
import UserActionText from './UserActionText';

export default class TextForm extends React.Component {
    render() {
        let { layers, layerActive } = this.props;
        let activeLayer = layers[layerActive];
        let includesUserActionText = ["Previous", "Record", "Record Press", "Reset Text"]

        let onClickOptions = MyConfig.themeEvent;
        return <div className="p-2">
            <div className="row">
                <div className="col-3">
                    <label>X</label>
                    <div className="input-group mb-3">
                        <input
                            type="number"
                            className="form-control"
                            placeholder=""
                            value={activeLayer.x} 
                            onChange={(e) => {
                                layers[layerActive].x = e.target.value
                                this.props.setValue(layers)
                            }} />
                        <div className="input-group-append">
                            <span className="input-group-text">%</span>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <label>Y</label>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" placeholder="" value={activeLayer.y} 
                        onChange={(e) => {
                            layers[layerActive].y = e.target.value
                            this.props.setValue(layers)
                        }}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">%</span>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <label>Width</label>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" placeholder="" value={activeLayer.width}
                        onChange={(e) => {
                            layers[layerActive].width = e.target.value
                            this.props.setValue(layers)
                        }} />
                        <div className="input-group-append">
                            <span className="input-group-text">%</span>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <label>Height</label>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" placeholder="" value={activeLayer.height} 
                        onChange={(e) => {
                            layers[layerActive].height = e.target.value
                            this.props.setValue(layers)
                        }}/>
                        <div className="input-group-append">
                            <span className="input-group-text">%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <label>Text</label>
                    <EditorContent 
                        text={activeLayer.text}
                        textOnchange={(value) => {
                            layers[layerActive].text = value
                            this.props.setValue(layers)
                        }}
                        layerActive={layerActive}
                    />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-3">
                    <label>Action</label>
                    <DropDown 
                        selectedOption={onClickOptions.filter(option => option.value === activeLayer.action)}
                        onChange={(e) => {
                            layers[layerActive].action = e.value;
                            if(e.value === "Checked Layout" || e.value === "Change Layout") {
                                layers[layerActive].layers = {
                                    visible: [],
                                    hidden: []
                                }
                            }
                            if (!includesUserActionText.includes(e.value)) {
                                layers[layerActive].userActionText = ""
                            }
                            this.props.setValue(layers)
                        }}
                        options={onClickOptions}
                    />
                </div>
                <div className="col-3">
                    <div className="mt-3">
                    {
                       (layers[layerActive].action === "Checked Layout" || layers[layerActive].action === "Change Layout") && <CheckedLayoutForm 
                        setValue={(value) => {
                            layers[layerActive].layers = value;
                            this.props.setValue(layers)
                        }}
                        changedLayers={layers[layerActive].layers}
                        layers={layers}
                    />
                    }
                    </div>
                </div>
                <div className="col-3">
                    <label>Visibility</label>
                    <div className="mt-2">
                        <input
                            type="checkbox"
                            placeholder=""
                            checked={activeLayer.visibility === "visible"}
                            onChange={(e) => {
                                layers[layerActive].visibility = e.target.checked ? "visible": "hidden";
                                this.props.setValue(layers)
                            }} />
                    </div>
                </div>
                {
                    (!includesUserActionText.includes(layers[layerActive].action) && layers[layerActive].action) &&
                    <div className="col-4">
                        <div className="mt-3">
                            <UserActionText
                                setValue={(value) => {
                                    layers[layerActive].userActionText = value;
                                    this.props.setValue(layers)
                                }}
                                layers={layers}
                                layerActive={layerActive}
                                userActionText={layers[layerActive].userActionText ? layers[layerActive].userActionText : ""}
                            />
                        </div>
                    </div>
                }
            </div>
        </div>;
    }
}
