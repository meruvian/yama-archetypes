#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package org.meruvian.yama.core.commons;

import org.meruvian.yama.core.DefaultRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FileInfoRepository extends DefaultRepository<FileInfo> {

}
