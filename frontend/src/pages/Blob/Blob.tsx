import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { PackageInfo } from "../../comps/PackageInfo";
import { bindActionCreators, Dispatch } from "redux";
import { searchAndSelect } from "../../actions/search";

const BlobView = ({ currentPackage, loading, selectPackage, match }: any) => {
  if (!currentPackage && !loading) {
    selectPackage(match.params.pkg);
  } else if (!loading) {
    return <PackageInfo {...currentPackage} />;
  }
  return <div>loading</div>;
};

const mapStateToProps = (state: RootState) => {
  const { search } = state;
  return { ...search };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      selectPackage: searchAndSelect,
    },
    dispatch
  );

export const Blob = connect(mapStateToProps, mapDispatchToProps)(BlobView);
