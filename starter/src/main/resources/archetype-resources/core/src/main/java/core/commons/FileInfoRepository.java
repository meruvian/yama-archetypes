#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.core.commons;

import ${package}.core.DefaultRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FileInfoRepository extends DefaultRepository<FileInfo> {

}
