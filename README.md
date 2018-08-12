# BaseRepositoryforFirebase
- cloud functions/cloud functions for firebaseが正式リリースされたので公開
- cloud functions for firebase のonCreateのようなトリガー部分は省略
- データの隠蔽はしない（Repositoryの作成方法に対してのメモのため）

## use-inheritance
- あまりよろしくない。Referenceしか使わないのにupdate処理も使うことができるようになってしまう
- リスコフの置換原則としてはprotected/privateを使っている時点で不可能
- 単一責任の原則についてはグレー。firebaseへの処理としての単一責任と捉えるとOK？