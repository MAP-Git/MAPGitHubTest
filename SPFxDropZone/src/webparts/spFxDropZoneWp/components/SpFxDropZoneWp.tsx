import * as React from 'react';
import styles from './SpFxDropZoneWp.module.scss';
import { ISpFxDropZoneWpProps } from './ISpFxDropZoneWpProps';
import { ISpFxDropZoneWpState } from './ISpFxDropZoneWpState';
import { PrimaryButton } from 'office-ui-fabric-react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { escape } from '@microsoft/sp-lodash-subset';

import { sp } from "@pnp/sp";
import { IItem } from "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items";
import "@pnp/sp/attachments";

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

export default class SpFxDropZoneWp extends React.Component<ISpFxDropZoneWpProps, ISpFxDropZoneWpState> {

  constructor(props: ISpFxDropZoneWpProps, state: ISpFxDropZoneWpState)
  {
    super(props);

    sp.setup({
      spfxContext: this.props.context
    });

    this.state = ({ files: [] });

    registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

  }

  public render(): React.ReactElement<ISpFxDropZoneWpProps> {
    return (

      <div className={styles.spfxReactDropzone}>
        <FilePond files={this.state.files} allowMultiple={true} onupdatefiles={fileItems => {
          this.setState({
            files: fileItems.map(fileItem => fileItem.file)
          });
        }} />
        <br />
        <PrimaryButton text="Upload" onClick={this._uploadFiles} />
      </div>

    );
  }

@autobind
  private async _uploadFiles() {
    this.state.files.forEach(function (file, i) {

        let item = sp.web.lists.getByTitle("ContactList").items.getById(1);

        item.attachmentFiles.add(file.name, file).then(v => {

            console.log(v);
        });       
    });
    this.setState({ files: [] })
  }

}
